/*CreateBookingPage:
Page w. input form for creating a new booking for a spec. listing */

// progress bar
// payment form
// complete booking card info
// submit button

function CreateBookingPage() {
  
  
  
  
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="bg-gray-400 w-full flex flex-col gap-2 justify-center items-center p-10">
        <div className="bg-amber-950 h-20 w-80 justify-center items-center">progress bar</div>
      </div>
      <div className="bg-green-800 flex flex-row h-dvh m-10 gap-10">
        <div className="bg-blue-400 h-full w-full"></div>
        <div className="flex flex-col bg-red-400 h-full w-full relative">
          <div className="bg-yellow-600 h-25 w-full absolute bottom-0"></div>
        </div>
      </div>
    </div>
  );
}
export default CreateBookingPage;
