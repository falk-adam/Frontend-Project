import { useState } from "react";

function PaymentForm({handleMethodChange, paymentMethod}) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [paymentInfo, setPaymentInfo] = useState(() => ({
    cardNr: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  }));



  return (
    <div className="p-5 text-[14px] flex flex-col gap-5 grow">
      <div>
        <label className="block mb-1 font-semibold">Payment Method</label>

        <div
          className={`flex items center p-4 border rounded-lg cursor pointer mb-2 ${
            paymentMethod === "creditCard"
              ? "border-red-400"
              : "border-gray-300"
          }`}
          onClick={() => handleMethodChange("creditCard")}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={paymentMethod === "creditCard"}
            onChange={() => handleMethodChange("creditCard")}
            className={`w-5 h-5 rounded-full border-4 mr-3 ${
              paymentMethod === "creditCard"
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          <span>Credit Card</span>
        </div>

        <div
          className={`flex items center p-4 border rounded-lg cursor pointer mb-2 ${
            paymentMethod === "paypal" ? "border-red-400" : "border-gray-300"
          }`}
          onClick={() => handleMethodChange("paypal")}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => handleMethodChange("paypal")}
            className={`w-5 h-5 rounded-full border-4 mr-3 ${
              paymentMethod === "paypal" ? "border-red-500" : "border-gray-300"
            }`}
          />
          <span>PayPal</span>
        </div>
      </div>

      <div>
        <label className="block mb-1 w-full" htmlFor="cardNr">
          Card Number
        </label>
        <input
          name="cardNr"
          type="text"
          className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          value={paymentInfo.cardNr}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-5 justify-between">
        <div>
          <label className="block mb-1" htmlFor="expDate">
            Expiry Date
          </label>
          <input
            name="expiryDate"
            type="text"
            className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            placeholder="XX / XX"
            value={paymentInfo.expiryDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="cvv">
            CVV
          </label>
          <input
            name="cvv"
            type="text"
            className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            placeholder="XXX"
            value={paymentInfo.cvv}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-2">
        <label className="block mb-1" htmlFor="cardName">
          Name on Card
        </label>
        <input
          name="cardName"
          type="text"
          className="border border-gray-300 w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
          placeholder="John Doe"
          value={paymentInfo.cardName}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default PaymentForm;
