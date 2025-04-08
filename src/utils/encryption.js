// ------------------------------------------------------------
// Conversions
// ------------------------------------------------------------

import { getMasterKey } from "./indexedDB";

function arrayBufferToBase64(buffer) {
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
}

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// ------------------------------------------------------------
// Public & Private Keys
// ------------------------------------------------------------

export async function generateKeyPair() {
  const { publicKey, privateKey } = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"],
  );

  // Export public key
  const publicBuffer = await exportKey(publicKey);
  const exportedPublicKey = arrayBufferToBase64(publicBuffer);

  // Export private key
  const privateBuffer = await exportKey(privateKey);
  const exportedPrivateKey = arrayBufferToBase64(privateBuffer);

  // Store private key

  return { publicKey: exportedPublicKey, privateKey: exportedPrivateKey };
}

async function exportKey(key) {
  return await window.crypto.subtle.exportKey(
    key.type === "private" ? "pkcs8" : "spki",
    key,
  );
}

async function importKey(key, type) {
  const buffer = base64ToArrayBuffer(key);
  const importedKey = await window.crypto.subtle.importKey(
    type === "private" ? "pkcs8" : "spki",
    buffer,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    type === "private" ? ["decrypt"] : ["encrypt"],
  );

  return importedKey;
}

// ------------------------------------------------------------
// Master Key
// ------------------------------------------------------------

export async function generateMasterKey() {
  let key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

  return await exportMasterKey(key);
}

async function exportMasterKey(key) {
  // Export key
  const exported = await window.crypto.subtle.exportKey("raw", key);
  // Convert to buffer
  const exportedKeyBuffer = new Uint8Array(exported);
  // Convert to base64
  const exportedKeyBase64 = arrayBufferToBase64(exportedKeyBuffer);

  return exportedKeyBase64;
}

async function importMasterKey(key) {
  const buffer = base64ToArrayBuffer(key);
  const importedKey = await window.crypto.subtle.importKey(
    "raw",
    buffer,
    "AES-GCM",
    false,
    ["encrypt", "decrypt"],
  );

  return importedKey;
}

export async function encryptMasterKey(
  masterKey,
  userPublicKey,
  contactPublicKey,
) {
  const importedUserPublicKey = await importKey(userPublicKey, "public");
  const importedContactPublicKey = await importKey(contactPublicKey, "public");
  const bufferMasterKey = base64ToArrayBuffer(masterKey);

  const encryptedUserMasterKey = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    importedUserPublicKey,
    bufferMasterKey,
  );

  const encryptedContactMasterKey = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    importedContactPublicKey,
    bufferMasterKey,
  );

  return {
    encryptedUserMasterKey: arrayBufferToBase64(encryptedUserMasterKey),
    encryptedContactMasterKey: arrayBufferToBase64(encryptedContactMasterKey),
  };
}

export async function decryptMasterKey(masterKey, userPrivateKey) {
  try {
    const importedUserPrivateKey = await importKey(userPrivateKey, "private");
    const bufferMasterKey = base64ToArrayBuffer(masterKey);

    const decryptedMasterKey = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      importedUserPrivateKey,
      bufferMasterKey,
    );

    return arrayBufferToBase64(decryptedMasterKey);
  } catch (error) {
    console.error("Error decrypting master key:", error);
    return null;
  }
}

// ------------------------------------------------------------
// Messages
// ------------------------------------------------------------

function encodeMessage(message) {
  const encoder = new TextEncoder();
  return encoder.encode(message);
}

function decodeMessage(message) {
  const decoder = new TextDecoder();
  return decoder.decode(message);
}

export async function encryptMessage(message, masterKey) {
  const encodedMessage = encodeMessage(message);
  const importedKey = await importMasterKey(masterKey);

  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encryptedMessage = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    importedKey,
    encodedMessage,
  );

  return {
    encryptedMessage: arrayBufferToBase64(encryptedMessage),
    iv: arrayBufferToBase64(iv),
  };
}

export async function decryptMessages(messages, conversationId) {
  const masterKey = await getMasterKey(conversationId);

  // Create a deep copy of the messages array to avoid mutating the original
  const messagesCopy = JSON.parse(JSON.stringify(messages));

  await Promise.all(
    messagesCopy.map(async (message) => {
      const decryptedMessage = await decryptMessage(
        message.content,
        masterKey,
        message.iv,
      );
      message.content = decryptedMessage;
    }),
  );

  return messagesCopy;
}

export async function decryptHomeLastMessages(contacts) {
  const newContacts = await Promise.all(
    contacts.map(async (contact) => {
      if (contact.last_message) {
        const masterKey = await getMasterKey(contact.conversation_id);
        const decryptedMessage = await decryptMessage(
          contact.last_message.content,
          masterKey,
          contact.last_message.iv,
        );
        contact.last_message.content = decryptedMessage;
      }
      return contact;
    }),
  );

  return newContacts;
}

export async function decryptMessage(message, masterKey, iv) {
  try {
    const importedKey = await importMasterKey(masterKey);
    const bufferMessage = base64ToArrayBuffer(message);
    const bufferIv = base64ToArrayBuffer(iv);

    const decryptedMessage = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: bufferIv },
      importedKey,
      bufferMessage,
    );

    return decodeMessage(decryptedMessage);
  } catch (error) {
    return " ";
  }
}
