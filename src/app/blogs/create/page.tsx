import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import PageContentForm from "@/components/PageContent/PageContentForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن پست بلاگ جدید | پنل ادمین پیشرو",
  description: "ایجاد پست بلاگ جدید",
};

const CreateBlogPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن پست بلاگ جدید" />
      <PageContentForm defaultType="blog" />
    </DefaultLayout>
  );
};

export default CreateBlogPage;
