// index.js
// where your node app starts

// init project
var express = require("express")
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html")
})

// your first API endpoint...
app.get("/api/:time", function (req, res) {
	if (req.params.time) {
    console.log(req.params.time.split('-').length, req.params.time)
		const date = new Date(req.params.time.split('-').length > 1 ? req.params.time : parseInt(req.params.time) )
		const outObj = { unix: date.valueOf(), utc: date.toUTCString() }
		res.json(outObj)
	} else {
		res.status(400).send("Malformed request")
	}
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log("Your app is listening on port " + listener.address().port)
})
