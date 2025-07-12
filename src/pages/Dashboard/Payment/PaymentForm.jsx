import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { coins: coinParam } = useParams(); // ✅ Get `coins` from route params
  const coins = parseInt(coinParam);
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Define valid coin-price map
  const validCoinValues = { 10: 1, 150: 10, 500: 20, 1000: 35 };
  const amount = validCoinValues[coins];

  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  // ✅ Create Stripe Payment Intent
  useEffect(() => {
    if (!validCoinValues[coins] || !user?.email) {
      Swal.fire("Invalid coin package", "Redirecting...", "error");
      navigate("/dashboard/purchase-coin");
      return;
    }

    axiosSecure
      .post("/create-payment-intent", { coins, email: user.email })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch(() => setError("Failed to create payment intent"));
  }, [coins, user?.email, axiosSecure, navigate]);

  // ✅ Handle Stripe form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: cardError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (cardError) return setError(cardError.message);

    setProcessing(true);
    setError("");

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName || "Anonymous",
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else if (result.paymentIntent.status === "succeeded") {
      const payment = {
        email: user.email,
        coins,
        amount,
        transactionId: result.paymentIntent.id,
      };

      const res = await axiosSecure.post("/payments", payment);
      if (res.data.insertedId) {
        Swal.fire("Success", "Payment successful & coins added", "success");
        navigate("/dashboard/payment-history");
      } else {
        setError("Payment succeeded but failed to save record");
      }
      setProcessing(false);
    }
  };

  // ✅ Show UI conditions
  if (!amount) return <p className="text-center mt-10 text-red-500">Invalid payment request</p>;
  if (!clientSecret) return <p className="text-center mt-10">Loading payment form...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl"
    >
      <h2 className="text-xl font-bold mb-4">Pay ${amount}</h2>
      <CardElement className="p-3 border rounded mb-4" />
      <button className="btn btn-primary w-full" type="submit" disabled={!stripe || processing}>
        {processing ? "Processing..." : `Pay $${amount}`}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default PaymentForm;
