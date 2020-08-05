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
        console.log("DB connect succeded.");
    } else {
        console.log("BD connect failed \n error: " + JSON.stringify(err, undefined, 2));
    }
});


/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query("SELECT * FROM goitragop", function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});

router.delete("/:id", function(req, res) {
    // "DELETE FROM `user` WHERE `user`.`ID` = 3"?

    connection.query("DELETE FROM goitragop WHERE goitragop.id = ?", [req.params.id], function(err, rows) {
        if (!err) {
            // res.send("Delete succeded");
            connection.query("SELECT * FROM goitragop", function(err, rows) {
                if (!err) {
                    // res.send(rows);
                    res.json({ message: rows, code: 200 });
                } else {
                    console.log("RE: " + err);
                }
            })
        } else {
            console.log("RE: " + err);
        }
    })
});

router.post("/", function(req, res) {
    let emp = req.body;
    connection.query("INSERT INTO `goitragop` (`id`, `Name`, `SoThang`, `LaiXuat`) VALUES ('" + emp.id + "','" + emp.Name + "','" + emp.SoThang + "','" + emp.LaiXuat + "')", function(err, rows) {
        if (!err) {
            // res.json({ message: rows, code: 200 });
            connection.query("SELECT * FROM goitragop", function(err, rows) {
                if (!err) {
                    // res.send(rows);
                    res.json({ message: rows, code: 200 });
                } else {
                    console.log("RE: " + err);
                }
            })
        } else {
            console.log("RE: " + err);
        }
    })
});
router.put("/", function(req, res) {
    let emp = req.body;
    connection.query("UPDATE `goitragop` SET `Name` = '" + emp.Name + "', `SoThang` = '" + emp.SoThang + "',`LaiXuat` = '" + emp.LaiXuat + "' WHERE `goitragop`.`id` = " + emp.id + "", function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM goitragop", function(err, rows) {
                if (!err) {
                    // res.send(rows);
                    res.json({ message: rows, code: 200 });
                } else {
                    console.log("RE: " + err);
                }
            })
        } else {
            console.log("RE: " + err);
        }
    })
});
module.exports = router;