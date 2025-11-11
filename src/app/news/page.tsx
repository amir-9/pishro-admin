import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

import NewsTable from "@/components/News/NewsTable";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت اخبار و مقالات | پنل ادمین پیشرو",

  description: "مدیریت اخبار و مقالات وب‌سایت",
};

const NewsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت اخبار و مقالات" />

      <div className="flex flex-col gap-10">
        <NewsTable />
      </div>
    </DefaultLayout>
  );
};

export default NewsPage;
