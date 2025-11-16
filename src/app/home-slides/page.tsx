import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import HomeSlidesTable from "@/components/HomeSlides/HomeSlidesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت اسلایدهای صفحه اصلی | پنل ادمین پیشرو",
  description: "مدیریت اسلایدهای صفحه اصلی وب‌سایت",
};

const HomeSlidesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت اسلایدهای صفحه اصلی" />
      <div className="flex flex-col gap-10">
        <HomeSlidesTable />
      </div>
    </DefaultLayout>
  );
};

export default HomeSlidesPage;
