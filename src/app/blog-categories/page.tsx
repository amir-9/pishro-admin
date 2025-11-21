import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BlogCategoriesTable from "@/components/BlogCategories/BlogCategoriesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت دسته‌بندی‌های بلاگ | پنل ادمین پیشرو",
  description: "مدیریت دسته‌بندی‌های بلاگ",
};

const BlogCategoriesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت دسته‌بندی‌های بلاگ" />
      <div className="flex flex-col gap-10">
        <BlogCategoriesTable />
      </div>
    </DefaultLayout>
  );
};

export default BlogCategoriesPage;
