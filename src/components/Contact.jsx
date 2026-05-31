import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Phone, Mail, MapPin } from "lucide-react";

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      "service_vckwaem",
      "template_9ogqp8g",
      form.current,
      "H_i2K8rwyu8JzVTM4"
    )
    .then(() => {
      setLoading(false);
      setSuccess(true);
      e.target.reset();
    })
    .catch(() => {
      setLoading(false);
      alert("Failed to send message.");
    });
  };

  return (
    <section id="contact" className="py-28 bg-white px-6 md:px-20 text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-black font-bold text-4xl md:text-5xl mb-8 leading-tight">
            Let's Build Your <br />
            <span className="text-yellow-600">Dream Together</span>
          </h2>

          <div className="space-y-10 mt-12">

            {/* LOCATION */}
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-yellow-100 flex items-center justify-center">
                <MapPin className="text-yellow-600" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Our Office</h4>
                <p className="text-gray-600 leading-relaxed">
                  Avinash Nagar, TVR Bypass Road, <br />
                  Thepperumanallur, Kumbakonam - 612103
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-yellow-100 flex items-center justify-center">
                <Phone className="text-yellow-600" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Phone</h4>
                <p className="text-gray-600">+91 79046 77393</p>
                <p className="text-gray-600">+91 98948 46685</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-yellow-100 flex items-center justify-center">
                <Mail className="text-yellow-600" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Email</h4>
                <p className="text-gray-600">srisivasakthibuilder2004@gmail.com</p>
              </div>
            </div>

          </div>

          {/* MAP */}
          <a
            href="https://maps.app.goo.gl/FVFo1BTwPFsxMDUE8?g_st=awb"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-12 relative group"
          >
            <img
              src="https://images.unsplash.com/photo-1526779259212-939e64788e3c"
              alt="map"
              className="w-full h-[250px] object-cover grayscale group-hover:grayscale-0 transition"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black text-yellow-500 px-6 py-3 font-bold">
                VIEW LOCATION
              </div>
            </div>
          </a>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white p-10 lg:p-14 shadow-2xl border border-yellow-200">

          <form ref={form} onSubmit={sendEmail} className="space-y-8">

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-yellow-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 transition p-4 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-yellow-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 transition p-4 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-yellow-600 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="What is this about?"
                required
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 transition p-4 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-yellow-600 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="How can we help you?"
                required
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 transition p-4 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-bold py-4 hover:bg-yellow-500 hover:text-black transition flex items-center justify-center gap-3"
            >
              {loading ? "Sending..." : "SEND MESSAGE"}
              <Send size={18} />
            </button>

            {success && (
              <p className="text-green-600 text-center text-sm">
                ✅ Message sent successfully!
              </p>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;
