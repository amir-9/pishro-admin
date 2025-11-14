import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TeamMemberForm from "@/components/TeamMembers/TeamMemberForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ویرایش عضو تیم | پنل ادمین پیشرو",
  description: "ویرایش عضو تیم",
};

interface EditTeamMemberPageProps {
  params: {
    id: string;
  };
}

const EditTeamMemberPage = ({ params }: EditTeamMemberPageProps) => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ویرایش عضو تیم" />
      <TeamMemberForm memberId={params.id} isEdit={true} />
    </DefaultLayout>
  );
};

export default EditTeamMemberPage;
