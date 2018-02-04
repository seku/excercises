const express = require("express");
const fs = require("fs");
const sqlite = require("sql.js");
const path = require('path');
const bodyParser = require('body-parser')

const filebuffer = fs.readFileSync("db/usda-nnd.sqlite3");

const DATA_FILE = path.join(__dirname, 'data.json');
const db = new sqlite.Database(filebuffer);

const app = express();

app.set("port", 3001);

app.use( bodyParser.json() );
app.use(express.urlencoded());

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/exercises', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    console.log("====================SEXs===========")
    console.log(req.body)
    console.log("----")
    console.log(res)
    console.log("====================DUPA===========")
    const timers = JSON.parse(data);
    const newTimer = {
      id: req.body.project_id
    };
    timers.push(newTimer);
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(timers);
    });
  });
});

app.put('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const timers = JSON.parse(data);
    timers.forEach((timer) => {
      if (timer.id === req.body.id) {
        timer.title = req.body.title;
        timer.project = req.body.project;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.json({});
    });
  });
});

app.delete('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let timers = JSON.parse(data);
    timers = timers.reduce((memo, timer) => {
      if (timer.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(timer);
      }
    }, []);
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.json({});
    });
  });
});





// to be removed
const COLUMNS = [
  "carbohydrate_g",
  "protein_g",
  "fa_sat_g",
  "fa_mono_g",
  "fa_poly_g",
  "kcal",
  "description"
];
app.get("/api/food", (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(
    `
    select ${COLUMNS.join(", ")} from entries
    where description like '%${param}%'
    limit 100
  `
  );

  if (r[0]) {
    res.json(
      r[0].values.map(entry => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          // combine fat columns
          if (c.match(/^fa_/)) {
            e.fat_g = e.fat_g || 0.0;
            e.fat_g = (parseFloat(e.fat_g, 10) +
              parseFloat(entry[idx], 10)).toFixed(2);
          } else {
            e[c] = entry[idx];
          }
        });
        return e;
      })
    );
  } else {
    res.json([]);
  }
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
