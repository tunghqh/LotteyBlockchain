import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import './MyTicket.css'
import web3 from "web3";
import logo from "../assets/img/Logo.png"



function MyTicket() {

    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    
    const handleChange = event => {
       setSearchTerm(event.target.value);
     };

     useEffect(() => {
        const results = data.tickets.filter(ticket =>
            ticket.id.includes(searchTerm)
          );
          setSearchResults(results);
     }, [searchTerm])

    return (

    <div className="mytiket-area">
    <input
            className="search"
            type="text"
            placeholder="Search for ID Ticket"
            value={searchTerm}
            onChange={handleChange}
        />
        <div className="grid">
            <div className="grid__row"> 
            {/* <div className="col-4"> */}
                { searchResults.map((ticket, key) => {
                if(blockchain.account== ticket.player.toLowerCase()) {
                    return(
                        <div className="col-3">
                            {ticket.win == 'none' || ticket.win == 'lose' ?                
                            <div className="tiket" key={key}>
                            <img src={logo} alt="" className="tk__logo"/>
                            <div className="id__round">
                                {ticket.roundID.toString()}
                            </div>
                            <div className="id__ticket">
                                {ticket.id.toString()}
                                <p className="tickit__text">TICKET ID:</p>
                            </div>
                        
                            <div className="tiket-buy">
                                <input type='button'  className="reslt-number" value={ticket.number[0].toString()} />
                                <input type='button'  className="reslt-number" value={ticket.number[1].toString()} />
                                <input type='button'  className="reslt-number" value={ticket.number[2].toString()} />
                                <input type='button'  className="reslt-number result-number-text" value={ticket.coefficient} />            
                            </div>
                            <div className="wallet-price">
                                <div className="id__wallet">
                                    <p className="id__text">ID: </p>
                                    {ticket.player.substring(0, 6)}....
                                    {ticket.player.substring(blockchain.account.length - 10)}
                                </div>
                                
                            </div>
                            <div className="giai-prize">
                                <div className="giai">
                                    {ticket.win}
                                </div>
                                <div className="prize">
                                    <p className="prize__text">Prize:</p>
                                    {web3.utils.fromWei(ticket.prize.toString(), 'ether')} ETH
                                </div>
                            </div>
                            

                                </div> : ticket.win == "Consolation" ?
                                
                            <div className="tiket ticket_Consolation" key={key}>
                            <img src={logo} alt="" className="tk__logo"/>
                            <div className="id__round">
                                {ticket.roundID.toString()}
                            </div>
                            <div className="id__ticket">
                                {ticket.id.toString()}
                                <p className="tickit__text">TICKET ID:</p>
                            </div>
                        
                            <div className="tiket-buy">
                                <input type='button'  className="reslt-number" value={ticket.number[0].toString()} />
                                <input type='button'  className="reslt-number" value={ticket.number[1].toString()} />
                                <input type='button'  className="reslt-number" value={ticket.number[2].toString()} />
                                <input type='button'  className="reslt-number result-number-text" value={ticket.coefficient} />                        
                            </div>
                            <div className="wallet-price">
                                <div className="id__wallet">
                                    <p className="id__text">ID: </p>
                                    {ticket.player.substring(0, 6)}....
                                    {ticket.player.substring(blockchain.account.length - 10)}
                                </div>
                                
                            </div>
                            <div className="giai-prize">
                                <div className="giai">
                                    {ticket.win}
                                </div>
                                <div className="prize">
                                    <p className="prize__text">Prize:</p>
                                    {web3.utils.fromWei(ticket.prize.toString(), 'ether')} ETH
                                </div>
                            </div>
                            

                                </div> :
                                
                            <div className="tiket ticket_jp" key={key}>
                            <img src={logo} alt="" className="tk__logo"/>
                            <div className="id__round">
                                {ticket.roundID.toString()}
                            </div>
                            <div className="id__ticket">
                                {ticket.id.toString()}
                                <p className="tickit__text">TICKET ID:</p>
                            </div>
                        
                            <div className="tiket-buy">
                                <input type='button'  className="reslt-number" value={ticket.number[0].toString()} />
                                <input type='button'  className="reslt-number" value={ticket.number[1].toString()} />
                                <input type='button'  className="reslt-number" value={ticket.number[2].toString()} />
                                <input type='button'  className="reslt-number result-number-text" value={ticket.coefficient} />                        
                            </div>
                            <div className="wallet-price">
                                <div className="id__wallet">
                                    <p className="id__text">ID: </p>
                                    {ticket.player.substring(0, 6)}....
                                    {ticket.player.substring(blockchain.account.length - 10)}
                                </div>
                                
                            </div>
                            <div className="giai-prize">
                                <div className="giai">
                                    {ticket.win}
                                </div>
                                <div className="prize">
                                    <p className="prize__text">Prize:</p>
                                    {parseFloat(web3.utils.fromWei(ticket.prize.toString(), 'ether')).toFixed(3)} ETH
                                </div>
                            </div>
                            

                                </div>} 

                        </div>  
                    )}
                        })} 
                </div>
            </div>
        {/* </div> */}
        
    </div>


            
      
    )
}

export default MyTicket