import "../styles/globals.css";
import detectEthereumProvider from "@metamask/detect-provider";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }) {
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [wrongChain, setWrongChain] = useState(false);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();

  // On initial load, set the provider. If already connected, set address and signer as well.
  useEffect(() => {
    async function getProvider() {
      if (await detectEthereumProvider()) {
        setMetamaskInstalled(true);
        let p = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Listen for chain changes
        p.on("network", (newNetwork, oldNetwork) => {
          // When a Provider makes its initial connection, it emits a "network"
          // event with a null oldNetwork along with the newNetwork. So, if the
          // oldNetwork exists, it represents a changing network
          if (oldNetwork) {
            window.location.reload();
          }
        });
        let chainId = (await p.getNetwork()).chainId;
        if (chainId !== 1) {
          setWrongChain(true);
          return;
        }
        let accounts = await p.listAccounts();
        if (accounts.length) {
          setAddress(accounts[0]);
          setSigner(p.getSigner());
        }
        setProvider(p);
        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts) => {
          console.log("Accounts changed", accounts[0]);
          setAddress(accounts[0]);
        });
      }
    }
    getProvider();
  }, []);

  const connectMetamask = async () => {
    if (provider) {
      try {
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        setSigner(provider.getSigner());
      } catch {
        console.log("User rejected connection request.");
      }
    }
  };

  return (
    <>
      <div>
        <div>BidAny</div>
        <div>
          {signer ? (
            <span>Connected as {address}</span>
          ) : (
            <button onClick={connectMetamask}>Connect</button>
          )}
        </div>
      </div>
      <Component {...pageProps} provider={provider} signer={signer} />
    </>
  );
}

export default MyApp;
