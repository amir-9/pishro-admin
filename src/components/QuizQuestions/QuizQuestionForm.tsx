"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateQuizQuestion,
  useUpdateQuizQuestion,
  useQuizQuestion,
} from "@/hooks/api/use-quiz-questions";
import { useQuizzes } from "@/hooks/api/use-quizzes";
import { toast } from "sonner";
import type { CreateQuizQuestionRequest } from "@/types/api";

interface QuizQuestionFormProps {
  questionId?: string;
  isEdit?: boolean;
}

const QuizQuestionForm: React.FC<QuizQuestionFormProps> = ({ questionId, isEdit = false }) => {
  const router = useRouter();
  const createQuizQuestion = useCreateQuizQuestion();
  const updateQuizQuestion = useUpdateQuizQuestion();
  const { data: questionData } = useQuizQuestion(questionId || "");
  const { data: quizzesData } = useQuizzes({ limit: 100 });

  const [formData, setFormData] = useState<CreateQuizQuestionRequest>({
    quizId: "",
    question: "",
    questionType: "MULTIPLE_CHOICE",
    options: [],
    correctAnswer: null,
    explanation: "",
    points: 1,
    order: 0,
  });

  const [optionsText, setOptionsText] = useState("");

  useEffect(() => {
    if (isEdit && questionData) {
      const question = questionData;
      setFormData({
        quizId: question.quizId,
        question: question.question,
        questionType: question.questionType,
        options: question.options || [],
        correctAnswer: question.correctAnswer ?? null,
        explanation: question.explanation || "",
        points: question.points,
        order: question.order,
      });

      // Format options for textarea
      if (question.options) {
        setOptionsText(JSON.stringify(question.options, null, 2));
      }
    }
  }, [isEdit, questionData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse options JSON
    let parsedOptions: any = [];
    if (optionsText.trim()) {
      try {
        parsedOptions = JSON.parse(optionsText);
      } catch (error) {
        toast.error("فرمت JSON گزینه‌ها نامعتبر است");
        return;
      }
    }

    const submitData = {
      ...formData,
      options: parsedOptions,
    };

    try {
      if (isEdit && questionId) {
        await updateQuizQuestion.mutateAsync({ id: questionId, data: submitData });
        toast.success("سوال آزمون با موفقیت به‌روزرسانی شد");
      } else {
        await createQuizQuestion.mutateAsync(submitData);
        toast.success("سوال آزمون با موفقیت ایجاد شد");
      }
      router.push("/quiz-questions");
    } catch (error: any) {
      toast.error(error?.message || "خطا در ذخیره سوال آزمون");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (name === "points" || name === "order") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else if (name === "correctAnswer") {
      setFormData((prev) => ({
        ...prev,
        correctAnswer: value === "true" ? true : value === "false" ? false : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
        <h3 className="font-medium text-dark dark:text-white">
          {isEdit ? "ویرایش سوال آزمون" : "افزودن سوال آزمون جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-7">
        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            آزمون <span className="text-red">*</span>
          </label>
          <select
            name="quizId"
            value={formData.quizId}
            onChange={handleChange}
            required
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          >
            <option value="">انتخاب آزمون</option>
            {quizzesData?.items?.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            سوال <span className="text-red">*</span>
          </label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            نوع سوال <span className="text-red">*</span>
          </label>
          <select
            name="questionType"
            value={formData.questionType}
            onChange={handleChange}
            required
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          >
            <option value="MULTIPLE_CHOICE">چند گزینه‌ای (یک جواب صحیح)</option>
            <option value="MULTIPLE_SELECT">چند انتخابی (چند جواب صحیح)</option>
            <option value="TRUE_FALSE">صحیح/غلط</option>
            <option value="SHORT_ANSWER">پاسخ کوتاه</option>
          </select>
        </div>

        {(formData.questionType === "MULTIPLE_CHOICE" || formData.questionType === "MULTIPLE_SELECT") && (
          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              گزینه‌ها (JSON)
            </label>
            <p className="mb-2 text-sm text-gray">
              مثال: {`[{"text": "گزینه 1", "isCorrect": true}, {"text": "گزینه 2", "isCorrect": false}]`}
            </p>
            <textarea
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              rows={8}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white font-mono text-sm"
            />
          </div>
        )}

        {formData.questionType === "TRUE_FALSE" && (
          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              پاسخ صحیح
            </label>
            <select
              name="correctAnswer"
              value={formData.correctAnswer === true ? "true" : formData.correctAnswer === false ? "false" : ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            >
              <option value="">انتخاب کنید</option>
              <option value="true">صحیح</option>
              <option value="false">غلط</option>
            </select>
          </div>
        )}

        <div className="mb-5.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            توضیحات
          </label>
          <textarea
            name="explanation"
            value={formData.explanation || ""}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              امتیاز <span className="text-red">*</span>
            </label>
            <input
              type="number"
              name="points"
              value={formData.points}
              onChange={handleChange}
              required
              min="0"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              ترتیب
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="0"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/quiz-questions")}
            className="rounded bg-gray px-6 py-2.5 font-medium text-dark hover:bg-opacity-90"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={createQuizQuestion.isPending || updateQuizQuestion.isPending}
            className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            {createQuizQuestion.isPending || updateQuizQuestion.isPending
              ? "در حال ذخیره..."
              : "ذخیره"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizQuestionForm;
