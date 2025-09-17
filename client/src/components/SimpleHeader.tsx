import React from "react";

export default function SimpleHeader() {
  const navigateToHome = () => {
    window.location.href = "/";
  };

  const openInquiryForm = () => {
    window.location.href = "/inquiry#booking-form";
  };

  return (
    <header className="bg-orange-50/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={navigateToHome}
            className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            data-testid="button-logo-home"
          >
            <img 
              src="/images/logo.png" 
              alt="Heaven of Munroe Logo" 
              className="h-16 w-auto object-contain"
            />
          </button>
          
          <button
            onClick={openInquiryForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            data-testid="button-book-now"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
}