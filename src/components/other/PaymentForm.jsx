import { useState } from "react";


function PaymentForm() {
    const [paymentForm, setPaymentForm] = useState({
        cardNr: "",
        expDate: "",
        cvv: "",
        cardName: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();   
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <input 
            name="cardNr"
            className="border border-gray-300 w-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400 m-10"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            value={paymentForm.cardNr}
            onChange={handleChange}
            />
            <input 
                name="expDate"
                className="border border-gray-300 w-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400 m-10"
                placeholder="XX / XX"
                value={paymentForm.expDate}
                onChange={handleChange}
            />
            <input
                name="cvv"
                className="border border-gray-300 w-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400 m-10"
                placeholder="XXX"
                value={paymentForm.cvv}
                onChange={handleChange}
            />
            <input
                name="cardName"
                className="border border-gray-300 w-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400 m-10"
                placeholder="John Doe"
                value={paymentForm.cardName}
                onChange={handleChange}
            />
        </form>
    )
}

export default PaymentForm;