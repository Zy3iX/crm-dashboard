import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import { Client } from "../../../models/client";

export async function GET(request: Request) {
  await dbConnect();
  const clients = await Client.find({});
  return Response.json(clients, {
    status: 200,
  });
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = (await request.json()) as Omit<
      ClientType,
      "createdAt" | "_id"
    >;

    if (!body.firstName || !body.phone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newClient = await Client.create(body);
    console.log(
      `Created user: ${newClient.firstName} with ID: ${newClient._id}. `,
      newClient,
    );
    return NextResponse.json(
      { success: true, data: newClient },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 },
    );
  }
}
