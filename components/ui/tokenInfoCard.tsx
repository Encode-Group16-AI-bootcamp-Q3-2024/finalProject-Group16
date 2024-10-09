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
        try {
          const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${projectName}`, {
            headers: {
              'X-CMC_PRO_API_KEY': '7c48ddbd-775c-45de-b8d5-399437eb935c'
            }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("API Response:", data); // Log the response to check the structure
          const tokenData = data.data[projectName]?.quote?.USD || {};
          setTokenInfo({
            name: projectName,
            price: tokenData.price ? `$${tokenData.price.toFixed(2)}` : "N/A",
            marketCap: tokenData.market_cap ? `$${tokenData.market_cap.toLocaleString()}` : "N/A",
            volume24h: tokenData.volume_24h ? `$${tokenData.volume_24h.toLocaleString()}` : "N/A",
            change24h: tokenData.percent_change_24h ? `${tokenData.percent_change_24h.toFixed(2)}%` : "N/A",
            changePctDay: tokenData.percent_change_24h ? `${tokenData.percent_change_24h.toFixed(2)}%` : "N/A",
          });
        } catch (error) {
          console.error("Error fetching token info:", error);
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
