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
