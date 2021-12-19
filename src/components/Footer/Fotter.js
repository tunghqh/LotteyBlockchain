import React from 'react'
import './Fotter.css'
import { Link } from 'react-router-dom';
import {FaFacebook,FaTwitter,FaYoutube,FaGithub} from 'react-icons/fa'

function Fotter() {
    return(
        <footer className="footer">
        <div className="footer__top">
            <div className="footer__name-logo">
                <span className="footer__name">LOTERY BLOCKCHAIN</span>
            </div>
            <ul className="footer__list">
                <Link to ="/">
                    <li className="menu__item">Home</li>
                </Link>
                <Link to ="/lottery">
                    <li className="menu__item">Lottery</li>
                </Link>
                <Link to ="/minigame">
                    <li className="menu__item">MiniGame</li>
                </Link>

                <Link to ="/myticket">
                    <li className="menu__item">MyTicket</li>
                </Link>

                <Link to ="/about">
                    <li className="menu__item">About</li>
                </Link>
            </ul>
            <ul className="footer__social">
                <li className="social__item">
                    <FaFacebook />
                </li>
                <li className="social__item">
                     <FaTwitter />
                </li>
                <li className="social__item">
                    <FaYoutube />
                </li>
                <a className="github" href ="https://github.com/tunghqh/ContractLottery/blob/main/Contract.sol">
                    <li className="social__item">
                        <FaGithub />
                    </li>
                </a>
                
            </ul>

        </div>
        <div className="footer__bot">
           <div className="coppyright">
               Blockchain@2021
           </div>
           <div className="footer__adress">
               556 Núi Thành, Hải Châu, Đà Nẵng
           </div>
        </div>
    </footer>
    )

}

export default Fotter
