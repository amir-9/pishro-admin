import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ResumeItemForm from "@/components/ResumeItems/ResumeItemForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن آیتم رزومه | پنل ادمین پیشرو",
  description: "ایجاد آیتم رزومه جدید",
};

const CreateResumeItemPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن آیتم رزومه" />
      <ResumeItemForm />
    </DefaultLayout>
  );
};

export default CreateResumeItemPage;
