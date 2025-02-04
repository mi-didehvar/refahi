import React from "react";
import logo from "../public/novatech.png";
import zibal from "../public/zibal.png"
import Image from "next/image";
import FooterStyle from "../styles/Layout.module.css";
const Footer = ({ className }) => {
  const zibalTrustWindow = () => window.open(
    'https://gateway.zibal.ir/trustMe/' + window.location.hostname,
    '_blank',
    'width=450, height=600, scrollbars=no, resizable=no'
  );

  return (
    <footer className={className}>
      All Right's Reserved
      <div className={FooterStyle.logos}>
        <Image src={zibal} alt="zibal-trust" className="cursor-pointer" width={48} onClick={zibalTrustWindow} />
        <Image src={logo} alt="Novatech Logo" width={48} />
      </div>
    </footer>
  );
};

export default Footer;
