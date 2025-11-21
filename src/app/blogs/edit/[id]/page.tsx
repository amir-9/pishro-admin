"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import PageContentForm from "@/components/PageContent/PageContentForm";

const EditBlogPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش پست بلاگ" />
      <PageContentForm contentId={id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditBlogPage;
