export default function ContactCard() {
  return (
    <div className="flex flex-col flex-grow max-w-192 rounded-3xl bg-gray-50 p-8 gap-6">
      <h3 className="text-2xl font-semibold text-gray-900">
        Send Us A Message
      </h3>
      <form className="flex flex-col text-gray-900 text-sm gap-4 items-start justify-center">
        <div className="flex flex-col items-start justify-start w-full gap-1">
          <label>Your email</label>
          <input
            placeholder="your-email@example.com"
            className="w-full bg-gray-100 border-gray-400/40 border-2 rounded-lg p-1"
          ></input>
        </div>
        <div className="flex flex-col items-stretch justify-start w-full gap-1">
          <label>Your phone number</label>
          <input
            placeholder="123 456 7890"
            className="w-full bg-gray-100 border-gray-400/40 border-2 rounded-lg p-1"
          ></input>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-1">
          <label>Subject</label>
          <input
            placeholder="Message description"
            className="w-full bg-gray-100 border-gray-400/40 border-2 rounded-lg p-1"
          ></input>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-1">
          <label>Message</label>
          <textarea
            rows={4}
            placeholder="Your message..."
            className="w-full bg-gray-100 border-gray-400/40 border-2 rounded-lg p-1"
          ></textarea>
        </div>
        <button className="rounded-lg bg-gray-800 text-gray-50 font-bold text-lg px-4 py-2">
          Send
        </button>
      </form>
    </div>
  );
}
