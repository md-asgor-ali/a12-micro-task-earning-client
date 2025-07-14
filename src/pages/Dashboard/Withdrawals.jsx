import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios"; // ✅ Import useAxios
import Swal from "sweetalert2";

const Withdrawals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios(); // ✅ use secure axios instance
  const [coins, setCoins] = useState(0);
  const [coinToWithdraw, setCoinToWithdraw] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");

  // Fetch current coins
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setCoins(res.data.coins || 0);
      });
    }
  }, [user, axiosSecure]);

  // Update withdrawal amount as coin changes
  useEffect(() => {
    const amount = Math.floor(Number(coinToWithdraw || 0) / 20);
    setWithdrawalAmount(amount);
  }, [coinToWithdraw]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (coinToWithdraw > coins) {
      return Swal.fire("Error", "You don't have enough coins", "error");
    }

    const payload = {
      worker_email: user?.email,
      worker_name: user?.displayName || "Unnamed",
      withdrawal_coin: Number(coinToWithdraw),
      withdrawal_amount: withdrawalAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date(),
      status: "pending",
    };

    try {
      await axiosSecure.post("/withdrawals", payload);
      setCoins((prev) => prev - Number(coinToWithdraw));
      setCoinToWithdraw("");
      setWithdrawalAmount(0);
      setAccountNumber("");
      Swal.fire("Success", "Withdrawal request submitted!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Withdraw Coins</h2>

      <p className="mb-2">
        <strong>Your Coins:</strong> {coins}
      </p>
      <p className="mb-4">
        <strong>Equivalent USD:</strong> ${(coins / 20).toFixed(2)}
      </p>

      {coins < 200 ? (
        <p className="text-red-600 font-semibold">
          ⚠️ Insufficient coin (Minimum 200 coins required)
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold">Coins to Withdraw</label>
            <input
              type="number"
              min="20"
              max={coins}
              required
              className="input input-bordered w-full"
              value={coinToWithdraw}
              onChange={(e) => setCoinToWithdraw(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Withdrawal Amount ($)</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={withdrawalAmount}
              readOnly
            />
          </div>

          <div>
            <label className="font-semibold">Payment System</label>
            <select
              className="select select-bordered w-full"
              value={paymentSystem}
              onChange={(e) => setPaymentSystem(e.target.value)}
            >
              <option value="Bkash">Bkash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Upay">Upay</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Account Number</label>
            <input
              type="text"
              className="input input-bordered w-full"
              required
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-warning w-full">
            Submit Withdrawal Request
          </button>
        </form>
      )}
    </div>
  );
};

export default Withdrawals;
