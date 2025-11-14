import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import CertificateForm from "@/components/Certificates/CertificateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ویرایش گواهینامه | پنل ادمین پیشرو",
  description: "ویرایش گواهینامه",
};

interface EditCertificatePageProps {
  params: {
    id: string;
  };
}

const EditCertificatePage = ({ params }: EditCertificatePageProps) => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش گواهینامه" />
      <CertificateForm certId={params.id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditCertificatePage;
