import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Client } from "@/models/client";

export async function GET() {
  try {
    await dbConnect();

    const pastYear = new Date();
    pastYear.setFullYear(pastYear.getFullYear() - 1);

    const [
      totalClients,
      newThisYear,
      qualifiedLeads,
      customers,
      statusRows,
      recentRows,
    ] = await Promise.all([
      Client.countDocuments(),
      Client.find({ createdAt: { $gte: pastYear } }),
      Client.countDocuments({
        status: { $in: ["New", "Contacted", "Qualified"] },
      }),
      Client.countDocuments({ status: "Customer" }),
      Client.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Client.find()
        .sort({ createdAt: -1 })
        .limit(6)
        .select("firstName lastName phone status createdAt")
        .lean(),
    ]);

    const buildedClientsByMonth = (newThisYear: ClientType[]) => {
      const monthsList = Array.from({ length: 12 }, (_, i) => {
        const d = new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth() - 11 + i,
            1,
          ),
        );
        return {
          key: `${d.getUTCFullYear()}-${d.getUTCMonth()}`,
          year: d.getUTCFullYear(),
          month: d.toLocaleString("en-US", {
            month: "long",
            timeZone: "UTC",
          }),
          clientCount: 0,
        };
      });

      const byKey = new Map(monthsList.map((month) => [month.key, month]));

      newThisYear.forEach((client: ClientType) => {
        const d = new Date(client.createdAt);
        const clientKey = byKey.get(`${d.getUTCFullYear()}-${d.getUTCMonth()}`);

        if (clientKey) {
          clientKey.clientCount++;
        }
      });

      return monthsList;
    };

    const statusCounts = Object.fromEntries(
      statusRows.map(({ _id, count }) => [_id, count]),
    );
    const recentClients = recentRows.map((client) => ({
      ...client,
      _id: client._id.toString(),
    }));

    return NextResponse.json({
      totalClients,
      newThisYear,
      qualifiedLeads,
      customers,
      statusCounts,
      recentClients,
      buildedClientsByMonth: buildedClientsByMonth(newThisYear),
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to load dashboard summary." },
      { status: 500 },
    );
  }
}
