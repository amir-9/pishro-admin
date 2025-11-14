import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InvestmentPlanItemForm from "@/components/InvestmentPlanItems/InvestmentPlanItemForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ویرایش سبد سرمایه‌گذاری | پنل ادمین پیشرو",
  description: "ویرایش سبد سرمایه‌گذاری",
};

interface EditInvestmentPlanItemPageProps {
  params: {
    id: string;
  };
}

const EditInvestmentPlanItemPage = ({ params }: EditInvestmentPlanItemPageProps) => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش سبد سرمایه‌گذاری" />
      <InvestmentPlanItemForm planId={params.id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditInvestmentPlanItemPage;
