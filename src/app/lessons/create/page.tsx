import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import LessonForm from "@/components/Lessons/LessonForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن درس جدید | پنل ادمین پیشرو",
  description: "ایجاد درس جدید",
};

const CreateLessonPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن درس جدید" />
      <LessonForm />
    </DefaultLayout>
  );
};

export default CreateLessonPage;
