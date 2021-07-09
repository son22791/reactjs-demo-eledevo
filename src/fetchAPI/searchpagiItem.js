import { LIMIT } from "../constant";
export default function searchpaginationApi(data) {
  console.log("API", data);
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/tasks/searchpa?nameSearch=${data.name}&limit=${LIMIT}&page=${data.activePage}`;
    console.log("KKKKKKK",url);
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
