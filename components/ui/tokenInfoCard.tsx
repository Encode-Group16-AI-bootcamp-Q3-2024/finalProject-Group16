import React, { useEffect, useState } from "react";

interface TokenInfo {
  name: string;
  price: string;
  marketCap: string;
  volume24h: string;
  change24h: string;
  changePctDay: string;
}

const TokenInfoCard: React.FC<{ projectName: string }> = ({ projectName }) => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${projectName}&tsyms=USD`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("API Response:", data); // Log the response to check the structure
        const tokenData = data.DISPLAY[projectName]?.USD || {};
        setTokenInfo({
          name: projectName,
          price: tokenData.PRICE || "N/A",
          marketCap: tokenData.MKTCAP || "N/A",
          volume24h: tokenData.VOLUME24HOURTO || "N/A",
          change24h: tokenData.CHANGE24HOUR || "N/A",
          changePctDay: tokenData.CHANGEPCT24HOUR || "N/A",
        });
      } catch (error) {
        console.error("Error fetching token info:", error);
        if (error instanceof TypeError) {
          console.error("Network error or CORS issue.");
        }
      }
    };
  
    if (projectName) {
      fetchTokenInfo();
    }
  }, [projectName]);

  if (!tokenInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-4">
      <h2 className="text-xl font-bold">{tokenInfo.name}</h2>
      <p className="text-2xl font-semibold text-center">Price: ${tokenInfo.price}</p>
      <p className="text-2xl font-semibold text-center">Market Cap: {tokenInfo.marketCap}</p>
      <p className="text-2xl font-semibold text-center">24h Volume: {tokenInfo.volume24h}</p>
      <p className="text-2xl font-semibold text-center">24h Change: {tokenInfo.change24h}</p>
      <p className="text-2xl font-semibold text-center">24h Change (%): {tokenInfo.changePctDay}</p>
      <p>Chart placeholder</p>
    </div>
  );
};

export default TokenInfoCard;
