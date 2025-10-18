"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type SaveButtonProps = {
  shopId: number;
  isInitiallySaved: boolean;
  userId: string | null;
};

export function SaveButton({
  shopId,
  isInitiallySaved,
  userId,
}: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(isInitiallySaved);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const [pop, setPop] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      window.location.href = "/auth/login";
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    if (isSaved) {
      const { error } = await supabase
        .from("ratings")
        .delete()
        .eq("user_id", userId)
        .eq("shop_id", shopId)
        .is("drinks_quality", null);

      if (error) {
        console.error("Error unsaving cafe:", error);
      } else {
        setIsSaved(false);
      }
    } else {
      const { error } = await supabase
        .from("ratings")
        .insert([{ user_id: userId, shop_id: shopId, drinks_quality: null }]);

      if (error) {
        console.error("Error saving cafe:", error);
      } else {
        setIsSaved(true);
      }
    }

    setPop(true);
    setTimeout(() => setPop(false), 100);

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isSaved ? "Unsave cafe" : "Save cafe"}
      className="appearance-none bg-transparent border-none outline-none p-0 m-0 cursor-pointer"
      style={{
        background: "none",
        border: "none",
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Bookmark
        size={32}
        strokeWidth={2}
        color="black"
        fill={userId && isSaved ? "black" : "transparent"}
        style={{
          transform: pop ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.10s ease-in-out",
          transformOrigin: "center",
        }}
      />
    </button>
  );
}
