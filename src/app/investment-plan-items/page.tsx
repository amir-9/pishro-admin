import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InvestmentPlanItemsTable from "@/components/InvestmentPlanItems/InvestmentPlanItemsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت سبدهای سرمایه‌گذاری | پنل ادمین پیشرو",
  description: "مدیریت انواع سبدهای سرمایه‌گذاری",
};

const InvestmentPlanItemsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="انواع سبدهای سرمایه‌گذاری" />

      <div className="flex flex-col gap-10">
        <InvestmentPlanItemsTable />
      </div>
    </DefaultLayout>
  );
};

export default InvestmentPlanItemsPage;
