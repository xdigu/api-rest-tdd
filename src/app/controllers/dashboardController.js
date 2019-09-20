
class DashboardController {
    access(req, res, next) {
        res.status(200).send();
    }
}

module.exports = new DashboardController();