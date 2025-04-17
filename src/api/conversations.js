import supabase from "../utils/supabase";
import { getEncryptedMasterKeys } from "../utils/indexedDB";

export async function getConversationInfo(chatId) {
  const { data, error } = await supabase.rpc("get_conversation_partner", {
    conversation_id: chatId,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function updateConversationReadStatus(conversationId) {
  console.log("Updating conversation read status");
  const {
    data: {
      user: { id: currentUserId },
    },
  } = await supabase.auth.getUser();

  const { data: conversation, error: fetchError } = await supabase
    .from("conversations")
    .select("user_1, user_2")
    .eq("id", conversationId)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const { user_1, user_2 } = conversation;

  const { error } = await supabase
    .from("conversations")
    .update({
      user_1_read: user_1 === currentUserId,
      user_2_read: user_2 === currentUserId,
    })
    .eq("id", conversationId);

  if (error) {
    throw error;
  }

  return true;
}

export async function updateConversationMasterKeys(
  conversationId,
  userMasterKey,
  contactMasterKey,
) {
  try {
    // Get the conversation to ensure it exists
    const { data: conversation, error: fetchError } = await supabase
      .from("conversations")
      .select("id, user_1, user_2")
      .eq("id", conversationId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const {
      data: {
        user: { id: currentUserId },
      },
    } = await supabase.auth.getUser();

    // Update the master keys
    const { error } = await supabase
      .from("conversations")
      .update({
        user_1_master_key:
          currentUserId === conversation.user_1
            ? userMasterKey
            : contactMasterKey,
        user_2_master_key:
          currentUserId === conversation.user_2
            ? userMasterKey
            : contactMasterKey,
      })
      .eq("id", conversationId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error updating conversation master keys:", error.message);
    throw error;
  }
}

export async function updateMasterKeyForContact(contact, userId) {
  try {
    if (!contact.contact_id) {
      console.error("Could not determine contact ID");
      return false;
    }

    // Get encrypted master keys from indexedDB utility
    const keys = await getEncryptedMasterKeys(
      contact.contact_id,
      userId,
      contact.conversation_id,
    );

    if (!keys) {
      console.error("Failed to generate encrypted master keys");
      return false;
    }

    // Update the master keys in the database
    await updateConversationMasterKeys(
      contact.conversation_id,
      keys.encryptedUserMasterKey,
      keys.encryptedContactMasterKey,
    );

    console.log("Master key successfully updated in database");
    return true;
  } catch (error) {
    console.error("Error in updateMasterKeyForContact:", error);
    return false;
  }
}
