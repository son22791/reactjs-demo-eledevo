import { LIMIT } from "../constant";
export default function paginationApi(data) {
  // console.log("API", data);
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/tasks/pagination?limit=${LIMIT}&page=${data}`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
