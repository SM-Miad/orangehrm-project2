const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { PimPage } = require('./PimPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.pimPage = new PimPage(page);
    }


    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getPimPage() {
        return this.pimPage;
    }
}

module.exports = { POManager };
