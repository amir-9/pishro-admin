import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TeamMembersTable from "@/components/TeamMembers/TeamMembersTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت اعضای تیم | پنل ادمین پیشرو",
  description: "مدیریت اعضای تیم در صفحه درباره ما",
};

const TeamMembersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="اعضای تیم (درباره ما)" />

      <div className="flex flex-col gap-10">
        <TeamMembersTable />
      </div>
    </DefaultLayout>
  );
};

export default TeamMembersPage;
