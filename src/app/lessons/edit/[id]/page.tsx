"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import LessonForm from "@/components/Lessons/LessonForm";

const EditLessonPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش درس" />
      <LessonForm lessonId={id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditLessonPage;
