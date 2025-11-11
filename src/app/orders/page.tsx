import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

import OrdersTable from "@/components/Orders/OrdersTable";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدیریت سفارشات | پنل ادمین پیشرو",

  description: "مشاهده و مدیریت سفارشات کاربران",
};

const OrdersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="مدیریت سفارشات" />

      <div className="flex flex-col gap-10">
        <OrdersTable />
      </div>
    </DefaultLayout>
  );
};

export default OrdersPage;
