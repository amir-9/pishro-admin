import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InvestmentTagForm from "@/components/InvestmentTags/InvestmentTagForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن تگ سرمایه‌گذاری | پنل ادمین پیشرو",
  description: "ایجاد تگ سرمایه‌گذاری جدید",
};

const CreateInvestmentTagPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن تگ سرمایه‌گذاری" />
      <InvestmentTagForm />
    </DefaultLayout>
  );
};

export default CreateInvestmentTagPage;
