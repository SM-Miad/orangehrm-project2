const { expect } = require('@playwright/test');

class PimPage {
    constructor(page) {
        this.page = page;
        this.addemployee = page.getByRole('link', { name: 'Add Employee' });
        this.firstName = page.locator('input[name="firstName"]');
        this.middleName = page.locator('input[name="middleName"]');
        this.lastName = page.locator('input[name="lastName"]');
        this.employeeId = page.locator('label:has-text("Employee Id").locator("..").locator("input")');
        this.saveButton = page.locator('button[type="submit"]');
        this.employeeList = page.getByRole('link', { name: 'Employee List' });
        this.searchEmployeeName = page.locator('input[placeholder="Type for hints..."]').first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    async clickAddEmployee() {
        await this.addemployee.click();
    }

    async enterEmployeeDetails(firstName, middleName, lastName) {
        await this.firstName.fill(firstName);
        await this.middleName.fill(middleName);
        await this.lastName.fill(lastName);
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async goToEmployeeList() {
        await this.employeeList.click();
    }

    async searchEmployee(employeeName) {
        await this.searchEmployeeName.fill(employeeName);
        await this.searchButton.click();
    }

    async verifyEmployeeInList(employeeName) {
        const searchResult = this.page.locator('oxd-table-row').filter({ hasText: employeeName });
        await expect(searchResult).toBeVisible();
    }
}

module.exports = { PimPage };

