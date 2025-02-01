import React, { useState } from 'react';
import WalletStyle from '../../styles/Wallet.module.css';
import Link from 'next/link';
import { usePocket } from '../../hooks/UsePocket';
const Credit = () => {
    const pb = usePocket()
    const [amount,setAmount] = useState(pb?.authStore?.record?.credit || 0);
  return (
    <div className={WalletStyle.credit}>
        موجودی: <strong> {amount} </strong>ریال
        <Link href="/wallet/charge">+</Link>
    </div>
  );
};

export default Credit;
