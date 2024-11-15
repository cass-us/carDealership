import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AllProducts = () => {
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const [currentImages, setCurrentImages] = useState({});  
  const [currentPage, setCurrentPage] = useState(1); 
  const [productsPerPage] = useState(8); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); 
        setProducts(response.data.data); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();  
  }, []); 

  const handleImageClick = (productId, image) => {
    setCurrentImages((prevImages) => ({
      ...prevImages,
      [productId]: image,
    }));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto py-4">
       <div className="absolute left-0 w-full bg-white bg-opacity-60 p-4">
                <div className="flex items-center justify-between space-x-4 text-black">
                    <input
                        type="text"
                        placeholder="Search for cars..."
                        className="w-1/3 px-4 py-2 rounded-lg bg-white text-black placeholder-black"
                    />
                    <select className="px-4 py-2 rounded-lg bg-white text-black">
                        <option>Filter by Model</option>
                        <option>Model A</option>
                        <option>Model B</option>
                        <option>Model C</option>
                    </select>
                    <select className="px-4 py-2 rounded-lg bg-white text-black">
                        <option>Filter by Type</option>
                        <option>SUV</option>
                        <option>Sedan</option>
                        <option>Truck</option>
                    </select>
                </div>
            </div>
      <h2 className="text-2xl mb-4 font-semibold">-------</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => {
          const currentImage = currentImages[product.product_id] || product.background_image;

          return (
            <div key={product.product_id} className="border mt-8 p-2 rounded shadow-lg">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-40 object-cover  rounded"
              />
              <div className="flex space-x-2 mt-4">
                {product.additional_images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`small-image-${index}`}
                    className="w-8 h-8 object-cover cursor-pointer border rounded"
                    onClick={() => handleImageClick(product.product_id, image)} 
                  />
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-medium">Price: R{product.price}</p>
              <p className="text-sm text-gray-600">Mileage: {product.mileage} km</p>
              <p className="text-sm text-gray-600">Location: {product.location}</p>
             
            
              <Link 
                to={`/product/${product._id}`} 
                className="mt-4 inline-block bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400">
                View Details
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
