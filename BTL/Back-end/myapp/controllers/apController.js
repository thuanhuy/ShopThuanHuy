module.exports = function(app) {
    app.get("/api/user/:id", function(req, res) {
        var result = {
            fistName = "Hoa",
            lastName = "Mai"
        };
        res.json(result);
    });
    app.post("api/user", function(req, res) {

    });
    app.put("api/user", function(req, res) {

    });
    app.delete("api/user:id", function(req, res) {

    });
}