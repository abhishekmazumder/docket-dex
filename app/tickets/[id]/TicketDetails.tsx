import { Ticket, User } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import DeleteButton from "./DeleteButton";
import AssignTicket from "@/components/AssignTicket";

interface Props {
  ticket: Ticket;
  users: User[]
}

const TicketDetails = ({ ticket, users }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-3 lg:col-span-3 lg:mr-3">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created: {ticket.createdAt.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ReactMarkdown>{ticket.description}</ReactMarkdown>
        </CardContent>
        <CardFooter>
          <p>Updated: {ticket.updatedAt.toLocaleDateString()}</p>
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col gap-2">
        <AssignTicket ticket={ticket} users={users} />
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({ variant: "default" })}`}
        >
          Edit Ticket
        </Link>
        <DeleteButton ticketId={ticket.id} />
      </div>
    </div>
  );
};

export default TicketDetails;
