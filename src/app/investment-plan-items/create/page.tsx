import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InvestmentPlanItemForm from "@/components/InvestmentPlanItems/InvestmentPlanItemForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن سبد سرمایه‌گذاری | پنل ادمین پیشرو",
  description: "ایجاد سبد سرمایه‌گذاری جدید",
};

const CreateInvestmentPlanItemPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن سبد سرمایه‌گذاری" />
      <InvestmentPlanItemForm />
    </DefaultLayout>
  );
};

export default CreateInvestmentPlanItemPage;
