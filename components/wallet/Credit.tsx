import React, { useEffect, useState } from 'react';
import WalletStyle from '../../styles/Wallet.module.css';
import Link from 'next/link';
import { usePocket } from '../../hooks/UsePocket';
import { usePriceFormatter } from '../../hooks/UseFormatters';
const Credit = () => {
  const pb = usePocket()
  const [amount, setAmount] = useState(pb?.authStore?.record?.credit || 0);

  useEffect(() => {
    if (pb?.authStore?.record) {
      setAmount(pb.authStore.record.credit);
    }
  }, [pb?.authStore?.record]); // Watching the entire record

  return (
    <div className={WalletStyle.credit}>
      موجودی: <strong> {usePriceFormatter(amount)} </strong>ریال
      <Link href="/wallet/charge">+</Link>
    </div>
  );
};

export default Credit;
