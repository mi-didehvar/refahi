import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePocket } from "../../hooks/UsePocket";
import Link from "next/link";
import WalletStyle from '../../styles/Wallet.module.css'

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  FAILED = "failed",
}

const CallbackPage = () => {
  const router = useRouter();
  const { success, trackId } = router.query;
  const [status, setStatus] = useState(Status.LOADING);
  const pb = usePocket();
  useEffect(() => {
    const verifyPayment = async () => {
      const result = await axios.post("https://gateway.zibal.ir/v1/verify", {
        merchant: "65213b7bc3e074001bc7b427",
        trackId: trackId,
      });

      if (result.data.result === 100) {
        pb.collection("users").update(pb.authStore.record.id, {
          credit: pb.authStore.record.credit + result.data.amount,
        });
        pb.authStore.record.credit = pb.authStore.record.credit + result.data.amount
        setStatus(Status.SUCCESS);
        return
      }
      setStatus(Status.FAILED);
    };
    verifyPayment();
  }, [trackId]);

  return (
    <div className={WalletStyle.callback_container}>
      {status === Status.LOADING && <h1>درحال بررسی تراکنش هستیم</h1>}
      {status === Status.SUCCESS && <h1 className={WalletStyle.success}>کیف پول شما با موفقیت شارژ شد</h1>}
      {status === Status.FAILED && <h1 className={WalletStyle.failed}>تراکنش با خطا مواجه شد</h1>}
      {status !== Status.LOADING && <Link href="/dashboard">بازگشت</Link>}
    </div>
  );
};

export default CallbackPage;
