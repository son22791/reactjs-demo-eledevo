//Import put , takeEvery từ @redux-saga/core/effects
//Import getApi từ fetchAPI
//Import tất cả các kiểu hành động types trong constants
//Khai báo ra function( chống bất đồng bộ) mục đích trả hành động khi thành công hay thất bại dùng trycatch bắt lỗi const res nhận vào từ fetchAPI tương ứng
// yield put({
// type: types...
// payload: res
// })
//Export const itemSaga [takeEvery(kiểu yêu cầu hành động,hành động trả về)]
import { put, takeEvery } from "@redux-saga/core/effects";
import getApi from "../fetchAPI/getItems";
import addApi from "../fetchAPI/addItems";
import updateApi from "../fetchAPI/updateItems";
import deleteApi from "../fetchAPI/deleteItems";
import searchApi from "../fetchAPI/searchItems";
import searchpaginationApi from "../fetchAPI/searchpagiItem";
import paginationApi from "../fetchAPI/pagination";
import * as types from "../constant";
function* getListItem() {
  try {
    const res = yield getApi(); //Khai báo biến gán giá trị nhận vào từ fetchAPI
    yield put({
      type: types.GET_ITEM_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.GET_ITEM_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* updateItem(action) {
  // console.log("kkkkkkkkkkk",action.payload);
  try {
    yield updateApi(action.payload);
    yield put({
      type: types.UPDATE_ITEM_SUCCESS,
    });
    yield put({
      type: types.GET_ITEM_REQUEST,
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_ITEM_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* searchItem(action) {
  console.log("HIHIHIIHI",action.payload);
  try {
    const data =yield searchApi(action.payload);
    const res =yield searchpaginationApi(action.payload);
    console.log("yield searchpaginationApi(action.payload)",res);
    yield put({
      type : types.SEARCH_ITEM_SUCCESS,
      payload: {
        listData: res, //Tất cả dữ liệu trong 1 trang
        nameSearch: action.payload.name,
        activePage: action.payload.activePage, //Làm đậm trang hiện tại
        totalPage: Math.ceil(data.length / types.LIMIT),
      }
    })
    
  } catch (error) {
    yield put({
      type: types.SEARCH_ITEM_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* deleteItem(action) {
  try {
    yield deleteApi(action.payload.idDel);
    yield put({
      type: types.DELETE_ITEM_SUCCESS,
    });
    yield put({
      type: types.GET_ITEM_REQUEST,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_ITEM_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* addItem(action) {
  try {
    yield addApi(action.payload);
    yield put({
      type: types.ADD_ITEM_SUCCESS,
    });
    yield put({
      type: types.GET_ITEM_REQUEST,
    });
  } catch (error) {
    yield put({
      type: types.ADD_ITEM_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* paginationItem(action) {
  // console.log("SAGAS",action.payload);
  try {
    const res = yield paginationApi(action.payload); // Dữ liệu ở trong 1 trang khi đã phân trang
    const allData = yield getApi(); // Tất cả dữ liệu
    // console.log("TAT CA DATA",allData.length);
    yield put({
      type: types.PAGINATION_ITEM_SUCCESS,
      payload: {
        dataActive: res,
        activePage: action.payload, //Làm đậm trang hiện tại
        totalPage: Math.ceil(allData.length / types.LIMIT),
      },
    });
  } catch (error) {
    yield put({
      type: types.PAGINATION_ITEM_FAILURE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
export const itemSaga = [
  takeEvery(types.GET_ITEM_REQUEST, getListItem),
  takeEvery(types.ADD_ITEM_REQUEST, addItem),
  takeEvery(types.UPDATE_ITEM_REQUEST, updateItem),
  takeEvery(types.DELETE_ITEM_REQUEST, deleteItem),
  takeEvery(types.SEARCH_ITEM_REQUEST, searchItem),
  takeEvery(types.PAGINATION_ITEM_REQUEST, paginationItem)
]; //phát ra hành động lắng nghe lấy dữ liệu bên redux types.GET_ITEM_REQUEST trả về getListItem
