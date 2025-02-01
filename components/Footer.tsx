import React from "react";
import logo from "../public/novatech.png";
import Image from "next/image";
import Script from "next/script";
import FooterStyle from "../styles/Layout.module.css";
const Footer = ({ className }) => {
  return (
    <footer className={className}>
      All Right's Reserved
      <div className={FooterStyle.logos}>
        <Image src={logo} alt="Novatech Logo" width={48} />
        <Script
          src="https://zibal.ir/trust/scripts/zibal-trust-v3.js"
          type="text/javascript"
        />
      </div>
    </footer>
  );
};

export default Footer;
