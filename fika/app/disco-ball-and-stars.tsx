"use client";

import Image from "next/image";
import { useTheme } from "./theme-context";

export default function DiscoBallAndStars() {
  const { isAfterHours } = useTheme();

  if (!isAfterHours) {
    return null;
  }

  return (
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
      <div className="star star-1">
        <Image src="/stars.png" alt="star" width={100} height={100} />
      </div>
      <div className="star star-2">
        <Image src="/stars.png" alt="star" width={100} height={100} />
      </div>
      <div className="star star-3">
        <Image src="/stars.png" alt="star" width={100} height={100} />
      </div>
      <div className="star star-4">
        <Image src="/stars.png" alt="star" width={100} height={100} />
      </div>
      <div className="star star-5">
        <Image src="/stars.png" alt="star" width={100} height={100} />
      </div>
    </>
  );
}
