import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Wifi,
  Plug,
  Laptop,
  Wine,
  Car,
  Users,
  DollarSign,
  Coffee,
  MapPin,
  MessageSquare,
  BarChart2,
} from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CafeDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: shop } = await supabase
    .from("coffee_shops")
    .select("*, shop_photos(photo_url)")
    .eq("id", resolvedParams.id)
    .single();

  const { data: ratings } = await supabase
    .from("ratings")
    .select(
      `
      id,
      review_text,
      drinks_quality,
      created_at,
      profiles:user_id (username, avatar_url)
    `
    )
    .eq("shop_id", resolvedParams.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (!shop) {
    notFound();
  }

  const getVibeColor = (vibe: string | null) => {
    switch (vibe) {
      case "Minimalistic":
        return "bg-gray-100 text-gray-800";
      case "Cool":
        return "bg-blue-100 text-blue-800";
      case "Corporate":
        return "bg-slate-100 text-slate-800";
      case "Cozy":
        return "bg-orange-100 text-orange-800";
      case "Beachy":
        return "bg-cyan-100 text-cyan-800";
      case "Trendy":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getPricingColor = (pricing: string | null) => {
    switch (pricing) {
      case "$":
        return "bg-green-100 text-green-800";
      case "$$":
        return "bg-yellow-100 text-yellow-800";
      case "$$$":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getBusynessColor = (busyness: string | null) => {
    switch (busyness) {
      case "Quiet":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Very":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const mainPhoto = shop.shop_photos?.[0]?.photo_url;
  const communityRatings = {
    vibe: 4.5,
    coffee: 4.8,
    workFriendliness: 3.5,
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50/50">
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <div className="flex-1 flex flex-col gap-10 max-w-6xl p-5 w-full">
          {mainPhoto && (
            <div className="w-full h-64 md:h-80 relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src={mainPhoto}
                alt={`${shop.name} hero image`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-col gap-2 text-center items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl font-bold font-kate">
                {shop.name}
              </h1>
              {shop.is_featured && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  ⭐ Featured
                </Badge>
              )}
            </div>
            {shop.city && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{shop.city}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About This Cafe</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {shop.summary || "No summary available."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" />
                    Popularity Over Time
                  </CardTitle>
                  <CardDescription>
                    This is a placeholder for a chart component.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-48 flex items-center justify-center bg-slate-50 rounded-md">
                  <p className="text-slate-500">
                    Chart would be rendered here.
                  </p>
                </CardContent>
              </Card>

              <div className="w-full">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-6">
                  {ratings && ratings.length > 0 ? (
                    ratings.map((rating: any) => (
                      <Card key={rating.id} className="p-4">
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm">
                              {rating.profiles?.username || "Anonymous"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(rating.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {rating.review_text ||
                              `Rated ${rating.drinks_quality}/5 for drinks.`}
                          </p>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No reviews yet. Be the first to review this cafe!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Community Ratings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-medium">
                  <div className="flex justify-between">
                    <span>Vibe</span>
                    <span>{communityRatings.vibe}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coffee</span>
                    <span>{communityRatings.coffee}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Work-Friendliness</span>
                    <span>{communityRatings.workFriendliness}/5</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Details & Amenities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {shop.vibe && (
                    <div className="flex items-center justify-between">
                      {" "}
                      <span>Vibe</span>{" "}
                      <Badge className={getVibeColor(shop.vibe)}>
                        {shop.vibe}
                      </Badge>{" "}
                    </div>
                  )}
                  {shop.pricing && (
                    <div className="flex items-center justify-between">
                      {" "}
                      <span>Pricing</span>{" "}
                      <Badge className={getPricingColor(shop.pricing)}>
                        {shop.pricing}
                      </Badge>{" "}
                    </div>
                  )}
                  {shop.busyness && (
                    <div className="flex items-center justify-between">
                      {" "}
                      <span>Busyness</span>{" "}
                      <Badge className={getBusynessColor(shop.busyness)}>
                        {shop.busyness}
                      </Badge>{" "}
                    </div>
                  )}
                  {shop.seating && (
                    <div className="flex items-center justify-between">
                      {" "}
                      <span>Seating</span>{" "}
                      <Badge variant="outline">{shop.seating}</Badge>{" "}
                    </div>
                  )}
                  {shop.parking && (
                    <div className="flex items-center justify-between">
                      {" "}
                      <span>Parking</span>{" "}
                      <Badge variant="outline">{shop.parking}</Badge>{" "}
                    </div>
                  )}

                  <div className="border-t my-4"></div>

                  <div className="flex items-center justify-between">
                    {" "}
                    <span className="flex items-center gap-2">
                      <Wifi size={16} /> WiFi
                    </span>{" "}
                    <Badge variant={shop.has_wifi ? "default" : "secondary"}>
                      {shop.has_wifi ? "Yes" : "No"}
                    </Badge>{" "}
                  </div>
                  <div className="flex items-center justify-between">
                    {" "}
                    <span className="flex items-center gap-2">
                      <Plug size={16} /> Outlets
                    </span>{" "}
                    <Badge variant={shop.has_outlets ? "default" : "secondary"}>
                      {shop.has_outlets ? "Yes" : "No"}
                    </Badge>{" "}
                  </div>
                  <div className="flex items-center justify-between">
                    {" "}
                    <span className="flex items-center gap-2">
                      <Laptop size={16} /> Laptop Friendly
                    </span>{" "}
                    <Badge
                      variant={
                        shop.is_laptop_friendly ? "default" : "secondary"
                      }
                    >
                      {shop.is_laptop_friendly ? "Yes" : "No"}
                    </Badge>{" "}
                  </div>
                  <div className="flex items-center justify-between">
                    {" "}
                    <span className="flex items-center gap-2">
                      <Wine size={16} /> Wine Bar
                    </span>{" "}
                    <Badge variant={shop.wine_bar ? "default" : "secondary"}>
                      {shop.wine_bar ? "Yes" : "No"}
                    </Badge>{" "}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
