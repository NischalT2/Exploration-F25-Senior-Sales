import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/server-utils";

export async function POST(request: Request) {
    try {
        // get the form data
        const formData = await request.formData();
        // extract fields from the form data
        const item_name = formData.get("item_name") as string | null;
        const category = formData.get("category") as string | null;
        const brand_name = formData.get("brand_name") as string | null;
        const price = formData.get("price") as string | null;
        const size = formData.get("size") as string | null;
        const condition = formData.get("condition") as string | null;
        const item_description = formData.get("item_description") as string | null;
        const image_url = formData.get("image_url") as string | null;
        const file = formData.get("file") as File | null;

    // required fields
    if (!item_name || !category || !price) {
      return NextResponse.json(
        { error: "item_name, category, and price are required" },
        { status: 400 }
      );
    }

    // validate price is a number
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) {
      return NextResponse.json(
        { error: "Price must be a number" },
        { status: 400 }
      );
    }

    // insert the new listing into supabase
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("upload_listing")
      .insert([
        {
          item_name,
          category,
          brand_name,
          price: numericPrice,
          condition,
          size,
          item_description,
          image_url,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error", error);
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, listing: data });
  } catch (error) {
    console.error("Error in /api/listings", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to create listing" },
      { status: 500 }
    );
  }
}