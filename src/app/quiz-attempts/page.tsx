import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import QuizAttemptsTable from "@/components/QuizAttempts/QuizAttemptsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت تلاش‌های آزمون | پنل ادمین پیشرو",
  description: "مشاهده تلاش‌های کاربران در آزمون‌ها",
};

const QuizAttemptsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت تلاش‌های آزمون" />
      <div className="flex flex-col gap-10">
        <QuizAttemptsTable />
      </div>
    </DefaultLayout>
  );
};

export default QuizAttemptsPage;
