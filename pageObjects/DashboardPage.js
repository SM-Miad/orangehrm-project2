const { expect } = require('@playwright/test');

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.adminMenu = page.getByRole('link', { name: 'Admin' });
        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.leaveMenu = page.getByRole('link', { name: 'Leave' });
        this.userDropdown = page.locator('.oxd-userdropdown-tab');
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    
    }

    async goToPIM() {
        await this.pimMenu.click();
    }

    async goToAdmin() {
        await this.adminMenu.click();
    }

    async logout() {
        await this.userDropdown.click();
        await this.logoutButton.click();
    }

    async goToLeavePage() {
        await this.leaveMenu.click();
    }
}

module.exports = { DashboardPage };