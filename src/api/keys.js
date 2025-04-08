import supabase from "../utils/supabase";

export async function setPublicKey(publicKey) {
  console.log("Setting public key");
  const { data, error } = await supabase.from("keys").insert({
    public_key: publicKey,
  });

  if (error) throw error;

  return data;
}

export async function getUserPublicKeyFromDatabase(userId) {
  try {
    console.log("Getting user public key from database");
    const { data, error } = await supabase
      .from("keys")
      .select("public_key")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No record found
        return null;
      }
      throw error;
    }

    return data?.public_key;
  } catch (error) {
    console.error("Error fetching user public key:", error.message);
    return null;
  }
}

export async function updatePublicKey(publicKey) {
  console.log("Updating public key in database");
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!userData || !userData.user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("keys")
    .update({ public_key: publicKey })
    .eq("user_id", userData.user.id);

  if (error) throw error;

  return data;
}
