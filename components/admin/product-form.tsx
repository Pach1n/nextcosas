"use client";
import React, { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  actionPrueba,
  createActionProduct,
  ProductFormState,
} from "@/lib/actions/product.actions";

import { cn } from "@/lib/utils";

export default function ProductForm() {
  const router = useRouter();
  const initState: ProductFormState = {
    success: false,
    message: "",
    errors: {},
    data: undefined,
  };
  const [state, formAction, isPending] = useActionState(
    createActionProduct,
    initState,
  );

  return (
    <Card>
      <CardHeader className="border-b border-foreground/20">
        <CardTitle className="flex items-center justify-between">
          Create Form
          <Button type="button" onClick={() => router.back()}>
            <ArrowLeft /> Go Back
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              className="col-span-2"
              defaultValue={(state.data?.name as string) || ""}
            />
            {state.errors?.name && (
              <p className="text-destructive">{state.errors.name.join(", ")}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>Slug</Label>
            <Input
              type="text"
              name="slug"
              className="col-span-2"
              defaultValue={(state.data?.slug as string) || ""}
            />
            {state.errors?.slug && (
              <p className="text-destructive">{state.errors.slug.join(", ")}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>Brand</Label>
            <Input
              type="text"
              name="brand"
              className="col-span-2"
              defaultValue={(state.data?.brand as string) || ""}
            />
            {state.errors?.brand && (
              <p className="text-destructive">
                {state.errors.brand.join(", ")}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>Banner</Label>
            <Input
              type="text"
              name="banner"
              className="col-span-2"
              defaultValue={(state.data?.banner as string) || ""}
            />
            {state.errors?.banner && (
              <p className="text-destructive">
                {state.errors.banner.join(", ")}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>Category</Label>
            <Textarea
              name="category"
              className="col-span-2"
              defaultValue={(state.data?.category as string) || ""}
            />
            {state.errors?.category && (
              <p className="text-destructive">
                {state.errors.category.join(", ")}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>Descripción</Label>
            <Textarea
              name="description"
              className="col-span-2"
              defaultValue={(state.data?.description as string) || ""}
            />
            {state.errors?.description && (
              <p className="text-destructive">
                {state.errors.description.join(", ")}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>Stock</Label>
            <Input
              type="text"
              name="stock"
              className="col-span-2"
              defaultValue={(state.data?.stock as number) || ""}
            />
            {state.errors?.stock && (
              <p className="text-destructive">
                {state.errors.stock.join(", ")}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>NumReviews</Label>
            <Input
              type="number"
              name="numReviews"
              className="col-span-2"
              defaultValue={(state.data?.numReviews as number) || ""}
            />
            {state.errors?.numReviews && (
              <p className="text-destructive">
                {state.errors.numReviews.join(", ")}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              className="col-span-2"
              defaultValue={state.data?.price || ""}
              step={0.01}
            />
            {state.errors?.price && (
              <p className="text-destructive">
                {state.errors.price.join(", ")}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Label>isFeatured</Label>
            <Checkbox
              name="isFeatured"
              className="col-span-2"
              defaultChecked={(state.data?.isFeatured as boolean) || false}
            />
            {state.errors?.isFeatured && (
              <p className="text-destructive">
                {state.errors.isFeatured.join(", ")}
              </p>
            )}
          </div>
          <Button type="submit" className={cn("w-full text-2xl")}>
            {" "}
            Create
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
