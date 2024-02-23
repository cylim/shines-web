import { TakoAPI } from "@/utils/apis/tako";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await TakoAPI.registerBid(body)
    console.log(res)

    return NextResponse.json(res)
  } catch(err: any) {
    return NextResponse.json({status: 400, success: false, message: err.message })
  }
}