import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useEffect } from "react";
import LayoutStyles from "../styles/Layout.module.css";
import { usePocket } from "../hooks/UsePocket";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const pb = usePocket();
  const router = useRouter();
  useEffect(() => {
    !pb.authStore.isValid && router.push("/login");
  }, []);

  return (
    <>
      <Head>
        <title>Next.js App</title>
        <meta
          name="description"
          content="Next.js application with global layout"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`container ${LayoutStyles.layout}`}>
        <Navbar styles={LayoutStyles} />
        <main className={LayoutStyles.main}>
          {children}
        </main>
        <Footer className={LayoutStyles.footer}/>
      </div>
    </>
  );
};

export default Layout;
