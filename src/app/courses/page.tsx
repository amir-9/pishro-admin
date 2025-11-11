import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

import CoursesTable from "@/components/Courses/CoursesTable";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت دوره‌ها | پنل ادمین پیشرو",

  description: "مدیریت و ویرایش دوره‌های آموزشی",
};

const CoursesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت دوره‌ها" />

      <div className="flex flex-col gap-10">
        <CoursesTable />
      </div>
    </DefaultLayout>
  );
};

export default CoursesPage;
