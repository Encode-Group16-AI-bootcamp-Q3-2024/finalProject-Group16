import React, { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol: string;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (containerRef.current && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          container_id: containerRef.current.id, // Use a string ID
          autosize: true,
          symbol: `CRYPTO:${symbol.toUpperCase()}USD`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          news: ["headlines"],
        });
      } else {
        console.error("TradingView is not available");
      }
    };
    document.body.appendChild(script);
  }, [symbol]);
  
  return <div ref={containerRef} id="tradingview-container" style={{ height: "500px", width: "100%" }} />;
  
};

export default TradingViewChart;
