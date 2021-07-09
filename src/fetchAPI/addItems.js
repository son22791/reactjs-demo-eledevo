export default function addApi(data) {
        return new Promise((resolve, reject) => {
          const url = `http://localhost:3001/tasks`;
          fetch(url, {
            method: "POST",
            headers:{ 'content-type': 'Application/json'}, 
            body: JSON.stringify(data),
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
      