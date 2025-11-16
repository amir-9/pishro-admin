import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import NewsletterSubscribersTable from "@/components/NewsletterSubscribers/NewsletterSubscribersTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت خبرنامه | پنل ادمین پیشرو",
  description: "مدیریت مشترکین خبرنامه",
};

const NewsletterSubscribersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت خبرنامه" />
      <div className="flex flex-col gap-10">
        <NewsletterSubscribersTable />
      </div>
    </DefaultLayout>
  );
};

export default NewsletterSubscribersPage;
