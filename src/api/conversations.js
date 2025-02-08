import supabase from "../utils/supabase";

export async function getUserConversations() {
  try {
    const {
      data: {
        user: { id: userId },
      },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("conversations")
      .select(
        `
        *,
        last_message:messages (
          content,
          created_at,
          sender_id
        )
      `,
      )
      .or(`user_1.eq.${userId},user_2.eq.${userId}`)
      .order("created_at", { foreignTable: "messages", ascending: false })
      .limit(1, { foreignTable: "messages" });

    if (error) {
      throw error;
    }

    return data.map((conversation) => ({
      ...conversation,
      last_message: conversation.last_message?.[0] || null,
    }));
  } catch (error) {
    console.error("Error fetching conversations:", error.message);
    throw error;
  }
}

export async function getConversationInfo(chatId) {
  const { data, error } = await supabase.rpc("get_conversation_partner", {
    conversation_id: chatId,
  });

  if (error) {
    throw error;
  }

  return data;
}
