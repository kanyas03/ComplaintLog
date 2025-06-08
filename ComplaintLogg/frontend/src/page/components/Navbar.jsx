import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask.");
      }
    } catch (error) {
      console.error("MetaMask connection error:", error);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) setAccount(accounts[0]);
      }
    };
    checkConnection();

    // Listen for account change
    window.ethereum?.on("accountsChanged", (accounts) => {
      setAccount(accounts[0] || null);
    });
  }, []);

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        Raise Your Voice
      </h1>
      <div className="space-x-4 flex items-center">
        {account ? (
          <span className="bg-white text-purple-700 px-3 py-1 rounded font-medium">
            Connected
          </span>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold"
          >
            Connect Wallet
          </button>
        )}
        <button
          onClick={() => navigate('/write-complaint')}
          className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-gray-100 font-semibold"
        >
          Write Complaint
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
