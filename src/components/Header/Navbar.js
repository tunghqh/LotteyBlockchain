import React, { useEffect,useState } from "react";
import './Navbar.css'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import greendot from "../assets/img/greendot.png"
import logo from "../assets/img/Logo.png"
import dataReducer from "../../redux/data/dataReducer";


function Navbar() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const blockchain = useSelector((state) => state.blockchain);

    const admin = data.ADMIN.toLowerCase();
  
    useEffect(() => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.smartContract, dispatch]);
    const [active,setActive] = useState(1)
    const toggleActive = (index)=>{
      setActive(index)
    }

    return (
      

        <header className="header">
          <div className="header__menu">

            <Link to="/"> 
              <img src={logo} alt=""  className="logo" />
            </Link>
            <ul className="menu__list">
            
              {admin == blockchain.account ? 
              <Link to ="/admin">
                  <li className={active === 1 ? "menu__item  menu-active" : "menu__item"}  onClick={()=>{
                      toggleActive(1)
                    }}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    ADMIN
                  </li>

                </Link> 
                : null
              }
                
               


                  <Link to ="/">
                  <li className={active === 1 ? "menu__item  menu-active" : "menu__item"}  onClick={()=>{
                      toggleActive(1)
                    }}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    HOME
                  </li>
                </Link>
                <Link to ="/lottery">
                  <li className={active === 2 ? "menu__item menu-active" : "menu__item"}  onClick={()=>{
                     toggleActive(2)
                    }}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                     LOTTERY
                  </li>
                </Link>
                <Link to ="/minigame">
                    <li className={active === 4 ? "menu__item menu-active" : "menu__item"}  onClick={()=>{
                      toggleActive(4)
                    }}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      MINI GAME
                    </li>
                </Link>
                <Link to ="/myticket">
                    <li className={active === 3 ? "menu__item menu-active" : "menu__item"}  onClick={()=>{
                      toggleActive(3)
                    }}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      MY TICKET
                    </li>
                </Link>

                <Link to ="/about">
                    <li className={active === 5 ? "menu__item menu-active" : "menu__item"}  onClick={()=>{
                      toggleActive(5)
                    }}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      ABOUT
                    </li>
                </Link>

                <li className="menu__item">{blockchain.account !== null ? (
                  <button className = 'menu_address'>
                    <div className="taikhoan">
                      <p className="text-tk">
                        {parseFloat(blockchain.balance).toFixed(2)} 
                      </p>
                    </div>
                      <Link to='/' style={{textDecoration:0}}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(connect());
                        }}>
                        <>
                           <div className= 'text_address'>
                            {blockchain.account.substring(0, 3)}...
                            {blockchain.account.substring(blockchain.account.length - 3)}
                          </div>
                           
                        </>
                      </Link>
                      <img className="greendot" src={greendot} alt="" />
                    </button>
                    ) : (
                  <button className="button_metamask">
                    <Link to='/'  style={{textDecoration:0}}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                      }}>
                      <p className="text_sign">SIGN IN</p>
                    </Link>
                  </button>

                    )}
                </li>
          </ul>

        </div>
      </header>
  
    );
}

export default Navbar
