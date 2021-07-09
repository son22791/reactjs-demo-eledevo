export default function searchApi(data) {
        // console.log("data dang o day" ,data.name);
        return new Promise((resolve, reject) => {
          const url = `http://localhost:3001/tasks/searchpa?nameSearch=${data.name}`
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
      