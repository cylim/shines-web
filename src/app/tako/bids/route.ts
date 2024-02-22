import { allBids, generateBidAbiData, generateTrx } from "@/utils/tako";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const bids =  await allBids()
    return NextResponse.json(bids)
  } catch(err: any) {
    return NextResponse.json({status: 400, success: false, message: err.message })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const abiData = await generateBidAbiData(body.data)
    // const trx = await generateTrx(body.data)
    console.log(abiData)

    return NextResponse.json({abiData})
  } catch(err: any) {
    return NextResponse.json({status: 400, success: false, message: err.message })
  }
}