import React, { useEffect, useState } from 'react';
import getContract from '../utils/contract.js';
import Navbar from './components/Navbar.jsx';

const Home = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const contract = await getContract();
      const count = await contract.getTotalComplaints();
      const allComplaints = [];

      for (let i = 0; i < count; i++) {
        const complaint = await contract.getComplaint(i);
        allComplaints.push({
          id: Number(complaint[0]),
          location: complaint[1], // title
          description: complaint[2],
          reporter: complaint[3],
          timestamp: Number(complaint[4]),
          upvotes: Number(complaint[5]),
        });
      }

      setComplaints(allComplaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const voteComplaint = async (id) => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = await getContract();
      const tx = await contract.upvoteComplaint(id);
      await tx.wait();
      alert("Voted successfully!");
      fetchComplaints();
    } catch (error) {
      console.error("Error voting:", error);
      alert("Voting failed.");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar />
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          Public Complaints
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p className="text-center text-gray-500">No complaints found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-purple-700">{c.location}</h3>
                <p className="text-gray-700 mt-2">{c.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Reporter: {c.reporter.slice(0, 6)}...{c.reporter.slice(-4)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Date: {new Date(c.timestamp * 1000).toLocaleString()}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-purple-600 font-bold">Votes: {c.upvotes}</span>
                  <button
                    onClick={() => voteComplaint(c.id)}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                  >
                    Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
