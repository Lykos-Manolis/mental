import supabase from "../utils/supabase";
import { updateConversationReadStatus } from "./conversations";

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
  try {
    // Get the current user
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw userError;
    }

    if (!userData || !userData.user) {
      throw new Error("User not authenticated");
    }

    // Insert the message
    const { error } = await supabase.from("messages").insert({
      content: message,
      emotion: emotion,
      conversation_id: conversationId,
      sender_id: userData.user.id,
    });

    if (error) {
      throw error;
    }

    // Update conversation read status
    await updateConversationReadStatus(conversationId);

    return true;
  } catch (error) {
    console.error("Error sending message:", error.message);
    throw error;
  }
}
