const request = require("request");

const forecast = (lat, long, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=a3c820a8f4932ceab9a97b45177e7c5a&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, {body}) => {
    //Handle errors first
    if (error) {
      //callback error
      cb("unable to connect to weather service");
    } else if (body.error) {
      console.log(body.error)
      //response error
      cb("unable to find location");
    } else {
      //happy path!
      cb(
        undefined,
        `${body.current.weather_descriptions[0]}: It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
