const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(express.json());


// ===============================
// LOAD HOUSE DATA
// ===============================

const housesFile = path.join(
  __dirname,
  "data",
  "houses.json"
);

let houses = [];

try {
  const data = fs.readFileSync(
    housesFile,
    "utf8"
  );

  houses = JSON.parse(data);

  console.log(
    `Loaded ${houses.length} properties`
  );

} catch (error) {

  console.error(
    "Could not load houses.json:",
    error.message
  );

}


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {

  res.json({
    message: "Smart City Backend is running",
    status: "success"
  });

});


// ===============================
// GET ALL HOUSES
// ===============================

app.get("/api/houses", (req, res) => {

  res.json(houses);

});


// ===============================
// SEARCH HOUSES
// ===============================

app.post("/api/houses/search", (req, res) => {

  try {

    const {
      type,
      purpose,
      features = []
    } = req.body;


    console.log("Search request:");
    console.log({
      type,
      purpose,
      features
    });


    // -------------------------------
    // FILTER BY PROPERTY TYPE
    // -------------------------------

    let results = houses.filter(
      house =>
        house.type.toLowerCase() ===
        type.toLowerCase()
    );


    // -------------------------------
    // FILTER ONLY AVAILABLE HOUSES
    // -------------------------------

    results = results.filter(
      house =>
        house.status === "available"
    );


    // -------------------------------
    // FILTER BY FEATURES
    // -------------------------------

    if (features.length > 0) {

      results = results.filter(house => {

        return features.every(feature => {

          switch (feature) {

            case "Parking":
              return house.parking === true;

            case "Garden":
              return house.garden === true;

            case "Balcony":
              return house.balcony === true;

            case "Terrace":
              return house.terrace === true;

            case "Pet":
              return house.petFriendly === true;

            default:
              return true;

          }

        });

      });

    }


    // -------------------------------
    // RETURN RESULTS
    // -------------------------------

    console.log(
      `Found ${results.length} matching properties`
    );

    res.json(results);

  } catch (error) {

    console.error(
      "Search error:",
      error
    );

    res.status(500).json({
      message: "Search failed",
      error: error.message
    });

  }

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

  console.log(
    `Smart City Backend running at http://localhost:${PORT}`
  );

});