"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import NewsCommentForm from "@/components/NewsComments/NewsCommentForm";

const EditNewsCommentPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش نظر" />
      <NewsCommentForm commentId={id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditNewsCommentPage;
