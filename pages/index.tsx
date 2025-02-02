import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { usePocket } from "../hooks/UsePocket";
import { useRouter } from "next/router";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
  const pb = usePocket();
  const router = useRouter();

  const logout = async () => {
    await pb.authStore.clear();
    router.push("login");
  };
  return (
    <div>
      <p>{pb.authStore?.record?.name} عزیز. خوش آومدی</p>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <button>داشبورد سفارش</button>
        </Link>
        <button>نظرسنجی (به‌زودی)</button>
        {
          ["superUser","productOwner"].includes(pb.authStore.record.role) && (
            <>
              <Link href="/product/management">
                <button>مدیریت محصولات</button>
              </Link>

            </>
          )
        }

<button onClick={logout}>خروج</button>

      </div>
    </div>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
