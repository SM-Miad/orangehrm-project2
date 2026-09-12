const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { PimPage } = require('./PimPage');
const { AdminPage } = require('./AdminPage');
const { LeavePage } = require('./LeavePage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.pimPage = new PimPage(page);
        this.adminPage = new AdminPage(page);
        this.leavePage = new LeavePage(page);
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

    getAdminPage() {
        return this.adminPage
    }

    getLeavePage() {
        return this.leavePage;
    }
}

module.exports = { POManager };
