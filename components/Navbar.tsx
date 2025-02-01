import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { usePocket } from "../hooks/UsePocket";
import Credit from "./wallet/Credit";
const Navbar = ({ styles }) => {
  const pb = usePocket();
  const [isAuthValid, setAuthValid] = useState(false);

  useEffect(() => {
    setAuthValid(pb.authStore.isValid);
  }, [pb.authStore.isValid]);

  return (
    <nav className={styles.navbar}>
      <div className="flex items-center">
        <Link href="/" className={styles.logo}>
          نواتک <small className={styles.small}>سامانه رفاهی</small>
        </Link>
      </div>
      <div className="flex items-center text-white">
        {isAuthValid ? <Credit/> : <Link href="/login">ورود</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
