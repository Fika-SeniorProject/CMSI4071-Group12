"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Plus, Check } from "lucide-react";
import { toggleVisit } from "@/app/actions";

import { User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";

type LogVisitButtonProps = {
  shopId: number;
  isInitiallyVisited: boolean;
  size?: "icon-sm" | "icon-lg";
  user: User | null;
};

export function LogVisitButton({
  shopId,
  isInitiallyVisited,
  size = "icon-sm",
  user,
}: LogVisitButtonProps) {
  const [isVisited, setIsVisited] = useState(isInitiallyVisited);
  const [isLogging, setIsLogging] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsVisited(isInitiallyVisited);
  }, [isInitiallyVisited]);

  const handleClick = async () => {
    if (!user) {
      router.push(`/auth/login?redirect=${pathname}`);
      return;
    }

    setIsLogging(true);
    try {
      await toggleVisit(shopId, isVisited);
      setIsVisited(!isVisited);
    } catch (error) {
      console.error(error);
    }
    setIsLogging(false);
  };

  const iconSize = size === "icon-lg" ? "h-8 w-8" : "h-4 w-4";

  return (
    <Button
      variant="outline"
      size={size}
      className="rounded-full"
      onClick={handleClick}
      disabled={isLogging}
    >
      {isVisited ? (
        <Check className={iconSize} data-testid="check-icon" />
      ) : (
        <Plus className={iconSize} data-testid="plus-icon" />
      )}
    </Button>
  );
}
