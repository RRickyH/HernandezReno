import { useState } from "react";
import Modal from "src/components/Modal.tsx";

interface formData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function ContactCard() {
  const [form, setForm] = useState<formData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  async function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    try {
      console.log("sending email", JSON.stringify(form));
      const response = await fetch(`${API_URL}/email`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw Error("Failed to send email");
      }
    } catch (error) {
      console.error(error);
      setSubmitError(true);
    } finally {
      setIsSending(false);
    }
  }
  return (
    <div className="flex flex-col flex-grow max-w-192 rounded-3xl bg-gray-50 p-8 gap-6">
      <h3 className="text-2xl font-semibold text-gray-900">
        Send Us A Message
      </h3>
      <form
        className="flex flex-col text-gray-900 text-sm gap-4 items-start justify-center"
        onSubmit={handleSend}
      >
        <div className="flex flex-col items-start justify-start w-full gap-1">
          <label>Your name</label>
          <input
            type="name"
            maxLength={60}
            placeholder="Barack Obama"
            className="w-full bg-gray-100 border-gray-400/40 border-2 rounded-lg p-1"
            required
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          ></input>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-1">
          <label>Your email</label>
          <input
            type="email"
            maxLength={50}
            placeholder="your-email@example.com"
            className="w-full bg-gray-100 border-gray-400/40 border-2 rounded-lg p-1"
            required
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          ></input>
        </div>
        <div className="flex flex-col items-stretch justify-start w-full gap-1">
          <label>Your phone number</label>
          <input
            type="tel"
            maxLength={15}
            placeholder="123 456 7890"
            className="w-full bg-gray-100 border-gray-400/40 border-2 rounded-lg p-1"
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value });
            }}
          ></input>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-1">
          <label>Subject</label>
          <input
            placeholder="Message description"
            maxLength={50}
            className="w-full bg-gray-100 border-gray-400/40 border-2 rounded-lg p-1"
            required
            onChange={(e) => {
              setForm({ ...form, subject: e.target.value });
            }}
          ></input>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-1">
          <label>Message</label>
          <textarea
            rows={4}
            maxLength={500}
            placeholder="Your message..."
            className="w-full bg-gray-100 border-gray-400/40 border-2 rounded-lg p-1"
            required
            onChange={(e) => {
              setForm({ ...form, message: e.target.value });
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          className={`rounded-lg bg-gray-800 text-gray-50 font-bold text-lg px-4 py-2 transition-all ${isSending ? "" : "hover:scale-110"}`}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Submit"}
        </button>
      </form>
      {submitError ? (
        <Modal
          title="Email Error"
          message="The email failed to send! Please contact us directly."
          onDismiss={() => {
            setSubmitError(false);
          }}
        ></Modal>
      ) : null}
    </div>
  );
}
