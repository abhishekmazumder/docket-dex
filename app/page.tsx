import React from "react";
import prisma from "@/prisma/db";
import DashRecentTickets from "@/components/DashRecentTickets";
import DashChart from "@/components/DashChart";

const Dashboard = async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: "CLOSED" }],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTickets = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const data = groupTickets.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });


  return (
    <div>
      <div className="grid gap-4 grid-cols-1 px-2 md:grid-cols-2 mt-4 md:mt-12">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
