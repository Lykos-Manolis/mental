import supabase from "../utils/supabase";

export async function getUserContacts() {
  try {
    const { data, error } = await supabase.rpc("get_user_contacts");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    throw error;
  }
}
