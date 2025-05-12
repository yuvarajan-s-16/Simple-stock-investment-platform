import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {thunk} from "redux-thunk";
import authReducer from "./Auth/Reducer";
import coinReducer from "./Coin/Reducer";
import walletReducer from "./Wallet/Reducer";
import orderReducer from "./Order/Reducer";
import assetReducer from "./Assets/Reducer";
import watchlistReducer from "./Watchlist/Reducer";
import withdrawalReducer from "./Withdrawal/Reducer";
import chatBotReducer from "./Chat/Reducer";

const rootReducers=combineReducers({

    auth:authReducer,
    coin:coinReducer,
    wallet:walletReducer,
    order:orderReducer,
    asset:assetReducer,
    watchlist:watchlistReducer,
    withdrawal:withdrawalReducer,
    chatBot:chatBotReducer,

});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))