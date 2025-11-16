"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  usePageContents,
  useDeletePageContent,
} from "@/hooks/api/use-page-content";
import type { PageContent } from "@/types/api";
import { toast } from "sonner";

const PageContentsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = usePageContents({
    page,
    limit: 10,
    search,
  });
  const deleteContent = useDeletePageContent();

  const handleDelete = async (id: string) => {
    if (confirm("آیا از حذف این محتوا اطمینان دارید؟")) {
      try {
        await deleteContent.mutateAsync(id);
        toast.success("محتوا با موفقیت حذف شد");
      } catch (error) {
        toast.error("خطا در حذف محتوا");
      }
    }
  };

  const getTypeBadge = (type: string) => {
    const badges: Record<string, { label: string; class: string }> = {
      LANDING: { label: "صفحه اصلی", class: "bg-primary bg-opacity-10 text-primary" },
      ABOUT: { label: "درباره ما", class: "bg-purple bg-opacity-10 text-purple" },
      FEATURES: { label: "ویژگی‌ها", class: "bg-blue bg-opacity-10 text-blue" },
      FAQ: { label: "سوالات متداول", class: "bg-warning bg-opacity-10 text-warning" },
      TESTIMONIAL: { label: "نظرات", class: "bg-green bg-opacity-10 text-green" },
      HERO: { label: "هیرو", class: "bg-red bg-opacity-10 text-red" },
      STATS: { label: "آمار", class: "bg-orange bg-opacity-10 text-orange" },
    };
    const badge = badges[type] || { label: type, class: "bg-gray bg-opacity-10 text-gray" };
    return (
      <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${badge.class}`}>
        {badge.label}
      </span>
    );
  };

  const getLanguageBadge = (language: string) => {
    const badges: Record<string, { label: string; class: string }> = {
      FA: { label: "فارسی", class: "bg-primary bg-opacity-10 text-primary" },
      EN: { label: "English", class: "bg-purple bg-opacity-10 text-purple" },
    };
    const badge = badges[language] || { label: language, class: "bg-gray bg-opacity-10 text-gray" };
    return (
      <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${badge.class}`}>
        {badge.label}
      </span>
    );
  };

  if (error) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-4">
        <p className="text-danger">خطا در بارگذاری محتواها</p>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-4 py-4 dark:border-dark-3 sm:px-7.5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-dark dark:text-white">
            لیست محتوای صفحات
          </h3>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="جستجو..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-60 rounded border border-stroke bg-transparent px-3 py-1.5 outline-none focus:border-primary"
            />

            <Link
              href="/page-content/create"
              className="inline-flex items-center rounded bg-primary px-4 py-2 font-medium text-white hover:bg-opacity-90"
            >
              + افزودن محتوای جدید
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto p-4 sm:p-7.5">
        {isLoading ? (
          <div className="text-center">در حال بارگذاری...</div>
        ) : (
          <>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#F7F9FC] text-right dark:bg-dark-2">
                  <th className="min-w-[200px] px-4 py-4 font-medium text-dark dark:text-white">
                    عنوان
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                    نوع
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                    دسته‌بندی
                  </th>
                  <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                    زبان
                  </th>
                  <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                    وضعیت
                  </th>
                  <th className="px-4 py-4 font-medium text-dark dark:text-white">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.items?.map((content: any, index: number) => (
                  <tr key={content.id}>
                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {content.title}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      {getTypeBadge(content.type)}
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {content.category?.title || "-"}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      {getLanguageBadge(content.language)}
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-medium ${content.published ? "bg-green bg-opacity-10 text-green" : "bg-red bg-opacity-10 text-red"}`}
                      >
                        {content.published ? "منتشر شده" : "پیش‌نویس"}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <div className="flex gap-2">
                        <Link
                          href={`/page-content/edit/${content.id}`}
                          className="inline-flex rounded bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-90"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleDelete(content.id)}
                          className="inline-flex rounded bg-red px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-90"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data && data.pagination && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-dark dark:text-white">
                  نمایش {data.items.length} از {data.pagination.total} محتوا
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={!data.pagination.hasPrevPage}
                    className="rounded border border-stroke px-3 py-1.5 text-sm font-medium text-dark hover:bg-gray disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:text-white"
                  >
                    قبلی
                  </button>

                  <span className="flex items-center px-3 text-sm text-dark dark:text-white">
                    صفحه {data.pagination.page} از {data.pagination.totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!data.pagination.hasNextPage}
                    className="rounded border border-stroke px-3 py-1.5 text-sm font-medium text-dark hover:bg-gray disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:text-white"
                  >
                    بعدی
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PageContentsTable;
