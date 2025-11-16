"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import HomeMiniSliderForm from "@/components/HomeMiniSliders/HomeMiniSliderForm";

const EditHomeMiniSliderPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش اسلایدر کوچک" />
      <HomeMiniSliderForm homeMiniSliderId={id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditHomeMiniSliderPage;
