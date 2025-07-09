const FeaturedBuyers = () => {
  const buyers = [
    { id: 1, name: "DigitalMark", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968855.png" },
    { id: 2, name: "QuickHire Pro", logo: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png" },
    { id: 3, name: "AdBoost", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png" },
  ];

  return (
    <div className="bg-blue-50 py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Trusted by Top Buyers 👔</h2>
      <div className="flex justify-center flex-wrap gap-10">
        {buyers.map(buyer => (
          <div key={buyer.id} className="bg-white p-4 rounded-lg shadow text-center w-48">
            <img src={buyer.logo} alt={buyer.name} className="w-16 h-16 mx-auto mb-3" />
            <h4 className="text-blue-800 font-semibold">{buyer.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBuyers;
