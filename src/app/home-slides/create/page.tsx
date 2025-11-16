import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import HomeSlideForm from "@/components/HomeSlides/HomeSlideForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن اسلاید جدید | پنل ادمین پیشرو",
  description: "ایجاد اسلاید جدید برای صفحه اصلی",
};

const CreateHomeSlidePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن اسلاید جدید" />
      <HomeSlideForm />
    </DefaultLayout>
  );
};

export default CreateHomeSlidePage;
