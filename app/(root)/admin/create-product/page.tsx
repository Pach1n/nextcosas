import React from "react";
import { Metadata } from "next";
import ProductForm from "@/components/admin/product-form";

export const metadata: Metadata = {
  title: "Create Product",
};

export default function CreateProductPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Create Product</h2>
      <div className="my-8">
        <ProductForm />
      </div>
    </div>
  );
}
