import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import HomeMiniSliderForm from "@/components/HomeMiniSliders/HomeMiniSliderForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن اسلایدر کوچک جدید | پنل ادمین پیشرو",
  description: "ایجاد اسلایدر کوچک جدید برای صفحه اصلی",
};

const CreateHomeMiniSliderPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن اسلایدر کوچک جدید" />
      <HomeMiniSliderForm />
    </DefaultLayout>
  );
};

export default CreateHomeMiniSliderPage;
