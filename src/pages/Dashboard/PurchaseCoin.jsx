import React from "react";
import { useNavigate } from "react-router";

const coinPackages = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const navigate = useNavigate();

  const handlePurchase = (coins) => {
    navigate(`/dashboard/payment/${coins}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Purchase Coins</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coinPackages.map((pkg) => (
          <div
            key={pkg.coins}
            className="bg-white rounded-xl shadow-lg p-6 text-center border hover:shadow-xl transition cursor-pointer"
            onClick={() => handlePurchase(pkg.coins)}
          >
            <h3 className="text-2xl font-semibold">{pkg.coins} Coins</h3>
            <p className="text-lg mt-2">=</p>
            <p className="text-2xl font-bold text-green-600">${pkg.price}</p>
            <button className="btn btn-warning mt-4 text-white font-semibold w-full">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
