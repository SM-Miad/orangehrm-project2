const { expect } = require('@playwright/test');

class AdminPage {
    constructor(page) {
        this.page = page;
        this.userManagementMenu = page.getByRole('link', { name: 'User Management' });
        this.userSearchInput = page.locator('div:has(> label:has-text("Username")) + div input');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.tableRows = page.locator('.oxd-table-body .oxd-table-card');
        this.userRoleDropdown = page.locator('div:has(> label:has-text("User Role")) + div .oxd-select-wrapper');
        this.userStatusDropdown = page.locator('div:has(> label:has-text("Status")) + div .oxd-select-wrapper');
        this.saveButton = page.getByRole('button', { name: 'Save' });


    }

    async goToUserManagement() {
        await this.userManagementMenu.click();
    }

    async getRandomUsername() {
        await expect(this.tableRows.first()).toBeVisible();

    const rowCount = await this.tableRows.count();

    const usernames = [];

    for (let i = 0; i < rowCount; i++) {
        const username = await this.tableRows
            .nth(i)
            .locator('.oxd-table-cell')
            .nth(1)
            .textContent();

        if (username && username.trim() !== 'Admin') {
            usernames.push(username.trim());
        }
    }

    if (usernames.length === 0) {
        throw new Error('No suitable username found in the User Management table.');
    }

    const randomIndex = Math.floor(Math.random() * usernames.length);

    return usernames[randomIndex];
    }

    async searchUser(username) {
        await this.userSearchInput.fill(username);
        await this.searchButton.click();
    }

   
    async verifyUserInResults(username) {
        const userRow = this.tableRows.filter({ hasText: username }).first();
        await expect(userRow).toBeVisible();
        
    }

   
    async editUser(username){
        const userRow = this.tableRows.filter({
            has: this.page.locator('.oxd-table-cell').filter({
                hasText: RegExp(`^${username}$`)
            })
        }).first();
        await expect(userRow).toBeVisible();
        await userRow.getByRole('button').last().click();
    }


    async changeUserRole(role) {
        await this.userRoleDropdown.click();
        await this.page.getByRole('option', { name: role}).click();
    }

    async changeUserStatus(status) {
        await this.userStatusDropdown.click();
        await this.page.getByRole('option', { name: status}).click();
    }

    async saveChange() {
        await this.saveButton.click();
    }

    async verifyUserRole(username, role) {
        const userRow = this.tableRows.filter({
            has: this.page.locator('.oxd-table-cell').filter({
                hasText: RegExp(`^${username}$`)
            })
        }).first()

        await expect(userRow).toBeVisible();
        await expect( userRow.locator('.oxd-table-cell').nth(2) ).toHaveText(role);
    }

    async verifyUserStatus(username, status) {
        const userRow = this.tableRows.filter({ 
            has: this.page.locator('.oxd-table-cell').filter({ 
                hasText: new RegExp(`^${username}$`)
            }) 
        }).first(); 

        await expect(userRow).toBeVisible();
        await expect( userRow.locator('.oxd-table-cell').nth(4) ).toHaveText(status);
    }


}


module.exports = { AdminPage }

