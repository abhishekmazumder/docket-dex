import UserForm from "@/components/UserForm";
import React from "react";
import DataTableSimple from "./data-table-simple";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import { useRouter } from "next/navigation";

const Users = async () => {
  //Only Admin can access this page, otherwise show access denied message
  // const session = await getServerSession(options);
  // if (session?.user.role !== "ADMIN") {
  //   return <div className="text-destructive">Access denied. Admin Only!</div>;
  // }

  //All users can access this page and create new user, but only admin can edit or delete user
  const users = await prisma.user.findMany();
  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  );
};

export default Users;
