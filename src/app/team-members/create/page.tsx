import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TeamMemberForm from "@/components/TeamMembers/TeamMemberForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن عضو تیم | پنل ادمین پیشرو",
  description: "ایجاد عضو تیم جدید",
};

const CreateTeamMemberPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="افزودن عضو تیم" />
      <TeamMemberForm />
    </DefaultLayout>
  );
};

export default CreateTeamMemberPage;
