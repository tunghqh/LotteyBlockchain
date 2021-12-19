const initialState = {
  loading: false,
  roundID : 0,
  tickets : [],
  rounds : [],
  endTime : 0,
  error: false,
  errorMsg: "",
  TotalJP2 : 0,
  TotalJP1 : 0 ,
  TotalTiket: 0,
  Ves : 0,
  GameID:0,
  Games : [],
  getBalance : 0,
  ADMIN : ""
  
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        roundID: action.payload.roundID,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        tickets : action.payload.tickets,
        rounds : action.payload.rounds,
        TotalJP2 : action.payload.TotalJP2,
        TotalJP1 : action.payload.TotalJP1,
        TotalTiket : action.payload.TotalTiket,
        Ves : action.payload.Ves,
        GameID  : action.payload.GameID ,
        Games  : action.payload.Games ,
        getBalance : action.payload.getBalance,
        ADMIN : action.payload.ADMIN
        
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
