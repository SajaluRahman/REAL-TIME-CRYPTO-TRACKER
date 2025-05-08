import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCryptoAssets, selectCryptoLoading } from "../features/crypto/cryptoSelectors";
import { formatNumber } from "../utils/formatters";
import PercentageChange from "../components/PercentageChange";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Loader from "../components/Loader";
import { useEffect } from "react";

export default function AssetDetails() {
  const { symbol } = useParams();
  const assets = useSelector(selectCryptoAssets);
  const loading = useSelector(selectCryptoLoading);
  const asset = assets && assets.find((item) => item.symbol === symbol.toUpperCase());

  // Debug logging for chartData
  useEffect(() => {
    if (asset) {
      console.log(`AssetDetails: ${asset.symbol} chartData=`, asset.chartData);
    }
  }, [asset]);

  // Fallback chart data
  const defaultChartData = [
    { date: "Day 1", price: 100 },
    { date: "Day 2", price: 102 },
    { date: "Day 3", price: 101 },
    { date: "Day 4", price: 104 },
    { date: "Day 5", price: 103 },
    { date: "Day 6", price: 105 },
    { date: "Day 7", price: 106 },
  ];

  if (loading || !assets) {
    return <Loader />;
  }

  if (!asset) {
    return <div className="p-6 text-center text-lg text-gray-600">Asset not found.</div>;
  }

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <div className="bg-gray-100 rounded-2xl shadow-md p-6 border border-blue-500">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={asset.logo || "/placeholder-logo.png"}
            alt={asset.name}
            className="w-16 h-16 rounded-full border border-blue-500/50"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {asset.name} <span className="text-gray-600">({asset.symbol})</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-900">
          <p><span className="font-semibold">Price:</span> ${formatNumber(asset.price)}</p>
          <p><span className="font-semibold">Market Cap:</span> ${formatNumber(asset.marketCap)}</p>
          <p><span className="font-semibold">24h Volume:</span> ${formatNumber(asset.volume24h)}</p>
          <p><span className="font-semibold">Circulating Supply:</span> {formatNumber(asset.circulatingSupply)}</p>
          <p><span className="font-semibold">Max Supply:</span> {asset.maxSupply ? formatNumber(asset.maxSupply) : "∞"}</p>
          <p><span className="font-semibold">1h %:</span> <PercentageChange value={asset.percentChange1h} /></p>
          <p><span className="font-semibold">24h %:</span> <PercentageChange value={asset.percentChange24h} /></p>
          <p><span className="font-semibold">7d %:</span> <PercentageChange value={asset.percentChange7d} /></p>
        </div>

        <div className="my-6">
          <h2 className="text-lg font-semibold text-blue-500 mb-2">7-Day Price Chart</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={asset.chartData || defaultChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="date" stroke="#4b5563" />
              <YAxis stroke="#4b5563" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Link
          to="/"
          className="inline-block mt-4 text-blue-500 font-medium hover:text-blue-400 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}