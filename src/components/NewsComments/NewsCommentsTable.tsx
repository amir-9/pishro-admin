"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNewsComments, useDeleteNewsComment } from "@/hooks/api/use-news-comments";
import type { NewsCommentWithRelations } from "@/types/api";
import { toast } from "sonner";

const NewsCommentsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useNewsComments({ page, limit: 10 });
  const deleteNewsComment = useDeleteNewsComment();

  const handleDelete = async (id: string) => {
    if (confirm("آیا از حذف این نظر اطمینان دارید؟")) {
      try {
        await deleteNewsComment.mutateAsync(id);
        toast.success("نظر با موفقیت حذف شد");
      } catch (error) {
        toast.error("خطا در حذف نظر");
      }
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (error) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-4">
        <p className="text-danger">خطا در بارگذاری نظرات</p>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-4 py-4 dark:border-dark-3 sm:px-7.5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-dark dark:text-white">
            لیست نظرات اخبار
          </h3>
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
                  <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                    کاربر
                  </th>
                  <th className="min-w-[200px] px-4 py-4 font-medium text-dark dark:text-white">
                    مقاله
                  </th>
                  <th className="min-w-[250px] px-4 py-4 font-medium text-dark dark:text-white">
                    نظر
                  </th>
                  <th className="min-w-[80px] px-4 py-4 font-medium text-dark dark:text-white">
                    لایک‌ها
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                    تاریخ
                  </th>
                  <th className="px-4 py-4 font-medium text-dark dark:text-white">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.items?.map((comment: NewsCommentWithRelations, index: number) => (
                  <tr key={comment.id}>
                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {comment.user
                          ? comment.user.firstName && comment.user.lastName
                            ? `${comment.user.firstName} ${comment.user.lastName}`
                            : comment.user.email
                          : "مهمان"}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {comment.article?.title || "-"}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {comment.content.length > 100
                          ? comment.content.substring(0, 100) + "..."
                          : comment.content}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {comment.likes?.length || 0}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {formatDate(comment.createdAt)}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <div className="flex gap-2">
                        <Link
                          href={`/news-comments/edit/${comment.id}`}
                          className="inline-flex rounded bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-90"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleDelete(comment.id)}
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
                  نمایش {data.items.length} از {data.pagination.total} نظر
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

export default NewsCommentsTable;
