import { createStore } from "redux";

const userData = {}

const reducer = (userState = userData, action) => {
    switch (action.type){
        case 'SET_DATA':
            return {...userState, ...action.payload}
        default:
            return userState
    }
}
const store = createStore(reducer)

export default store