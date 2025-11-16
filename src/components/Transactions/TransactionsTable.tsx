"use client";

import React, { useState } from "react";
import { useTransactions } from "@/hooks/api/use-transactions";
import type {
  TransactionWithRelations,
  TransactionType,
  TransactionStatus,
} from "@/types/api";

const TransactionsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<TransactionType | "">("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "">("");

  const { data, isLoading, error } = useTransactions({
    page,
    limit: 10,
    type: typeFilter || undefined,
    status: statusFilter || undefined,
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  const getTypeBadge = (type: TransactionType) => {
    const badges = {
      PAYMENT: { label: "پرداخت", class: "bg-primary bg-opacity-10 text-primary" },
      REFUND: { label: "استرداد", class: "bg-warning bg-opacity-10 text-warning" },
      WITHDRAWAL: { label: "برداشت", class: "bg-purple bg-opacity-10 text-purple" },
    };
    const badge = badges[type];
    return (
      <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${badge.class}`}>
        {badge.label}
      </span>
    );
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const badges = {
      PENDING: { label: "در انتظار", class: "bg-warning bg-opacity-10 text-warning" },
      SUCCESS: { label: "موفق", class: "bg-green bg-opacity-10 text-green" },
      FAILED: { label: "ناموفق", class: "bg-red bg-opacity-10 text-red" },
    };
    const badge = badges[status];
    return (
      <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${badge.class}`}>
        {badge.label}
      </span>
    );
  };

  if (error) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-4">
        <p className="text-danger">خطا در بارگذاری تراکنش‌ها</p>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-4 py-4 dark:border-dark-3 sm:px-7.5">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium text-dark dark:text-white">
            لیست تراکنش‌ها
          </h3>

          <div className="flex items-center gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TransactionType | "")}
              className="rounded border border-stroke bg-transparent px-3 py-1.5 outline-none focus:border-primary"
            >
              <option value="">همه انواع</option>
              <option value="PAYMENT">پرداخت</option>
              <option value="REFUND">استرداد</option>
              <option value="WITHDRAWAL">برداشت</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | "")}
              className="rounded border border-stroke bg-transparent px-3 py-1.5 outline-none focus:border-primary"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="PENDING">در انتظار</option>
              <option value="SUCCESS">موفق</option>
              <option value="FAILED">ناموفق</option>
            </select>
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
                  <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                    کاربر
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                    سفارش
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                    مبلغ
                  </th>
                  <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                    نوع
                  </th>
                  <th className="min-w-[100px] px-4 py-4 font-medium text-dark dark:text-white">
                    وضعیت
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                    شماره پیگیری
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                    تاریخ
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.items?.map(
                  (transaction: TransactionWithRelations, index: number) => (
                    <tr key={transaction.id}>
                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        <span className="text-dark dark:text-white">
                          {transaction.user
                            ? `${transaction.user.firstName || ""} ${transaction.user.lastName || ""}`.trim() || transaction.user.phone
                            : "نامشخص"}
                        </span>
                      </td>

                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        <span className="text-dark dark:text-white">
                          {transaction.orderId ? `#${transaction.orderId.slice(0, 8)}` : "-"}
                        </span>
                      </td>

                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        <span className="text-dark dark:text-white">
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>

                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        {getTypeBadge(transaction.type)}
                      </td>

                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        {getStatusBadge(transaction.status)}
                      </td>

                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        <span className="text-dark dark:text-white">
                          {transaction.refNumber || "-"}
                        </span>
                      </td>

                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.items.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        <span className="text-dark dark:text-white">
                          {formatDate(transaction.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>

            {data && data.pagination && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-dark dark:text-white">
                  نمایش {data.items.length} از {data.pagination.total} تراکنش
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

export default TransactionsTable;
