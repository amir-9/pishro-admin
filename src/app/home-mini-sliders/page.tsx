import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import HomeMiniSlidersTable from "@/components/HomeMiniSliders/HomeMiniSlidersTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت اسلایدرهای کوچک صفحه اصلی | پنل ادمین پیشرو",
  description: "مدیریت اسلایدرهای کوچک صفحه اصلی وب‌سایت",
};

const HomeMiniSlidersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت اسلایدرهای کوچک صفحه اصلی" />
      <div className="flex flex-col gap-10">
        <HomeMiniSlidersTable />
      </div>
    </DefaultLayout>
  );
};

export default HomeMiniSlidersPage;
