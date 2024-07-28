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
	const date = new Date(req.params.time)
		if (date.valueOf()) {
			const outObj = { unix: date.valueOf(), utc: date.toUTCString() }
			res.json(outObj)
		} else {
			// try parsing as timestamp
			const date = new Date(parseInt(req.params.time))
			if (date.valueOf()) {
				const outObj = { unix: date.valueOf(), utc: date.toUTCString() }
				res.json(outObj)
			} else {
				// invalid date
        res.json({error: "Invalid Date"})
			}
		}
})
app.get("/api/", function (req, res) {
	const date = new Date()
	res.json({ unix: date.valueOf(), utc: date.toUTCString() })
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log("Your app is listening on port " + listener.address().port)
})
