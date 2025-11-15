"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateMobileScrollerStep,
  useUpdateMobileScrollerStep,
  useMobileScrollerStep,
} from "@/hooks/api";
import { toast } from "sonner";
import type { CreateMobileScrollerStepRequest } from "@/types/api";

interface MobileScrollerStepFormProps {
  stepId?: string;
  isEdit?: boolean;
}

const MobileScrollerStepForm: React.FC<MobileScrollerStepFormProps> = ({
  stepId,
  isEdit = false,
}) => {
  const router = useRouter();
  const createStep = useCreateMobileScrollerStep();
  const updateStep = useUpdateMobileScrollerStep();
  const { data: stepData } = useMobileScrollerStep(stepId || "");

  const [formData, setFormData] = useState<CreateMobileScrollerStepRequest>({
    stepNumber: 1,
    title: "",
    description: "",
    imageUrl: null,
    gradient: null,
    cards: [],
    order: 0,
    published: true,
  });

  // UI states for managing JSON arrays
  const [cardsUI, setCardsUI] = useState<any[]>([]);

  useEffect(() => {
    if (isEdit && stepData) {
      const data = stepData;
      setFormData({
        stepNumber: data.stepNumber,
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl || null,
        gradient: data.gradient || null,
        cards: data.cards || [],
        order: data.order,
        published: data.published,
      });

      // Set UI states
      setCardsUI(Array.isArray(data.cards) ? data.cards : []);
    }
  }, [isEdit, stepData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData = {
        ...formData,
        cards: cardsUI,
      };

      if (isEdit && stepId) {
        await updateStep.mutateAsync({ id: stepId, data: submitData });
        toast.success("مرحله با موفقیت به‌روزرسانی شد");
        router.refresh();
      } else {
        await createStep.mutateAsync(submitData);
        toast.success("مرحله با موفقیت ایجاد شد");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.message || "خطا در ذخیره مرحله");
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
            ? value === "" ? 0 : Number(value)
            : value === "" ? null : value,
    }));
  };

  // Cards Management
  const addCard = () => {
    setCardsUI([
      ...cardsUI,
      { title: "", desc: "", icon: "", top: "25%", right: "-10%" },
    ]);
  };

  const updateCard = (index: number, field: string, value: any) => {
    const updated = [...cardsUI];
    updated[index] = { ...updated[index], [field]: value };
    setCardsUI(updated);
  };

  const removeCard = (index: number) => {
    setCardsUI(cardsUI.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
        <h3 className="font-medium text-dark dark:text-white">
          {isEdit ? "ویرایش مرحله اسکرولر" : "افزودن مرحله اسکرولر جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-7">
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              شماره مرحله <span className="text-red">*</span>
            </label>
            <input
              type="number"
              name="stepNumber"
              value={formData.stepNumber}
              onChange={handleChange}
              required
              min="1"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              ترتیب نمایش
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

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
            لینک تصویر
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            کلاس Gradient (CSS)
          </label>
          <input
            type="text"
            name="gradient"
            value={formData.gradient || ""}
            onChange={handleChange}
            placeholder="مثال: from-blue-500 to-purple-500"
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        {/* Cards Section */}
        <div className="mb-5.5">
          <h5 className="mb-3 text-body-sm font-semibold text-dark dark:text-white">
            کارت‌های داخل Step
          </h5>

          <div className="space-y-4">
            {cardsUI.map((card, index) => (
              <div
                key={index}
                className="rounded-[7px] border border-stroke p-4 dark:border-dark-3"
              >
                <div className="mb-3 flex justify-between">
                  <h6 className="font-medium text-dark dark:text-white">
                    کارت {index + 1}
                  </h6>
                  <button
                    type="button"
                    onClick={() => removeCard(index)}
                    className="text-sm text-red hover:underline"
                  >
                    حذف
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      عنوان
                    </label>
                    <input
                      type="text"
                      value={card.title || ""}
                      onChange={(e) =>
                        updateCard(index, "title", e.target.value)
                      }
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      توضیحات
                    </label>
                    <input
                      type="text"
                      value={card.desc || ""}
                      onChange={(e) =>
                        updateCard(index, "desc", e.target.value)
                      }
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      آیکون
                    </label>
                    <input
                      type="text"
                      value={card.icon || ""}
                      onChange={(e) =>
                        updateCard(index, "icon", e.target.value)
                      }
                      placeholder="LineChart"
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      موقعیت Top
                    </label>
                    <input
                      type="text"
                      value={card.top || ""}
                      onChange={(e) =>
                        updateCard(index, "top", e.target.value)
                      }
                      placeholder="25%"
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      موقعیت Right
                    </label>
                    <input
                      type="text"
                      value={card.right || ""}
                      onChange={(e) =>
                        updateCard(index, "right", e.target.value)
                      }
                      placeholder="-10%"
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCard}
              className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90"
            >
              افزودن کارت جدید
            </button>
          </div>
        </div>

        <div className="mb-5.5 flex gap-5">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
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
            type="submit"
            disabled={createStep.isPending || updateStep.isPending}
            className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            {createStep.isPending || updateStep.isPending
              ? "در حال ذخیره..."
              : "ذخیره"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MobileScrollerStepForm;
