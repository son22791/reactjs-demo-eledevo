//Import React từ react,
// Import Items từ component
// Import nhiều actions
// Import connect react-redux
// Tạo class ItemPageContainer extends React.Component gồm
//ComponentDidMount() Để load tất cả dữ liệu của trang
//render return về cho Items của component
//Tạo kho chứa dữ liệu là một biến (mapStateToProps) render lấy dữ liệu về từ reducer
//Tạo hành động thực hiện là một biến (mapDispatchToProps)
//Export connect(dữ liệu,hành động)(Trả về xử lí)
import React from "react";
import Items from "../component/Items"; //Import 1 hành động
import * as actions from "../actions/action"; // Import nhiều hành động
import { connect } from "react-redux";
class ItemPageContainer extends React.Component {
  componentDidMount() { 
    // this.props.initLoad(); //Load tất cả dữ liệu của trang
    this.props.paginationItem(1); //Load dữ liệu của trang hiện tại là trang 1
  }
  render() {
    return(
      <Items {...this.props}/>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("CONTAINER:",state.items.nameSearch);
  return {
    items: state.items.listItem,
    activePage: state.items.activePage, //state.items.activePage item định nghĩa bên index.js reducer
    totalPage: state.items.totalPage,
    nameSearch: state.items.nameSearch
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initLoad: () => {
      dispatch(actions.getListItem());
      console.log(dispatch(actions.getListItem()));
    },
    deleteItem: (data) => {
      dispatch(actions.deleteItem(data));
    },
    addItem: (data) => {
      dispatch(actions.addItem(data));
    },
    updateItem: (data) => {
      // console.log("updatecontainer",data);
      dispatch(actions.updateItem(data));
    },
    searchItem: (data) => {
      dispatch(actions.searchItem(data));
    },
    paginationItem: (data) => {
      dispatch(actions.paginationItem(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemPageContainer);
