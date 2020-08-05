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
    res.render('index', { title: 'Express' });
    next();
});
router.get("/api", function(req, res) {
    connection.query("SELECT * FROM goilapdatcam", function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});

router.get("/api/:id", function(req, res) {
    connection.query("SELECT * FROM user WHERE id = ?", [req.params.id], function(err, rows) {
        if (!err) {
            res.send(rows);
        } else {
            console.log("RE: " + err);
        }
    })
});

router.delete("/api/:id", function(req, res) {
    // "DELETE FROM `user` WHERE `user`.`ID` = 3"?

    connection.query("DELETE FROM goilapdatcam WHERE goilapdatcam.id = ?", [req.params.id], function(err, rows) {
        if (!err) {
            // res.send("Delete succeded");
            connection.query("SELECT * FROM goilapdatcam", function(err, rows) {
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

router.post("/api", function(req, res) {
    let emp = req.body;
    connection.query("INSERT INTO `goilapdatcam` (`id`, `Name`, `SL`, `Gia`) VALUES ('" + emp.id + "','" + emp.Name + "','" + emp.SL + "','" + emp.Gia + "')", function(err, rows) {
        if (!err) {
            // res.send(rows);
            connection.query("SELECT * FROM goilapdatcam", function(err, rows) {
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

router.put("/api", function(req, res) {
    let emp = req.body;
    connection.query("UPDATE `goilapdatcam` SET `Name` = '" + emp.Name + "', `id` = '" + emp.id + "',`SL` = '" + emp.SL + "',`Gia` = '" + emp.Gia + "' WHERE `goilapdatcam`.`id` = " + emp.id + "", function(err, rows) {
        if (!err) {
            // res.send("Update sussetfull!");
            // res.json({ message: 'Update sesserfull!' })
            connection.query("SELECT * FROM goilapdatcam", function(err, rows) {
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