/*CreateBookingPage:
Page w. input form for creating a new booking for a spec. listing */

// progress bar
// payment form
// complete booking card info
// submit button

function CreateBookingPage() {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="w-full flex flex-col justify-center items-center p-10">
        <div className="flex items-center justify-center w-120">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-2xl border-1 border-gray-400">
              1
            </div>
            <span className="mt-2 text-black">Listing</span>
          </div>
          {/* Line 1 */}
          <div className="h-1 w-16 bg-gray-200 -mr-1 ml-1 mb-7"></div>
          {/* Step 2 (Current) */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-red-400 flex items-center justify-center text-2xl border-1 border-gray-400 text-white">
              2
            </div>
            <span className="mt-2 text-black">Payment</span>
          </div>
          {/* Line 2 */}
          <div className="h-1 w-16 bg-gray-200 -mr-5 -ml-1 mb-7"></div>
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-2xl border-1 border-gray-400">
              3
            </div>
            <span className="mt-2 text-black">Confirmation</span>
          </div>
        </div>
      </div>
      <div className="bg-green-800 flex flex-row h-dvh m-10 gap-10">
        <div className="bg-blue-400 h-full w-full">FORM</div>
        <div className="bg-red-400 h-full w-10/17 relative flex flex-col">
          <div className="bg-purple-900 w-full h-full mb-10">BOOKNIG CARD</div>
          <div className="bg-yellow-600 h-25 w-full bottom-0">BUTTON</div>
        </div>
      </div>
    </div>
  );
}
export default CreateBookingPage;
