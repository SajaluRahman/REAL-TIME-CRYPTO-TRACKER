import { useSelector } from "react-redux";
import { selectCryptoAssets, selectCryptoLoading } from "../features/crypto/cryptoSelectors";
import { Link } from "react-router-dom";
import PercentageChange from "./PercentageChange";
import { formatCurrency, formatLargeNumber } from "../utils/formatters";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Loader from "./Loader";

export default function CryptoTable() {
  const assets = useSelector(selectCryptoAssets);
  const loading = useSelector(selectCryptoLoading);
  const [filter, setFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [search, setSearch] = useState("");

  // Debug logging
  useEffect(() => {
    console.log('CryptoTable: loading=', loading, 'assets=', assets);
  }, [loading, assets]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filter and sort assets
  let filteredAssets = [...(assets || [])];

  // Apply search filter
  if (search) {
    filteredAssets = filteredAssets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(search.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply category filter
  if (filter === "gainers") {
    filteredAssets = filteredAssets.filter((asset) => asset.percentChange24h > 0);
  } else if (filter === "losers") {
    filteredAssets = filteredAssets.filter((asset) => asset.percentChange24h < 0);
  }

  // Apply sorting
  if (sortConfig.key) {
    filteredAssets.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Select top 4 gainers for cards
  const topGainers = [...filteredAssets]
    .sort((a, b) => b.percentChange24h - a.percentChange24h)
    .slice(0, 4);

  const sortableColumns = [
    { key: "price", label: "Price" },
    { key: "percentChange24h", label: "24h %" },
    { key: "marketCap", label: "Market Cap" },
    { key: "volume24h", label: "24h Volume" },
  ];

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

  return (
    <div className="px-4 py-6">
      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-md px-4 py-2 bg-gray-200 border border-blue-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-gray-200 border border-blue-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Assets</option>
            <option value="gainers">Top Gainers</option>
            <option value="losers">Top Losers</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-100 rounded-xl shadow-md border border-blue-500 mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50">#</th>
                <th className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50">Logo</th>
                <th className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50">Name</th>
                <th className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50">Symbol</th>
                {sortableColumns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50 cursor-pointer hover:bg-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {sortConfig.key === col.key && (
                        <span className="text-xs text-blue-500">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50">1h %</th>
                <th className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50">7d %</th>
                <th className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50">Circulating Supply</th>
                <th className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50">Max Supply</th>
                <th className="p-4 text-left font-semibold tracking-wide border-b border-blue-500/50">7d Chart</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset, index) => (
                  <tr
                    key={asset.symbol}
                    className="border-b border-blue-500/50 hover:bg-gray-200 transition-all duration-300 ease-in-out animate-fade-in"
                  >
                    <td className="p-4 text-gray-600">{index + 1}</td>
                    <td className="p-4">
                      <img
                        src={asset.logo || "/placeholder-logo.png"}
                        alt={`${asset.name} logo`}
                        className="w-8 h-8 rounded-full border border-blue-500/50"
                      />
                    </td>
                    <td className="p-4 font-medium">
                      <Link
                        to={`/asset/${asset.symbol}`}
                        className="text-blue-500 hover:text-blue-400 transition-colors duration-150"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-4 text-gray-600 uppercase">{asset.symbol}</td>
                    <td className="p-4 text-gray-900">{formatCurrency(asset.price)}</td>
                    <td className="p-4">
                      <PercentageChange value={asset.percentChange1h} />
                    </td>
                    <td className="p-4">
                      <PercentageChange value={asset.percentChange24h} />
                    </td>
                    <td className="p-4">
                      <PercentageChange value={asset.percentChange7d} />
                    </td>
                    <td className="p-4 text-gray-900">{formatLargeNumber(asset.marketCap)}</td>
                    <td className="p-4 text-gray-900">{formatLargeNumber(asset.volume24h)}</td>
                    <td className="p-4 text-gray-900">{formatLargeNumber(asset.circulatingSupply)}</td>
                    <td className="p-4 text-gray-900">
                      {asset.maxSupply ? formatLargeNumber(asset.maxSupply) : "∞"}
                    </td>
                    <td className="p-4">
                      <ResponsiveContainer width="100%" height={120}>
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
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="p-6 text-center text-gray-600">
                    No crypto data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Top Gainers</h2>
        {topGainers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topGainers.map((asset) => (
              <Link
                key={asset.symbol}
                to={`/asset/${asset.symbol}`}
                className="bg-gray-100 rounded-lg p-5 border border-blue-500 hover:bg-gray-200 hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={asset.logo || "/placeholder-logo.png"}
                    alt={`${asset.name} logo`}
                    className="w-12 h-12 rounded-full border-2 border-blue-500/50"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-600 uppercase">{asset.symbol}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(asset.price)}</p>
                  </div>
                  <PercentageChange value={asset.percentChange24h} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">No top gainers available</div>
        )}
      </div>
    </div>
  );
}