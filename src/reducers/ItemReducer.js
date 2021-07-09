//Import tất cả các kiểu hành động types trong constants
//Tạo 1 object: DEFAULT_STATE bên trong gồm 1 Mảng trống để nhận dữ liệu tí nữa tuyền vào và các hành động : dataFetched/isFetching/error/errorMessage
//Export (state = DEFAULT_STATE, action) => {
// switch (action.type){ Lựa chọn hành động tương ứng để trả về dữ liệu, lỗi,...
// case type...
//}
//}
import * as types from "../constant";
const DEFAULT_STATE = {
        listItem: [], //Mảng nhận dữ liệu 
        dataFetched: false,
        isFetching: false,
        error: false, 
        errorMessage: null,
        activePage: 0, //Trang hiện tại
        totalPage: 0
}
export default (state = DEFAULT_STATE, action) =>{
        // console.log(action);
        switch (action.type) {
                case types.GET_ITEM_REQUEST:
                case types.ADD_ITEM_REQUEST:
                case types.UPDATE_ITEM_REQUEST:
                case types.DELETE_ITEM_REQUEST:
                case types.SEARCH_ITEM_REQUEST:
                case types.PAGINATION_ITEM_REQUEST:
                return{
                        ...state,
                        isFetching :true,
                }
                case types.GET_ITEM_SUCCESS:
                case types.ADD_ITEM_SUCCESS:
                case types.UPDATE_ITEM_SUCCESS:
                case types.DELETE_ITEM_SUCCESS:
                        // console.log("reducer",action.payload);
                return{
                        ...state,
                        isFetching :false,
                        dataFetched :true,
                        error:false,
                        errorMessage: null,
                        listItem: action.payload,
                }
                case types.SEARCH_ITEM_SUCCESS:
                        return{
                                ...state,
                                isFetching :false,
                                dataFetched :true,
                                error:false,
                                errorMessage: null,
                                nameSearch: action.payload.nameSearch,
                                listItem: action.payload.listData, //Dữ liệu trong 1 trang
                                activePage: action.payload.activePage, //action.payload.activePage: lấy từ Saga
                                totalPage: action.payload.totalPage

                        }
                case types.PAGINATION_ITEM_SUCCESS:
                        // console.log("REDUCER:",action.payload.dataActive);
                return{
                        ...state,
                        isFetching :false,
                        dataFetched :true,
                        error:false,
                        errorMessage: null,
                        listItem: action.payload.dataActive, //Dữ liệu trong 1 trang
                        activePage: action.payload.activePage, //action.payload.activePage: lấy từ Saga
                        totalPage: action.payload.totalPage
                }
                case types.GET_ITEM_FAILURE:
                case types.ADD_ITEM_FAILURE:
                case types.UPDATE_ITEM_FAILURE:
                case types.DELETE_ITEM_FAILURE:
                case types.SEARCH_ITEM_FAILURE:
                case types.PAGINATION_ITEM_FAILURE:
                return{
                        ...state,
                        isFetching :false,
                        error :true,
                        errorMessage : action.payload.errorMessage,
                };
                default:
                        return state;
        }
}
