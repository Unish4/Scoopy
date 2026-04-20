import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement form submission
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 mt-22 text-center">
          <h1 className="font-serif text-5xl text-[#4A3828] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-[#6B5A4A] max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about our
            ice cream or want to share your experience, we're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="font-serif text-2xl text-[#4A3828] mb-6">
                Visit Our Shop
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#B8956A]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#4A3828] mb-1">
                      Address
                    </h3>
                    <p className="text-[#6B5A4A] leading-relaxed">
                      Lolang, Tarkeshwar-5
                      <br />
                      Kathmandu
                      <br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#B8956A]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#4A3828] mb-1">
                      Phone
                    </h3>
                    <p className="text-[#6B5A4A]">01-5169170</p>
                    <p className="text-[#6B5A4A]">9849455811</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#B8956A]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#4A3828] mb-1">
                      Email
                    </h3>
                    <p className="text-[#6B5A4A]">scoopy@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#B8956A]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#4A3828] mb-1">
                      Hours
                    </h3>
                    <div className="text-[#6B5A4A] space-y-1">
                      <p>Sunday - Friday: 10:00 AM - 6:00 PM</p>
                      <p>Saturday - Off</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-serif text-2xl text-[#4A3828] mb-6">
                Follow Us
              </h2>
              <div className="flex items-center gap-4 mt-3">
                <a
                  href="https://www.instagram.com/scoop_food_products/"
                  className="w-12 h-12 bg-[#F5F1EB] rounded-full flex items-center justify-center hover:bg-[#B8956A] hover:text-white transition-all duration-300 group"
                >
                  <FaInstagram className="w-6 h-6 text-[#B8956A] group-hover:text-white" />
                </a>
                <p className="text-[#6B5A4A]">@scoop_food_products</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-[#B8956A]" />
                <h2 className="font-serif text-2xl text-[#4A3828]">
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#6B5A4A] mb-2 block uppercase tracking-wide">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#E8D9C5] rounded-lg focus:outline-none focus:border-[#B8956A] transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#6B5A4A] mb-2 block uppercase tracking-wide">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#E8D9C5] rounded-lg focus:outline-none focus:border-[#B8956A] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#6B5A4A] mb-2 block uppercase tracking-wide">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E8D9C5] rounded-lg focus:outline-none focus:border-[#B8956A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#6B5A4A] mb-2 block uppercase tracking-wide">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#E8D9C5] rounded-lg focus:outline-none focus:border-[#B8956A] transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="catering">Catering</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#6B5A4A] mb-2 block uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-[#E8D9C5] rounded-lg focus:outline-none focus:border-[#B8956A] transition-colors resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#B8956A] text-white rounded-full hover:bg-[#A07F52] transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="font-serif text-3xl text-[#4A3828] mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-serif text-xl text-[#4A3828] mb-3">
                Do you offer dairy-free options?
              </h3>
              <p className="text-[#6B5A4A] leading-relaxed">
                Yes! We have a selection of vegan ice creams made from coconut
                and almond milk bases.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-[#4A3828] mb-3">
                Can I place orders for events?
              </h3>
              <p className="text-[#6B5A4A] leading-relaxed">
                Absolutely! We offer catering services for parties, weddings,
                and corporate events.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-[#4A3828] mb-3">
                Do you deliver?
              </h3>
              <p className="text-[#6B5A4A] leading-relaxed">
                We currently offer local delivery within Kathmandu. Please
                contact us for more details and delivery areas.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl text-[#4A3828] mb-3">
                Are your ingredients organic?
              </h3>
              <p className="text-[#6B5A4A] leading-relaxed">
                We source organic ingredients whenever possible and work with
                local farms for the freshest products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
