import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "@/components/auth/sign-out-button";
import ProductTable from "@/components/admin/product-table";
import { getProductsTable } from "@/lib/actions/product.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function AdminPage({
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
  const { page = 1, pageSize = 2 } = await searchParams;
  const { data, pageInfo } = await getProductsTable({
    page: Number(page),
    pageSize: Number(pageSize),
  });

  return (
    <section id="admin" className="container mx-auto">
      <div className="px-8 py-16 container mx-auto max-w-screen space-y-8">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">AdminPage</h1>
          <Button asChild>
            <Link href={"/admin/create-product"}>+ Create Product</Link>
          </Button>
        </div>
        <ProductTable
          products={data}
          currentPage={pageInfo.currentPage}
          totalPages={pageInfo.totalPages}
        />
        <SignOutButton />
      </div>
    </section>
  );
}
