import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Client } from "@/models/client";

export async function GET() {
  try {
    await dbConnect();

    const pastYearDate = new Date();
    pastYearDate.setFullYear(pastYearDate.getFullYear() - 1);

    const [
      totalClients,
      listedClientsByYear,
      qualifiedLeads,
      customers,
      statusRows,
      recentRows,
    ] = await Promise.all([
      Client.countDocuments(),
      Client.aggregate([
        {
          $match: { createdAt: { $gte: pastYearDate } },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m",
                date: "$createdAt",
              },
            },
            clientCount: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),
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

    const buildFullMonthsList = (listedClientsByYear: listedClientsByYear) => {
      const clientsPerMonthsList = Array.from({ length: 12 }, (month, i) => {
        const d = new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth() - 11 + i,
            1,
          ),
        );
        return {
          key: `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`,
          year: d.getUTCFullYear(),
          monthName: d.toLocaleString("en-US", {
            month: "long",
          }),
          clientCount: 0,
        };
      });

      listedClientsByYear.forEach((listedMonth) => {
        const month = clientsPerMonthsList.find((m) => {
          return m.key === listedMonth._id;
        });
        if (month) month.clientCount = listedMonth.clientCount;
      });

      return clientsPerMonthsList;
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
      buildedFullMonthsList: buildFullMonthsList(listedClientsByYear),
      qualifiedLeads,
      customers,
      statusCounts,
      recentClients,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Unable to load dashboard summary.", e },
      { status: 500 },
    );
  }
}
