import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

import EnrollmentsTable from "@/components/Enrollments/EnrollmentsTable";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت ثبت‌نام‌ها | پنل ادمین پیشرو",

  description: "مشاهده و مدیریت ثبت‌نام‌های دوره‌ها",
};

const EnrollmentsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت ثبت‌نام‌ها" />

      <div className="flex flex-col gap-10">
        <EnrollmentsTable />
      </div>
    </DefaultLayout>
  );
};

export default EnrollmentsPage;
