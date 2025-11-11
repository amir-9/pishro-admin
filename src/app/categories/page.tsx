import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

import CategoriesTable from "@/components/Categories/CategoriesTable";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت دسته‌بندی‌ها | پنل ادمین پیشرو",

  description: "مدیریت دسته‌بندی‌های سایت",
};

const CategoriesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت دسته‌بندی‌ها" />

      <div className="flex flex-col gap-10">
        <CategoriesTable />
      </div>
    </DefaultLayout>
  );
};

export default CategoriesPage;
