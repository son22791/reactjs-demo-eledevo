export default function deleteApi(data) {
        return new Promise((resolve, reject) => {
          const url = `http://localhost:3001/tasks/demo/${data}`
          fetch(url, {
            method: "DELETE",
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
      