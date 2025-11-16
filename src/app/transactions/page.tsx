import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TransactionsTable from "@/components/Transactions/TransactionsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت تراکنش‌ها | پنل ادمین پیشرو",
  description: "مدیریت تراکنش‌های مالی",
};

const TransactionsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت تراکنش‌ها" />
      <div className="flex flex-col gap-10">
        <TransactionsTable />
      </div>
    </DefaultLayout>
  );
};

export default TransactionsPage;
