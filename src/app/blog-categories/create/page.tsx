import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import CategoryForm from "@/components/Categories/CategoryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن دسته‌بندی بلاگ جدید | پنل ادمین پیشرو",
  description: "ایجاد دسته‌بندی بلاگ جدید",
};

const CreateBlogCategoryPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن دسته‌بندی بلاگ جدید" />
      <CategoryForm />
    </DefaultLayout>
  );
};

export default CreateBlogCategoryPage;
