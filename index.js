const express = require("express");
const app = express();
const port = 3000;

// Enable CORS (for testing purposes)
const cors = require("cors");
app.use(cors());

// Serve static files
app.use(express.static("public"));

// Check if the date string is valid
function isValidDate(date) {
  return !isNaN(Date.parse(date));
}

// Handle `/api/:date` (specific date)
app.get("/api/:date", (req, res) => {
  const dateString = req.params.date; // Get date from the URL parameter

  let date;

  // If it's a number, assume it's a UNIX timestamp in milliseconds
  if (!isNaN(dateString)) {
    date = new Date(Number(dateString));
  } else if (isValidDate(dateString)) {
    // If it's a valid date string, parse it as a date
    date = new Date(dateString);
  }

  // If the date is valid, return the unix and utc values
  if (date && isValidDate(date)) {
    res.json({
      unix: date.getTime(), // The timestamp in milliseconds (as a number)
      utc: date.toUTCString(), // The UTC date string in the required format
    });
  } else {
    // If the date is invalid, return an error object
    res.json({ error: "Invalid Date" });
  }
});

// Handle `/api/` (empty date, current date)
app.get("/api", (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  });
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
