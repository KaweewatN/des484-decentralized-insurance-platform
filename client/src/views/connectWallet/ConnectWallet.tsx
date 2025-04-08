"use client";

import React, { useState, useEffect } from "react";
import ConnectWalletButton from "./components/ContractButton";
import ContractInfo from "./components/ContractInfo";
import ContractActions from "./components/ContractActions";
import { requestAccount } from "@/utils/ContractServices";

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };
    fetchCurAccount();
  }, []);

  useEffect(() => {
    const handleAccountChanged = (newAccounts: string[]) => {
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  }, []);

  return (
    <div className="app">
      {!account ? (
        <ConnectWalletButton setAccount={setAccount} />
      ) : (
        <div className="contract-interactions">
          <ContractInfo account={account} />
          <ContractActions />
        </div>
      )}
    </div>
  );
}
