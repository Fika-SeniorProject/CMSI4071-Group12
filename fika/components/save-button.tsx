"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type SaveButtonProps = {
  shopId: number;
  isInitiallySaved: boolean;
  userId: string | null;
  onUnsave?: (shopId: number) => void;
  size?: "icon-sm" | "icon-lg";
};

import { useTheme } from "@/app/theme-context";

export function SaveButton({
  shopId,
  isInitiallySaved,
  userId,
  onUnsave,
  size = "icon-sm",
}: SaveButtonProps) {
  const { isAfterHours } = useTheme();
  const [isSaved, setIsSaved] = useState(isInitiallySaved);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleClick = async () => {
    if (!userId) {
      window.location.href = "/auth/login";
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isSaved) {
        const { error } = await supabase
          .from("ratings")
          .delete()
          .eq("user_id", userId)
          .eq("shop_id", shopId)
          .is("drinks_quality", null);

        if (error) throw error;
        setIsSaved(false);
        if (onUnsave) {
          onUnsave(shopId);
        } else {
          router.refresh();
        }
      } else {
        const { data: existing, error: fetchError } = await supabase
          .from("ratings")
          .select("id")
          .eq("user_id", userId)
          .eq("shop_id", shopId)
          .is("drinks_quality", null)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!existing) {
          const { error: insertError } = await supabase
            .from("ratings")
            .insert([
              { user_id: userId, shop_id: shopId, drinks_quality: null },
            ]);

          if (insertError) throw insertError;
        }
        setIsSaved(true);
        //router.refresh();
      }
    } catch (error) {
      console.error("Error saving cafe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const iconSize = size === "icon-lg" ? "h-8 w-8" : "h-5 w-5";

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Bookmark
        className={iconSize}
        fill={isSaved ? (isAfterHours ? "white" : "black") : "none"}
        data-testid="bookmark-icon"
      />
    </Button>
  );
}
