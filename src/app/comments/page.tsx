import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

import CommentsTable from "@/components/Comments/CommentsTable";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت نظرات | پنل ادمین پیشرو",

  description: "مدیریت و تایید نظرات کاربران",
};

const CommentsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت نظرات" />

      <div className="flex flex-col gap-10">
        <CommentsTable />
      </div>
    </DefaultLayout>
  );
};

export default CommentsPage;
