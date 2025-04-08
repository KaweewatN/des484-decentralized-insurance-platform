import React, { useState } from "react";
import { depositFund } from "@/utils/ContractServices";
import { withdrawFund } from "@/utils/ContractServices";

function ContractActions() {
  const [depositValue, setDepositValue] = useState("");

  const handleDeposit = async () => {
    try {
      await depositFund(depositValue);
    } catch (error) {
      alert((error as any)?.reason || "An unexpected error occurred");
    }
    setDepositValue("");
  };

  const handleWithdraw = async () => {
    try {
      await withdrawFund();
    } catch (error) {
      alert((error as any)?.reason || "An unexpected error occurred");
    }
  };

  return (
    <div>
      <h2>Contract Actions</h2>
      <div>
        <input
          type="text"
          value={depositValue}
          onChange={(e) => setDepositValue(e.target.value)}
          placeholder="Amount in ETH"
        />
        <button onClick={handleDeposit}>Deposit Funds</button>
      </div>
      <br />
      <div>
        <button onClick={handleWithdraw}>Withdraw Funds</button>
      </div>
    </div>
  );
}

export default ContractActions;
