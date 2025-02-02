import React, { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import Layout from "../../components/Layout";
import WalletStyle from "../../styles/Wallet.module.css";
import axios from "axios";
import { usePocket } from "../../hooks/UsePocket";
const Page: NextPageWithLayout = () => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const pb = usePocket();

  const pay = async () => {
    try {
      const result = await axios.post("https://gateway.zibal.ir/v1/request", {
        merchant: "65213b7bc3e074001bc7b427",
        amount: amount,
        callbackUrl: "https://snaks.liara.run/wallet/callback",
        description: `Charge ${pb.authStore.record["username"]}'s Wallet with ${amount} Rial`,
        mobile: pb.authStore.record.mobile,
      });
      result.data.result !== 100 ? setError(result.data.message) : null;
      const t = await pb.collection("transactions").create({
        trackId: result.data.trackId,
        result: result.data.result,
        user_id: pb.authStore.record.id,
      });

      window.location.href = `https://gateway.zibal.ir/start/${result.data.trackId}`;
    } catch (ex: any) {
        console.log(ex);
    }
  };

  return (
    <div className={WalletStyle.charge_container}>
      <strong>مبلغ دلخواه را وارد کنید</strong>
      <input type="text" name="amount" placeholder="مبلغ به ریال است" onChange={(e) => setAmount(Number(e.target.value))} />
      {error && <span className="error">{error}</span>}
      <button onClick={pay}>پرداخت</button>
    </div>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
