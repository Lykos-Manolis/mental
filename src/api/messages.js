import supabase from "../utils/supabase";

export async function getConversationMessages(conversationId) {
  try {
    const { data, error } = await supabase.rpc("get_conversation_messages", {
      conversation_id_param: conversationId,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    throw error;
  }
}

export async function setMessage(message, emotion, conversationId) {
  const { error } = await supabase.from("messages").insert({
    content: message,
    emotion: emotion,
    conversation_id: conversationId,
    sender_id: supabase.auth.getUser().id,
  });

  if (error) {
    throw error;
  }

  return true;
}
