import React, { useState, useEffect } from "react";
import { Search, ArrowUpRight, ArrowDownRight, Trash2 } from "lucide-react";
import "../styles/transactions.css";

const Data = [
    { id: 1, date: '2026-04-02', amount: -1250, category: 'Swiggy/Zomato', type: 'expense' },
    { id: 2, date: '2026-04-01', amount: 185000, category: 'Tech Salary', type: 'income' },
    { id: 3, date: '2026-03-28', amount: -18000, category: 'House Rent', type: 'expense' },
    { id: 4, date: '2026-03-25', amount: -850, category: 'Uber/Ola', type: 'expense' },
    { id: 5, date: '2026-03-22', amount: -4500, category: 'Blinkit Groceries', type: 'expense' },
    { id: 6, date: '2026-03-20', amount: 25000, category: 'Freelance Client', type: 'income' },
    { id: 7, date: '2026-03-18', amount: -2200, category: 'Electricity & Wifi', type: 'expense' },
    { id: 8, date: '2026-03-15', amount: -3500, category: 'Weekend Movie/Dinner', type: 'expense' },
    { id: 9, date: '2026-03-12', amount: 4500, category: 'Mutual Fund Dividend', type: 'income' },
    { id: 10, date: '2026-03-10', amount: -900, category: 'Swiggy/Zomato', type: 'expense' },
    { id: 11, date: '2026-03-08', amount: -600, category: 'Metro Card Recharge', type: 'expense' },
    { id: 12, date: '2026-03-05', amount: -5500, category: 'Amazon Shopping', type: 'expense' },
    { id: 13, date: '2026-03-02', amount: -3800, category: 'Blinkit Groceries', type: 'expense' },
    { id: 14, date: '2026-02-28', amount: 185000, category: 'Tech Salary', type: 'income' },
    { id: 15, date: '2026-02-25', amount: -18000, category: 'House Rent', type: 'expense' }
];

function Transactions() {
    const [transactions, setTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem("zorvyn_transactions");
        if (savedTransactions) {
            return JSON.parse(savedTransactions); 
        }
        return Data; 
    });

    useEffect(() => {
        localStorage.setItem("zorvyn_transactions", JSON.stringify(transactions));
    }, [transactions]);


    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("ALL"); 
    const [sortOrder, setSortOrder] = useState("newest"); 
    const userRole = localStorage.getItem("zorvyn_role") || "admin";
    let pd = transactions.filter((item) => {
        const matchesSearch = item.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'ALL' ? true : item.type.toLowerCase() === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    pd.sort((a, b) => {
        if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
        if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
        if (sortOrder === "high") return Math.abs(b.amount) - Math.abs(a.amount);
        if (sortOrder === "low") return Math.abs(a.amount) - Math.abs(b.amount);
        return 0;
    });

    const handleDelete = (id) => {
        const updatedList = transactions.filter(transaction => transaction.id !== id);
        setTransactions(updatedList);
    };

    return (
        <div className="tns-container">
            <h1 style={{ color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 'bold' }}>Transactions</h1>
            <div className="tns-cntrl">
                <div className="tns-search-cont">
                    <Search size={18} className="tns-sicon" />
                    <input 
                        type="text" 
                        placeholder="Search here" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="tns-sb" 
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative' }}>
                        <select className="tns-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="ALL">All Types</option>
                            <option value="Income">Income Only</option>
                            <option value="Expense">Expense Only</option>
                        </select>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <select className="tns-dropdown" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="newest">Date: Newest</option>
                            <option value="oldest">Date: Oldest</option>
                            <option value="high">Amount: High to Low</option>
                            <option value="low">Amount: Low to High</option>
                        </select>
                    </div>
                </div>

            </div>
            <div className="tns-list-cont">
                {pd.length > 0 ? (
                    pd.map((item, index) => (
                        <div key={item.id} className="tns-item" style={{ animationDelay: `${index * 0.05}s` }}>
                            
                            <div className="tns-item-left">
                                <div className={`tns-icon ${item.type}`}>
                                    {item.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                </div>
                                <div>
                                    <p className="tns-category">{item.category}</p>
                                    <p className="tns-date">{item.date}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <p className={`tns-amount ${item.type}`}>
                                    {item.type === 'income' ? '+' : '-'}${Math.abs(item.amount).toLocaleString()}
                                </p>
                                { userRole == 'admin' && (
                                <button 
                                    className="tns-delete-btn"
                                    onClick={() => handleDelete(item.id)}
                                    title="Delete Transaction"
                                >
                                    <Trash2 size={18} />
                                </button>)
                                }
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="tns-empty"><p>No transactions found.</p></div>
                )}
            </div>
        </div>
    );
}

export default Transactions;