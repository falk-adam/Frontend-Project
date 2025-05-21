//ProgressBar
//shown on CreateBooking and BookingConfirmationPage

const ProgressBar = ({ stage }) => {

  const circle = (number, name) => (
    <div className="flex flex-col items-center w-12">
      <div
        className={`w-12 h-12 rounded-full ${
          stage === number ? "bg-red-400 text-white" : "bg-gray-300"
        } flex items-center justify-center text-xl border-1 border-gray-400`}
      >
        {number}
      </div>
      <span className="mt-2 text-black text-[16px]">{name}</span>
    </div>
  );

  const line = <div className="h-1 w-16 bg-gray-200 mb-8"></div>;

  return (
    <div className="flex items-center justify-center">
      {/* Step 1 */}
      {circle(1, "Listing")}
      {/* Line 1 */}
      {line}
      {/* Step 2 (Current) */}
      {circle(2, "Payment")}
      {/* Line 2 */}
      {line}
      {/* Step 3 */}
      {circle(3, "Confirmation")}
    </div>
  );
};

export default ProgressBar;
