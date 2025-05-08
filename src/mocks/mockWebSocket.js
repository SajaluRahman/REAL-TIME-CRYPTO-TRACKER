import store from '../app/store';
import { updateCryptoAssets, setLoading } from '../features/crypto/cryptoSlice';

export const startMockUpdates = () => {
  setInterval(() => {
    store.dispatch(setLoading());
    const assets = store.getState().crypto.assets;
    const updatedAssets = assets.map((asset) => {
      const newPrice = asset.price * (1 + (Math.random() - 0.5) * 0.05);
      const newChartData = [
        ...asset.chartData.slice(1),
        { date: `Day ${asset.chartData.length}`, price: newPrice },
      ];
      return {
        ...asset,
        price: newPrice,
        percentChange1h: (Math.random() - 0.5) * 2,
        percentChange24h: (Math.random() - 0.5) * 5,
        percentChange7d: (Math.random() - 0.5) * 10,
        chartData: newChartData,
      };
    });
    store.dispatch(updateCryptoAssets(updatedAssets));
  }, 5000);
};