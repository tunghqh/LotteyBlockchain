// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let roundID = await store
        .getState()
        .blockchain.smartContract.methods.RoundId()
        .call();

      let tickets = await store
        .getState()
        .blockchain.smartContract.methods.getTicket()
        .call();
      
      let endTime = await store
      .getState()
      .blockchain.smartContract.methods.endTime()
      .call();

      let rounds = await store
      .getState()
      .blockchain.smartContract.methods.getRound()
      .call();

      let TotalJP2 = await store
      .getState()
      .blockchain.smartContract.methods.TotalJP2()
      .call();

      let TotalJP1 = await store
      .getState()
      .blockchain.smartContract.methods.TotalJP1()
      .call();
      

      let TotalTiket = await store
      .getState()
      .blockchain.smartContract.methods.TotalTicket()
      .call();

      let Ves = await store
      .getState()
      .blockchain.smartContract.methods.ves(account)
      .call();

      let GameID = await store
      .getState()
      .blockchain.smartContract.methods.gameID()
      .call();
  
      let Games = await store
      .getState()
      .blockchain.smartContract.methods.games(GameID)
      .call();

      let getBalance = await store
      .getState()
      .blockchain.smartContract.methods.getBalance()
      .call();

      let ADMIN = await store
      .getState()
      .blockchain.smartContract.methods.owner()
      .call();
      

      dispatch(
        fetchDataSuccess({
          roundID ,
          tickets,
          endTime,
          rounds,
          TotalJP2,
          TotalJP1,
          TotalTiket,
          Ves,
          GameID,
          Games,
          getBalance,
          ADMIN
          
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
