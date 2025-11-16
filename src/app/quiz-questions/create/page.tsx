import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import QuizQuestionForm from "@/components/QuizQuestions/QuizQuestionForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن سوال آزمون جدید | پنل ادمین پیشرو",
  description: "ایجاد سوال آزمون جدید",
};

const CreateQuizQuestionPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن سوال آزمون جدید" />
      <QuizQuestionForm />
    </DefaultLayout>
  );
};

export default CreateQuizQuestionPage;
