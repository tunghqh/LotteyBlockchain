import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import { useState } from 'react';
import Modal from '../Modal/Modal';
import {FaArrowRight,FaGithub,FaUserCheck,FaCog} from 'react-icons/fa'
import phone from '../assets/img/Hero/phone.png'
import man from '../assets/img/Hero/man222.png'
import award from '../assets/img/Hero/award.png'
import bg from '../assets/img/Hero/bg.png'
import bg1 from '../assets/img/Hero/bg(1).png'
import btc from '../assets/img/Hero/bitcoin1.png'
import btc2 from '../assets/img/Hero/bitcoin2.png'
import gift from '../assets/img/Hero/gift.png'
import ripple from '../assets/img/Hero/ripple.png'
import ripple1 from '../assets/img/Hero/ripple1.png'
import shape from '../assets/img/Hero/shape.png'
import shield from '../assets/img/Hero/shield.png'
import icon1 from '../assets/img/feature/icon1.png'
import icon2 from '../assets/img/feature/icon2.png'
import icon3 from '../assets/img/feature/icon3.png'
import win from '../assets/img/feature/get-start.png'
import player from '../assets/img/endhome/icon1.png'
import games from '../assets/img/endhome/icon2.png'
import winner from '../assets/img/endhome/icon3.png'



function Home() {
    const [openModal,setOpenModal] = useState(false)
    return (
        <>
            <div className="hero">
                <div className="grid">
                    <div className="container">
                        <div className="hero__left">
                            <h3 className="hero__h3">NEW CRYPTO GAME</h3>
                            <h1 className="hero__h1">PLAY TO WIN</h1>
                            <p className="hero__text">Play, Invest,Exchange and Join the Contest with high re-wards at T2 Lottery!</p>
                            <Link to ="/lottery">
                                <div className="buy btn btn-pink">
                                    <p className="btn__title">GET STATRTED NOW!</p>
                                </div>
                            </Link>
                        </div>
                        <div className="hero__right">
                            <img className="shape herro__phone" src={phone} alt="" />
                            <img className="shape hero__man" src={man} alt="" />
                            <img className="shape hero__ripple hero__fz" src={ripple} alt="" />
                            <img className="shape hero__ripple2 hero__fz" src={ripple1} alt="" />
                            <img className="shape hero__btc hero__fz" src={btc} alt="" />
                            <img className="shape hero__btc2 hero__fz" src={btc2} alt="" />
                            <img className="shape hero__shape" src={shape} alt="" />
                            <img className="shape hero__award-bg" src={bg} alt="" />
                            <img className="shape hero__award" src={award} alt="" />
                            <img className="shape hero__award-bg2" src={bg1} alt="" />
                            <img className="shape hero__gift" src={gift} alt="" />
                            <img className="shape hero__gift-bg" src={bg} alt="" />
                            <img className="shape hero__shield" src={shield} alt="" />
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="features">
                <div className="grid">
                    <div className="grid__row feature-mg">
                        <div className="col-4">
                            <div className="single__feature">
                                <div className="single-feature-icon single-feature-icon-pink ">
                                    <img src={icon1} alt="" className="prs__img" />
                                </div>
                                <h4 className="title">EXCLUSIVE OFFER</h4>
                                <p className="text">
                                    READ MORE
                                    <FaArrowRight className="icon" /> 
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="single__feature " onClick={()=>{setOpenModal(true)}}>
                                <div className="single-feature-icon single-feature-icon-yelow ">
                                    <img src={icon2} alt="" className="prs__img" />        
                                </div>
                                <h4 className="title">SMART CONTRACT</h4>
                                <p className="text">
                                    READ MORE
                                    <FaArrowRight className="icon" /> 
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="single__feature single__feature-tablet">
                                <div className="single-feature-icon single-feature-icon-violet">
                                    <img src={icon3} alt="" className="prs__img" />
                                </div>  
                                <h4 className="title">PLAYGROUND FAIR</h4>
                                <p className="text">
                                    READ MORE
                                    <FaArrowRight className="icon"  /> 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rules">
                <div className="grid ">
                    <div className="grid__row rules-mg">
                        <div className="hero__left">
                            <h3 className="hero__h3">RULES OF THE GAME</h3>
                            <p className="hero__text">During the event, choose a random number from 1 to 9, please fill in the blanks as prescribed,
                            do not choose the same number to buy tickets
                            After purchasing your ticket, wait for your next turn to claim your prize if you win .<br/>
                            GOOD LUCK !
                            </p>                   
                            <Link to ="/lottery">
                                <div className="buy btn btn-pink">
                                    <p className="btn__title">GOT IT !!!</p>
                                </div>
                            </Link>
                            </div>
                        <div className="hero__right">
                            <img className="rules-right" src={win} alt="" />                          
                        </div>
                        
                    </div>
                </div>
            </div>  
            <div className="infogame">
                <div className="grid">
                    <div className="grid__row">
                        <div className="col-4">
                            <div className="single__game">
                                <div className="single-game-img">
                                    <img src={player} alt="" className="prs__img" />
                                </div>
                                <h4 className="title">99k</h4>
                                <p className="text">
                                    Player
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="single__game">
                                <div className="single-game-img">
                                    <img src={games} alt="" className="prs__img" />
                                </div>
                                <h4 className="title">99+</h4>
                                <p className="text">
                                    Games
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="single__game">
                                <div className="single-game-img">
                                    <img src={winner} alt="" className="prs__img" />
                                </div>
                                <h4 className="title">70+</h4>
                                <p className="text">
                                    Winner
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           {openModal && <Modal closeModal={setOpenModal} />}
        </>
    )
}

export default Home
