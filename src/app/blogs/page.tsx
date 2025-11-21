import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BlogsTable from "@/components/Blogs/BlogsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت پست‌های بلاگ | پنل ادمین پیشرو",
  description: "مدیریت پست‌های بلاگ",
};

const BlogsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت پست‌های بلاگ" />
      <div className="flex flex-col gap-10">
        <BlogsTable />
      </div>
    </DefaultLayout>
  );
};

export default BlogsPage;
