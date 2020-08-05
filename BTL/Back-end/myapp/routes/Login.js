var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "BanMayTinh"
});

connection.connect((err) => {
    if (!err) {
        console.log("DB connect succeded login.");
    } else {
        console.log("BD connect failed \n error: " + JSON.stringify(err, undefined, 2));
    }
});

router.get("/api/:Hang/:Password", function(req, res) {
    if (req.params.Hang == "nguyenthuanhuy123@gmail.com" && req.params.Password == "12345") {
        connection.query("SELECT * FROM user WHERE Email = '" + [req.params.Hang] + "' AND Password = '" + [req.params.Password] + "'", function(err, rows) {
            if (!err) {
                res.json({ message: rows, code: 200 });
            } else {
                console.log("RE: " + err);
            }
        })
    } else {
        res.json({ message: 0, code: 333 });
    }

});
// router.get("/api/ID/:ID", function(req, res) {
//     connection.query("SELECT * FROM computer WHERE ID = ?", [req.params.ID], function(err, rows) {
//         if (!err) {
//             res.json({ message: rows, code: 200 });
//         } else {
//             console.log("RE: " + err);
//         }
//     })
// });






module.exports = router;