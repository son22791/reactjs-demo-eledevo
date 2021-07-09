import { all } from "redux-saga/effects";
import { itemSaga } from "./ItemSaga";
function* rootSaga(){
        yield all([
                ...itemSaga
        ])
}
export default rootSaga