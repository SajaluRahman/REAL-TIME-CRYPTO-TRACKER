import { Link } from "react-router-dom";


export default function About() {
  return (
    <div className="min-h-screen bg-gray-800">
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-red-500 mb-8 animate-fade-in text-center">
          About CryptoHub
        </h1>
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-red-500 p-6 text-gray-200">
          <p className="text-lg mb-4">
            CryptoHub is your go-to platform for tracking cryptocurrency prices, market trends, and asset details.
            Stay informed with real-time updates and explore a wide range of digital assets.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 text-red-500 font-medium hover:text-red-400 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}