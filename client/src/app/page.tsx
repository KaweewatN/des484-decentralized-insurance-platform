import ConnectWallet from "../views/connectWallet/ConnectWallet";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-8">
        Web3 Wallet Connection
      </h1>
      <div className="flex justify-center">
        <ConnectWallet />
      </div>
    </main>
  );
}
