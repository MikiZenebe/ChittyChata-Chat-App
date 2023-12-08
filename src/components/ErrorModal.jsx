/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { card } from "../animations";
import { AiOutlineClose } from "react-icons/ai";

export default function ErrorModal({ error }) {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0  mx-auto  backdrop-blur-sm bg-[#2F2D30]/10  ${
        modalIsOpen ? "block" : "hidden"
      } overflow-y-auto mx-auto   flex justify-center items-center z-50`}
    >
      <motion.div
        layout
        variants={card}
        animate="show"
        initial="hidden"
        className="relative  w-[400px] sm:w-[500px] md:w-[600px] p-4  bg-primary rounded-lg"
      >
        <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
          <div className="bg-primary px-1 rounded-lg flex items-center">
            <div className="w-full flex justify-between items-center gap-2 py-4">
              <p className="text-2xl font-bold text-ascent-2">{error}</p>
            </div>

            <span onClick={closeModal}>
              <AiOutlineClose
                size={30}
                className="text-ascent-2 hover:text-ascent-1 cursor-pointer"
              />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
