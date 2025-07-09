const HowItWorks = () => {
  return (
    <div className="bg-blue-50 py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">How TaskHive Works 🛠️</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">1. Sign Up</h3>
          <p>Create your account as a Worker or Buyer. It’s quick and easy.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">2. Complete Tasks or Post Work</h3>
          <p>Workers complete micro-tasks and earn coins. Buyers post tasks and get help fast.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">3. Earn or Pay Securely</h3>
          <p>Earn coins and withdraw as a Worker. Pay securely as a Buyer using Stripe.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
