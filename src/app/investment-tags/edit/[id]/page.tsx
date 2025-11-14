import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InvestmentTagForm from "@/components/InvestmentTags/InvestmentTagForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ویرایش تگ سرمایه‌گذاری | پنل ادمین پیشرو",
  description: "ویرایش تگ سرمایه‌گذاری",
};

interface EditInvestmentTagPageProps {
  params: {
    id: string;
  };
}

const EditInvestmentTagPage = ({ params }: EditInvestmentTagPageProps) => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش تگ سرمایه‌گذاری" />
      <InvestmentTagForm tagId={params.id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditInvestmentTagPage;
