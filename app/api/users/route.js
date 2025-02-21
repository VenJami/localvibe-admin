import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";
import { User } from "@/app/lib/models";

export async function GET() {
  try {
    await connectToDB();
    const users = await User.find().sort({ createdAt: -1 }).limit(4); // Get latest 4 users
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}