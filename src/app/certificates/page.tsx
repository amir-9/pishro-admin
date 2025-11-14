import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import CertificatesTable from "@/components/Certificates/CertificatesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت گواهینامه‌ها | پنل ادمین پیشرو",
  description: "مدیریت گواهینامه‌ها و افتخارات در صفحه درباره ما",
};

const CertificatesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="گواهینامه‌ها و افتخارات (درباره ما)" />

      <div className="flex flex-col gap-10">
        <CertificatesTable />
      </div>
    </DefaultLayout>
  );
};

export default CertificatesPage;
