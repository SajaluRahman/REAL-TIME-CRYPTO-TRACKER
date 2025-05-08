import { createSlice } from '@reduxjs/toolkit';
import BTClogo from '../../assets/logos/bitcoin-btc-logo.png';
import Ethereumlogo from '../../assets/logos/ethereum-eth-logo.png';
import Tetherlogo from '../../assets/logos/tether-usdt-logo.png';
import Cardanologo from '../../assets/logos/cardano-ada-logo.png';
import Binancelogo from '../../assets/logos/binance-usd-busd-logo.png';
import Solanalogo from '../../assets/logos/solana-sol-logo.png';
import XRPlogo from '../../assets/logos/xrp-xrp-logo.png';

const initialState = {
  assets: [
    {
      symbol: "BTC",
      name: "Bitcoin",
      logo: BTClogo,
      price: 45000,
      percentChange1h: 0.15,
      percentChange24h: -2.3,
      percentChange7d: 3.5,
      marketCap: 850000000000,
      volume24h: 32000000000,
      circulatingSupply: 19000000,
      maxSupply: 21000000,
      chart: "https://via.placeholder.com/300x200?text=BTC+Chart",
      chartData: [
        { date: "Day 1", price: 44000 },
        { date: "Day 2", price: 44500 },
        { date: "Day 3", price: 44200 },
        { date: "Day 4", price: 44800 },
        { date: "Day 5", price: 44700 },
        { date: "Day 6", price: 44900 },
        { date: "Day 7", price: 45000 },
      ],
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      logo: Ethereumlogo,
      price: 3500,
      percentChange1h: 0.25,
      percentChange24h: -1.8,
      percentChange7d: 2.1,
      marketCap: 400000000000,
      volume24h: 23000000000,
      circulatingSupply: 115000000,
      maxSupply: 115000000,
      chart: "https://via.placeholder.com/300x200?text=ETH+Chart",
      chartData: [
        { date: "Day 1", price: 3400 },
        { date: "Day 2", price: 3450 },
        { date: "Day 3", price: 3430 },
        { date: "Day 4", price: 3480 },
        { date: "Day 5", price: 3470 },
        { date: "Day 6", price: 3490 },
        { date: "Day 7", price: 3500 },
      ],
    },
    {
      symbol: "USDT",
      name: "Tether",
      logo: Tetherlogo,
      price: 1.00,
      percentChange1h: 0.01,
      percentChange24h: 0.05,
      percentChange7d: 0.02,
      marketCap: 68000000000,
      volume24h: 78000000000,
      circulatingSupply: 68000000000,
      maxSupply: null,
      chart: "https://via.placeholder.com/300x200?text=USDT+Chart",
      chartData: [
        { date: "Day 1", price: 1.00 },
        { date: "Day 2", price: 1.00 },
        { date: "Day 3", price: 1.00 },
        { date: "Day 4", price: 1.00 },
        { date: "Day 5", price: 1.00 },
        { date: "Day 6", price: 1.00 },
        { date: "Day 7", price: 1.00 },
      ],
    },
    {
      symbol: "ADA",
      name: "Cardano",
      logo: Cardanologo,
      price: 2.50,
      percentChange1h: 0.45,
      percentChange24h: 5.2,
      percentChange7d: 6.8,
      marketCap: 80000000000,
      volume24h: 1800000000,
      circulatingSupply: 32000000000,
      maxSupply: 45000000000,
      chart: "https://via.placeholder.com/300x200?text=ADA+Chart",
      chartData: [
        { date: "Day 1", price: 2.30 },
        { date: "Day 2", price: 2.35 },
        { date: "Day 3", price: 2.40 },
        { date: "Day 4", price: 2.45 },
        { date: "Day 5", price: 2.47 },
        { date: "Day 6", price: 2.48 },
        { date: "Day 7", price: 2.50 },
      ],
    },
    {
      symbol: "BNB",
      name: "Binance Coin",
      logo: Binancelogo,
      price: 400,
      percentChange1h: -0.5,
      percentChange24h: -1.2,
      percentChange7d: 4.1,
      marketCap: 70000000000,
      volume24h: 2800000000,
      circulatingSupply: 175000000,
      maxSupply: 200000000,
      chart: "https://via.placeholder.com/300x200?text=BNB+Chart",
      chartData: [
        { date: "Day 1", price: 390 },
        { date: "Day 2", price: 395 },
        { date: "Day 3", price: 392 },
        { date: "Day 4", price: 398 },
        { date: "Day 5", price: 397 },
        { date: "Day 6", price: 399 },
        { date: "Day 7", price: 400 },
      ],
    },
    {
      symbol: "SOL",
      name: "Solana",
      logo: Solanalogo,
      price: 150,
      percentChange1h: 0.1,
      percentChange24h: -0.6,
      percentChange7d: 2.9,
      marketCap: 47000000000,
      volume24h: 1200000000,
      circulatingSupply: 310000000,
      maxSupply: null,
      chart: "https://via.placeholder.com/300x200?text=SOL+Chart",
      chartData: [
        { date: "Day 1", price: 145 },
        { date: "Day 2", price: 147 },
        { date: "Day 3", price: 146 },
        { date: "Day 4", price: 149 },
        { date: "Day 5", price: 148 },
        { date: "Day 6", price: 149 },
        { date: "Day 7", price: 150 },
      ],
    },
    {
      symbol: "XRP",
      name: "XRP",
      logo: XRPlogo,
      price: 1.30,
      percentChange1h: 0.02,
      percentChange24h: -0.3,
      percentChange7d: 1.4,
      marketCap: 65000000000,
      volume24h: 3500000000,
      circulatingSupply: 50000000000,
      maxSupply: 100000000000,
      chart: "https://via.placeholder.com/300x200?text=XRP+Chart",
      chartData: [
        { date: "Day 1", price: 1.28 },
        { date: "Day 2", price: 1.29 },
        { date: "Day 3", price: 1.28 },
        { date: "Day 4", price: 1.30 },
        { date: "Day 5", price: 1.29 },
        { date: "Day 6", price: 1.30 },
        { date: "Day 7", price: 1.30 },
      ],
    },
  ],
  loading: true, // Set to true initially for testing
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoAssets: (state, action) => {
      state.assets = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { updateCryptoAssets, setLoading } = cryptoSlice.actions;
export default cryptoSlice.reducer;