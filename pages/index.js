import { ethers } from "ethers";
import React, { useState } from "react";

import bidAnyJson from "../abis/BidAny.json";

const BID_ANY_ADDRESS = "0x36b15b89ccdecb831b79428d3a5ad608bdc9ec8d";

export default function Home({ signer, provider }) {
  const [contractAddress, setContractAddress] = useState("");
  const [bid, setBid] = useState("");

  const placeBid = (contractAddress, bid) => {
    const contract = new ethers.Contract(BID_ANY_ADDRESS, bidAnyJson);
    console.log(contract);
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
        <button onClick={() => placeBid(contractAddress, bid)}>Bid</button>
      </div>
    </div>
  );
}
