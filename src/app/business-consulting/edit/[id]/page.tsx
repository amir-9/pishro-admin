"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BusinessConsultingForm from "@/components/BusinessConsulting/BusinessConsultingForm";

const EditBusinessConsultingPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش مشاوره سرمایه‌گذاری" />
      <BusinessConsultingForm consultingId={id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditBusinessConsultingPage;
