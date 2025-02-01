import LoginStyles from "../styles/Login.module.css";
import Layout from "../components/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { useState } from "react";
import { useRouter } from "next/router";
import { usePocket } from "../hooks/UsePocket";

interface LoginForm {
  username: string;
  password: string;
}

const Page: NextPageWithLayout = () => {
  const pb = usePocket()
  const router = useRouter();

  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection("users").authWithPassword(
        formData.username,
        formData.password
      );
      router.push("/dashboard");
    } catch (err) {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className={LoginStyles.login_container}>
      شما درحال ورود به پنل رفاهی همکاران نواتک هستید
      <form onSubmit={handleSubmit} className={LoginStyles.login_form}>
        <label>
          نام کاربری
          <input type="text" placeholder="نام کاربری شماره موبایل شماست" name="username" onChange={handleChange} />
        </label>
        <label>
          رمز عبور
          <input type="password" name="password" placeholder="رمز عبور" onChange={handleChange}  />
        </label>
        <p className="error">{error}</p>
        <input type="submit" value='ورود' />
      </form>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
