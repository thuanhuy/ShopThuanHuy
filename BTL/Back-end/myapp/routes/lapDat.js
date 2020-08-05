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
    connection.query("SELECT * FROM clientdatlapdat", function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});

router.get("/api/:id", function(req, res) {
    connection.query("SELECT * FROM clientdatlapdat WHERE id = ?", [req.params.id], function(err, rows) {
        if (!err) {
            res.send(rows);
        } else {
            console.log("RE: " + err);
        }
    })
});

router.delete("/api/:id", function(req, res) {
    // "DELETE FROM `user` WHERE `user`.`ID` = 3"?

    connection.query("DELETE FROM clientdatlapdat WHERE clientdatlapdat.id = ?", [req.params.id], function(err, rows) {
        if (!err) {
            // res.send("Delete succeded");
            connection.query("SELECT * FROM clientdatlapdat", function(err, rows) {
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
    connection.query("INSERT INTO `clientdatlapdat` (`ID`, `Name`, `SoLuong`, `Gia`, `NameProduct`, `Phone`, `Address`) VALUES ('" + emp.ID + "','" + emp.Name + "','" + emp.SoLuong + "','" + emp.Gia + "','" + emp.NameProduct + "','" + emp.Phone + "','" + emp.Address + "')", function(err, rows) {
        if (!err) {
            // res.send(rows);
            connection.query("SELECT * FROM clientdatlapdat", function(err, rows) {
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
    connection.query("UPDATE `clientdatlapdat` SET `Name` = '" + emp.Name + "', `ID` = '" + emp.ID + "',`SoLuong` = '" + emp.SoLuong + "',`Gia` = '" + emp.Gia + "',`NameProduct` = '" + emp.NameProduct + "',`Phone` = '" + emp.Phone + "',`Address` = '" + emp.Address + "' WHERE `clientdatlapdat`.`ID` = " + emp.ID + "", function(err, rows) {
        if (!err) {
            // res.send("Update sussetfull!");
            // res.json({ message: 'Update sesserfull!' })
            connection.query("SELECT * FROM clientdatlapdat", function(err, rows) {
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