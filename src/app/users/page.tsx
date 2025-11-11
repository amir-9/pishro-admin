import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

import UsersTable from "@/components/Users/UsersTable";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت کاربران | پنل ادمین پیشرو",

  description: "مدیریت و ویرایش کاربران",
};

const UsersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت کاربران" />

      <div className="flex flex-col gap-10">
        <UsersTable />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
