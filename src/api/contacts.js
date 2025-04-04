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
  try {
    const { data, error } = await supabase.rpc("check_and_add_contact", {
      contact_identifier: contact,
    });

    if (error) throw error;

    switch (data) {
      case "USER_NOT_FOUND":
        throw new Error(
          "User not found. Please check the email or phone number.",
        );
      case "CONTACT_ALREADY_EXISTS":
        throw new Error("This contact is already in your contacts list.");
      case "SUCCESS":
        return true;
      default:
        throw new Error("An unexpected error occurred.");
    }
  } catch (error) {
    console.error("Error setting contact:", error.message);
    throw error;
  }
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
