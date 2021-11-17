const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/current-week/', function (req, res) {

    var current = new Date();     // get current date    
    var weekstart = current.getDate() - current.getDay() + 1;
    var weekend = weekstart + 6;       // end day is the first day + 6 
    var from = new Date(current.setDate(weekstart));
    var to = new Date(current.setDate(weekend));

    console.log("from", from.toISOString().split(".")[0]);
    console.log("to", to.toISOString().split(".")[0]);
    const options = {
        method: "POST",
        url: "https://www.mql5.com/en/economic-calendar/widget/content",
        timeout: 120000,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            "Content-Type": "multipart/form-data"
        },
        formData: {
            "date_mode": 1,
            "from": from.toISOString().split(".")[0],
            "to": to.toISOString().split(".")[0]
        }
    };

    request(options, function (err, ress, body) {
        if (err) console.log(err);
        res.send(body)
    });


})


router.get('/previous-week/', function (req, res) {

    var current = new Date();     // get current date    
    var weekstart = current.getDate() - current.getDay();
    var weekend = weekstart - 6;       // end day is the first day + 6 
    var from = new Date(current.setDate(weekstart));
    var to = new Date(current.setDate(weekend));
    console.log(from);
    console.log(to);
    console.log("from", from.toISOString().split(".")[0]);
    console.log("to", to.toISOString().split(".")[0]);

    const options = {
        method: "POST",
        url: "https://www.mql5.com/en/economic-calendar/widget/content",
        timeout: 120000,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            "Content-Type": "multipart/form-data"
        },
        formData: {
            "date_mode": 2,
            "from": to.toISOString().split(".")[0],
            "to": from.toISOString().split(".")[0]
        }
    };

    request(options, function (err, ress, body) {
        if (err) console.log(err);
        res.send(body)
    });


})


router.get('/next-week/', function (req, res) {

    var current = new Date();     // get current date    
    var weekstart = current.getDate() - current.getDay() + 8;
    var weekend = weekstart + 6;       // end day is the first day + 6 
    var from = new Date(current.setDate(weekstart));
    var to = new Date(current.setDate(weekend));

    const options = {
        method: "POST",
        url: "https://www.mql5.com/en/economic-calendar/widget/content",
        timeout: 120000,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            "Content-Type": "multipart/form-data"
        },
        formData: {
            "date_mode": 1,
            "from": from.toISOString().split(".")[0],
            "to": to.toISOString().split(".")[0]
        }
    };

    request(options, function (err, ress, body) {
        if (err) console.log(err);
        res.send(body)
    });


})


router.get('/current-month/', function (req, res) {

    var date = new Date();
    var from = new Date(date.getFullYear(), date.getMonth(), 1);
    var to = new Date(date.getFullYear(), date.getMonth() + 1, 0);


    const options = {
        method: "POST",
        url: "https://www.mql5.com/en/economic-calendar/widget/content",
        timeout: 120000,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            "Content-Type": "multipart/form-data"
        },
        formData: {
            "date_mode": 1,
            "from": from.toISOString().split(".")[0],
            "to": to.toISOString().split(".")[0]
        }
    };

    request(options, function (err, ress, body) {
        if (err) console.log(err);
        res.send(body)
    });


})


router.get('/previous-month/', function (req, res) {

    var date = new Date();
    var from = new Date(date.getFullYear(), date.getMonth() - 1);
    var to = new Date(date.getFullYear(), date.getMonth() + 0, 0);


    const options = {
        method: "POST",
        url: "https://www.mql5.com/en/economic-calendar/widget/content",
        timeout: 120000,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            "Content-Type": "multipart/form-data"
        },
        formData: {
            "date_mode": 1,
            "from": from.toISOString().split(".")[0],
            "to": to.toISOString().split(".")[0]
        }
    };

    request(options, function (err, ress, body) {
        if (err) console.log(err);
        res.send(body)
    });


})


router.get('/next-month/', function (req, res) {

    var date = new Date();
    var from = new Date(date.getFullYear(), date.getMonth() + 1);
    var to = new Date(date.getFullYear(), date.getMonth() + 2, 0);

    const options = {
        method: "POST",
        url: "https://www.mql5.com/en/economic-calendar/widget/content",
        timeout: 120000,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            "Content-Type": "multipart/form-data"
        },
        formData: {
            "date_mode": 1,
            "from": from.toISOString().split(".")[0],
            "to": to.toISOString().split(".")[0]
        }
    };

    request(options, function (err, ress, body) {
        if (err) console.log(err);
        res.send(body)
    });


})


router.get('/calendarbydate/', function (req, res) {

    const options = {
        method: "POST",
        url: "https://www.mql5.com/en/economic-calendar/widget/content",
        timeout: 120000,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            "Content-Type": "multipart/form-data"
        },
        formData: {
            "date_mode": 1,
            "from": req.query.from,
            "to": req.query.to
        }
    };

    request(options, function (err, ress, body) {
        if (err) console.log(err);
        res.send(body)
    });


})

router.get('/history/', function (req, res) {

    console.log(req.query.url)

    const options = {
        method: "GET",
        url: "https://www.mql5.com" + req.query.url + "/history?from=" + req.query.from + "&count=" + req.query.count + "",
        timeout: 120000,
        headers: {
            "x-requested-with": "XMLHttpRequest",
            "Content-Type": "multipart/form-data"
        },
        // formData : {
        //     "date_mode" : 1,
        //     "from" : req.query.from,
        //     "to" : req.query.to
        // }
    };

    request(options, function (err, ress, body) {
        if (err) console.log(err);
        res.send(body)
    });


})
module.exports=router;