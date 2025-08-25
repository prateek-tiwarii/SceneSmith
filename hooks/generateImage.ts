import { useState } from "react";

export default function useImageGenerator() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const generateImage = async (prompt: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setImage(data.image);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { image, loading, generateImage };
}
