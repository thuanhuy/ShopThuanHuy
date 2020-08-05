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

router.get("/", function(req, res) {
    connection.query("SELECT * FROM khachhangdathang", function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});

// router.get("/api/:Hang", function(req, res) {
//     connection.query("SELECT * FROM computer WHERE Hang = ? AND SanPhamDuocXemNhieu = 1", [req.params.Hang], function(err, rows) {
//         if (!err) {
//             res.json({ message: rows, code: 200 });
//         } else {
//             console.log("RE: " + err);
//         }
//     })
// });
// router.get("/api/ID/:ID", function(req, res) {
//     connection.query("SELECT * FROM computer WHERE ID = ?", [req.params.ID], function(err, rows) {
//         if (!err) {
//             res.json({ message: rows, code: 200 });
//         } else {
//             console.log("RE: " + err);
//         }
//     })
// });

router.delete("/delete/:ID", function(req, res) {

    connection.query("DELETE FROM khachhangdathang WHERE khachhangdathang.ID = ?", [req.params.ID], function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM khachhangdathang", function(err, rows) {
                if (!err) {
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
    connection.query("INSERT INTO `khachhangdathang` (`ID`, `Name`, `Phone`, `Address`, `Email`, `NameProduct`, `GiaBan`) VALUES ('" + emp.ID + "','" + emp.Name + "','" + emp.Phone + "','" + emp.Address + "','" + emp.Email + "','" + emp.NameProduct + "','" + emp.GiaBan + "')", function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM khachhangdathang", function(err, rows) {
                if (!err) {
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
    connection.query("UPDATE `khachhangdathang` SET `Name` = '" + emp.Name + "', `Phone` = '" + emp.Phone + "',`Address` = '" + emp.Address + "', `Email` = '" + emp.Email + "', `NameProduct` = '" + emp.NameProduct + "', `GiaBan` = '" + emp.GiaBan + "' WHERE `khachhangdathang`.`ID` = " + emp.ID + "", function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM khachhangdathang", function(err, rows) {
                if (!err) {
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