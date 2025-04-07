import { encryptMasterKey, generateMasterKey } from "../utils/encryption";
import { getPublicKey, saveMasterKey } from "../utils/indexedDB";
import supabase from "../utils/supabase";

export async function updateFavoriteContacts(favoriteContactIds) {
  try {
    const { data, error } = await supabase.rpc("update_favorite_contacts", {
      favorite_contact_ids: favoriteContactIds,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error updating favorite contacts:", error.message);
    throw error;
  }
}

export async function setContact(contact) {
  // Get the current user
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!userData || !userData.user) {
    throw new Error("User not authenticated");
  }

  const publicKey = await getContactPublicKey(contact);

  if (!publicKey) {
    throw new Error("User not found. Please check the email or phone number.");
  }

  const userPublicKey = await getPublicKey(userData.user.id);

  const masterKey = await generateMasterKey();
  const { encryptedUserMasterKey, encryptedContactMasterKey } =
    await encryptMasterKey(masterKey, userPublicKey, publicKey);

  try {
    const { data, error } = await supabase.rpc("check_and_add_contact", {
      contact_identifier: contact,
      user_master_key: encryptedUserMasterKey,
      contact_master_key: encryptedContactMasterKey,
    });

    if (error) throw error;

    switch (data.status) {
      case "USER_NOT_FOUND":
        throw new Error(
          "User not found. Please check the email or phone number.",
        );
      case "CONTACT_ALREADY_EXISTS":
        throw new Error("This contact is already in your contacts list.");
      case "SUCCESS":
        await saveMasterKey(data.conversation_id, masterKey);
        return true;
      default:
        throw new Error("An unexpected error occurred.");
    }
  } catch (error) {
    console.error("Error setting contact:", error.message);
    throw error;
  }
}

async function getContactPublicKey(identifier) {
  const { data, error } = await supabase.rpc("find_user_by_identifier", {
    contact_identifier: identifier,
  });
  if (error) throw error;
  return data;
}

export async function getBasicContacts() {
  const { data, error } = await supabase.rpc("get_basic_contacts");
  if (error) throw error;
  return data;
}

export async function getContactsLastMessages() {
  const { data, error } = await supabase.rpc("get_contacts_last_messages");
  if (error) throw error;
  return data;
}
