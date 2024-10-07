// src/App.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getTokenContract } from './TokenContract';

const App = () => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('0');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                setAccount(accounts[0]);
                const tokenContract = getTokenContract(provider);
                const balance = await tokenContract.balanceOf(accounts[0]);
                setBalance(ethers.utils.formatEther(balance));
            }
        };
        loadBlockchainData();
    }, []);

    const transferTokens = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const tokenContract = getTokenContract(provider);
            const tx = await tokenContract.connect(signer).transfer(recipient, ethers.utils.parseEther(amount));
            await tx.wait();

            setBalance((prev) => (parseFloat(prev) - parseFloat(amount)).toString());
            setTransactions([...transactions, { from: account, to: recipient, amount }]);
            setRecipient('');
            setAmount('');
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>MyToken DApp</h1>
            <h2>User Account: {account}</h2>
            <h2>User Balance: {balance} MTK</h2>
            <div>
                <h2>Transfer Tokens</h2>
                <input 
                    type="text" 
                    placeholder="Recipient Address" 
                    value={recipient} 
                    onChange={(e) => setRecipient(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                />
                <button onClick={transferTokens}>Transfer</button>
            </div>
            <div>
                <h2>Transaction History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx, index) => (
                            <tr key={index}>
                                <td>{tx.from}</td>
                                <td>{tx.to}</td>
                                <td>{tx.amount} MTK</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
