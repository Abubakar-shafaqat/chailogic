"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="bg-brown text-cream py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="relative h-28 w-auto md:h-32 mb-4">
              <Image
                src="/images/menu/light-logo.png"
                alt="Chai Logic Logo"
                width={350}
                height={128}
                className="object-contain h-full w-auto"
              />
            </div>
            <p className="text-cream/70 text-center md:text-left">
              Logic in every Bite and Sip - Where every cup tells a story
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-xl font-semibold mb-4 text-gold">Visit Us</h4>
            <Link
  href="https://www.google.com/maps/dir/24.8292951,67.1201973/Chai+Logic,+Q3QH%2BFQF,+D.H.A.+Phase+8+Zulfiqar+%26+Al+Murtaza+Commercial+Area+Phase+8+Defence+Housing+Authority,+Karachi,+75500,+Pakistan/@24.8130035,67.0577537,13z/data=!4m10!4m9!1m1!4e1!1m5!1m1!1s0x3eb33d00293f56c7:0xea381915e5f7afbd!2m2!1d67.0794219!2d24.7886875!3e0"
  target="_blank"
  className="block"
>
  <address className="not-italic text-cream/70 space-y-2 cursor-pointer hover:text-white transition">
    <p>Zulfiqar Street, Murtaza commercial</p>
    <p>Karachi, DHA Phase-8</p>
    
  </address>
</Link>
        <p className="mt-4">📞 +92 3112673109</p>
    <p>✉️ hello@chailogic.com</p>
          </motion.div>

          {/* Social & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center md:text-left"
          >
            <h4 className="text-xl font-semibold mb-4 text-gold">Opening Hours</h4>
            <div className="text-cream/70 space-y-2">
              <p>Mon - Thu: 5:30 PM - 5:00 AM</p>
              <p>Fri - Sun: 5:00 PM - 6:00 AM</p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              <motion.a
                href="https://www.instagram.com/chai.logic?igsh=MWw1OGwxNjRoYXB2Ng%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cream/10 hover:bg-gold rounded-full flex items-center justify-center transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <FaInstagram className="text-lg" />
              </motion.a>
              <motion.a
                href="https://wa.me/923112673109"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cream/10 hover:bg-gold rounded-full flex items-center justify-center transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <FaWhatsapp className="text-lg" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-cream/20 mt-12 pt-8 text-center text-cream/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>&copy; {new Date().getFullYear()} Chai Logic. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
