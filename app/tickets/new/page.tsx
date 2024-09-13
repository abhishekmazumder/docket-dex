import React from "react";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

const NewTicket = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return (
      <div className="text-destructive text-center">
        Unauthorized! You have to login first to create ticket!
      </div>
    );
  }
  return (
    <div>
      <TicketForm />
    </div>
  );
};

export default NewTicket;
