import { NextResponse } from "next/server";
import { fetchTotalUsers } from "@/app/lib/data";

export async function GET() {
    try {
        const totalAccounts = await fetchTotalUsers();
        return NextResponse.json({ totalAccounts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching total accounts:", error);
        return NextResponse.json({ message: "Failed to fetch total accounts" }, { status: 500 });
    }
}