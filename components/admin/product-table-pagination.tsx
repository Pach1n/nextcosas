'use client';
import React from 'react'
import { Pagination, PaginationContent, PaginationPrevious, PaginationNext, PaginationItem } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

export default function ProductTablePagination({
    currentPage,
    totalPages,
}:{
    currentPage: number
    totalPages: number
}) {
    
  return (
    <Pagination>
        <PaginationContent>
            <PaginationPrevious 
            className={cn(currentPage === 1 ? "hidden" : "")}
            href={
                currentPage > 1 ? `/admin/?page=${currentPage-1}`: '#'
            }
            />
            <PaginationItem>
                {currentPage} of {totalPages}
            </PaginationItem>
            <PaginationNext 
            className={cn(currentPage === totalPages ? "hidden" : "")}
            href={
                currentPage > totalPages ? `/admin/?page=${currentPage+1}`: '#'
            }
            />
        </PaginationContent>
    </Pagination>
  )
}