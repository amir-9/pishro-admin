"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLessons, useDeleteLesson } from "@/hooks/api/use-lessons";
import type { LessonWithRelations } from "@/types/api";
import { toast } from "sonner";

const LessonsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useLessons({ page, limit: 10, search });
  const deleteLesson = useDeleteLesson();

  const handleDelete = async (id: string) => {
    if (confirm("آیا از حذف این درس اطمینان دارید؟")) {
      try {
        await deleteLesson.mutateAsync(id);
        toast.success("درس با موفقیت حذف شد");
      } catch (error) {
        toast.error("خطا در حذف درس");
      }
    }
  };

  if (error) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-4">
        <p className="text-danger">خطا در بارگذاری درس‌ها</p>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-4 py-4 dark:border-dark-3 sm:px-7.5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-dark dark:text-white">
            لیست درس‌ها
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
              href="/lessons/create"
              className="inline-flex items-center rounded bg-primary px-4 py-2 font-medium text-white hover:bg-opacity-90"
            >
              + افزودن درس جدید
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
                  <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                    دوره
                  </th>
                  <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                    مدت زمان
                  </th>
                  <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                    بازدیدها
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
                {data?.items?.map((lesson: LessonWithRelations, index: number) => (
                  <tr key={lesson.id}>
                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {lesson.title}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {lesson.course?.subject || "-"}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {lesson.duration || "-"}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {lesson.views}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-medium ${lesson.published ? "bg-green bg-opacity-10 text-green" : "bg-red bg-opacity-10 text-red"}`}
                      >
                        {lesson.published ? "منتشر شده" : "پیش‌نویس"}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <div className="flex gap-2">
                        <Link
                          href={`/lessons/edit/${lesson.id}`}
                          className="inline-flex rounded bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-90"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleDelete(lesson.id)}
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
                  نمایش {data.items.length} از {data.pagination.total} درس
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

export default LessonsTable;
