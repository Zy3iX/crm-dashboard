import dbConnect from "@/lib/db";
import { Client } from "@/models/client";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { mongo } from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> },
) {
  try {
    await dbConnect();
    const id = (await params).clientId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          status: 400,
          error: "Bad Request",
          message: `Passed ID of '${id}' has a wrong format.`,
        },
        { status: 400 },
      );
    }

    const client = await Client.findById(id);

    if (!client) {
      return NextResponse.json(
        {
          status: 404,
          error: " Not Found",
          message: "Client does not exists",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(client);
  } catch (e) {
    console.log("API error: ", e);
    return NextResponse.json(
      {
        status: 500,
        error: "Internal server error",
        message: "[GET]: Something went wrong.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> },
) {
  try {
    await dbConnect();
    const id = (await params).clientId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          status: 400,
          error: "Bad Request",
          message: `Passed ID of '${id}' has a wrong format.`,
        },
        { status: 400 },
      );
    }

    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return NextResponse.json(
        {
          status: 404,
          error: "Not Found",
          message: `Client with ID of ${id} is not found.`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Successfully deleted Client",
        data: client,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log("API Error: ", e);
    return NextResponse.json(
      {
        status: 500,
        error: "Internal server error.",
        message: "[DELETE]: Something went wrong.",
      },
      { status: 500 },
    );
  }
}
