import supabase from "../utils/supabase";

export async function setPublicKey(publicKey) {
  console.log("Setting public key");
  const { data, error } = await supabase.from("keys").insert({
    public_key: publicKey,
  });

  if (error) throw error;

  return data;
}
