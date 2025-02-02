"use client";

import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { usePocket } from "../hooks/UsePocket";
import { useRouter } from "next/router";
import Link from "next/link";

// Define the expected user shape
interface UserData {
  name?: string;
  role?: string;
}

const Page: NextPageWithLayout = () => {
  const pb = usePocket();
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (pb.authStore.record) {
      // Extract only necessary fields
      setUser({
        name: pb.authStore.record.name,
        role: pb.authStore.record.role,
      });
    }
  }, [pb.authStore.record]);

  const logout = async () => {
    await pb.authStore.clear();
    router.push("login");
  };

  if (!user) return <p>Loading...</p>; // Prevents hydration mismatch

  return (
    <div>
      <p><span>{user.name}</span> عزیز. خوش آومدی</p>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <button>داشبورد سفارش</button>
        </Link>
        <button>نظرسنجی (به‌زودی)</button>
        {["superUser", "productOwner"].includes(user.role) && (
          <Link href="/product/management">
            <button>مدیریت محصولات</button>
          </Link>
        )}
        <button onClick={logout}>خروج</button>
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
