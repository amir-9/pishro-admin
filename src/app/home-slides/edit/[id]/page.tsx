"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import HomeSlideForm from "@/components/HomeSlides/HomeSlideForm";

const EditHomeSlidePage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش اسلاید" />
      <HomeSlideForm homeSlideId={id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditHomeSlidePage;
