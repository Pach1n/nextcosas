import { z } from "zod";
import { Prisma } from "@/lib/generated/prisma/client";
import { insertProductSchema } from "@/lib/validators";

// export type Product = {
//     id?: string;
//     name: string;
//     slug: string;
//     category: string;
//     description: string;
//     images: string[];
//     price: number;
//     brand: string;
//     rating: number;
//     numReviews: number;
//     stock: number;
//     isFeatured: boolean;
//     banner: string | null;
// };

export type Product = z.infer<typeof insertProductSchema> & {
    id?: string;
    rating: string;
    numReviews: number;
    createdAt?: Date;
};