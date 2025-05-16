import { useState } from "react";


function PaymentForm() {
    const [paymentInfo, setPaymentInfo] = useState({
        cardNr: "",
        expDate: "",
        cvv: "",
        cardName: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Payment Info: ", paymentInfo)   
    }
    

    return (
        <form onSubmit={handleSubmit} className="w-full mx-auto p-4">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1" htmlFor="cardNr">
                        Card Number
                    </label>
                    <input 
                    name="cardNr"
                    className="border border-gray-300 w-[100%] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={paymentInfo.cardNr}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block mb-1" htmlFor="expDate">
                        Expiry Date
                    </label>
                    <input 
                        name="expDate"
                        className="border border-gray-300 w-[50%] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
                        placeholder="XX / XX"
                        value={paymentInfo.expDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                <label className="block mb-1" htmlFor="cvv">
                        CVV
                    </label>
                    <input
                        name="cvv"
                        className="border border-gray-300 w-[50%] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
                        placeholder="XXX"
                        value={paymentInfo.cvv}
                        onChange={handleChange}
                    />
                </div>
            </div>
            
            <input
                name="cardName"
                className="border border-gray-300 w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
                placeholder="John Doe"
                value={paymentInfo.cardName}
                onChange={handleChange}
            />
        </form>
    )
}

export default PaymentForm;