import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ResumeItemForm from "@/components/ResumeItems/ResumeItemForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ویرایش آیتم رزومه | پنل ادمین پیشرو",
  description: "ویرایش آیتم رزومه",
};

interface EditResumeItemPageProps {
  params: {
    id: string;
  };
}

const EditResumeItemPage = ({ params }: EditResumeItemPageProps) => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش آیتم رزومه" />
      <ResumeItemForm itemId={params.id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditResumeItemPage;
