import React, { useState, useEffect } from 'react';
import Card from './card';
import BorderGlow from './BorderGlow'; 
import { Wallet, TrendingDown, TrendingUp, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PIE_COLORS = ['var(--accent)', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#FFC0CB' ,'#E0'];

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

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
      const savedTransactions = localStorage.getItem("zorvyn_transactions");
      if (savedTransactions) {
          setTransactions(JSON.parse(savedTransactions));
      } else {
          setTransactions(Data);
      }
  }, []);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));
  const totalBalance = totalIncome - totalExpense;

  const categoryMap = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
  }, {});
  const categoryData = Object.keys(categoryMap).map(key => ({
      name: key, value: categoryMap[key]
  })).sort((a, b) => b.value - a.value);
  const trendMap = transactions.reduce((acc, t) => {
      if (!acc[t.date]) acc[t.date] = { income: 0, expense: 0 };
      if (t.type === 'income') acc[t.date].income += t.amount;
      if (t.type === 'expense') acc[t.date].expense += Math.abs(t.amount);
      return acc;
  }, {});
  const trendData = Object.keys(trendMap)
      .sort((a, b) => new Date(a) - new Date(b)) 
      .slice(-7) 
      .map(dateStr => {
          const dateObj = new Date(dateStr);
          const uniqueDateLabel = dateObj.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
          return { 
              day: uniqueDateLabel, 
              income: trendMap[dateStr].income, 
              expense: trendMap[dateStr].expense 
          };
      });
  const topExpense = categoryData.length > 0 ? categoryData[0] : { name: 'Nothing', value: 0 };
  return (
    <div style={{ paddingBottom: '2rem' }}>
      <div><h1 style={{marginBottom:'2rem', color: 'var(--accent)'}}>Dashboard</h1></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card 
            title="Total Balance" 
            amount={`₹${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`} 
            icon={<Wallet size={24} />} 
            trend={totalBalance >= 0 ? "Healthy" : "Negative"} 
            isPositive={totalBalance >= 0} 
        />
        <Card 
            title="Total Income" 
            amount={`₹${totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}`} 
            icon={<TrendingUp size={24} />} 
            trend="+ Income" 
            isPositive={true} 
        />
        <Card 
            title="Total Expenses" 
            amount={`₹${totalExpense.toLocaleString(undefined, {minimumFractionDigits: 2})}`} 
            icon={<TrendingDown size={24} />} 
            trend="- Expense" 
            isPositive={false} 
        />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <BorderGlow>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--card)', borderRadius: '24px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(197, 186, 255, 0.15)', borderRadius: '16px', color: 'var(--accent)' }}>
              <Sparkles size={28} />
            </div>
            <div>
              <h3 style={{ color: 'var(--text1)', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Smart Insights</h3>
              <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Your highest expense category right now is <strong>{topExpense.name}</strong> (${topExpense.value.toLocaleString()}). 
                {totalIncome > totalExpense 
                    ? " Your overall income is currently covering all your expenses. Keep up the good work!"
                    : " Your expenses are currently higher than your income. Consider reviewing your recent transactions."}
              </p>
            </div>
          </div>
        </BorderGlow>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <BorderGlow>
        <div style={{ backgroundColor: 'var(--card)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)' }}>
          <h3 style={{ color: 'var(--text1)', marginBottom: '1.5rem', fontWeight: 'bold' }}>Cash Flow Trend</h3>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--cincome)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--cincome)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--cexpense)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--cexpense)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--text2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text2)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text1)', borderRadius: '12px' }} itemStyle={{ color: 'var(--text1)' }} />
                <Area type="monotone" dataKey="income" stroke="var(--cincome)" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="var(--cexpense)" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        </BorderGlow>
        <BorderGlow>
        <div style={{ backgroundColor: 'var(--card)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)' }}>
          <h3 style={{ color: 'var(--text1)', marginBottom: '1.5rem', fontWeight: 'bold' }}>Spending Breakdown</h3>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {categoryData.length > 0 ? (
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text1)', borderRadius: '12px' }} itemStyle={{ color: 'var(--text1)' }} />
                  </PieChart>
              ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)' }}>
                      No expenses logged yet.
                  </div>
              )}
            </ResponsiveContainer>
          </div>
        </div>
        </BorderGlow>
      </div>
    </div>
  );
}