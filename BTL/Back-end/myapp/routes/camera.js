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
    connection.query("SELECT * FROM camera", function(err, rows) {
        if (!err) {
            // res.send(rows);
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get camera gia < 2 tr
router.get("/api/GiaBan/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM camera WHERE GiaBan < ?", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get camera có gái <2 tr và là san pham đk ban chay
router.get("/api/XemNhieu/GiaBan/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM camera WHERE GiaBan < ? AND SanPhamBanChay=1", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get camera có gia < 2 tr và la san pham dk xem nhieu
router.get("/api/BanChay/GiaBan/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM camera WHERE GiaBan < ? AND SanPhamDuocXemNhieu=1", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get camera có gia tu 2 tr đen 5tr
router.get("/api/GiaBan5/:GiaBan/:GiaBa", function(req, res) {
    connection.query("SELECT * FROM camera WHERE GiaBan >= " + [req.params.GiaBan] + " AND GiaBan <= " + [req.params.GiaBa], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get camera co gia tu 2 tr đen 5 tr duoc xem nhieu
router.get("/api/GiaBan5/XemNhieu/:GiaBan/:GiaBa", function(req, res) {
    connection.query("SELECT * FROM camera WHERE  SanPhamDuocXemNhieu=1 AND GiaBan >= " + [req.params.GiaBan] + " AND GiaBan <= " + [req.params.GiaBa], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get camera co gia tu 2 den 5 ban chay
router.get("/api/GiaBan5/BanChay/:GiaBan/:GiaBa", function(req, res) {
    connection.query("SELECT * FROM camera WHERE  SanPhamBanChay=1 AND GiaBan >= " + [req.params.GiaBan] + " AND GiaBan <= " + [req.params.GiaBa], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get camera gia > 5 tr
router.get("/api/GiaBanLon/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM camera WHERE GiaBan > ?", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer có gái >20 tr và là san pham đk ban chay
router.get("/api/XemNhieu/GiaBan2/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM camera WHERE GiaBan > ? AND SanPhamBanChay=1", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// get Computer có gia > 20 tr và la san pham dk xem nhieu
router.get("/api/BanChay/GiaBan2/:GiaBan", function(req, res) {
    connection.query("SELECT * FROM camera WHERE GiaBan > ? AND SanPhamDuocXemNhieu=1", [req.params.GiaBan], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
// tim kiem
router.get("/api/search/:Hang", function(req, res) {
    connection.query("SELECT * FROM camera WHERE Hang = '" + [req.params.Hang] + "' OR Name = '" + [req.params.Hang] + "'", function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.get("/api/:Hang", function(req, res) {
    connection.query("SELECT * FROM camera WHERE Hang = ?", [req.params.Hang], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.get("/api/ID/:ID", function(req, res) {
    connection.query("SELECT * FROM camera WHERE ID = ?", [req.params.ID], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.get("/api/SanPhamBanChay/:SanPhamBanChay", function(req, res) {
    connection.query("SELECT * FROM camera WHERE SanPhamBanChay = ?", [req.params.SanPhamBanChay], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});

router.get("/api/SanPhamBanChay/1/:Hang", function(req, res) {
    connection.query("SELECT * FROM camera WHERE Hang = ? AND SanPhamBanChay=1 ", [req.params.Hang], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.get("/api/SanPhamDuocXemNhieu/1/:Hang", function(req, res) {
    connection.query("SELECT * FROM camera WHERE Hang = ? AND SanPhamDuocXemNhieu=1 ", [req.params.Hang], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});

router.get("/api/SanPhamDuocXemNhieu/:SanPhamDuocXemNhieu", function(req, res) {
    connection.query("SELECT * FROM camera WHERE SanPhamDuocXemNhieu = ?", [req.params.SanPhamDuocXemNhieu], function(err, rows) {
        if (!err) {
            res.json({ message: rows, code: 200 });
        } else {
            console.log("RE: " + err);
        }
    })
});
router.delete("/api/:ID", function(req, res) {
    // "DELETE FROM `user` WHERE `user`.`ID` = 3"?

    connection.query("DELETE FROM camera WHERE camera.ID = ?", [req.params.ID], function(err, rows) {
        if (!err) {
            // res.send("Delete succeded");
            connection.query("SELECT * FROM camera", function(err, rows) {
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
    connection.query("INSERT INTO `camera` (`ID`, `Name`, `Hang`, `wifi`, `HDH`, `ChungLoai`, `GiaGoc`, `GiaBan`, `SanPhamBanChay`, `SanPhamDuocXemNhieu`, `img`) VALUES ('" + emp.ID + "','" + emp.Name + "','" + emp.Hang + "','" + emp.wifi + "','" + emp.HDH + "','" + emp.ChungLoai + "','" + emp.GiaGoc + "','" + emp.GiaBan + "','" + emp.SanPhamBanChay + "','" + emp.SanPhamDuocXemNhieu + "','" + emp.img + "')", function(err, rows) {
        if (!err) {
            // res.send(rows);
            connection.query("SELECT * FROM camera", function(err, rows) {
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
    connection.query("UPDATE `camera` SET `Name` = '" + emp.Name + "', `img` = '" + emp.img + "', `Hang` = '" + emp.Hang + "',`wifi` = '" + emp.wifi + "', `HDH` = '" + emp.HDH + "', `ChungLoai` = '" + emp.ChungLoai + "', `GiaGoc` = '" + emp.GiaGoc + "', `GiaBan` = '" + emp.GiaBan + "', `SanPhamBanChay` = '" + emp.SanPhamBanChay + "', `SanPhamDuocXemNhieu` = '" + emp.SanPhamDuocXemNhieu + "' WHERE `camera`.`ID` = " + emp.ID + "", function(err, rows) {
        if (!err) {
            // res.send("Update sussetfull!");
            // res.json({ message: 'Update sesserfull!' })
            connection.query("SELECT * FROM camera", function(err, rows) {
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