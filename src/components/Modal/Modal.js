import veri from '../assets/img/veri.png'
import {FaTimes,FaGithub,FaUserCheck,FaCog} from 'react-icons/fa'
import './Modal.css'

import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import web3 from "web3";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
function Modal({closeModal}){

    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);

    return (
        <>
             <div className="modal modal-active">
                <div className="modal__overlay">
                    <div className="modal-body">
                       
                        <div class="auth-form">
                            <div class="auth-form__container">
                                 <button className="close-modal" onClick={()=>closeModal(false)}><FaTimes /></button>
                                <div class="auth-form__header">
                                    <span class="auth-form__heading">Ethex Smart Contracts</span>
                                    <img src={veri} className="img-veri" />
                                </div>
                                <div class="auth-form__form">
                                <div class="auth-form__group">
                                        <span className='wallet-text'>Wallet</span>                    
                                    </div>
                                    <div class="auth-form__group">
                                        <FaCog />
                                        <a href='https://rinkeby.etherscan.io/address/0x0F9B5B1b54D2eA46D113582e1191Bd1693b83fc7'>
                                            <span className='id-wallet'>0x0F9B5B1b54D2eA46D113582e1191Bd1693b83fc7</span>                              
                                        </a>
                                    </div>

                                    <div class="auth-form__group">
                                        <span className="auth-rules">
                                            During the event, choose a random number from 1 to 9, please fill in the blanks as prescribed,
                                            do not choose the same number to buy tickets
                                            After purchasing your ticket, wait for your next turn to claim your prize if you win .<br/>
                                            GOOD LUCK !
                                        </span>
                                    </div>
                                    <div className="social-link">
                                        
                                            <FaGithub className='icon-modal' />
                                            <a href='https://github.com/thanh2911/lottery_app' className="showcode">Source code</a>                          
                                            <FaUserCheck className='icon-modal icon-modal-veri'/>
                                            <a href='https://rinkeby.etherscan.io/address/0x0F9B5B1b54D2eA46D113582e1191Bd1693b83fc7#code' className="verified">Verified on Etherscan</a>          
                                    </div>
                                    <div className="total-money">  
                                    <span className="Total-wallet">Total Money In Wallet:
                                    </span> 
                                    <span className='money'>{parseFloat(web3.utils.fromWei(data.getBalance.toString(), 'ether')).toFixed(3)} ether </span> 
                                    </div>
                                </div>

                                

                                
                            </div>

                        </div> 
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Modal