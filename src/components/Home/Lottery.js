import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import web3 from "web3";
import './Lottery.css'
import '../assets/responsive/reponsive.css'
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import lottery from '../assets/img/Lottery/lottery.png'
import icon1 from '../assets/img/Lottery/ic1.png'
import icon2 from '../assets/img/Lottery/ic2.png'
import icon3 from '../assets/img/Lottery/ic3.png'
import st1 from '../assets/img/Lottery/st1.png'
import eth from '../assets/img/Lottery/eth.png'
import cup from '../assets/img/Lottery/cup.png'
import tikit from '../assets/img/Lottery/tikit-icon.png'
import {FaHome,FaArrowRight,FaUser,FaEthereum} from 'react-icons/fa'
import Swal from 'sweetalert2'

function Lottery() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const [loadingDial, setLoadingDial] = useState(false);
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [loadingBuyQuaty, setLoadingBuyQuaty] = useState(false);

    const [days,setDays] = useState(0);
    const [hours,setHours] = useState(0);
    const [minutes,setMinutes] = useState(0);
    const [seconds,setSeconds] = useState(0);

    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');

    const [quantity,setQuantity] = useState('');

    const [show1,setShow1]=useState(false)
    const [show2,setShow2]=useState(false)
    const [show3,setShow3]=useState(false)

    const [table,setTable] = useState(true)
    const [active,setActive] = useState(1)

     


  
    useEffect(() => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.smartContract, dispatch]);

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

      var delay = 0 ;

      delay = () =>{
        setTimeout(() => {
          dispatch(fetchData(blockchain.account)); 
        }, 30000);        
      }
      
      if(days == 0 && hours==0 && minutes == 0 && seconds == 0){
        delay();
      }
      // else {
      //   clearTimeout(delay)
      // }

  })




  const buyTicket = ([num1,num2,num3]) => {
    setLoadingBuy(true);
    blockchain.smartContract.methods
      .buyTicket([num1,num2,num3])
      .send({
      from: blockchain.account,
      value: blockchain.web3.utils.toWei("0.01", "ether"),
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


const  buyMutilTickets = (quantity) => {
  setLoadingBuyQuaty(true);
  blockchain.smartContract.methods
    .buyMutilTickets(quantity)
    .send({
    from: blockchain.account,
    value: blockchain.web3.utils.toWei(`${0.01 * quantity}`, "ether"),
  })
  .once("error", (err) => {
  setLoadingBuyQuaty(false);
  console.log(err);
  })
  .then((receipt) => {
  setLoadingBuyQuaty(false);
  console.log(receipt);
  Swal.fire({
    icon: 'success',
    title: `You have successfully purchased : ${quantity} Ticket`,
    text: 'Thank you!!!',
    timer: 1500
  })
  dispatch(fetchData(blockchain.account));
  dispatch(connect());
});
};


const submitValue = () => {
    if(blockchain.account== null) {
      Swal.fire({
        icon: 'error',
        title: 'You are not logged in to your MetaMask wallet',
        text: 'Please login to MetaMark!!!',
        timer: 1500
      })
     } 

    else if(days ==0 && hours==0 &&  minutes==0 && seconds==0  ){
      Swal.fire({
        icon: 'error',
        title: 'Lottery has not started yet',
        text: 'Please wait for the next lottery!!!',
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
    buyTicket([num1,num2,num3])
}

const sumit_buyAlot = () => {
  if(blockchain.account== null) {
    Swal.fire({
      icon: 'error',
      title: 'You are not logged in to your MetaMask wallet',
      text: 'Please login to MetaMark!!!',
      timer: 1500
    })
   } 
   else if(days ==0 && hours==0 &&  minutes==0 && seconds==0  ){
    Swal.fire({
      icon: 'error',
      title: 'Lottery has not started yet',
      text: 'Please wait for the next lottery!!!',
      timer: 1500
    })
  }

  else if(quantity==''){
    Swal.fire({
      icon: 'error',
      title: 'You have not selected the quantity to buy',
      text: 'Please select at least 1 ticket!!!',
      timer: 1500
    })
  }

  else if(quantity < 1){
    Swal.fire({
      icon: 'error',
      title: 'You have entered the wrong quantity required',
      text: 'Please enter an amount greater than 0!!!',
      timer: 1500
    })
  }

  else
  buyMutilTickets(quantity)
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

    // var btn = document.getElementsByClassName(".input_number");

      // document.querySelector(".btn__tru").setAttribute("disabled", "disabled");

      var input_quatity = document.querySelector('.input_quatity');
      var valueCount =0;
  
      var btn_dau = Array.from(document.querySelectorAll('.btn_dau'));
      valueCount= input_quatity.value
      if(valueCount == ""){
        document.querySelector(".btn__tru").setAttribute("disabled", "disabled")
       }
     
      btn_dau.forEach(function(btna){
        btna.addEventListener('click',function(){
            if(btna.innerHTML=='+'){
               valueCount++;
               input_quatity.value = valueCount ;
               
               if (valueCount > 1) {
                document.querySelector(".btn__tru").removeAttribute("disabled");
                document.querySelector(".btn__tru").classList.remove("disabled")
              }
              setQuantity(input_quatity.value)
            
            }
           else {
              
              valueCount--;
              input_quatity.value = valueCount ;
              if (valueCount == 1) {
                document.querySelector(".btn__tru").setAttribute("disabled", "disabled")
            }
            setQuantity(input_quatity.value)
           }
           
           
      })
      })

  },)


  const [toggleState,setToggleState] = useState(1)
    const toggleTab = (index)=>{
      setToggleState(index)
    }
  

    return (
      <div className="Lottery">
        <div className="bc-lottery">
            <img src={lottery} alt="" className="ltr__img" />
            <div className="grid">
                <div className="grid__row">
                    <div className="col-12">
                        <h4 className="title">LOTTERY</h4>
                        <ul className="lead__list">
                            <li className="lead__item">
                                <FaHome />
                                Home
                            </li>
                            <li className="lead__item">
                                <FaArrowRight />
                            </li>
                            <li className="lead__item">
                                Lottery
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="daily-lottery">
          <div className ="lottery-static">
            <div className="grid">
              <div className="grid__row static-info">
                <div className="col-4>">
                  <div className="single-staticstics">
                    <div className="static-left">
                      <img src={st1} alt="" className="static-icon"/>
                    </div>
                    <div className="static-right">
                      
                      <h4 className="stt-title stt-title-jp1 mgl-50 ">JACKPOT1 : {parseFloat(web3.utils.fromWei(data.TotalJP1.toString(), 'ether')).toFixed(3)} </h4>
                      <div className="stt-count">
                        <img src={eth} alt="" className="eth-image"/>
                        <span className="purchased mgl-50"> JACKPOT2 : {parseFloat(web3.utils.fromWei(data.TotalJP2.toString(), 'ether')).toFixed(3)}
                        </span>
                      </div>


                    </div>
                  </div>
                </div>
                <div className="col-4>">
                  <div className="single-staticstics">
                    <div className="static-left">
                      <img src={st1} alt="" className="static-icon"/>
                    </div>
                    <div className="static-right">
                      {blockchain.account == null || data.roundID.toString() == 0 ? <h4 className="stt-title ">result 0 th </h4> : <h4 className="stt-title ">result {data.roundID.toString() - 1}th </h4>  }
                      <div className="stt-count">
                        {/* <img src={cup} alt="" className="cup"/> */}
                        <span className="">
                          { data.rounds.map((round ,key) => {
                            if (round.id.toString() == data.roundID.toString() - 1) {
                            return( 
                              <div key ={key} className="result-number">
                                <input type='button'  className="reslt-number reslt-number-kq " value={round.number[0].toString()} />
                                <input type='button'  className="reslt-number reslt-number-kq" value={round.number[1].toString()} />
                                <input type='button'  className="reslt-number reslt-number-kq" value={round.number[2].toString()} />

                                { round.coefficient == 1 ? <input type='button'  className="reslt-number result-number-text reslt-number-kq" value={"A"} /> :
                                  round.coefficient == 2 ? <input type='button'  className="reslt-number result-number-text reslt-number-kq" value={"B"} /> :
                                  round.coefficient == 3 ? <input type='button'  className="reslt-number result-number-text reslt-number-kq" value={"C"} /> :
                                  <input type='button'  className="reslt-number result-number-text reslt-number-kq" value={"D"} /> }
                                
                              </div>
                            )
                          }
                         })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4>">
                  <div className="single-staticstics">
                    <div className="static-left">
                      <img src={st1} alt="" className="static-icon"/>
                    </div>
                    <div className="static-right">
                      <h4 className="stt-title ">PURCHASED TICKETS</h4>
                      <div className="stt-count">
                        <img src={tikit} alt="" className=""/>
                        <span className="purchased">{data.TotalTiket}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="daily-heading col-8">
            <h3 className="hero__h3">TRY TO CHECK OUT OUR</h3>
            <h1 className="hero__h1">DAILY LOTTERY</h1>
            <p className="hero__text">We update our site regularly; more and more winners are added every day! To locate the most recent winner's information</p>                
          </div>
          <div className="lottery-area">
            <h1 className="chao">Welcome to the  {data.roundID.toString()}th lottery</h1>
          </div>
          <div className="Timer_Loto">
              <h5 className="timer-subtitile">LOTTERY DRAW STARTS IN:</h5>
              <p>{days} : {hours} : {minutes} : {seconds}</p>
              <p className="tomeet">TO MEET TODAY'S CHALLENGES</p>
          </div> 
          
          <div className="Buy_Ticket_Box">
            <h1>GAME IS RUNNING IN DEMO MODE</h1>
          <div className="Buy_Ticket-area">
            <div className="Buy_Ticket_one">
              <h1>Enter your favorite number</h1>
            
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
                  {!loadingBuy ? <button onClick={submitValue} className="buy-ticket btn">Buy Ticket</button> : 
                  <button className=" buy-ticket-loading btn-loading" /> }


            {
              show1 ? <div className="box-number nb1 ">
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

              {show2 ? <div className="box-number nb2 ">
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

              {show3 ? <div className="box-number nb3 ">
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
            <div className="Buy_Ticket__Alot">
                    <h1>Random selection of tickets</h1>
                    <div className="Alot_content">
                      <div className="Alot_content_input">
                        <button className="btn__tru btn_dau disabled">-</button>
                        <span><input type="number" min="0" className="input_quatity"  onChange={e => setQuantity(e.target.value)} placeholder="0" /></span>
                        <button className="btn__cong btn_dau">+</button>
                      </div>
                      <div className="Alot_content_text"><span>Ticket</span></div>
                      {!loadingBuyQuaty ? <div className="Alot_content_button" onClick={sumit_buyAlot}><button className="btn btn--primary">BUY TICKET</button></div> :
                       <button className=" alot-loading btn-loading" />}
                    </div>
                      {/* <div className="">
                        <input type="text" className="input_number_alot" onChange={e => setQuantity(e.target.value)} />
                        <button onClick={sumit}>Submit</button>
                      </div> */}
                
            </div>

          </div>
          </div>
        </div>

        <div className="latest-activites">
          <div className="daily-heading col-8">
            <h3 className="hero__h3">DAILY LOTTERY</h3>
            <h1 className="hero__h1">LATEST ACTIVITES</h1>
            <p className="hero__text">The world’s first truly fair and global lottery. Each player has the highest chances to win the JACKPOT</p>                
          </div>
          <div className="table-wrapper">
            <div className="table_container">
              <div className="bloc-tabs">
                <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(1) }>LOTTERY</div> 
                <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(2) }>JACKPOT</div> 
                <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(3) }>ROUND</div> 
              </div>
              <div className="table-iner">
              <table className={toggleState === 1 ? "table-scroll active-content" : "table-scroll"}> 
                  <thead>
                    <tr>
                                <th>PLAYER</th>
                                <th>NUMBER</th>
                                <th>PRICE</th>
                                <th>HAVE WINNING</th>
                                <th>TICKET</th>
                                <th>ROUND</th>
                                <th>PRIZE</th>
                    </tr>
                  </thead>
                  <tbody className="body-half-screen">
                  { data.tickets.map((ticket, key) => {
                            
                            return(              
                                <tr key={key}>
                                  <td className="table-player">
                                    {ticket.player.substring(0, 4)}....
                                    {ticket.player.substring(blockchain.account.length - 3)}
                                  </td>
                                  <td className="table-ticket" >
                                    <input type='button'  className="reslt-number" value={ticket.number[0].toString()} />
                                      <input type='button'  className="reslt-number" value={ticket.number[1].toString()} />
                                      <input type='button'  className="reslt-number" value={ticket.number[2].toString()} />

                                      { ticket.coefficient == 1 ? <input type='button'  className="reslt-number result-number-text" value={"A"} /> :
                                        ticket.coefficient == 2 ? <input type='button'  className="reslt-number result-number-text" value={"B"} /> :
                                        ticket.coefficient == 3 ? <input type='button'  className="reslt-number result-number-text" value={"C"} /> :
                                        <input type='button'  className="reslt-number result-number-text" value={"D"} /> }
                                        
                                      
                                    </td>
                                  <td className="table-price">
                                    <img src={eth} alt="" className="img-eth"/>
                                    {web3.utils.fromWei(ticket.price, 'ether')}
                                  </td>
                                  <td className="table-win">
                                    {
                                      ticket.win == 'none' || ticket.win == 'lose' ?  
                                      <div style={{textTransform:"capitalize"}}>{ticket.win}</div>
                                      : ticket.win == "Consolation" 
                                      ? <div style={{color: "green"}}>{ticket.win}</div>
                                      : <div style={{color: "red"}}>{ticket.win}</div>

                                    }
                                    
                                  
                                  </td>
                                  <td className="table-id-ticket">{ticket.id.toString()}</td>
                                  <td className="table-id-round">{ticket.roundID.toString()}</td>
                                  <td className="table-prize">
                                    <div className="pri">
                                    <img src={eth} alt="" className="img-eth"/>
                                    {(ticket.prize == 0) ? "0" :  parseFloat(web3.utils.fromWei(ticket.prize, 'ether')).toFixed(3)}
                              
                                    </div>
                                  </td>
                    
                                </tr>
                              
                                )
                            })}
                  </tbody>
              </table>
              <table className={toggleState === 2 ? "table-scroll active-content" : "table-scroll"}>
                <thead>
                  <tr>
                    <th>PLAYER</th>
                    <th>NUMBER</th>
                    <th>PRICE</th>
                    <th>HAVE WINNING</th>
                    <th>TICKET</th>
                    <th>ROUND</th>
                    <th>PRIZE</th>
                    </tr>
                  </thead>
                  <tbody className="body-half-screen">
                  { data.tickets.map((ticket, key) => {
                if(ticket.win== "Jackpots2" || ticket.win== "Jackpots1"){
                        return(              
                          <tr key={key}>
                                  <td className="table-player">
                                    {ticket.player.substring(0, 4)}....
                                    {ticket.player.substring(blockchain.account.length - 3)}
                                  </td>
                                  <td className="table-ticket" >
                                      <input type='button'  className="reslt-number" value={ticket.number[0].toString()} />
                                      <input type='button'  className="reslt-number" value={ticket.number[1].toString()} />
                                      <input type='button'  className="reslt-number" value={ticket.number[2].toString()} />

                                      { ticket.coefficient == 1 ? <input type='button'  className="reslt-number result-number-text" value={"A"} /> :
                                        ticket.coefficient == 2 ? <input type='button'  className="reslt-number result-number-text" value={"B"} /> :
                                        ticket.coefficient == 3 ? <input type='button'  className="reslt-number result-number-text" value={"C"} /> :
                                        <input type='button'  className="reslt-number result-number-text" value={"D"} /> }
                                    </td>
                                  <td className="table-price">
                                    <img src={eth} alt="" className="img-eth"/>
                                    {web3.utils.fromWei(ticket.price, 'ether')}
                                  </td>
                                  <td className="table-win"><div style={{color: "red"}}>{ticket.win}</div></td>
                                  <td className="table-id-ticket">{ticket.id.toString()}</td>
                                  <td className="table-id-round">{ticket.roundID.toString()}</td>
                                  <td className="table-prize">
                                    <div className="pri">
                                    <img src={eth} alt="" className="img-eth"/>
                                    {(ticket.prize == 0) ? "0" :  parseFloat(web3.utils.fromWei(ticket.prize, 'ether')).toFixed(3)}
                                    </div>
                                  </td>                  
                                </tr>                         
                            )
                }
                        })}
                  </tbody>
              </table>
              <table className={toggleState === 3 ? "table-scroll active-content" : "table-scroll"}>
                <thead>
                  <tr>
                    <th>ROUND</th>
                    <th>RESULT</th>
                    <th>CONSOLATION</th>
                    <th>JACKPOTS2</th>
                    <th>JACKPOTS1</th>
                    <th>TOTAL TICKET</th>
                    </tr>
                  </thead>
                  <tbody className="body-half-screen">
                  {console.log("round" , data.rounds)}
                  { data.rounds.map((round, key) => {
                        return(              
                          <tr key={key}>
                            <td className="table-id-round">{round.id.toString()}</td>
                            <td className="table-ticket" >
                                    <div key ={key} className="result-number">
                                      <input type='button'  className="reslt-number" value={round.number[0].toString()} />
                                      <input type='button'  className="reslt-number" value={round.number[1].toString()} />
                                      <input type='button'  className="reslt-number" value={round.number[2].toString()} /> 

                                      { round.coefficient == 1 ? <input type='button'  className="reslt-number result-number-text" value={"A"} /> :
                                        round.coefficient == 2 ? <input type='button'  className="reslt-number result-number-text" value={"B"} /> :
                                        round.coefficient == 3 ? <input type='button'  className="reslt-number result-number-text" value={"C"} /> :
                                        <input type='button'  className="reslt-number result-number-text" value={"D"} /> } 
                                    </div>
                            </td>

                            <td className="table-win table-win-block">
                                <div className="stake">
                                  <div className=" stake-user">
                                    <FaUser className="user-icon" />
                                    <span>{round.consolation.toString()}</span>
                                    
                                  </div>
                                  <div className="stake-eth-20">
                                    <FaEthereum className="user-icon"/>
                                    <span>0.02</span>
                                  </div>
                                </div>
                             </td>

                            <td className="table-win table-win-block">
                                <div className="stake">
                                <div className="stake-user">
                                      <FaUser className="user-icon" />
                                      {round.Jackpots2.toString()}
                                    </div>
                                    <div className="stake-eth">
                                      <FaEthereum className="user-icon"/>
                                      {parseFloat(web3.utils.fromWei(round.total, 'ether')).toFixed(3)}
                                    </div>
                                </div>
                             </td>

                             <td className="table-win table-win-block">
                                <div className="stake">
                                <div className="stake-user">
                                  <FaUser className="user-icon" />
                                    {round.Jackpots1.toString()}
                                  </div>
                                  <div className="stake-eth">
                                      <FaEthereum className="user-icon"/>
                                    {  parseFloat(web3.utils.fromWei(round.totalJP1, 'ether')).toFixed(3)}
                              
                                    </div>
                                </div>
                             </td>

                             <td className="table-id-round">{round.totalTicket.toString()}</td>
                          
                          </tr>                         
                        )
                      
                    })}
                  </tbody>
              </table>
              </div>        
             </div>
          </div>
        </div>

        <div className="infogame choise">
                <div className="grid">
                    <div className="grid__row">
                        <div className="col-4">
                            <div className="single__game">
                                <div className="single-game-img">
                                    <img src={icon1} alt="" className="prs__img" />
                                </div>
                                <h4 className="title">CHOOSE</h4>
                                <p className="text">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliqui eum atque.
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="single__game">
                                <div className="single-game-img">
                                    <img src={icon2} alt="" className="prs__img" />
                                </div>
                                <h4 className="title">BUY</h4>
                                <p className="text">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliqui eum atque.
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="single__game">
                                <div className="single-game-img">
                                    <img src={icon3} alt="" className="prs__img" />
                                </div>
                                <h4 className="title">WIN</h4>
                                <p className="text">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliqui eum atque.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
     
  </div>
  );
}

export default Lottery
