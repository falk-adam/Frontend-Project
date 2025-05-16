/*CreateBookingPage:
Page w. input form for creating a new booking for a spec. listing */

// progress bar
// payment form
// complete booking card info
// submit button

import PaymentForm from "../other/PaymentForm";

function CreateBookingPage() {
  
  
  
  
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="w-full flex flex-col gap-2 justify-center items-center p-10">
        <div className="bg-amber-950 h-20 w-80 justify-center items-center">progress bar</div>
      </div>
      <div className="flex flex-row h-dvh m-10 gap-10">
        <div className="h-full w-full border border-gray-300 rounded-xl">
          <PaymentForm />
        </div>
        <div className="bg-red-400 h-full w-10/17 relative flex flex-col">
          <div className="bg-purple-900 w-full h-full mb-10">BOOKNIG CARD</div>
          <div className="bg-yellow-600 h-25 w-full bottom-0">BUTTON</div>
        </div>
      </div>
    </div>
  );
}
export default CreateBookingPage;
