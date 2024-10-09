import React, { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol: string;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && window.TradingView) {
      new window.TradingView.widget({
        container_id: containerRef.current,
        autosize: true,
        symbol: `CRYPTO:${symbol.toUpperCase()}USD`, // Ensure the symbol is uppercase
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
    }
  }, [symbol]);

  return <div ref={containerRef} style={{ height: "500px" }} />;
};

export default TradingViewChart;
