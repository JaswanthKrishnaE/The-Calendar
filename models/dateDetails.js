const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

const MONTH=["Jan","Feb","Mar",
            "Apr","May","Jun",
            "Jul","Aug","Sep",
            "Oct","Nov","Dec"];


var today = new Date();

var dayTime = today.getHours();
if (dayTime < 12) {
  dayTime = "Morning!";
}
if (dayTime >= 12 & dayTime <=18) {
  dayTime = "Afternoon";
}
if (dayTime > 18) {
  dayTime = "Evening";
}
var currentDate = [
  today.getDate(),
  today.getMonth(),
  today.getFullYear(),
  weeks[today.getDay()],
  dayTime,
];

module.exports={weeks,MONTH,currentDate}