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
router.get("/get", function(req, res) {
    connection.query("SELECT * FROM thietbi", function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get theo hãng
router.get("/api/:Hang", function(req, res) {
    connection.query("SELECT * FROM thietbi WHERE LoaiTB = ?", [req.params.Hang], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get theo ID
router.get("/api/ID/:ID", function(req, res) {
    connection.query("SELECT * FROM thietbi WHERE ID = ?", [req.params.ID], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get thiet bị gia < 5 trăm
router.get("/api/GiaBan/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM thietbi WHERE GiaBan < ?", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get thietbi có gia tu 2 tr đen 5tr
router.get("/api/GiaBan5/:GiaBan/:GiaBa", function(req, res) {
    connection.query("SELECT * FROM thietbi WHERE GiaBan >= " + [req.params.GiaBan] + " AND GiaBan <= " + [req.params.GiaBa], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get thiet bị gia > 5 tr
router.get("/api/GiaBanLon/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM thietbi WHERE GiaBan > ?", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.delete("/api/:ID", function(req, res) {
    connection.query("DELETE FROM thietbi WHERE thietbi.ID = ?", [req.params.ID], function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM thietbi", function(err, rows) {
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

router.post("/api", function(req, res) {
    let emp = req.body;
    connection.query("INSERT INTO `thietbi` (`ID`, `Name`, `LoaiTB`, `MauSac`, `KetNoi`, `CongSacLoa`, `CongXuatLoa`, `DungLuongPin`, `NguonRa`, `NguonVao`, `SoCongRa` , `GiaGoc`, `GiaBan` , `img`) VALUES ('" + emp.ID + "','" + emp.Name + "','" + emp.LoaiTB + "','" + emp.MauSac + "','" + emp.KetNoi + "','" + emp.CongSacLoa + "','" + emp.CongXuatLoa + "','" + emp.DungLuongPin + "','" + emp.NguonRa + "','" + emp.NguonVao + "','" + emp.SoCongRa + "','" + emp.GiaGoc + "','" + emp.GiaBan + "','" + emp.img + "')", function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM thietbi", function(err, rows) {
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

router.put("/api", function(req, res) {
    let emp = req.body;
    connection.query("UPDATE `thietbi` SET `Name` = '" + emp.Name + "', `img` = '" + emp.img + "', `LoaiTB` = '" + emp.LoaiTB + "',`MauSac` = '" + emp.MauSac + "', `KetNoi` = '" + emp.KetNoi + "', `CongXuatLoa` = '" + emp.CongXuatLoa + "', `CongSacLoa` = '" + emp.CongSacLoa + "', `DungLuongPin` = '" + emp.DungLuongPin + "', `NguonRa` = '" + emp.NguonRa + "', `NguonVao` = '" + emp.NguonVao + "', `SoCongRa` = '" + emp.SoCongRa + "', `GiaGoc` = '" + emp.GiaGoc + "', `GiaBan` = '" + emp.GiaBan + "' WHERE `thietbi`.`ID` = " + emp.ID + "", function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM thietbi", function(err, rows) {
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