import React, { useState } from "react";
import axios from "axios";

const CreateProducts = () => {
 
  const [step, setStep] = useState(1); 
  const [name, setName] = useState("");
  const [product_id, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [background_image, setBackgroundImage] = useState("");
  const [additional_images, setAdditionalImages] = useState(["", "", ""]);
  const [mileage, setMileage] = useState("");
  const [location, setLocation] = useState("");
  const [dealer_rating, setDealerRating] = useState(1);
  const [type_or_model, setTypeOrModel] = useState("");
  const [drive_type, setDriveType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [consumption, setConsumption] = useState("");
  const [engine_capacity, setEngineCapacity] = useState("");
  const [financing, setFinancing] = useState({ price_including_vat: "", monthly_payment: "" });
  const [dealer, setDealer] = useState({ name: "", contact_number: "", location: "" });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      product_id,
      price: parseFloat(price),
      background_image,
      additional_images,
      mileage: parseFloat(mileage),
      location,
      dealer_rating,
      type_or_model,
      drive_type,
      transmission,
      fuel_type,
      consumption: parseFloat(consumption),
      engine_capacity: parseFloat(engine_capacity),
      financing: {
        price_including_vat: parseFloat(financing.price_including_vat),
        monthly_payment: parseFloat(financing.monthly_payment),
      },
      dealer,
    };

    try {
      
      const response = await axios.post("http://localhost:5000/api/products", productData);
      if (response.status === 201) {
        alert("Product created successfully!");
        
        setName("");
        setProductId("");
        setPrice("");
        setBackgroundImage("");
        setAdditionalImages(["", "", ""]);
        setMileage("");
        setLocation("");
        setDealerRating(1);
        setTypeOrModel("");
        setDriveType("");
        setTransmission("");
        setFuelType("");
        setConsumption("");
        setEngineCapacity("");
        setFinancing({ price_including_vat: "", monthly_payment: "" });
        setDealer({ name: "", contact_number: "", location: "" });
        setStep(1); 
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create a New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
       
        {step === 1 && (
          <div className=" bg-black p-8 rounded-xl opacity-80">
            <div>
              <label className="block text-white p-1">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-white p-1">Product ID</label>
              <input
                type="text"
                value={product_id}
                onChange={(e) => setProductId(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-white p-1">Price (R)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-white text-black py-2 px-4 rounded-md mt-4"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className=" bg-black p-8 rounded-xl opacity-80">
            <div>
              <label className="block text-white p-1">Background Image URL</label>
              <input
                type="url"
                value={background_image}
                onChange={(e) => setBackgroundImage(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block  text-white p-1">Additional Images (at least 3 URLs)</label>
              {additional_images.map((image, index) => (
                <input
                  key={index}
                  type="url"
                  value={image}
                  onChange={(e) => {
                    const updatedImages = [...additional_images];
                    updatedImages[index] = e.target.value;
                    setAdditionalImages(updatedImages);
                  }}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full my-2"
                />
              ))}
            </div>

            <div>
              <label className="block  text-white p-1">Mileage</label>
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block  text-white p-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mt-4 mr-2"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-white text-black py-2 px-4 rounded-md mt-4"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className=" bg-black p-8 rounded-xl opacity-80">
            <div>
              <label className="block text-white p-1">Type or Model</label>
              <input
                type="text"
                value={type_or_model}
                onChange={(e) => setTypeOrModel(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-white p-1">Drive Type</label>
              <input
                type="text"
                value={drive_type}
                onChange={(e) => setDriveType(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-white p-1">Transmission</label>
              <input
                type="text"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-white p-1">Fuel Type</label>
              <input
                type="text"
                value={fuel_type}
                onChange={(e) => setFuelType(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-white p-1">Fuel Consumption (L/100km)</label>
              <input
                type="number"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-white p-1">Engine Capacity</label>
              <input
                type="number"
                value={engine_capacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mt-4 mr-2"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-white text-black py-2 px-4 rounded-md mt-4"
            >
              Next
            </button>
          </div>
        )}
        {step === 4 && (
          <div className=" bg-black p-8 rounded-xl opacity-80">
            <div>
              <label className="block text-white p-1 font-semibold ">Financing Price (Including VAT)</label>
              <input
                type="number"
                value={financing.price_including_vat}
                onChange={(e) => setFinancing({ ...financing, price_including_vat: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <div>
              <label className="block text-white p-1">Monthly Payment</label>
              <input
                type="number"
                value={financing.monthly_payment}
                onChange={(e) => setFinancing({ ...financing, monthly_payment: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <div>
              <label className="block text-white p-1">Dealer Name</label>
              <input
                type="text"
                value={dealer.name}
                onChange={(e) => setDealer({ ...dealer, name: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <div>
              <label className="block text-white p-1">Dealer Contact Number</label>
              <input
                type="text"
                value={dealer.contact_number}
                onChange={(e) => setDealer({ ...dealer, contact_number: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <div>
              <label className="block text-white p-1">Dealer Location</label>
              <input
                type="text"
                value={dealer.location}
                onChange={(e) => setDealer({ ...dealer, location: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-red-600 text-white py-2 px-4 rounded-md mt-4 mr-2"
            >
              Back
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md mt-4"
            >
              Submit Product
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProducts;
