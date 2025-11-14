import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ResumeItemsTable from "@/components/ResumeItems/ResumeItemsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت آیتم‌های رزومه | پنل ادمین پیشرو",
  description: "مدیریت آیتم‌های رزومه در صفحه درباره ما",
};

const ResumeItemsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="آیتم‌های رزومه (درباره ما)" />

      <div className="flex flex-col gap-10">
        <ResumeItemsTable />
      </div>
    </DefaultLayout>
  );
};

export default ResumeItemsPage;
