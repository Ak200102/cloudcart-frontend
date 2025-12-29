import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../../config";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Container from "../components/Container";
import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAccessTime,
} from "react-icons/md";

const contactCards = [
  {
    icon: <MdLocationOn />,
    title: "Visit Our Store",
    value: "Panskura, West Bengal, India",
  },
  {
    icon: <MdPhone />,
    title: "Call Us",
    value: "+91 7718510398",
  },
  {
    icon: <MdEmail />,
    title: "Email Us",
    value: "support@cloudcart.com",
  },
  {
    icon: <MdAccessTime />,
    title: "Business Hours",
    value: "Mon – Sat: 9:00 AM – 8:00 PM",
  },
];

const Contact = () => {
const userInfo = useSelector((state) => state.cloudCart.userInfo);
const token = localStorage.getItem("token");




  console.log("CONTACT TOKEN:", token);



  const [formData, setFormData] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    toast.error("Please login to send a message");
    return;
  }

  try {
    setLoading(true);

    const { data } = await axios.post(
      `${serverUrl}/api/contact`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to send message"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-300">
              We’d love to hear from you. Send us a message and we’ll respond as
              soon as possible.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactCards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition"
              >
                <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Form + Map */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className="w-full border rounded-lg px-4 py-3 "
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject *"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your Message *"
                  className="w-full border rounded-lg px-4 py-3 resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-sm"
            >
              <iframe
                title="store-map"
                src="https://www.google.com/maps?q=Panskura,West%20Bengal&output=embed"
                className="w-full h-[250px]"
                loading="lazy"
              />
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold">CloudCart Shopping</h3>
                <p className="text-gray-600 text-sm">
                  Panskura, West Bengal, India
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
