import React, { useState } from "react";
import UCard from "./ucards"; 
import { UserIcon, Shield, Zap, Check, X, Lock ,CheckCircle2} from 'lucide-react'; 
import '../styles/user.css';

function USer() {
    const User = { 'id': 1, 'username': 'user1', 'email': 'user1@zorvyn.com', 'password': 'pass' };
    const [role, setRole] = useState(()=>{return localStorage.getItem("zorvyn_role") || 'admin'});
    const[diabox,setDiabox]= useState({isOpen:false,type:'income'});
    const[formData,setFormData] = useState({amount:'',category:''});
    const[ntfn,setNtfn] = useState({isVisible : false,message:''});
    
    const triggerDiabox = (type)=>{
        setDiabox({isOpen:true,type:type});
        setFormData({amount:'',category:''});
    };
    const showNtfn = (message)=>{
        setNtfn({isVisible:true,message});
        setTimeout(()=>setNtfn({isVisible:false,message:''}),3000);
    };
    const handleAddTransaction = (e) => {
        e.preventDefault();
        if(!formData.amount || isNaN(formData.amount)){
            alert("please enter a valid number");
            return;
        }
        const newTns = {
            id: Date.now(), 
            date: new Date().toISOString().split('T')[0], 
            amount: diabox.type === 'expense' ? -Math.abs(Number(formData.amount)) : Math.abs(Number(formData.amount)),
            category: formData.category,
            type: diabox.type
        };
        const savedData = localStorage.getItem("zorvyn_transactions");
        let currentTransactions = savedData ? JSON.parse(savedData) : []; 
        currentTransactions.unshift(newTns); 
        localStorage.setItem("zorvyn_transactions", JSON.stringify(currentTransactions));
        setDiabox({ isOpen: false, type: 'income' });
        showNtfn(`Added ₹${Math.abs(newTns.amount).toLocaleString('en-IN')} for ${newTns.category}`);
    };

    return (
        <div className="u-cont">
            {diabox.isOpen && (
            <div className="dia-overlay" onClick={()=>setDiabox({...diabox,isOpen:false})}>
                <div className="dia-content" onClick={(e)=>e.stopPropagation()}>
                    <h3 className="dia-title">Add {diabox.type}</h3>
                    <form onSubmit={handleAddTransaction}>
                        <div className="dia-inpgrp">
                            <label className="dia-label">Amount (₹)</label>
                            <input type="number" className="dia-inp" placeholder="eg 500" value={formData.amount}
                            onChange={(e)=>setFormData({...formData,amount:e.target.value})} autoFocus required
                            />
                        </div>
                        <div className="dia-inpgrp">
                            <label className="dia-label">Category</label>
                            <input type="text" className="dia-inp" placeholder="enter the category" value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})} required/>
                        </div>
                        <div className="dia-btns">
                            <button type="button" className="btn-cancel" onClick={()=>setDiabox({...diabox,isOpen:false})}>Cancel</button>
                            <button type="submit" className="btn-submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            )}
            {ntfn.isVisible && (
                <div className="ntfn-cont">
                    <CheckCircle2 size={20} color="var(--cincome)" />
                    <span style={{ fontWeight: '500' }}>{ntfn.message}</span>
                </div>
            )}
            <div className="u-head">
                <h2 className="u-title">Profile</h2>
                <p className="u-subt">Manage your account, roles, and quick actions</p>
            </div>
            <div className="ucards-g">
                <UCard>
                    <div className="prof-cen">
                        <div className="avatar">
                            <UserIcon size={40}></UserIcon>
                        </div>
                        <h3 className="prof-name">{User.username}</h3>
                        <p className="prof-mail">{User.email}</p>
                        <div className="r-badge">
                            <Shield size={14}></Shield>
                            {role === 'admin' ? 'ADMIN' : 'VIEWER'}
                        </div>
                    </div>
                </UCard>
                
                <UCard>
                    <div className="card-head">
                        <Shield size={20} style={{ color: "var(--text1)" }} /> Role Management
                    </div>
                    <p className="card-des">
                        Viewers can only see data, while Admins can modify records.
                    </p>
                    <p className="cur-role">Current Role</p>
                    <select className="role-select" value={role} onChange={(e) => {setRole(e.target.value);
                        localStorage.setItem("zorvyn_role", e.target.value);
                    }}>
                        <option value="admin">Admin (Full Access)</option>
                        <option value="viewer">Viewer(Read Only)</option>
                    </select>
                    <div className="perm-list">
                        <div className="perm-item">
                            <Check size={15} className="perm-icon allowed" /> View Transaction History
                        </div>
                        <div className="perm-item">
                            <Check size={15} className="perm-icon allowed" /> View Dasboard and Stats
                        </div>
                        <div className={`perm-item ${role === 'viewer' ? 'denied' : ''}`}>
                            {role === 'admin' ? (
                                <Check size={15} className="perm-icon allowed"></Check>
                            ) : (
                                <X size={15} style={{ color: "var(--cexpense)" }} className="perm-icon denied"></X>
                            )} Add / Edit Transactions
                        </div>
                    </div>
                </UCard>

                <UCard>
                    <div className="card-head">
                        <Zap size={20} color="#F59E0B" /> Quick Actions
                    </div>
                    <p className="card-des">
                        Use these shortcuts to quickly log transactions without going back to the dashboard.
                    </p>
                    {role === 'admin' ? (
                        <div className="act-btn-grp" style={{ marginTop: 'auto' }}>
                            <button 
                                className="act-btn btn-income" 
                                onClick={() => triggerDiabox('income')}
                            >
                                +Add Income
                            </button>
                            <button 
                                className="act-btn btn-expense" 
                                onClick={() => triggerDiabox('expense')}
                            >
                                +Add Expense
                            </button>
                        </div>
                    ) : (
                        <div className="blk-view">
                            <Lock size={18} />
                            <span style={{ fontSize: '0.875rem' }}>Viewers do not have permission to add transactions.</span>
                        </div>
                    )}

                </UCard>
            </div>
        </div>
    )
}
export default USer;