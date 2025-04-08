import React, { useEffect, useState } from "react";
import { getContractBalanceInETH } from "@/utils/ContractServices";

function ContractInfo({ account }: { account: string }) {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const balanceInETH = await getContractBalanceInETH();
      setBalance(balanceInETH);
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Contract Balance: {balance} ETH</h2>
      <p>Connected Account: {account}</p>
    </div>
  );
}

export default ContractInfo;
