const WhyChooseUs = () => {
  return (
    <div className="py-12 bg-white px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Why Choose TaskHive? 🐝</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-blue-100 rounded-lg p-6 shadow text-center">
          <h3 className="text-lg font-bold text-blue-800 mb-2">✅ Fast Payments</h3>
          <p>Get your earnings quickly with smooth withdrawal processing.</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-6 shadow text-center">
          <h3 className="text-lg font-bold text-blue-800 mb-2">🔐 Secure Platform</h3>
          <p>Protected user data and secure payments with Stripe & Firebase Auth.</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-6 shadow text-center">
          <h3 className="text-lg font-bold text-blue-800 mb-2">📞 24/7 Support</h3>
          <p>Need help? Our team is always ready to assist via email & chat.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
