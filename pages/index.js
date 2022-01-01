import { ethers } from "ethers";
import React, { useState } from "react";

import bidAnyJson from "../abis/BidAny.json";

const BID_ANY_ADDRESS = "0x36b15b89ccdecb831b79428d3a5ad608bdc9ec8d";

export default function Home({ signer, provider, address, connectMetamask }) {
  const [contractAddress, setContractAddress] = useState("");
  const [bid, setBid] = useState("");

  const placeBid = async (contractAddress, bid) => {
    const contract = new ethers.Contract(BID_ANY_ADDRESS, bidAnyJson, signer);
    const currentBid = await contract.bids(address, contractAddress);
    console.log(currentBid);
  };

  return (
    <div>
      <div>
        <input
          value={contractAddress}
          onChange={(e) => setContractAddress(e.currentTarget.value)}
          placeholder="Contract Address"
        />
        <input
          type="number"
          value={bid}
          onChange={(e) => setBid(e.currentTarget.value)}
          placeholder="Bid Amount (in ETH)"
        />
        {signer ? (
          <button onClick={() => placeBid(contractAddress, bid)}>Bid</button>
        ) : (
          <button onClick={connectMetamask}>Connect</button>
        )}
      </div>
    </div>
  );
}
