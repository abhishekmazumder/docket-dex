import React from "react";
import dynamic from "next/dynamic";
import prisma from "@/prisma/db";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

interface Props {
  params: { id: string };
}

const EditTicket = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found!</p>;
  }

  return (
    <div>
      <TicketForm ticket={ticket} />
    </div>
  );
};

export default EditTicket;
