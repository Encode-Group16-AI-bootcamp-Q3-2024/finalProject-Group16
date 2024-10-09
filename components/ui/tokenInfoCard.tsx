import React, { useEffect, useState } from "react";

interface TokenInfo {
  name: string;
  price: number;
  chartUrl: string;
}

const TokenInfoCard: React.FC<{ projectName: string }> = ({ projectName }) => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${projectName}`);
        const data = await response.json();
        setTokenInfo({
          name: data.name,
          price: data.price,
          chartUrl: data.chartUrl, // Assuming the API provides a chart URL
        });
      } catch (error) {
        console.error("Error fetching token info:", error);
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
      <p>Price: ${tokenInfo.price}</p>
      <iframe src={tokenInfo.chartUrl} title="Token Chart" className="w-full h-64"></iframe>
    </div>
  );
};

export default TokenInfoCard;
