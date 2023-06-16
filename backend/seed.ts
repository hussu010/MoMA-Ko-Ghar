const fs = require("fs");
const csv = require("csv-parser");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

const seedArtists = async () => {
  const client = await pool.connect();

  return new Promise((resolve, reject) => {
    const uploadPromises: any = [];

    fs.createReadStream("./data/Artists.csv")
      .pipe(csv())
      .on("data", async (row: any) => {
        const query = {
          text: "INSERT INTO artists (constituent_id, name, bio, nationality, gender, begin_date, end_date, wiki_qid, ulan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
          values: [
            Object.values(row)[0],
            row.DisplayName,
            row.ArtistBio,
            row.Nationality,
            row.Gender,
            row.BeginDate,
            row.EndDate,
            Object.values(row)[7],
            row.ULAN,
          ],
        };
        uploadPromises.push(client.query(query));
      })
      .on("error", function (error: any) {
        console.log(error);
        reject(error);
      })
      .on("end", function () {
        Promise.all(uploadPromises)
          .then(() => {
            console.log("Artists data upload completed.");
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      });
  });
};

const seedArtworks = async () => {
  const client = await pool.connect();

  return new Promise((resolve, reject) => {
    const uploadPromises: any = [];

    fs.createReadStream("./data/Artworks.csv")
      .pipe(csv())
      .on("data", async (row: any) => {
        if (row.ConstituentID && !isNaN(row.ConstituentID)) {
          const query = {
            text: "INSERT INTO artworks \
          (title, constituent_id, date, medium, dimensions, credit_line, accession_number, classification, department, date_acquired, cataloged, \
          object_id, url, thumbnail_url, circumference, depth, diameter, height, length, weight, width, seat_height, duration) VALUES \
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)",
            values: [
              Object.values(row)[0],
              row.ConstituentID,
              row.Date,
              row.Medium,
              row.Dimensions,
              row.CreditLine,
              row.AccessionNumber,
              row.Classification,
              row.Department,
              row.DateAcquired,
              row.Cataloged,
              row.ObjectID,
              row.URL,
              row.ThumbnailURL,
              Object.values(row)[20],
              Object.values(row)[21],
              Object.values(row)[22],
              Object.values(row)[23],
              Object.values(row)[24],
              Object.values(row)[25],
              Object.values(row)[26],
              Object.values(row)[27],
              Object.values(row)[28],
            ],
          };
          uploadPromises.push(client.query(query));
        }
      })
      .on("end", function () {
        Promise.all(uploadPromises)
          .then(() => {
            console.log("Artworks data upload completed.");
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .on("error", function (error: any) {
        reject(error);
      });
  });
};

const seedData = async () => {
  console.log("Seeding artists...");
  await seedArtists();
  console.log("Seeding artists complete");
  console.log("Seeding artworks...");
  await seedArtworks();
  console.log("Seeding artworks complete");
};

seedData()
  .then(() => {
    console.log("Seeding complete");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
  });
