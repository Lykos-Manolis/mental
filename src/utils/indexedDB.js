import { setPublicKey } from "../api/keys";
import {
  decryptMasterKey,
  generateKeyPair,
  generateMasterKey,
  encryptMasterKey,
} from "./encryption";
import { updateConversationMasterKeys } from "../api/conversations";
import { getContactPublicKeyById } from "../api/contacts";

// Track database initialization status
let dbInitialized = false;
let dbInitializationPromise = null;

export async function initializeIndexedDB(userId) {
  // If already initialized or initializing, return the existing promise
  if (dbInitializationPromise) {
    return dbInitializationPromise;
  }

  dbInitializationPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open("Mental_DB", 1);

    request.onerror = (event) => {
      console.error(`Database error: ${event.target.error?.message}`);
      dbInitialized = false;
      reject(event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // If key pairs table doesn't exist, create it
      const objectstore = db.createObjectStore("key_pairs", {
        keyPath: "user_id",
      });

      objectstore.createIndex("user_id", "user_id", { unique: true });
      objectstore.createIndex("public_key", "public_key", { unique: true });
      objectstore.createIndex("private_key", "private_key", { unique: true });

      objectstore.transaction.oncomplete = async () => {
        console.log("Key pairs object store created");
        const { publicKey, privateKey } = await generateKeyPair();

        const transaction = db
          .transaction("key_pairs", "readwrite")
          .objectStore("key_pairs")
          .add({
            user_id: userId,
            public_key: publicKey,
            private_key: privateKey,
          });

        console.log("New key pairs added to database");
        await setPublicKey(publicKey);
      };

      const masterObjectstore = db.createObjectStore("master_keys", {
        keyPath: "conversation_id",
      });

      masterObjectstore.createIndex("conversation_id", "conversation_id", {
        unique: true,
      });
      masterObjectstore.createIndex("master_key", "master_key", {
        unique: true,
      });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      const transaction = db.transaction(["key_pairs"]);
      const objectStore = transaction.objectStore("key_pairs");
      const getRequest = objectStore.get(userId);

      getRequest.onsuccess = async (event) => {
        const result = getRequest.result;

        if (!result) {
          console.log("Adding key pairs for new user");
          const { publicKey, privateKey } = await generateKeyPair();

          const transaction = db
            .transaction("key_pairs", "readwrite")
            .objectStore("key_pairs")
            .add({
              user_id: userId,
              public_key: publicKey,
              private_key: privateKey,
            });

          console.log("New key pairs added to database");
          await setPublicKey(publicKey);
        }
      };

      dbInitialized = true;
      console.log("Database initialized");
      resolve(db);
    };
  });

  return dbInitializationPromise;
}

// Helper function to ensure DB is initialized before performing operations
async function getDB() {
  if (!dbInitialized && !dbInitializationPromise) {
    console.warn("Database not initialized yet, attempting to initialize");
    try {
      // If we don't have a user ID yet, this is a temporary DB until real init happens
      await initializeIndexedDB("temp-user");
    } catch (err) {
      console.error("Failed to initialize database:", err);
      throw new Error("Database not initialized");
    }
  }

  try {
    return await dbInitializationPromise;
  } catch (err) {
    console.error("Error accessing database:", err);
    throw new Error("Could not access database");
  }
}

export async function saveMasterKey(conversationId, masterKey) {
  try {
    const db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db
        .transaction("master_keys", "readwrite")
        .objectStore("master_keys")
        .add({
          conversation_id: conversationId,
          master_key: masterKey,
        });

      transaction.onsuccess = () => {
        console.log("New master key added to database");
        resolve(true);
      };

      transaction.onerror = (event) => {
        console.error(
          `Error saving master key: ${event.target.error?.message}`,
        );
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error in saveMasterKey:", error);
    throw error;
  }
}

export async function updateMasterKey(conversationId, masterKey) {
  try {
    const db = await getDB();

    return new Promise((resolve, reject) => {
      // First delete the existing entry
      const deleteTransaction = db
        .transaction("master_keys", "readwrite")
        .objectStore("master_keys");

      const deleteRequest = deleteTransaction.delete(Number(conversationId));

      deleteRequest.onsuccess = () => {
        // Then add the new entry
        const addTransaction = db
          .transaction("master_keys", "readwrite")
          .objectStore("master_keys")
          .add({
            conversation_id: conversationId,
            master_key: masterKey,
          });

        addTransaction.onsuccess = () => {
          console.log("Master key updated in database");
          resolve(true);
        };

        addTransaction.onerror = (event) => {
          console.error(
            `Error updating master key: ${event.target.error?.message}`,
          );
          reject(event.target.error);
        };
      };

      deleteRequest.onerror = (event) => {
        console.error(
          `Error deleting old master key: ${event.target.error?.message}`,
        );
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error in updateMasterKey:", error);
    throw error;
  }
}

export async function getPublicKey(userId) {
  try {
    const db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["key_pairs"]);
      const objectStore = transaction.objectStore("key_pairs");
      const getRequest = objectStore.get(userId);

      getRequest.onerror = (event) => {
        reject(`Database error: ${event.target.error?.message}`);
      };

      getRequest.onsuccess = (event) => {
        const result = getRequest.result;
        resolve(result?.public_key);
      };
    });
  } catch (error) {
    console.error("Error in getPublicKey:", error);
    throw error;
  }
}

export async function getPrivateKey(userId) {
  try {
    const db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["key_pairs"]);
      const objectStore = transaction.objectStore("key_pairs");
      const getRequest = objectStore.get(userId);

      getRequest.onerror = (event) => {
        reject(`Database error: ${event.target.error?.message}`);
      };

      getRequest.onsuccess = (event) => {
        const result = getRequest.result;
        resolve(result?.private_key);
      };
    });
  } catch (error) {
    console.error("Error in getPrivateKey:", error);
    throw error;
  }
}

export async function getMasterKey(conversationId) {
  try {
    const db = await getDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["master_keys"]);
      const objectStore = transaction.objectStore("master_keys");
      const getRequest = objectStore.get(Number(conversationId));

      getRequest.onerror = (event) => {
        reject(`Database error: ${event.target.error?.message}`);
      };

      getRequest.onsuccess = (event) => {
        const result = getRequest.result;
        resolve(result?.master_key);
      };
    });
  } catch (error) {
    console.error("Error in getMasterKey:", error);
    throw error;
  }
}

async function updateMasterKeyForContact(contact, userId) {
  try {
    // Get user public key
    const userPublicKey = await getPublicKey(userId);

    // Get the contact user ID from the contact object
    const contactId = contact.contact_id;

    if (!contactId) {
      console.error("Could not determine contact ID");
      return false;
    }

    // Get the contact's public key
    const contactPublicKey = await getContactPublicKeyById(contactId);

    if (!userPublicKey || !contactPublicKey) {
      console.error("Could not find required public keys");
      return false;
    }

    // Generate a new master key
    const newMasterKey = await generateMasterKey();

    // Encrypt the new master key for both users
    const { encryptedUserMasterKey, encryptedContactMasterKey } =
      await encryptMasterKey(newMasterKey, userPublicKey, contactPublicKey);

    // Update the master key in the database
    await updateConversationMasterKeys(
      contact.conversation_id,
      encryptedUserMasterKey,
      encryptedContactMasterKey,
    );

    // Update the master key locally
    await updateMasterKey(contact.conversation_id, newMasterKey);

    console.log("Master key successfully updated");
    return true;
  } catch (error) {
    console.error("Error updating master key:", error);
    return false;
  }
}

export async function checkMasterKeys(contacts, userId) {
  try {
    const db = await getDB();

    // Check if master keys are saved locally
    const promises = contacts.map(async (contact) => {
      return new Promise((resolve) => {
        const transaction = db.transaction(["master_keys"]);
        const objectStore = transaction.objectStore("master_keys");
        const getRequest = objectStore.get(contact.conversation_id);

        getRequest.onerror = (event) => {
          console.error(`Database error: ${event.target.error?.message}`);
          resolve(false);
        };

        getRequest.onsuccess = async (event) => {
          const result = getRequest.result;

          // If not, decrypt this master key and save it locally
          if (!result) {
            try {
              const userPrivateKey = await getPrivateKey(userId);
              const decryptedMasterKey = await decryptMasterKey(
                contact.master_key,
                userPrivateKey,
              );

              if (!decryptedMasterKey) {
                // If decryption failed, generate a new master key
                await updateMasterKeyForContact(contact, userId);
                resolve(true);
                return;
              }

              await saveMasterKey(contact.conversation_id, decryptedMasterKey);
              resolve(true);
            } catch (error) {
              console.error("Error processing master key:", error);
              resolve(false);
            }
          }

          // If it does, compare with the saved master key
          else {
            const savedMasterKey = await getMasterKey(contact.conversation_id);
            const userPrivateKey = await getPrivateKey(userId);
            const decryptedMasterKey = await decryptMasterKey(
              contact.master_key,
              userPrivateKey,
            );

            if (savedMasterKey !== decryptedMasterKey) {
              console.log("Master key mismatch, generating new master key");
              await updateMasterKeyForContact(contact, userId);
            }
            resolve(true);
          }
        };
      });
    });

    return Promise.all(promises);
  } catch (error) {
    console.error("Error in checkMasterKeys:", error);
    throw error;
  }
}
