import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

import CourseForm from "@/components/Courses/CourseForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن دوره جدید | پنل ادمین پیشرو",

  description: "ایجاد دوره آموزشی جدید",
};

const CreateCoursePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن دوره جدید" />

      <CourseForm />
    </DefaultLayout>
  );
};

export default CreateCoursePage;
