"use client";

import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { Wifi, Plug, Laptop, Heart, DollarSign, Users, Armchair, ParkingCircle } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { Database } from "@/lib/supabase/database.types";

type CoffeeShop = Database["public"]["Tables"]["coffee_shops"]["Row"];


type CafeDetailsClientProps = {
  shop: CoffeeShop;
};

export default function CafeDetailsClient({
  shop,
}: CafeDetailsClientProps) {
  const [isAfterHours, setIsAfterHours] = useState(false);

  useEffect(() => {
    if (isAfterHours) {
      document.body.classList.add("after-hours-theme");
    } else {
      document.body.classList.remove("after-hours-theme");
    }
    return () => {
      document.body.classList.remove("after-hours-theme");
    };
  }, [isAfterHours]);

  return (
    <main
      className={clsx(
        "min-h-screen flex flex-col items-center relative overflow-hidden"
      )}
    >
      {isAfterHours && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 disco-ball-container">
            <Image
              src="/discoBall.png"
              alt="Disco Ball"
              width={100}
              height={100}
              className="disco-ball"
            />
          </div>
          {/* Star icons */}
          <div className="star star-1">⭐</div>
          <div className="star star-2">⭐</div>
          <div className="star star-3">⭐</div>
          <div className="star star-4">⭐</div>
          <div className="star star-5">⭐</div>
        </>
      )}
      <div className="flex-1 w-full flex flex-col gap-12 items-center p-8 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 text-center items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl md:text-6xl font-bold font-kate">
              {shop.name}
            </h1>
            {shop.wine_bar && (
              <div
                className="cursor-pointer"
                onClick={() => setIsAfterHours(!isAfterHours)}
              >
                <Image
                  src="/wineGlass.png"
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
                <span className="flex items-center gap-3 font-medium min-w-[150px]">
                  <Heart size={24} /> Vibe
                </span>
                <Badge className="text-lg px-3 py-1">{shop.vibe}</Badge>
              </div>
            )}
            {shop.pricing && (
              <div className="flex items-center gap-x-8">
                <span className="flex items-center gap-3 font-medium min-w-[180px]">
                  <DollarSign size={24} /> Pricing
                </span>
                <Badge className="text-lg px-3 py-1">{shop.pricing}</Badge>
              </div>
            )}
            {shop.busyness && (
              <div className="flex items-center gap-x-8">
                <span className="flex items-center gap-3 font-medium min-w-[150px]">
                  <Users size={24} /> Busyness
                </span>
                <Badge className="text-lg px-3 py-1">{shop.busyness}</Badge>
              </div>
            )}
            {shop.seating && (
              <div className="flex items-center gap-x-8">
                <span className="flex items-center gap-3 font-medium min-w-[180px]">
                  <Armchair size={24} /> Seating
                </span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {shop.seating}
                </Badge>
              </div>
            )}
            {shop.parking && (
              <div className="flex items-center gap-x-8">
                <span className="flex items-center gap-3 font-medium min-w-[150px]">
                  <ParkingCircle size={24} /> Parking
                </span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {shop.parking}
                </Badge>
              </div>
            )}

            <div className="flex items-center gap-x-8">
              <span className="flex items-center gap-3 font-medium min-w-[180px]">
                <Wifi size={24} /> WiFi
              </span>
              <Badge
                variant={shop.has_wifi ? "default" : "secondary"}
                className="text-lg px-3 py-1"
              >
                {shop.has_wifi ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center gap-x-8">
              <span className="flex items-center gap-3 font-medium min-w-[150px]">
                <Plug size={24} /> Outlets
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
                <Laptop size={24} /> Laptop Friendly
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
            src="/cafeExterior.png"
            alt="Cafe exterior"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
