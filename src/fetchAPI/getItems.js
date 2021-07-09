export default function callApi() {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3001/tasks`;
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
