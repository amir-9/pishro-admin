"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuizQuestions, useDeleteQuizQuestion } from "@/hooks/api/use-quiz-questions";
import type { QuizQuestion } from "@/types/api";
import { toast } from "sonner";

const questionTypeLabels: Record<string, string> = {
  MULTIPLE_CHOICE: "چند گزینه‌ای",
  MULTIPLE_SELECT: "چند انتخابی",
  TRUE_FALSE: "صحیح/غلط",
  SHORT_ANSWER: "پاسخ کوتاه",
};

const QuizQuestionsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useQuizQuestions({ page, limit: 10 });
  const deleteQuizQuestion = useDeleteQuizQuestion();

  const handleDelete = async (id: string) => {
    if (confirm("آیا از حذف این سوال آزمون اطمینان دارید؟")) {
      try {
        await deleteQuizQuestion.mutateAsync(id);
        toast.success("سوال آزمون با موفقیت حذف شد");
      } catch (error) {
        toast.error("خطا در حذف سوال آزمون");
      }
    }
  };

  if (error) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-4">
        <p className="text-danger">خطا در بارگذاری سوالات آزمون</p>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-4 py-4 dark:border-dark-3 sm:px-7.5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-dark dark:text-white">
            لیست سوالات آزمون
          </h3>

          <div className="flex items-center gap-3">
            <Link
              href="/quiz-questions/create"
              className="inline-flex items-center rounded bg-primary px-4 py-2 font-medium text-white hover:bg-opacity-90"
            >
              + افزودن سوال آزمون جدید
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
                  <th className="min-w-[250px] px-4 py-4 font-medium text-dark dark:text-white">
                    سوال
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                    نوع
                  </th>
                  <th className="min-w-[80px] px-4 py-4 font-medium text-dark dark:text-white">
                    امتیاز
                  </th>
                  <th className="min-w-[80px] px-4 py-4 font-medium text-dark dark:text-white">
                    ترتیب
                  </th>
                  <th className="px-4 py-4 font-medium text-dark dark:text-white">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.items?.map((question: QuizQuestion, index: number) => (
                  <tr key={question.id}>
                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {question.question.length > 80
                          ? question.question.substring(0, 80) + "..."
                          : question.question}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {questionTypeLabels[question.questionType] || question.questionType}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {question.points}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <span className="text-dark dark:text-white">
                        {question.order}
                      </span>
                    </td>

                    <td
                      className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <div className="flex gap-2">
                        <Link
                          href={`/quiz-questions/edit/${question.id}`}
                          className="inline-flex rounded bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-90"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleDelete(question.id)}
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
                  نمایش {data.items.length} از {data.pagination.total} سوال
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

export default QuizQuestionsTable;
