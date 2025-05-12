// Toast.js
import React, { useEffect, useState } from 'react';

const CustomeToast = ({ message, show, onClose }) => {
    const [showToast, setShowToast] = useState(false);

    const handleCloseToast = () => {
        setShowToast(false);
      };

      
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        handleCloseToast();
      }, 2000); // Auto close after 1 second

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [showToast, onClose]);

  useEffect(()=>{
    setShowToast(show)
  },[show])

  if (!showToast) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
};

export default CustomeToast;
