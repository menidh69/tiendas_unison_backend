const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const sgMail = require("@sendgrid/mail");
const moment = require('moment');
sgMail.setApiKey('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');
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
