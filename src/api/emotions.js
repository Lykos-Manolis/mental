import supabase from "../utils/supabase";

export async function getEmotionPrediction(text) {
  if (!text) return;

  try {
    const { data, error } = await supabase.functions.invoke("predict-emotion", {
      body: { text: text },
    });

    if (error) throw error;

    return { data, error };
  } catch (error) {
    console.error("Error fetching emotion prediction:", error.message);
    throw error;
  }
}
