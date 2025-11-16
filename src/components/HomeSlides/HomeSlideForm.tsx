"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateHomeSlide,
  useUpdateHomeSlide,
  useHomeSlide,
} from "@/hooks/api/use-home-slides";
import { toast } from "sonner";
import type { CreateHomeSlideRequest } from "@/types/api";

interface HomeSlideFormProps {
  homeSlideId?: string;
  isEdit?: boolean;
}

const HomeSlideForm: React.FC<HomeSlideFormProps> = ({ homeSlideId, isEdit = false }) => {
  const router = useRouter();
  const createHomeSlide = useCreateHomeSlide();
  const updateHomeSlide = useUpdateHomeSlide();
  const { data: homeSlideData } = useHomeSlide(homeSlideId || "");

  const [formData, setFormData] = useState<CreateHomeSlideRequest>({
    title: "",
    description: "",
    imageUrl: "",
    order: 0,
    published: true,
  });

  useEffect(() => {
    if (isEdit && homeSlideData) {
      const slide = homeSlideData;
      setFormData({
        title: slide.title,
        description: slide.description,
        imageUrl: slide.imageUrl,
        order: slide.order,
        published: slide.published || false,
      });
    }
  }, [isEdit, homeSlideData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && homeSlideId) {
        await updateHomeSlide.mutateAsync({ id: homeSlideId, data: formData });
        toast.success("اسلاید با موفقیت به‌روزرسانی شد");
      } else {
        await createHomeSlide.mutateAsync(formData);
        toast.success("اسلاید با موفقیت ایجاد شد");
      }
      router.push("/home-slides");
    } catch (error: any) {
      toast.error(error?.message || "خطا در ذخیره اسلاید");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
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
          {isEdit ? "ویرایش اسلاید" : "افزودن اسلاید جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-7">
        <div className="mb-5.5">
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

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            توضیحات <span className="text-red">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            آدرس تصویر <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            ترتیب <span className="text-red">*</span>
          </label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            required
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
            onClick={() => router.push("/home-slides")}
            className="rounded bg-gray px-6 py-2.5 font-medium text-dark hover:bg-opacity-90"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={createHomeSlide.isPending || updateHomeSlide.isPending}
            className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            {createHomeSlide.isPending || updateHomeSlide.isPending
              ? "در حال ذخیره..."
              : "ذخیره"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeSlideForm;
