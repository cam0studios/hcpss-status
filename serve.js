import getData, { getABDay, getCalendar } from "./main";

const express = require("express");

const app = express();
const port = 8005;

app.get("/", async (req, res) => {
  try {
    return void res.send(JSON.stringify(await getData()));
  } catch (err) {
    return void res.status(500).send(`Error fetching calendar data: <br> ${err}`);
  }
});
app.get("/ab-calendar", async (req, res) => {
  try {
    return void res.send(await getABDay(1));
  } catch (err) {
    return void res.status(500).send(`Error fetching calendar data: <br> ${err}`);
  }
});
app.get("/calendar", async (req, res) => {
  try {
    return void res.send(await getCalendar(1));
  } catch (err) {
    return void res.status(500).send(`Error fetching calendar data: <br> ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});