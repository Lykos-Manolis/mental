import supabase from "../utils/supabase";

export async function getConversationMessages(conversationId) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("id", conversationId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    throw error;
  }
}
