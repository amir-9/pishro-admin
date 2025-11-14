import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import CertificateForm from "@/components/Certificates/CertificateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن گواهینامه | پنل ادمین پیشرو",
  description: "ایجاد گواهینامه جدید",
};

const CreateCertificatePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن گواهینامه" />
      <CertificateForm />
    </DefaultLayout>
  );
};

export default CreateCertificatePage;
