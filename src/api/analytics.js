import supabase from "../utils/supabase";

export async function getConversationEmotionAnalytics(conversationId) {
  try {
    const { data, error } = await supabase.rpc(
      "get_conversation_emotion_analytics",
      {
        conversation_id_param: conversationId,
      },
    );

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(
      "Error fetching conversation emotion analytics:",
      error.message,
    );
    throw error;
  }
}
