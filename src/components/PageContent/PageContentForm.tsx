"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCreatePageContent,
  useUpdatePageContent,
  usePageContent,
} from "@/hooks/api/use-page-content";
import { useCategories } from "@/hooks/api/use-categories";
import { toast } from "sonner";
import type { CreatePageContentRequest, PageContentType, Language } from "@/types/api";

interface PageContentFormProps {
  contentId?: string;
  isEdit?: boolean;
}

const PageContentForm: React.FC<PageContentFormProps> = ({
  contentId,
  isEdit = false,
}) => {
  const router = useRouter();
  const createContent = useCreatePageContent();
  const updateContent = useUpdatePageContent();
  const { data: contentData } = usePageContent(contentId || "");
  const { data: categoriesData } = useCategories({ limit: 100 });

  const [formData, setFormData] = useState<any>({
    categoryId: "",
    type: "LANDING",
    section: "",
    title: "",
    subtitle: "",
    content: {},
    language: "FA",
    order: 0,
    published: false,
    publishAt: "",
    expireAt: "",
  });

  const [contentJson, setContentJson] = useState("");

  useEffect(() => {
    if (isEdit && contentData) {
      const content = contentData;
      setFormData({
        categoryId: content.categoryId || "",
        type: content.type as PageContentType,
        section: content.section || "",
        title: content.title || "",
        subtitle: content.subtitle || "",
        content: content.content || {},
        language: content.language as Language,
        order: content.order || 0,
        published: content.published || false,
        publishAt: content.publishAt || "",
        expireAt: content.expireAt || "",
      });
      setContentJson(JSON.stringify(content.content || {}, null, 2));
    }
  }, [isEdit, contentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse JSON content
    let parsedContent = {};
    try {
      parsedContent = contentJson ? JSON.parse(contentJson) : {};
    } catch (error) {
      toast.error("فرمت JSON محتوا نامعتبر است");
      return;
    }

    const submitData: any = {
      ...formData,
      content: parsedContent,
      categoryId: formData.categoryId || undefined,
      section: formData.section || undefined,
      title: formData.title || undefined,
      subtitle: formData.subtitle || undefined,
      publishAt: formData.publishAt || undefined,
      expireAt: formData.expireAt || undefined,
    };

    try {
      if (isEdit && contentId) {
        await updateContent.mutateAsync({ id: contentId, data: submitData });
        toast.success("محتوا با موفقیت به‌روزرسانی شد");
      } else {
        await createContent.mutateAsync(submitData);
        toast.success("محتوا با موفقیت ایجاد شد");
      }
      router.push("/page-content");
    } catch (error: any) {
      toast.error(error?.message || "خطا در ذخیره محتوا");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? parseInt(value) || 0
            : value,
    }));
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
        <h3 className="font-medium text-dark dark:text-white">
          {isEdit ? "ویرایش محتوای صفحه" : "افزودن محتوای جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-7">
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              دسته‌بندی
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            >
              <option value="">بدون دسته‌بندی</option>
              {categoriesData?.items?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              نوع <span className="text-red">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            >
              <option value="LANDING">صفحه اصلی (LANDING)</option>
              <option value="ABOUT">درباره ما (ABOUT)</option>
              <option value="FEATURES">ویژگی‌ها (FEATURES)</option>
              <option value="FAQ">سوالات متداول (FAQ)</option>
              <option value="TESTIMONIAL">نظرات (TESTIMONIAL)</option>
              <option value="HERO">هیرو (HERO)</option>
              <option value="STATS">آمار (STATS)</option>
            </select>
          </div>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              بخش
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              عنوان <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            زیرعنوان
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle || ""}
            onChange={handleChange}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            محتوا (JSON)
          </label>
          <textarea
            value={contentJson}
            onChange={(e) => setContentJson(e.target.value)}
            rows={8}
            placeholder='{"key": "value"}'
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 font-mono text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
          <p className="mt-1 text-xs text-gray">
            محتوا را به صورت JSON وارد کنید
          </p>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              زبان <span className="text-red">*</span>
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            >
              <option value="FA">فارسی (FA)</option>
              <option value="EN">English (EN)</option>
            </select>
          </div>

          <div className="w-full sm:w-1/3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              ترتیب
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="w-full sm:w-1/3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              تاریخ انتشار
            </label>
            <input
              type="datetime-local"
              name="publishAt"
              value={
                formData.publishAt
                  ? new Date(formData.publishAt).toISOString().slice(0, 16)
                  : ""
              }
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            تاریخ انقضا
          </label>
          <input
            type="datetime-local"
            name="expireAt"
            value={
              formData.expireAt
                ? new Date(formData.expireAt).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleChange}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="mb-5.5 flex gap-5">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published || false}
              onChange={handleChange}
              className="rounded border-stroke"
            />
            <span className="text-body-sm font-medium text-dark dark:text-white">
              منتشر شده
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/page-content")}
            className="rounded bg-gray px-6 py-2.5 font-medium text-dark hover:bg-opacity-90"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={createContent.isPending || updateContent.isPending}
            className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            {createContent.isPending || updateContent.isPending
              ? "در حال ذخیره..."
              : "ذخیره"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageContentForm;
