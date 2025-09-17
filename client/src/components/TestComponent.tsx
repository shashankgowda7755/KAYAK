import React from "react";

const TestComponent: React.FC = () => {
  return (
    <div className="p-4 bg-blue-100 text-center">
      <h1 className="text-2xl font-bold text-blue-800">Test Component</h1>
      <p className="text-blue-600">If you can see this, React is working!</p>
    </div>
  );
};

export default TestComponent;