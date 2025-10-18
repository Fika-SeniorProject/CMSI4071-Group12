"use client";

import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "../../theme-context";
import clsx from "clsx";
import { Database } from "@/lib/supabase/database.types";
import { SaveButton } from "@/components/save-button";
import { User } from "@supabase/supabase-js";

type CoffeeShop = Database["public"]["Tables"]["coffee_shops"]["Row"];

type CafeDetailsClientProps = {
  shop: CoffeeShop;
  user: User | null;
  isInitiallySaved: boolean;
};

export default function CafeDetailsClient({
  shop,
  user,
  isInitiallySaved,
}: CafeDetailsClientProps) {
  const { isAfterHours, setIsAfterHours } = useTheme();
  const router = useRouter();

  return (
    <main
      className={clsx(
        "min-h-screen flex flex-col items-center relative overflow-hidden"
      )}
    >
      <div className="flex-1 w-full flex flex-col gap-12 items-center p-8 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 text-center items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl md:text-6xl font-bold font-kate">
              {shop.name}
            </h1>
            {/* {user ? ( */}
            <SaveButton
              shopId={shop.id}
              isInitiallySaved={isInitiallySaved}
              userId={user?.id ?? null}
            />

            {shop.wine_bar && (
              <div
                className="cursor-pointer"
                onClick={() => setIsAfterHours(!isAfterHours)}
              >
                <Image
                  src={isAfterHours ? "/wineGlassDark.png" : "/wineGlass.png"}
                  alt="Wine Glass Icon"
                  width={40}
                  height={40}
                />
              </div>
            )}
          </div>
        </div>

        <Card className="w-full">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 text-lg p-6">
            {shop.vibe && (
              <div className="flex items-center gap-x-8">
                <span className="flex items-center gap-3 font-medium min-w-[180px]">
                  <Image
                    src={isAfterHours ? "/heartDark.png" : "/heart.png"}
                    alt="Vibe"
                    width={60}
                    height={60}
                  />{" "}
                  Vibe
                </span>
                <Badge className="text-lg px-3 py-1">{shop.vibe}</Badge>
              </div>
            )}
            {shop.pricing && (
              <div className="flex items-center gap-x-8">
                <span className="flex items-center gap-3 font-medium min-w-[180px]">
                  <Image
                    src={isAfterHours ? "/moneyDark.png" : "/money.png"}
                    alt="Pricing"
                    width={60}
                    height={60}
                  />{" "}
                  Pricing
                </span>
                <Badge className="text-lg px-3 py-1">{shop.pricing}</Badge>
              </div>
            )}
            {shop.busyness && (
              <div className="flex items-center gap-x-8">
                <span className="flex items-center gap-3 font-medium min-w-[180px]">
                  <Image
                    src={isAfterHours ? "/personDark.png" : "/person.png"}
                    alt="Busyness"
                    width={60}
                    height={60}
                  />{" "}
                  Busyness
                </span>
                <Badge className="text-lg px-3 py-1">{shop.busyness}</Badge>
              </div>
            )}
            {shop.seating && (
              <div className="flex items-center gap-x-8">
                <span className="flex items-center gap-3 font-medium min-w-[180px]">
                  <Image
                    src={isAfterHours ? "/chairDark.png" : "/chair.png"}
                    alt="Seating"
                    width={60}
                    height={60}
                  />{" "}
                  Seating
                </span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {shop.seating}
                </Badge>
              </div>
            )}
            {shop.parking && (
              <div className="flex items-center gap-x-8">
                <span className="flex items-center gap-3 font-medium min-w-[180px]">
                  <Image
                    src={isAfterHours ? "/carDark.png" : "/car.png"}
                    alt="Parking"
                    width={60}
                    height={60}
                  />{" "}
                  Parking
                </span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {shop.parking}
                </Badge>
              </div>
            )}

            <div className="flex items-center gap-x-8">
              <span className="flex items-center gap-3 font-medium min-w-[180px]">
                <Image
                  src={isAfterHours ? "/wifiDark.png" : "/wifi.png"}
                  alt="WiFi"
                  width={60}
                  height={60}
                />{" "}
                WiFi
              </span>
              <Badge
                variant={shop.has_wifi ? "default" : "secondary"}
                className="text-lg px-3 py-1"
              >
                {shop.has_wifi ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center gap-x-8">
              <span className="flex items-center gap-3 font-medium min-w-[180px]">
                <Image
                  src={isAfterHours ? "/outletDark.png" : "/outlet.png"}
                  alt="Outlets"
                  width={60}
                  height={60}
                />{" "}
                Outlets
              </span>
              <Badge
                variant={shop.has_outlets ? "default" : "secondary"}
                className="text-lg px-3 py-1"
              >
                {shop.has_outlets ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center gap-x-8">
              <span className="flex items-center gap-3 font-medium min-w-[180px]">
                <Image
                  src={isAfterHours ? "/laptopDark.png" : "/laptop.png"}
                  alt="Laptop Friendly"
                  width={60}
                  height={60}
                />{" "}
                Laptop Friendly
              </span>
              <Badge
                variant={shop.is_laptop_friendly ? "default" : "secondary"}
                className="text-lg px-3 py-1"
              >
                {shop.is_laptop_friendly ? "Yes" : "No"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="w-full relative h-64 md:h-80 mt-8">
          <Image
            src={isAfterHours ? "/wineBarExterior.png" : "/cafeExterior.png"}
            alt="Cafe exterior"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <Footer isAfterHours={isAfterHours} />
    </main>
  );
}
