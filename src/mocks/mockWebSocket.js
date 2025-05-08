import store from '../app/store';
import { updateCryptoAssets, setLoading } from '../features/crypto/cryptoSlice';

export const startMockUpdates = () => {
  setInterval(() => {
    console.log('Starting mock WebSocket update');
    store.dispatch(setLoading());
    const assets = store.getState().crypto.assets;
    const updatedAssets = assets.map((asset) => {
      const newPrice = asset.price * (1 + (Math.random() - 0.5) * 0.05);
      // Shift chartData and reassign day labels
      const newChartData = [
        ...asset.chartData.slice(1).map((point, index) => ({
          date: `Day ${index + 1}`,
          price: point.price,
        })),
        { date: `Day 7`, price: newPrice },
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
    // Simulate a delay to make loader visible
    setTimeout(() => {
      console.log('Dispatching updated assets:', updatedAssets);
      store.dispatch(updateCryptoAssets(updatedAssets));
    }, 1000);
  }, 5000);
};