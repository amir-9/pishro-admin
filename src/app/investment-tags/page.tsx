import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InvestmentTagsTable from "@/components/InvestmentTags/InvestmentTagsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت تگ‌های سرمایه‌گذاری | پنل ادمین پیشرو",
  description: "مدیریت تگ‌های سرمایه‌گذاری",
};

const InvestmentTagsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="تگ‌های سرمایه‌گذاری" />

      <div className="flex flex-col gap-10">
        <InvestmentTagsTable />
      </div>
    </DefaultLayout>
  );
};

export default InvestmentTagsPage;
