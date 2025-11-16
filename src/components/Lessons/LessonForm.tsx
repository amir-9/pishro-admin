"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateLesson,
  useUpdateLesson,
  useLesson,
} from "@/hooks/api/use-lessons";
import { useCourses } from "@/hooks/api/use-courses";
import { toast } from "sonner";
import type { CreateLessonRequest } from "@/types/api";

interface LessonFormProps {
  lessonId?: string;
  isEdit?: boolean;
}

const LessonForm: React.FC<LessonFormProps> = ({ lessonId, isEdit = false }) => {
  const router = useRouter();
  const createLesson = useCreateLesson();
  const updateLesson = useUpdateLesson();
  const { data: lessonData } = useLesson(lessonId || "");
  const { data: coursesData } = useCourses({ limit: 100 });

  const [formData, setFormData] = useState<CreateLessonRequest>({
    courseId: "",
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    duration: "",
    order: 0,
    published: false,
  });

  useEffect(() => {
    if (isEdit && lessonData) {
      const lesson = lessonData;
      setFormData({
        courseId: lesson.courseId,
        title: lesson.title,
        description: lesson.description || "",
        videoUrl: lesson.videoUrl || "",
        thumbnail: lesson.thumbnail || "",
        duration: lesson.duration || "",
        order: lesson.order,
        published: lesson.published || false,
      });
    }
  }, [isEdit, lessonData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && lessonId) {
        await updateLesson.mutateAsync({ id: lessonId, data: formData });
        toast.success("درس با موفقیت به‌روزرسانی شد");
      } else {
        await createLesson.mutateAsync(formData);
        toast.success("درس با موفقیت ایجاد شد");
      }
      router.push("/lessons");
    } catch (error: any) {
      toast.error(error?.message || "خطا در ذخیره درس");
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
          {isEdit ? "ویرایش درس" : "افزودن درس جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-7">
        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            دوره <span className="text-red">*</span>
          </label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          >
            <option value="">انتخاب دوره</option>
            {coursesData?.items?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.subject}
              </option>
            ))}
          </select>
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
            توضیحات
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              URL ویدیو
            </label>
            <input
              type="text"
              name="videoUrl"
              value={formData.videoUrl || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              تصویر شاخص (URL)
            </label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              مدت زمان
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration || ""}
              onChange={handleChange}
              placeholder="مثال: 10:30"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              ترتیب <span className="text-red">*</span>
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              required
              min="0"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
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
            onClick={() => router.push("/lessons")}
            className="rounded bg-gray px-6 py-2.5 font-medium text-dark hover:bg-opacity-90"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={createLesson.isPending || updateLesson.isPending}
            className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            {createLesson.isPending || updateLesson.isPending
              ? "در حال ذخیره..."
              : "ذخیره"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;
