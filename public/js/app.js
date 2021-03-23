console.log("Client side js file is loaded");

fetch("http://localhost:3000/weather?address=boddddston").then((res) => {
  res.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});
