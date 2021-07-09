export default function updateApi(data) {
  // console.log("api;;;;;;;;;;",data.id);
        return new Promise((resolve, reject) => {
          const url = `http://localhost:3001/tasks/demo/${data.id}`
          fetch(url, {
            method: "PUT",
            headers: {'content-type':'Application/json'},
            body: JSON.stringify({
              name: data.name})
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
      