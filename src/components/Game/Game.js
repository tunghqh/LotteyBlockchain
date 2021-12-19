import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import web3 from "web3";
import './Game.css'
import {FaHome,FaArrowRight} from 'react-icons/fa'
import Swal from 'sweetalert2'
import play from '../assets/img/Games/play.png' 
import giphp from '../assets/img/giphy.gif'
import anhk from '../assets/img/Games/123.png'
import bao from '../assets/img/Games/bao.png'
import keo from '../assets/img/Games/keo.png'
import bua from '../assets/img/Games/bua.png'
import buauser from '../assets/img/Games/buauser.png'
import buaadmin from '../assets/img/Games/buaad.png'
import keoadmin from '../assets/img/Games/keoad.png'
import baouser from '../assets/img/Games/baouser.png'
import keouser from '../assets/img/Games/keouser.png'
import baoadmin from '../assets/img/Games/baoad.png'
import catuser from '../assets/img/Games/catuser.png'
import catad from '../assets/img/Games/catadmin.png'
import rules from '../assets/img/Games/rules.png'






function Game() {

    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [loadingTranfer, setLoadingTranfer] = useState(false);

    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');


    const [show1,setShow1]=useState(false)
    const [show2,setShow2]=useState(false)
    const [show3,setShow3]=useState(false)

    const [days,setDays] = useState(0);
    const [hours,setHours] = useState(0);
    const [minutes,setMinutes] = useState(0);
    const [seconds,setSeconds] = useState(0);

    const [toAddress, setToAddress] = useState('');
    const [quantilyFreeTicket, setQuantilyFreeTicket] = useState('');



    const startTimer  = () => {

        setInterval(() => {
  
            var remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
            var seconds = Math.round(data.endTime - Date.now() / 1000);
            if (seconds < 0) return remaining;
        
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);
        
            remaining.days = days;
            remaining.hours = hours - remaining.days * 24;
            remaining.minutes = minutes - remaining.days * 24 * 60 - remaining.hours * 60;
            remaining.seconds =
            seconds - remaining.days * 24 * 60 * 60 - remaining.hours * 60 * 60 - remaining.minutes * 60;
            
            setDays(remaining.days)
            setHours(remaining.hours)
            setMinutes(remaining.minutes)
            setSeconds(remaining.seconds)
  
        },1000);
    }
  
    useEffect(() => {
        startTimer();
    } )

    const ErrorMetamark = () => {
      Swal.fire({
        icon: 'error',
        title: 'You are not logged in to your MetaMask wallet',
        text: 'Please login to MetaMark!!!',
        timer: 1500
      })
    }

    const submitValue = () => {
        if(blockchain.account== null) {
          ErrorMetamark();
         } 
    
        else if(days ==0 && hours==0 &&  minutes==0 && seconds==0  ){
          Swal.fire({
            icon: 'error',
            title: 'Lottery has not started yet',
            text: 'Please wait for the next lottery!!!',
            timer: 1500
          })
        }

        else if(data.Ves == 0){
          Swal.fire({
            icon: 'error',
            title: 'Your free tickets is 0',
            text: '0 free ticket',
            timer: 1500
          })
        }


        else if(num1==''||num2==''||num3 ==''){
          Swal.fire({
            icon: 'error',
            title: 'You have not entered enough numbers',
            text: 'Please re-enter!!!',
            timer: 1500
          })
        }
        else if(num1==num2||num2==num3||num3 ==num1){
          Swal.fire({
            icon: 'error',
            title: 'The number you entered has been duplicated',
            text: 'Please re-enter!!!!',
            timer: 1500
          })
        }
        else
        buyTicketGame([num1,num2,num3])
    }

    const MessageGame = async ()  => {
      await blockchain.smartContract.events.Result( (error,event) => {
        const verdict =  event.returnValues.winAmount
        if(verdict == 'LOSE') {
            Swal.fire({
                icon: 'error',
                title: `LOSE `,
                timer: 1500
              })
        } else if(verdict == 'WIN'){
            Swal.fire({
                icon: 'success',
                title: `WIN`,
                timer: 1500
              })
        }
        else {
            Swal.fire({
                icon: 'info',
                title: `HOA`,
                timer: 1500
              })
        }
         console.log(event.returnValues.winAmount,event.returnValues.id)
     }
    )
    }
    
    
    
    const GameMini1  = (chon) => {
        setLoading(true);
        blockchain.smartContract.methods
          .GameMini1(chon)
          .send({
          from: blockchain.account,
          value: blockchain.web3.utils.toWei("0.008", "ether"),
        })
        .once("error", (err) => {
        setLoading(false);
        console.log(err);
        })

        .then((receipt) => {
            

        MessageGame();
        
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
        dispatch(connect());

      });
    };

    const buyTicketGame = ([num1,num2,num3]) => {
        setLoadingBuy(true);
        blockchain.smartContract.methods
          .buyTicketGame([num1,num2,num3])
          .send({
          from: blockchain.account,
        })
        .once("error", (err) => {
        setLoadingBuy(false);
        console.log(err);
        })
        .then((receipt) => {
        setLoadingBuy(false);
        console.log(receipt);
        Swal.fire({
          icon: 'success',
          title: `You have successfully purchased : ${num1} ${num2} ${num3}`,
          text: 'Thank you!!!',
          timer: 1500
        })
        dispatch(fetchData(blockchain.account));
        dispatch(connect());
      });
    };

    const  transferFreeTicket = (_from ,  _to ,  quantilyFreeTicket) => {
      setLoadingTranfer(true);
      blockchain.smartContract.methods
        .transferFreeTicket(_from ,  _to ,  quantilyFreeTicket)
        .send({
        from: blockchain.account,
      })
      .once("error", (err) => {
        setLoadingTranfer(false);
      console.log(err);
      })
      .then((receipt) => {
      setLoadingTranfer(false);
      console.log(receipt);
      Swal.fire({
        icon: 'success',
        title: `You have successfully`,
        text: `You have successfully purchased : ${quantilyFreeTicket} Free Ticket To  ===> ${_to}`,
        timer: 1500
      })
      dispatch(fetchData(blockchain.account));
      dispatch(connect());
    });
    };

    const sumit_Tranfer = () => {
      if(blockchain.account== null) {
        Swal.fire({
          icon: 'error',
          title: 'You are not logged in to your MetaMask wallet',
          text: 'Please login to MetaMark!!!',
          timer: 1500
        })
       } 

      else if(toAddress=='' || quantilyFreeTicket == '' ){
        Swal.fire({
          icon: 'error',
          title: 'You have not selected the address or quantily',
          text: 'Please select at address or quantily!!!',
          timer: 1500
        })
      }
    
      else if(quantilyFreeTicket < 1){
        Swal.fire({
          icon: 'error',
          title: 'You have entered the wrong quantity required',
          text: 'Please enter an amount greater than 0!!!',
          timer: 1500
        })
      }

      else if(data.Ves < quantilyFreeTicket){
        Swal.fire({
          icon: 'error',
          title: 'You dont have enough free tickets',
          text: '===============================',
          timer: 1500
        })
      }
    
      else{
        transferFreeTicket(blockchain.account,toAddress,quantilyFreeTicket)
      }
    }

    useEffect(() => {

        var input1 = document.querySelector('.ip1');
      
        var items = Array.from(document.querySelectorAll('.btn1'));
        items.forEach(function(btn){
          btn.addEventListener('click',function(){
            setShow1(false)
              if(btn.innerHTML=='C'){
                input1.value = ""
              }else if(btn.innerHTML=='R'){
                input1.value = Math.floor(Math.random() * 10)
              }
              else 
              input1.value = btn.innerHTML
              setNum1(input1.value)
            
        })
        })
      
        var input2 = document.querySelector('.ip2');
      
        var items = Array.from(document.querySelectorAll('.btn2'));
        items.forEach(function(btn){
          btn.addEventListener('click',function(){
            setShow2(false)
            if(btn.innerHTML=='C'){
              input2.value = ""
            }else if(btn.innerHTML=='R'){
              input2.value = Math.floor(Math.random() * 10)
            }
              else 
              input2.value = btn.innerHTML
              setNum2(input2.value)
            
        })
        })
      
        var input3 = document.querySelector('.ip3');
      
        var items = Array.from(document.querySelectorAll('.btn3'));
        items.forEach(function(btn){
          btn.addEventListener('click',function(){
            setShow3(false)
            if(btn.innerHTML=='C'){
              input3.value = ""
            }else if(btn.innerHTML=='R'){
              input3.value = Math.floor(Math.random() * 10)
            }
              else 
              input3.value = btn.innerHTML
              setNum3(input3.value)
              
          })
          })
      
      
        },)
        const [toggleState,setToggleState] = useState(1)
        const toggleTab = (index)=>{
          setToggleState(index)
        }
    return (
      <div className ="minigame">

      <div className="bc-lottery">
          <img src={play} alt="" className="ltr__img" />
          <div className="grid">
              <div className="grid__row">
                  <div className="col-12">
                      <h4 className="title">MINI GAME</h4>
                      <ul className="lead__list">
                          <li className="lead__item">
                              <FaHome />
                              Home
                          </li>
                          <li className="lead__item">
                              <FaArrowRight />
                          </li>
                          <li className="lead__item">
                              Mini Game
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>

          {
           <div className="Game">
            <div className="result-game">{data.Games.kq }</div>
           
           {loading ? <div className="gif"><img src = {giphp}  className="anhk" /></div> : 
            <div className="sss" >
              <img className="anhk" src={anhk} alt="" />
              <span className="pre-result-user">
                {
                  data.Games.sochon == 0 ? <img src={buauser} className="pre-reslut" /> : data.Games.sochon == 1  ?
                 <img src={keouser} className="pre-reslut" /> :
                 <img src={baouser} className="pre-reslut" />
                }
              </span>
              <span className="pre-result-admin">
                {
                data.Games.ramdom == 0 ? <img src={buaadmin} className="pre-reslut"  /> :
                 data.Games.ramdom == 1  ? <img src={keoadmin} className="pre-reslut" /> : 
                 <img src={baoadmin} className="pre-reslut" />} 

              </span>
            </div>
           
            }
            <div className="result">
              <div className= "player-result"> 
                <div className="result-text">
                  PLAYER
                </div>
                <img src={catuser} className="catuser" />
                   
              </div>      
              <div className="admin-result">
                <div className="result-text"> LOKI</div>
                <img src={catad} className="catad" />
              </div>
            </div>    

                

                <div className="button-choose">
                    <button className=" btn btn--size-l btn-chon"  onClick={(e) => {

                            if(blockchain.account== null) {
                              ErrorMetamark();
                            } 
                            else{
                            e.preventDefault();
                            GameMini1(0);}
                            }}>Rock
                          <img src={bua} className="keobuabao" />
                        </button>
                    <button className=" btn btn--size-l btn-chon" onClick={(e) => {
                       if(blockchain.account== null) {
                        ErrorMetamark();
                        } 
                        else{
                        e.preventDefault();
                        GameMini1(1);}
                        }}>Scissors
                          <img src={keo} className="keobuabao" />
                        </button>
                    <button className=" btn btn--size-l btn-chon" onClick={(e) => {
                       if(blockchain.account== null) {
                        ErrorMetamark();
                        } 
                        else{
                        e.preventDefault();
                        GameMini1(2);}
                        }}>Paper
                          <img src={bao} className="keobuabao" />
                        </button>
                </div>

                {/* <div className="ketqua">Balance : {parseFloat(blockchain.balance).toFixed(2)}  ether</div> */}

           </div>
            }
          <div className="table_container-game">
            <div className="bloc-tabs">
              <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(1) }>LOTTERY</div> 
              <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(2) }>SEND TICKET</div>  
            </div>
          </div>
         


            <div  className={toggleState === 1 ? "Buy_Ticket_Box Buy_Ticket_Box-game active-lotery" : "Buy_Ticket_Box Buy_Ticket_Box-game"}>
              <h1>{days} : {hours} : {minutes} : {seconds}</h1>
            <div className="ticket-free">Your free ticket : {data.Ves} </div>                        
              <h1>GAME IS RUNNING IN DEMO MODE</h1>
              <div className="result-lottery-game">
                {blockchain.account == null || data.roundID.toString() == 0 ? <h4 className="stt-title stt-title-game">result 0 th </h4> : <h4 className="stt-title stt-title-game">result {data.roundID.toString() - 1}th </h4>}
                <span className="">
                    { data.rounds.map((round ,key) => {
                      if (round.id.toString() == data.roundID.toString() - 1) {
                      return( 
                        <div key ={key} className="result-number">
                          <input type='button'  className="reslt-number" value={round.number[0].toString()} />
                          <input type='button'  className="reslt-number" value={round.number[1].toString()} />
                          <input type='button'  className="reslt-number" value={round.number[2].toString()} />
                          { round.coefficient == 1 ? <input type='button'  className="reslt-number result-number-text" value={"A"} /> :
                            round.coefficient == 2 ? <input type='button'  className="reslt-number result-number-text" value={"B"} /> :
                            round.coefficient == 3 ? <input type='button'  className="reslt-number result-number-text" value={"C"} /> :
                            <input type='button'  className="reslt-number result-number-text" value={"D"} /> }
                                    
                        </div>
                      )
                    }
                  })}
                </span>
              </div>
              <div className="jackpot-lotery">
                  <h4 className="stt-title">LOTTERY JACKPOT 2</h4>
                  <div className="stt-count">
                  <span className="jackpot-number">
                    {parseFloat(web3.utils.fromWei(data.TotalJP2.toString(), 'ether')).toFixed(3)} ETH</span>
                </div>
              </div>
              <div className="jackpot-lotery2">
                  <h4 className="stt-title">LOTTERY JACKPOT 1</h4>
                  <div className="stt-count">
                  <span className="jackpot-number">
                    {parseFloat(web3.utils.fromWei(data.TotalJP1.toString(), 'ether')).toFixed(3)} ETH</span>
                </div>
              </div>
              
            <div className="Buy_Ticket-area">
              <div className="Buy_Ticket_one Buy_Ticket_one-games">
                <span className="buy-tick-game">Enter your favorite number</span>
              
                    <ul className="Buy_One__List">
                      <li>
                        <div>
                        <input type='button' className="input_number ip1" onChange={e => setNum1(e.target.value)} onClick={()=>setShow1(!show1)} required/>
                        </div>
                      </li>
                      <li>
                        <div>
                        <input type='button'  className="input_number ip2" onChange={e => setNum2(e.target.value)} onClick={()=>setShow2(!show2)} required/>
                        </div>
                      </li>
                      <li>
                        <div>
                        <input type='button'  className="input_number ip3" onChange={e => setNum3(e.target.value)}  onClick={()=>setShow3(!show3)}  required/>
                        </div>
                      </li>
                      <li>
                        <div>
                        <input type='button'  className="input_number" />
                        </div>
                      </li>
                      <li>
                        <div>
                        <input type='button'  className="input_number" />
                        </div>
                      </li>
                      <li>
                        <div>
                        <input type='button'  className="input_number" />
                        </div>
                      </li>
                  
                    </ul>
                    {!loadingBuy ? <button onClick={submitValue} className="buy-ticket-game btn">Buy Ticket</button> : <button className=" buy-ticket-loading-game btn-loading" /> }


              {
                show1 ? <div className="box-number nb1-game ">
                      <div className="box_top">
                        <span className="box-number-title">Choose your bet</span>
                      </div>
                      <div className="choise-number">
                        <button className="item btn1 ">1</button><button className="item btn1 ">2</button>
                        <button className="item btn1 ">3</button><button className="item btn1 ">4</button><button className="item btn1 ">5</button>
                        <button className="item btn1 ">6</button><button className="item btn1 ">7</button><button className="item btn1 ">8</button>
                        <button className="item btn1 ">9</button><button  className="item btn1 item-other" >R</button><button className="item btn1 ">0</button>
                        <button  className="item btn1 item-other" >C</button>

                      </div>
                </div> :null}

                {show2 ? <div className="box-number nb2-game ">
                      <div className="box_top">
                        <span className="box-number-title">Choose your bet</span>
                      </div>
                      <div className="choise-number">
                        <button className="item btn2 ">1</button><button className="item btn2 ">2</button>
                        <button className="item btn2 ">3</button><button className="item btn2 ">4</button><button className="item btn2 ">5</button>
                        <button className="item btn2 ">6</button><button className="item btn2 ">7</button><button className="item btn2 ">8</button>
                        <button className="item btn2 ">9</button><button  className="item btn2 item-other" >R</button><button className="item btn2 ">0</button>
                        <button  className="item btn2 item-other" >C</button>

                      </div>
                </div> :null}

                {show3 ? <div className="box-number nb3-game ">
                <div className="box_top">
                        <span className="box-number-title">Choose your bet</span>
                      </div>
                      <div className="choise-number">
                        <button className="item btn3 ">1</button><button className="item btn3 ">2</button>
                        <button className="item btn3 ">3</button><button className="item btn3 ">4</button><button className="item btn3 ">5</button>
                        <button className="item btn3 ">6</button><button className="item btn3 ">7</button><button className="item btn3 ">8</button>
                        <button className="item btn3 ">9</button><button  className="item btn3 item-other" >R</button><button className="item btn3 ">0</button>
                        <button  className="item btn3 item-other" >C</button>

                      </div>
                </div> :null}

              </div>
              

            </div>
            </div>
            <div className={toggleState === 2 ? "freeticket active-ticket" : "freeticket"}>
            <h5 className="timer-subtitile">SEND FREE TICKETS TO FRIENDS</h5>
            <h1 className="send-joy">TO GET JOY BACK</h1>
            <div className="ticket-free">Your free ticket : {data.Ves} </div>
            <div className="tangFreeTicket" >
              <input type='text' placeholder="Send the ticket to your friend's wallet" className="enterAddress" onChange={e => setToAddress(e.target.value)}  required/>
              <input type='number' placeholder="Quantily" className="enterQuantily" onChange={e => setQuantilyFreeTicket(e.target.value)} required/>

              { !loadingTranfer ? <button className="btn btn-tranfer" onClick={sumit_Tranfer}>Tranfer</button> : <button className=" tranfer-loading btn-loading" />}
            </div>
            </div>
          




          

          <div className="rules rules-games">
                <div className="grid ">
                    <div className="grid__row rules-mg">
                        <div className="hero__left">
                            <h3 className="hero__h3">RULES OF THE GAME</h3>
                            <p className="hero__text">The player will place the door Rock,Paper,Scissors to win the admin.
                             With the following principles Rock win Scissors,
                             Scissors win Paper, Paper win Rock.Win to buy free lottery tickets.<br/>
                            GOOD LUCK !
                            </p>                   
                            
                            </div>
                        <div className="hero__right">
                            <img className="rules-right rules-right-game" src={rules} alt="" />                          
                        </div>
                        
                    </div>
                </div>
            </div>  
        </div>
           
      
    )
}

export default Game