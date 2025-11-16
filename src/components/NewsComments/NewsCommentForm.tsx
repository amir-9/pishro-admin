"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useUpdateNewsComment,
  useNewsComment,
} from "@/hooks/api/use-news-comments";
import { toast } from "sonner";
import type { UpdateNewsCommentRequest } from "@/types/api";

interface NewsCommentFormProps {
  commentId?: string;
  isEdit?: boolean;
}

const NewsCommentForm: React.FC<NewsCommentFormProps> = ({ commentId, isEdit = false }) => {
  const router = useRouter();
  const updateNewsComment = useUpdateNewsComment();
  const { data: commentData } = useNewsComment(commentId || "");

  const [formData, setFormData] = useState<UpdateNewsCommentRequest>({
    content: "",
  });

  const [readonlyData, setReadonlyData] = useState({
    userId: "",
    articleId: "",
    userDisplay: "",
    articleDisplay: "",
  });

  useEffect(() => {
    if (isEdit && commentData) {
      const comment = commentData;
      setFormData({
        content: comment.content,
      });

      setReadonlyData({
        userId: comment.userId || "",
        articleId: comment.articleId,
        userDisplay: comment.user
          ? comment.user.firstName && comment.user.lastName
            ? `${comment.user.firstName} ${comment.user.lastName}`
            : comment.user.email || "مهمان"
          : "مهمان",
        articleDisplay: comment.article?.title || "-",
      });
    }
  }, [isEdit, commentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && commentId) {
        await updateNewsComment.mutateAsync({ id: commentId, data: formData });
        toast.success("نظر با موفقیت به‌روزرسانی شد");
        router.push("/news-comments");
      }
    } catch (error: any) {
      toast.error(error?.message || "خطا در ذخیره نظر");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
        <h3 className="font-medium text-dark dark:text-white">
          ویرایش نظر
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-7">
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              کاربر
            </label>
            <input
              type="text"
              value={readonlyData.userDisplay}
              disabled
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-gray px-5.5 py-3 text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white opacity-70 cursor-not-allowed"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              مقاله
            </label>
            <input
              type="text"
              value={readonlyData.articleDisplay}
              disabled
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-gray px-5.5 py-3 text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white opacity-70 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            نظر <span className="text-red">*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/news-comments")}
            className="rounded bg-gray px-6 py-2.5 font-medium text-dark hover:bg-opacity-90"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={updateNewsComment.isPending}
            className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            {updateNewsComment.isPending
              ? "در حال ذخیره..."
              : "ذخیره"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsCommentForm;
