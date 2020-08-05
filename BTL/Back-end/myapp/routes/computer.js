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
router.get("/get", function(req, res) {
    connection.query("SELECT * FROM computer", function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer gia > 20 tr
router.get("/api/GiaBan2/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM computer WHERE GiaBan > ?", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer có gái >20 tr và là san pham đk ban chay
router.get("/api/XemNhieu/GiaBan2/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM computer WHERE GiaBan > ? AND SanPhamBanChay=1", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer có gia > 20 tr và la san pham dk xem nhieu
router.get("/api/BanChay/GiaBan2/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM computer WHERE GiaBan > ? AND SanPhamDuocXemNhieu=1", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer gia < 2 tr
router.get("/api/GiaBan/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM computer WHERE GiaBan < ?", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer có gái <2 tr và là san pham đk ban chay
router.get("/api/XemNhieu/GiaBan/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM computer WHERE GiaBan < ? AND SanPhamBanChay=1", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer có gia < 2 tr và la san pham dk xem nhieu
router.get("/api/BanChay/GiaBan/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM computer WHERE GiaBan < ? AND SanPhamDuocXemNhieu=1", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer có gia tu 2 tr đen 5tr
router.get("/api/GiaBan5/:GiaBan/:GiaBa", function(req, res) {
    connection.query("SELECT * FROM computer WHERE GiaBan >= " + [req.params.GiaBan] + " AND GiaBan <= " + [req.params.GiaBa], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer co gia tu 2 tr đen 5 tr duoc xem nhieu
router.get("/api/GiaBan5/XemNhieu/:GiaBan/:GiaBa", function(req, res) {
    connection.query("SELECT * FROM computer WHERE  SanPhamDuocXemNhieu=1 AND GiaBan >= " + [req.params.GiaBan] + " AND GiaBan <= " + [req.params.GiaBa], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer co gia tu 2 den 5 ban chay
router.get("/api/GiaBan5/BanChay/:GiaBan/:GiaBa", function(req, res) {
    connection.query("SELECT * FROM computer WHERE  SanPhamBanChay=1 AND GiaBan >= " + [req.params.GiaBan] + " AND GiaBan <= " + [req.params.GiaBa], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get computer theo hang xem nhieu
router.get("/api/:Hang", function(req, res) {
    connection.query("SELECT * FROM computer WHERE Hang = ? AND SanPhamDuocXemNhieu = 1", [req.params.Hang], function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get computer theo hãng
router.get("/api/Hang5/:Hang", function(req, res) {
    connection.query("SELECT * FROM computer WHERE Hang = ?", [req.params.Hang], function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// tim kiem
router.get("/api/search/:Hang", function(req, res) {
    connection.query("SELECT * FROM computer WHERE Hang = '" + [req.params.Hang] + "' OR Name = '" + [req.params.Hang] + "'", function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.get("/api/SanPhamBanChay/1/:Hang", function(req, res) {
    connection.query("SELECT * FROM computer WHERE Hang = ? AND SanPhamBanChay=1 ", [req.params.Hang], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.get("/api/SanPhamDuocXemNhieu/1/:Hang", function(req, res) {
    connection.query("SELECT * FROM computer WHERE Hang = ? AND SanPhamDuocXemNhieu=1 ", [req.params.Hang], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.get("/api/ID/:ID", function(req, res) {
    connection.query("SELECT * FROM computer WHERE ID = ?", [req.params.ID], function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.get("/api/SanPhamBanChay/:SanPhamBanChay", function(req, res) {
    connection.query("SELECT * FROM computer WHERE SanPhamBanChay = ?", [req.params.SanPhamBanChay], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});

router.get("/api/SanPhamDuocXemNhieu/:SanPhamDuocXemNhieu", function(req, res) {
    connection.query("SELECT * FROM computer WHERE SanPhamDuocXemNhieu = ?", [req.params.SanPhamDuocXemNhieu], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.delete("/api/:ID", function(req, res) {
    connection.query("DELETE FROM computer WHERE computer.ID = ?", [req.params.ID], function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM computer", function(err, rows) {
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
    connection.query("INSERT INTO `computer` (`ID`, `Name`, `Hang`, `CPU`, `RAM`, `ManHinh`, `CacMH`, `TrongLuong`, `XuatXu`, `HDH`, `CongKN`, `GiaGoc`, `GiaBan`, `SanPhamBanChay`, `SanPhamDuocXemNhieu`, `img`) VALUES ('" + emp.ID + "','" + emp.Name + "','" + emp.Hang + "','" + emp.CPU + "','" + emp.RAM + "','" + emp.ManHinh + "','" + emp.CacMH + "','" + emp.TrongLuong + "','" + emp.XuatXu + "','" + emp.HDJ + "','" + emp.CongKN + "','" + emp.GiaGoc + "','" + emp.GiaBan + "','" + emp.SanPhamBanChay + "','" + emp.SanPhamDuocXemNhieu + "','" + emp.img + "')", function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM computer", function(err, rows) {
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
    connection.query("UPDATE `computer` SET `Name` = '" + emp.Name + "', `Hang` = '" + emp.Hang + "',`CPU` = '" + emp.CPU + "', `RAM` = '" + emp.RAM + "', `ManHinh` = '" + emp.ManHinh + "', `CacMH` = '" + emp.CacMH + "', `TrongLuong` = '" + emp.TrongLuong + "', `XuatXu` = '" + emp.XuatXu + "', `HDH` = '" + emp.HDH + "', `CongKN` = '" + emp.CongKN + "', `GiaGoc` = '" + emp.GiaGoc + "', `GiaBan` = '" + emp.GiaBan + "', `SanPhamBanChay` = '" + emp.SanPhamBanChay + "', `SanPhamDuocXemNhieu` = '" + emp.SanPhamDuocXemNhieu + "', `img` = '" + emp.img + "' WHERE `computer`.`id` = " + emp.ID + "", function(err, rows) {
        if (!err) {
            connection.query("SELECT * FROM computer", function(err, rows) {
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