import React, { useRef, useState } from "react";
import Footer from "./common/Footer";
import emailjs from "@emailjs/browser";
import { Linkedin, Github, Mail, Phone, MapPin, Send } from "lucide-react";

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      "service_8ppvqb6",
      "template_fpbca7i",
      form.current,
      "4LA1_CibY_JHifztn"
    )
    .then(() => {
      setLoading(false);
      setSuccess(true);
      e.target.reset();
    })
    .catch(() => {
      setLoading(false);
      alert("Failed to send message. Try again.");
    });
  };

  return (
    <section id="contact" className="min-h-screen px-6 md:px-20 py-20 bg-black text-white">

      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center md:text-left mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Let's Connect
          <span className="block w-12 md:w-14 h-1 bg-blue-500 mt-4 mx-auto md:mx-0"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* Contact Info */}
        <div className="space-y-5">

          <div className="flex items-center p-4 sm:p-5 rounded-xl bg-blue-900/30 border border-blue-700/40">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-4 text-blue-400"/>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-300 text-sm">mail4aadhilad@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center p-4 sm:p-5 rounded-xl bg-green-900/30 border border-green-700/40">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-4 text-green-400"/>
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-300 text-sm">+91 8807395891</p>
            </div>
          </div>

          <div className="flex items-center p-4 sm:p-5 rounded-xl bg-red-900/30 border border-red-700/40">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-4 text-red-400"/>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-gray-300 text-sm">
                Kumbakonam, Tamil Nadu, India
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="mb-2 text-gray-400">Follow me on</p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/muhammadhu-aadhil-a1027127b/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 hover:text-blue-400 transition"/>
              </a>
              <a href="https://github.com/MuhammadhuAadhil" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6 hover:text-gray-400 transition"/>
              </a>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full p-3 rounded bg-black border border-white/10 text-sm sm:text-base focus:outline-none focus:border-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="w-full p-3 rounded bg-black border border-white/10 text-sm sm:text-base focus:outline-none focus:border-blue-500"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your message..."
            required
            className="w-full p-3 rounded bg-black border border-white/10 text-sm sm:text-base focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex justify-center items-center gap-2 hover:scale-[1.02] transition disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
            <Send className="w-5 h-5"/>
          </button>

          {success && (
            <p className="text-green-400 text-center text-sm">
              ✅ Message sent successfully!
            </p>
          )}

        </form>

      </div>

      <Footer />
    </section>
  );
}

export default Contact;