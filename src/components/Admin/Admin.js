import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import './Admin.css'
import web3 from "web3";
import Swal from 'sweetalert2'
import imgad from '../assets/img/admin/admin.png'



function Admin() {

    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [money,setMoney] = useState(0);
    const [loading, setLoading] = useState(false);
    const [total,setTotal] = useState(0);

    useEffect(() => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
          dispatch(fetchData(blockchain.account));
        }
      }, [blockchain.smartContract, dispatch]);
    
     
    const  SendMoneyAddressSM = (money) => {
        setLoading(true);
        blockchain.smartContract.methods
          .SendMoneyAddressSM()
          .send({
          from: blockchain.account,
          value: blockchain.web3.utils.toWei(`${1 * money}`, "ether"),
        })
        .once("error", (err) => {
        setLoading(false);
        console.log(err);
        })
        .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        Swal.fire({
          icon: 'success',
          title: `You have successfully purchased : ${money}`,
          text: 'Thank you!!!',
          timer: 1500
        })
        dispatch(fetchData(blockchain.account));
        dispatch(connect());
      });
      };
   
      const sumit_sendMoney = () => {
        if(blockchain.account== null) {
          Swal.fire({
            icon: 'error',
            title: 'You are not logged in to your MetaMask wallet',
            text: 'Please login to MetaMark!!!',
            timer: 1500
          })
         } 

      
        else if(money==''){
          Swal.fire({
            icon: 'error',
            title: 'You have not selected the money ',
            text: 'Please select the money!!!',
            timer: 1500
          })
        }
      
        else if(money < 0){
          Swal.fire({
            icon: 'error',
            title: 'You have entered the wrong money required',
            text: 'Please enter an amount greater than 0!!!',
            timer: 1500
          })
        }
      
        else
        SendMoneyAddressSM(money)
      }
      const [toggleState,setToggleState] = useState(1)
      const toggleTab = (index)=>{
        setToggleState(index)
      }

      useEffect(() => {
          var totalAdmin = 0;
          data.rounds.map((round) => {
            totalAdmin += parseFloat(round.profitAdmin)  ;
          })

          setTotal(totalAdmin);

        }
      )


    const [days,setDays] = useState(0);
    const [hours,setHours] = useState(0);
    const [minutes,setMinutes] = useState(0);
    const [seconds,setSeconds] = useState(0);
      const [loadingDial, setLoadingDial] = useState(false);
      const dial = () => {
        setLoadingDial(true);
        blockchain.smartContract.methods
          ._dial()
          .send({
            from: blockchain.account,
          })
          .once("error", (err) => {
            setLoadingDial(false);
            console.log(err);
          })
          .then((receipt) => {
            setLoadingDial(false);
            console.log(receipt);
         
              Swal.fire({
                icon: 'success',
                title: 'DIAL SUCCESS',
                timer: 1500
              })       
            dispatch(fetchData(blockchain.account));
            dispatch(connect());
          });
      };
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

      // var delay = 0 ;

      // delay = () =>{
      //   setTimeout(() => {
      //     dispatch(fetchData(blockchain.account)); 
      //   }, 30000);        
      // }
      
      // if(days == 0 && hours==0 && minutes == 0 && seconds == 0){
      //   delay();
      // }

  })
    return (
        <div className="admin">
          <div className="bc-lottery">
            <img src={imgad} alt="" className="admin__img" />
            <div className="grid">
                <div className="grid__row">
                    <div className="col-12">
                        <h4 className="title">ADMIN</h4>
                        
                       
                    </div>
                </div>
            </div>
        </div>

        <div className="grid">
          <div className="grid__row jackpot-blance-admin">
            <div className="jackpot-lotery2-admin">
              <h4 className="stt-title-admin"> JACKPOT 2</h4>
              <div className="stt-count">
                <span className="jackpot-number-admin">
                  {parseFloat(web3.utils.fromWei(data.TotalJP2.toString(), 'ether')).toFixed(3)} ETH </span>
              </div>
            </div>
            <div className="jackpot-lotery2-admin">
              <h4 className="stt-title-admin"> JACKPOT 1</h4>
              <div className="stt-count">
                <span className="jackpot-number-admin">
                  {parseFloat(web3.utils.fromWei(data.TotalJP1.toString(), 'ether')).toFixed(3)} ETH</span>
              </div>
            </div>

            <div className="jackpot-lotery2-admin">
              <h4 className="stt-title-admin">Balance</h4>
              <div className="stt-count">
                <span className="jackpot-number-admin">
                  {parseFloat(web3.utils.fromWei(data.getBalance.toString(), 'ether')).toFixed(3)} ETH</span>
              </div>
              </div>
              <div className="jackpot-lotery2-admin">
                <h4 className="stt-title-admin"> Total Profit</h4>
                <div className="stt-count">
                  <span className="jackpot-number-admin">
                    {parseFloat(web3.utils.fromWei(total.toString(), 'ether')).toFixed(3)} ETH
                  </span>
                </div>
              </div>
          
          </div>
        </div>
        <div className="table_container-game">
            <div className="bloc-tabs">
              <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(1) }>MANAGE</div> 
              <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(2) }>ADMINISTRATION</div>  
            </div>
          </div>
          <div className="grid">
            <table className={toggleState === 1 ? "table-scroll active-content" : "table-scroll"}> 
                    <thead>
                      <tr>
                                  <th>ROUND</th>
                                  <th>RESULT</th>
                                  <th>TOTAL TICKETS</th>  
                                  <th>PROFIT</th>
                                  
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
                                    <td className="table-id-round">{round.totalTicket.toString()}</td>          
                                    <td className="table-id-round">
                                    {parseFloat(web3.utils.fromWei(round.profitAdmin.toString(), 'ether')).toFixed(3)}
                                    </td>
                      
                                  </tr>
                                
                                  )
                              })}
                    </tbody>
                </table>
                <div className={toggleState === 2 ? "freeticket active-ticket" : "freeticket"}>
                  <h5 className="timer-subtitile">ADMINISTRATION</h5>
                  <div className="admin-manager">
                    <div className="sendtoadmin">
                      <h1 className="send-joy">DEPOSIT AMOUNT</h1>
                      <div className="" >
                        <input type='number' placeholder="Quantily" className="enterQuantily-admin" onChange={e => setMoney(e.target.value)} placeholder="0 ETH" required/>
                        { !loading ? <button className="btn btn-tranfer" onClick={sumit_sendMoney}>SEND</button> : <button className=" adsend-loading btn-loading" />}  
                      </div>
                    </div>
                    <div className="autoadmin">
                      <h1 className="send-joy"> START ROUND</h1>  
                      <a href="#" className="auto-round-link">
                        <button className="btn btn-auto">ADD LINK</button>
                      </a>
                      {days ==0 && hours==0 &&  minutes==0 && seconds==0 ? (blockchain.account !== null ? ( !loadingDial ? <button className="btn btn-auto" onClick={dial}>DIAL</button> :
               <button className="dial-loading btn-loading" />) : null) : null}
                    </div>

                  </div>
              </div>

          </div>
        </div>
        
    )
}

export default Admin