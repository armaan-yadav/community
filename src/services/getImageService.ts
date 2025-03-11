import { storageServices } from "@/services/storageServices";
import { customToast } from "@/lib/utils";

export const getImage = async (prompt: string): Promise<string | null> => {
  const API_KEY = import.meta.env.VITE_STABILITY_AI_API1;
  const API_URL = import.meta.env.VITE_STABILITY_AI_URL;

  if (!prompt) {
    customToast("Please enter the event title");
    return null;
  }

  const payload = {
    prompt: `Generate a  thumbnail image for the event: ${prompt}`,
    output_format: "webp",
  };

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "image/*",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}: ${await response.text()}`);
    }

    const blob = await response.blob();
    const file = new File([blob], `${prompt}-${Date.now()}.webp`, {
      type: "image/webp",
    });

    const uploadedImageUrl = await storageServices.uploadFile(file);
    return uploadedImageUrl;
  } catch (error: any) {
    console.error("Error:", error.message);
    customToast("Failed to generate image. Please try again.");
    return null;
  }
};
