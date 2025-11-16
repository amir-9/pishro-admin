"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateHomeMiniSlider,
  useUpdateHomeMiniSlider,
  useHomeMiniSlider,
} from "@/hooks/api/use-home-mini-sliders";
import { toast } from "sonner";
import type { CreateHomeMiniSliderRequest } from "@/types/api";

interface HomeMiniSliderFormProps {
  homeMiniSliderId?: string;
  isEdit?: boolean;
}

const HomeMiniSliderForm: React.FC<HomeMiniSliderFormProps> = ({ homeMiniSliderId, isEdit = false }) => {
  const router = useRouter();
  const createHomeMiniSlider = useCreateHomeMiniSlider();
  const updateHomeMiniSlider = useUpdateHomeMiniSlider();
  const { data: homeMiniSliderData } = useHomeMiniSlider(homeMiniSliderId || "");

  const [formData, setFormData] = useState<CreateHomeMiniSliderRequest>({
    imageUrl: "",
    row: 1,
    order: 0,
    published: true,
  });

  useEffect(() => {
    if (isEdit && homeMiniSliderData) {
      const slider = homeMiniSliderData;
      setFormData({
        imageUrl: slider.imageUrl,
        row: slider.row,
        order: slider.order,
        published: slider.published || false,
      });
    }
  }, [isEdit, homeMiniSliderData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && homeMiniSliderId) {
        await updateHomeMiniSlider.mutateAsync({ id: homeMiniSliderId, data: formData });
        toast.success("اسلایدر کوچک با موفقیت به‌روزرسانی شد");
      } else {
        await createHomeMiniSlider.mutateAsync(formData);
        toast.success("اسلایدر کوچک با موفقیت ایجاد شد");
      }
      router.push("/home-mini-sliders");
    } catch (error: any) {
      toast.error(error?.message || "خطا در ذخیره اسلایدر کوچک");
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
          : type === "number" || name === "row"
            ? parseInt(value) || (name === "row" ? 1 : 0)
            : value,
    }));
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
        <h3 className="font-medium text-dark dark:text-white">
          {isEdit ? "ویرایش اسلایدر کوچک" : "افزودن اسلایدر کوچک جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-7">
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
            ردیف <span className="text-red">*</span>
          </label>
          <select
            name="row"
            value={formData.row}
            onChange={handleChange}
            required
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          >
            <option value={1}>ردیف اول</option>
            <option value={2}>ردیف دوم</option>
          </select>
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
            onClick={() => router.push("/home-mini-sliders")}
            className="rounded bg-gray px-6 py-2.5 font-medium text-dark hover:bg-opacity-90"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={createHomeMiniSlider.isPending || updateHomeMiniSlider.isPending}
            className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            {createHomeMiniSlider.isPending || updateHomeMiniSlider.isPending
              ? "در حال ذخیره..."
              : "ذخیره"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeMiniSliderForm;
