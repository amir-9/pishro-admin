"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateHomeLanding,
  useUpdateHomeLanding,
  useHomeLandingDetail,
} from "@/hooks/api";
import { toast } from "sonner";
import type { CreateHomeLandingRequest } from "@/types/api";

interface HomeLandingFormProps {
  homeLandingId?: string;
  isEdit?: boolean;
}

const HomeLandingForm: React.FC<HomeLandingFormProps> = ({
  homeLandingId,
  isEdit = false,
}) => {
  const router = useRouter();
  const createHomeLanding = useCreateHomeLanding();
  const updateHomeLanding = useUpdateHomeLanding();
  const { data: homeLandingData } = useHomeLandingDetail(homeLandingId || "");

  const [formData, setFormData] = useState<CreateHomeLandingRequest>({
    mainHeroTitle: null,
    mainHeroSubtitle: null,
    mainHeroCta1Text: null,
    mainHeroCta1Link: null,
    heroTitle: "",
    heroSubtitle: null,
    heroDescription: null,
    heroVideoUrl: null,
    heroCta1Text: null,
    heroCta1Link: null,
    overlayTexts: [],
    statsData: [],
    whyUsTitle: null,
    whyUsDescription: null,
    whyUsItems: [],
    newsClubTitle: null,
    newsClubDescription: null,
    calculatorTitle: null,
    calculatorDescription: null,
    calculatorRateLow: 0.07,
    calculatorRateMedium: 0.08,
    calculatorRateHigh: 0.11,
    calculatorPortfolioLowDesc: null,
    calculatorPortfolioMediumDesc: null,
    calculatorPortfolioHighDesc: null,
    calculatorAmountSteps: [1000000, 10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 200000000, 300000000, 500000000, 1000000000, 2000000000, 3000000000, 5000000000],
    calculatorDurationSteps: [1, 3, 6, 9, 12],
    calculatorInPersonPhone: null,
    calculatorOnlineTelegram: null,
    calculatorOnlineTelegramLink: null,
    metaTitle: null,
    metaDescription: null,
    metaKeywords: [],
    published: true,
    order: 0,
  });

  // UI states for managing JSON arrays
  const [overlayTextsUI, setOverlayTextsUI] = useState<string[]>([]);
  const [statsDataUI, setStatsDataUI] = useState<any[]>([]);
  const [whyUsItemsUI, setWhyUsItemsUI] = useState<any[]>([]);
  const [metaKeywordsInput, setMetaKeywordsInput] = useState<string>("");

  useEffect(() => {
    if (isEdit && homeLandingData) {
      const data = homeLandingData.data;
      setFormData({
        mainHeroTitle: data.mainHeroTitle || null,
        mainHeroSubtitle: data.mainHeroSubtitle || null,
        mainHeroCta1Text: data.mainHeroCta1Text || null,
        mainHeroCta1Link: data.mainHeroCta1Link || null,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle || null,
        heroDescription: data.heroDescription || null,
        heroVideoUrl: data.heroVideoUrl || null,
        heroCta1Text: data.heroCta1Text || null,
        heroCta1Link: data.heroCta1Link || null,
        overlayTexts: data.overlayTexts || [],
        statsData: data.statsData || [],
        whyUsTitle: data.whyUsTitle || null,
        whyUsDescription: data.whyUsDescription || null,
        whyUsItems: data.whyUsItems || [],
        newsClubTitle: data.newsClubTitle || null,
        newsClubDescription: data.newsClubDescription || null,
        calculatorTitle: data.calculatorTitle || null,
        calculatorDescription: data.calculatorDescription || null,
        calculatorRateLow: data.calculatorRateLow ?? 0.07,
        calculatorRateMedium: data.calculatorRateMedium ?? 0.08,
        calculatorRateHigh: data.calculatorRateHigh ?? 0.11,
        calculatorPortfolioLowDesc: data.calculatorPortfolioLowDesc || null,
        calculatorPortfolioMediumDesc: data.calculatorPortfolioMediumDesc || null,
        calculatorPortfolioHighDesc: data.calculatorPortfolioHighDesc || null,
        calculatorAmountSteps: data.calculatorAmountSteps || [1000000, 10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 200000000, 300000000, 500000000, 1000000000, 2000000000, 3000000000, 5000000000],
        calculatorDurationSteps: data.calculatorDurationSteps || [1, 3, 6, 9, 12],
        calculatorInPersonPhone: data.calculatorInPersonPhone || null,
        calculatorOnlineTelegram: data.calculatorOnlineTelegram || null,
        calculatorOnlineTelegramLink: data.calculatorOnlineTelegramLink || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || [],
        published: data.published,
        order: data.order,
      });

      // Set UI states
      setOverlayTextsUI(Array.isArray(data.overlayTexts) ? data.overlayTexts : []);
      setStatsDataUI(Array.isArray(data.statsData) ? data.statsData : []);
      setWhyUsItemsUI(Array.isArray(data.whyUsItems) ? data.whyUsItems : []);
      setMetaKeywordsInput((data.metaKeywords || []).join(", "));
    }
  }, [isEdit, homeLandingData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData = {
        ...formData,
        overlayTexts: overlayTextsUI,
        statsData: statsDataUI,
        whyUsItems: whyUsItemsUI,
        metaKeywords: metaKeywordsInput
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k),
      };

      if (isEdit && homeLandingId) {
        await updateHomeLanding.mutateAsync({ id: homeLandingId, data: submitData });
        toast.success("صفحه لندینگ با موفقیت به‌روزرسانی شد");
        router.refresh();
      } else {
        await createHomeLanding.mutateAsync(submitData);
        toast.success("صفحه لندینگ با موفقیت ایجاد شد");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.message || "خطا در ذخیره صفحه");
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
            ? value === "" ? null : Number(value)
            : value === "" ? null : value,
    }));
  };

  // Overlay Texts Management
  const addOverlayText = () => {
    setOverlayTextsUI([...overlayTextsUI, ""]);
  };

  const updateOverlayText = (index: number, value: string) => {
    const updated = [...overlayTextsUI];
    updated[index] = value;
    setOverlayTextsUI(updated);
  };

  const removeOverlayText = (index: number) => {
    setOverlayTextsUI(overlayTextsUI.filter((_, i) => i !== index));
  };

  // Stats Data Management
  const addStatItem = () => {
    setStatsDataUI([...statsDataUI, { label: "", value: 0, suffix: "+" }]);
  };

  const updateStatItem = (index: number, field: string, value: any) => {
    const updated = [...statsDataUI];
    updated[index] = { ...updated[index], [field]: value };
    setStatsDataUI(updated);
  };

  const removeStatItem = (index: number) => {
    setStatsDataUI(statsDataUI.filter((_, i) => i !== index));
  };

  // Why Us Items Management
  const addWhyUsItem = () => {
    setWhyUsItemsUI([
      ...whyUsItemsUI,
      { label: "", title: "", text: "", btnLabel: "", btnHref: "", imagePath: "" },
    ]);
  };

  const updateWhyUsItem = (index: number, field: string, value: any) => {
    const updated = [...whyUsItemsUI];
    updated[index] = { ...updated[index], [field]: value };
    setWhyUsItemsUI(updated);
  };

  const removeWhyUsItem = (index: number) => {
    setWhyUsItemsUI(whyUsItemsUI.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
        <h3 className="font-medium text-dark dark:text-white">
          {isEdit ? "ویرایش صفحه لندینگ" : "افزودن صفحه لندینگ جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-7">
        {/* Main Hero Section (متن روی ویدیو) */}
        <div className="mb-7">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">متن اصلی روی ویدیو (Main Hero)</h4>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              عنوان اصلی
            </label>
            <input
              type="text"
              name="mainHeroTitle"
              value={formData.mainHeroTitle || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              عنوان فرعی
            </label>
            <input
              type="text"
              name="mainHeroSubtitle"
              value={formData.mainHeroSubtitle || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                متن دکمه CTA اول
              </label>
              <input
                type="text"
                name="mainHeroCta1Text"
                value={formData.mainHeroCta1Text || ""}
                onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                لینک دکمه CTA اول
              </label>
              <input
                type="text"
                name="mainHeroCta1Link"
                value={formData.mainHeroCta1Link || ""}
                onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-7 border-t border-stroke pt-7 dark:border-dark-3">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">بخش هیرو (Hero)</h4>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              عنوان اصلی <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleChange}
              required
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              عنوان فرعی
            </label>
            <input
              type="text"
              name="heroSubtitle"
              value={formData.heroSubtitle || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              توضیحات
            </label>
            <textarea
              name="heroDescription"
              value={formData.heroDescription || ""}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                لینک ویدیو پس‌زمینه
              </label>
              <input
                type="text"
                name="heroVideoUrl"
                value={formData.heroVideoUrl || ""}
                onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                متن دکمه CTA
              </label>
              <input
                type="text"
                name="heroCta1Text"
                value={formData.heroCta1Text || ""}
                onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              لینک دکمه CTA
            </label>
            <input
              type="text"
              name="heroCta1Link"
              value={formData.heroCta1Link || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        {/* Why Us Section */}
        <div className="mb-7 border-t border-stroke pt-7 dark:border-dark-3">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">بخش چرا ما (Why Us)</h4>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              عنوان
            </label>
            <input
              type="text"
              name="whyUsTitle"
              value={formData.whyUsTitle || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              توضیحات
            </label>
            <textarea
              name="whyUsDescription"
              value={formData.whyUsDescription || ""}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        {/* Overlay Texts Section */}
        <div className="mb-7 border-t border-stroke pt-7 dark:border-dark-3">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">متن‌های اسکرولی روی ویدیو (Overlay Texts)</h4>

          <div className="space-y-4">
            {overlayTextsUI.map((text, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => updateOverlayText(index, e.target.value)}
                  placeholder={`متن ${index + 1}`}
                  className="flex-1 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeOverlayText(index)}
                  className="rounded bg-red px-4 py-2 text-white hover:bg-opacity-90"
                >
                  حذف
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOverlayText}
              className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90"
            >
              افزودن متن جدید
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-7 border-t border-stroke pt-7 dark:border-dark-3">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">آمار و ارقام (Stats)</h4>

          <div className="space-y-4">
            {statsDataUI.map((stat, index) => (
              <div key={index} className="rounded-[7px] border border-stroke p-4 dark:border-dark-3">
                <div className="mb-3 flex justify-between">
                  <h5 className="font-medium text-dark dark:text-white">آمار {index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeStatItem(index)}
                    className="text-sm text-red hover:underline"
                  >
                    حذف
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      برچسب
                    </label>
                    <input
                      type="text"
                      value={stat.label || ""}
                      onChange={(e) => updateStatItem(index, "label", e.target.value)}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      مقدار
                    </label>
                    <input
                      type="number"
                      value={stat.value || 0}
                      onChange={(e) => updateStatItem(index, "value", Number(e.target.value))}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      پسوند
                    </label>
                    <input
                      type="text"
                      value={stat.suffix || ""}
                      onChange={(e) => updateStatItem(index, "suffix", e.target.value)}
                      placeholder="مثال: +"
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addStatItem}
              className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90"
            >
              افزودن آمار جدید
            </button>
          </div>
        </div>

        {/* Why Us Items Section */}
        <div className="mb-7 border-t border-stroke pt-7 dark:border-dark-3">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">آیتم‌های چرا ما (Why Us Items)</h4>

          <div className="space-y-4">
            {whyUsItemsUI.map((item, index) => (
              <div key={index} className="rounded-[7px] border border-stroke p-4 dark:border-dark-3">
                <div className="mb-3 flex justify-between">
                  <h5 className="font-medium text-dark dark:text-white">آیتم {index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeWhyUsItem(index)}
                    className="text-sm text-red hover:underline"
                  >
                    حذف
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      برچسب
                    </label>
                    <input
                      type="text"
                      value={item.label || ""}
                      onChange={(e) => updateWhyUsItem(index, "label", e.target.value)}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      عنوان
                    </label>
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => updateWhyUsItem(index, "title", e.target.value)}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    متن
                  </label>
                  <textarea
                    value={item.text || ""}
                    onChange={(e) => updateWhyUsItem(index, "text", e.target.value)}
                    rows={2}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      متن دکمه
                    </label>
                    <input
                      type="text"
                      value={item.btnLabel || ""}
                      onChange={(e) => updateWhyUsItem(index, "btnLabel", e.target.value)}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                      لینک دکمه
                    </label>
                    <input
                      type="text"
                      value={item.btnHref || ""}
                      onChange={(e) => updateWhyUsItem(index, "btnHref", e.target.value)}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    مسیر تصویر
                  </label>
                  <input
                    type="text"
                    value={item.imagePath || ""}
                    onChange={(e) => updateWhyUsItem(index, "imagePath", e.target.value)}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addWhyUsItem}
              className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90"
            >
              افزودن آیتم جدید
            </button>
          </div>
        </div>

        {/* News Club Section */}
        <div className="mb-7 border-t border-stroke pt-7 dark:border-dark-3">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">بخش باشگاه خبری</h4>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              عنوان
            </label>
            <input
              type="text"
              name="newsClubTitle"
              value={formData.newsClubTitle || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              توضیحات
            </label>
            <textarea
              name="newsClubDescription"
              value={formData.newsClubDescription || ""}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        {/* Calculator Section */}
        <div className="mb-7 border-t border-stroke pt-7 dark:border-dark-3">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">بخش ماشین‌حساب سود (Calculator)</h4>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              عنوان
            </label>
            <input
              type="text"
              name="calculatorTitle"
              value={formData.calculatorTitle || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              توضیحات
            </label>
            <textarea
              name="calculatorDescription"
              value={formData.calculatorDescription || ""}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5">
            <h5 className="mb-3 text-body-sm font-semibold text-dark dark:text-white">نرخ‌های سود</h5>
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-3">
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  نرخ پایین (Low)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="calculatorRateLow"
                  value={formData.calculatorRateLow || 0}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  نرخ متوسط (Medium)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="calculatorRateMedium"
                  value={formData.calculatorRateMedium || 0}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  نرخ بالا (High)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="calculatorRateHigh"
                  value={formData.calculatorRateHigh || 0}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mb-5.5">
            <h5 className="mb-3 text-body-sm font-semibold text-dark dark:text-white">توضیحات سبدهای سرمایه‌گذاری</h5>

            <div className="mb-5.5">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                سبد پایین (Low Portfolio)
              </label>
              <textarea
                name="calculatorPortfolioLowDesc"
                value={formData.calculatorPortfolioLowDesc || ""}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                سبد متوسط (Medium Portfolio)
              </label>
              <textarea
                name="calculatorPortfolioMediumDesc"
                value={formData.calculatorPortfolioMediumDesc || ""}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                سبد بالا (High Portfolio)
              </label>
              <textarea
                name="calculatorPortfolioHighDesc"
                value={formData.calculatorPortfolioHighDesc || ""}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-5.5 grid grid-cols-1 gap-5.5 sm:grid-cols-2">
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                شماره تماس حضوری
              </label>
              <input
                type="text"
                name="calculatorInPersonPhone"
                value={formData.calculatorInPersonPhone || ""}
                onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                آیدی تلگرام آنلاین
              </label>
              <input
                type="text"
                name="calculatorOnlineTelegram"
                value={formData.calculatorOnlineTelegram || ""}
                onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              لینک تلگرام آنلاین
            </label>
            <input
              type="text"
              name="calculatorOnlineTelegramLink"
              value={formData.calculatorOnlineTelegramLink || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        {/* Meta Section */}
        <div className="mb-7 border-t border-stroke pt-7 dark:border-dark-3">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">تنظیمات SEO</h4>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              عنوان متا
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle || ""}
              onChange={handleChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              توضیحات متا
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription || ""}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              کلمات کلیدی (با کاما جدا کنید)
            </label>
            <input
              type="text"
              value={metaKeywordsInput}
              onChange={(e) => setMetaKeywordsInput(e.target.value)}
              placeholder="مثال: لندینگ, سرمایه‌گذاری, آموزش"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        {/* Settings */}
        <div className="mb-7 border-t border-stroke pt-7 dark:border-dark-3">
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">تنظیمات</h4>

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

          <div className="mb-5.5">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              ترتیب نمایش
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-60 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={createHomeLanding.isPending || updateHomeLanding.isPending}
            className="rounded bg-primary px-6 py-2.5 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
          >
            {createHomeLanding.isPending || updateHomeLanding.isPending
              ? "در حال ذخیره..."
              : "ذخیره"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeLandingForm;
