import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getContract from '../utils/contract.js';

const WriteComplaint = () => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location || !description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // Request wallet connection
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const contract = await getContract();
      const tx = await contract.writeComplaint(location, description);
      await tx.wait();

      alert(" Complaint submitted successfully!");
      setLocation('');
      setDescription('');
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert(" Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">
          Write a Complaint
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="e.g., MG Road, Sector 12"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteComplaint;
