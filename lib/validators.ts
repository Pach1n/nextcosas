import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine((value) =>
    /^d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value)))
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, "name must be at least 3 chars"),
  slug: z.string().min(3, "slug must be at least 3 chars"),
  category: z.string().min(3, "category must be at least 3 chars"),
  brand: z.string().min(3, "brand must be at least 3 chars"),
  description: z.string().min(3, "description must be at least 3 chars"),
  stock: z.coerce.number(),
  images: z
    .array(z.string())
    .min(1, "Include at least 1 image for the product"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
