import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from 'axios';

const Modal = ({ isOpen, setIsOpen, onAddFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/flashcards', { question, answer });
      onAddFlashcard(response.data);
      setQuestion('');
      setAnswer('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-900 p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative"
          >
            <h3 className="text-2xl font-bold text-center mb-4">
              Create a New Flashcard
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Answer</label>
                <textarea
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-500 text-white w-full py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-full py-2 rounded"
                >
                  Add Flashcard
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;