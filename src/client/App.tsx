import React from 'react';
import ProductDisplay from './components/ProductDisplay';

export default function App() {
  return (
    <div>
      <div className="text-4xl font-bold text-center mt-8">Kevin Smith</div>
      <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center mb-6">
        <div className="text-xl font-bold">YourSite</div>
        <div className="space-x-6">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>
      </nav>
      {products.map((product, index) => {
        return <ProductDisplay product={product} key={index} />;
      })}
    </div>
  );
}
