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
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{tokenInfo.name}</h2>
      <p className="text-lg font-semibold text-gray-600 mb-2">Price: <span className="text-green-500">${tokenInfo.price}</span></p>
      <p className="text-lg font-semibold text-gray-600 mb-2">Market Cap: <span className="text-blue-500">{tokenInfo.marketCap}</span></p>
      <p className="text-lg font-semibold text-gray-600 mb-2">24h Volume: <span className="text-purple-500">{tokenInfo.volume24h}</span></p>
      <p className="text-lg font-semibold text-gray-600 mb-2">24h Change: <span className={`text-${parseFloat(tokenInfo.change24h) >= 0 ? 'green' : 'red'}-500`}>{tokenInfo.change24h}</span></p>
      <p className="text-lg font-semibold text-gray-600 mb-2">24h Change (%): <span className={`text-${parseFloat(tokenInfo.changePctDay) >= 0 ? 'green' : 'red'}-500`}>{tokenInfo.changePctDay}</span></p>
    </div>
  );
};

export default TokenInfoCard;
