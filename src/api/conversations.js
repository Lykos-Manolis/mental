import supabase from "../utils/supabase";

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

    // Update the master keys
    const { error } = await supabase
      .from("conversations")
      .update({
        user_1_master_key: userMasterKey,
        user_2_master_key: contactMasterKey,
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
