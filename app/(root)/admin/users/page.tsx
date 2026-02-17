import React from 'react';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUsersTable } from "@/lib/actions/user.actions";
import UserTable from "@/components/admin/user-table";

export default async function UserPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session || session.user.role !== "admin") {
    return <div>NO AUTORIZADO</div>;
  }

  const { page = 1, pageSize = 10 } = await searchParams;
  const { data, pageInfo } = await getUsersTable({
    page: Number(page),
    pageSize: Number(pageSize),
  });

  return (
    <section id="users" className="container mx-auto">
      <div className="px-8 py-16 container mx-auto max-w-screen space-y-8">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">User Management</h1>
        </div>
        <UserTable
          users={data}
          currentPage={pageInfo.currentPage}
          totalPages={pageInfo.totalPages}
          pageSize={Number(pageSize)}
        />
      </div>
    </section>
  );
}
