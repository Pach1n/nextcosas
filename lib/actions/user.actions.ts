"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";

export async function getUsersTable(
    { page = 1, pageSize = 10 }: {
        page?: number;
        pageSize?: number;
    }
) {
    const skip = (page - 1) * pageSize;

    const [data, totalCount] = await Promise.all([
        prisma.user.findMany({
            skip,
            take: pageSize,
            orderBy: { createdAt: "desc" },
        }),
        prisma.user.count(),
    ]);
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
        data: convertToPlainObject(data),
        pageInfo: { totalCount, totalPages, currentPage: page },
    };
}
