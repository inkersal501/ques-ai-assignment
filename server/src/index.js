const express = require('express');
const app = express();
const cors = require("cors");
const {port, dbURI} = require("./config/config"); 
const route = require("./routes");
const { default: mongoose } = require('mongoose');
const jwtstrategy = require("./config/passport");
const passport = require("passport");

app.use(cors({origin: '*'}));
app.use(express.json()); 

app.use(passport.initialize());
passport.use('jwt', jwtstrategy);

app.use((req, res, next)=> {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use("/v1", route);

app.listen(port, () => {
  console.log(`Ques.AI app server listening on port ${port}`);
});

mongoose
.connect(dbURI)
.then(()=> console.log("DB Connected.", mongoose.connection.name))
.catch((error) => console.log("DB connection failed."));
 