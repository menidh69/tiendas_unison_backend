const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const sgMail = require("@sendgrid/mail");
const moment = require('moment');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const indexRoutes = require('./routes/index');
const serveStatic = require('serve-static');


app.use(cors());
app.use((req, res, next) => {
    if (req.originalUrl === "/api/v1/stripe/webhook") {
      next();
    } else {
      bodyParser.json()(req, res, next);
      bodyParser.urlencoded({extended: false})
    }
  });
moment().format();



app.use(indexRoutes);

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log('Server is running')
})
