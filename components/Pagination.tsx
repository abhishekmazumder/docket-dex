"use client"

import React from "react";
import { Button } from "./ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pagesCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pagesCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="mt-10 mb-6 flex flex-col items-end">
      <div>
        <Button variant="outline" disabled={currentPage === 1} onClick={() => changePage(1)}>
          <ChevronFirst />
        </Button>
        <Button variant="outline" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
          <ChevronLeft />
        </Button>
        <Button variant="outline" disabled={currentPage === pagesCount} onClick={() => changePage(currentPage + 1)}>
          <ChevronRight />
        </Button>
        <Button variant="outline" disabled={currentPage === pagesCount} onClick={() => changePage(pagesCount)}>
          <ChevronLast />
        </Button>
      </div>
      <div className="mt-4">
        <p>
          Page {currentPage} of {pagesCount}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
