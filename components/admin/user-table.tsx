import React from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  phone: string | null;
  createdAt: Date;
};

export default function UserTable({
  users,
  totalPages = 1,
  currentPage = 1,
  pageSize = 10,
}: {
  users: User[];
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
}) {
  return (
    <>
      <Table>
        <TableCaption>List of Users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role || 'user'}</TableCell>
              <TableCell>{user.phone || '-'}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  {/* Edit */}
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/admin/users/${user.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>

                  {/* Delete */}
                  <Button variant="destructive" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6 font-bold">
        {/* Prev */}
        {currentPage > 1 ? (
          <Link
            href={`?page=${currentPage - 1}&pageSize=${pageSize}`}
            className="hover:underline"
          >
            &lt; Prev
          </Link>
        ) : (
          <span className="text-gray-400">&lt; Prev</span>
        )}

        {/* Page Info */}
        <span>
          page {currentPage} of {totalPages}
        </span>

        {/* Next */}
        {currentPage < totalPages ? (
          <Link
            href={`?page=${currentPage + 1}&pageSize=${pageSize}`}
            className="hover:underline"
          >
            Next &gt;
          </Link>
        ) : (
          <span className="text-gray-400">Next &gt;</span>
        )}
      </div>
    </>
  );
}
