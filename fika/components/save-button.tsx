
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type SaveButtonProps = {
  shopId: number;
  isInitiallySaved: boolean;
  userId: string;
};

export function SaveButton({ shopId, isInitiallySaved, userId }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(isInitiallySaved);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleClick = async () => {
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

    setIsLoading(false);
  };

  return (
    <Button
      variant={isSaved ? "secondary" : "default"}
      onClick={handleClick}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <Bookmark className="h-5 w-5" />
      {isSaved ? "Saved" : "Save"}
    </Button>
  );
}
