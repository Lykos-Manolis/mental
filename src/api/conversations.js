import supabase from "../utils/supabase";
import { useGetUserId } from "../hooks/useGetUserId";

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

export async function updateConversationReadStatus(conversationId) {
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

  console.log(
    user_1,
    user_2,
    currentUserId,
    user_1 === currentUserId,
    user_2 === currentUserId,
  );

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
