import { ethers } from "ethers";
import React, { useState } from "react";

export default function Home() {

  const [contractAddress, setContractAddress] = useState("");
  const [bid, setBid] = useState("");

  const placeBid = (contractAddress, bid) => {
    console.log({ contractAddress, bid });
  };

  return (
    <div>
      <h1>Bid Any</h1>
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
        <button onClick={() => placeBid(contractAddress, bid)}>Bid</button>
      </div>
    </div>
  );
};
