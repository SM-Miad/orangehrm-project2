const { expect } = require('@playwright/test');

class AdminPage {
    constructor(page) {
        this.page = page;
        this.userManagementMenu = page.getByRole('link', { name: 'User Management' });
        //this.userSearchInput = page.locator('label:has-text("Username")').locator('..').locator('input');
        this.userSearchInput = page.locator('div:has(> label:has-text("Username")) + div input');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.tableRows = page.locator('.oxd-table-body .oxd-table-card'); //,ay need to adjust the selector based on the actual table structure
        //this.userRoleDropdown = page.locator('label:has-text("User Role")').locator('..').locator('div[role="combobox"]');
        this.userRoleDropdown = page.locator('div:has(> label:has-text("User Role")) + div .oxd-select-wrapper');
        this.userStatusDropdown = page.locator('div:has(> label:has-text("Status")) + div .oxd-select-wrapper');
        this.saveButton = page.getByRole('button', { name: 'Save' });


    }

    async goToUserManagement() {
        await this.userManagementMenu.click();
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



//Log in with valid credentials →
 //navigate to Admin → 
 //search for a user by username → 
 //verify the results table shows the correct matching row(s) → e
 //dit that user’s role/status → 
 //save → 
 //refresh the page and verify the change persisted.