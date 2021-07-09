import React, { Component } from "react";

class Items extends Component {
  state = {
    nameAdd: "",
    idDel: "",
    idUpd: "",
    nameUpd: "",
    nameSea: "",
  };
  render() {
    let listData = [];
    if (this.props.items) {
      listData = this.props.items.map((item, key) => {
        return (
          // Hiển thị Item
          <tr key={key}>
            <th>{item._id}</th>
            <th>{item.name}</th>
            <th>
              <button
                onClick={() => {
                  // Xóa Item
                  this.props.deleteItem({
                    idDel: item._id,
                  });
                }}
              >
                Delete
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  // Select to update
                  this.setState({
                    idUpd: item._id,
                    nameUpd: item.name,
                  });
                }}
              >
                Select to update
              </button>
            </th>
          </tr>
        );
      });
    } else {
      return (
        <div className="container">
          <p>Không có dữ liệu</p>
        </div>
      );
    }
    let btnPagi = [];
    for (let i = 1; i <= this.props.totalPage; i++) {
      btnPagi.push(i);
    }
    // console.log("BtnPagi la gi",btnPagi);
    let pagi = btnPagi.map((item, key) => {
      if (this.props.nameSearch) {
        if (item === this.props.activePage) {
          return (
            <button
              key={key}
              onClick={() => {
                this.props.searchItem({
                  name: this.state.nameSea,
                  activePage: item,
                });
              }}
              style={{ background: "#4d4d4d", color: "#fff" }}
            >
              {item}
            </button>
          );
        } else {
          return (
            <button
              key={key}
              onClick={() => {
                this.props.searchItem({
                  name: this.state.nameSea,
                  activePage: item,
                });
              }}
            >
              {item}
            </button>
          );
        }
      } else {
        if (item === this.props.activePage) {
          return (
            <button
              key={key}
              onClick={() => {
                this.props.paginationItem(item);
              }}
              style={{ background: "#4d4d4d", color: "#fff" }}
            >
              {item}
            </button>
          );
        } else {
          return (
            <button
              key={key}
              onClick={() => {
                this.props.paginationItem(item);
              }}
            >
              {item}
            </button>
          );
        }
      }
    });
    return (
      <div className="">
        <div>
          <table className="list-item">
            <tbody>
              <tr>
                <th className="id">ID của dữ liệu</th>
                <th className="name">Tên của dữ liệu</th>
              </tr>
              {listData}
            </tbody>
          </table>
          {pagi}
          <br />
          <br />
          <input
            type="text"
            onChange={(e) => {
              this.setState({
                nameAdd: e.target.value,
              });
            }}
          />
          <button //Thêm Item
            onClick={() => {
              this.props.addItem({
                name: this.state.nameAdd,
              });
            }}
          >
            ADD
          </button>
          <br />
          <input // Cập nhật Item
            value={this.state.nameUpd}
            onChange={(e) => {
              this.setState({
                nameUpd: e.target.value,
              });
            }}
          />
          <button
            onClick={() => {
              this.props.updateItem({
                id: this.state.idUpd,
                name: this.state.nameUpd,
              });
            }}
          >
            Update
          </button>
          <br />
          <input
            onChange={(e) => {
              //Tìm Item
              this.setState({
                nameSea: e.target.value,
              });
            }}
          />
          <button
            onClick={() => {
              this.props.searchItem({
                name: this.state.nameSea,
                activePage: 1,
              });
            }}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}
export default Items;
