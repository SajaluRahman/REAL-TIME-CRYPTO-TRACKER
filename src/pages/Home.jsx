import CryptoTable from "../components/CryptoTable";
 
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-8 animate-fade-in text-center">
          Crypto Price Tracker
        </h1>
        <div className="bg-gray-100 rounded-2xl shadow-md border border-blue-500 p-6 animate-pulse-subtle">
          <CryptoTable />
        </div>
      </div>
    </div>
  );
}