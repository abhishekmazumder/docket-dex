import React from "react";
import prisma from "@/prisma/db";
import TicketDetails from "./TicketDetails";

interface Props {
  params: { id: string };
}

const ViewTicket = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) {
    return <p className="text-destructive">No Ticket Found!</p>;
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  const users = await prisma.user.findMany();

  if (!ticket) {
    return <p className="text-destructive">No Ticket Found!</p>;
  }
  return (
    <div>
      <TicketDetails ticket={ticket} users={users} />
    </div>
  );
};

export default ViewTicket;
