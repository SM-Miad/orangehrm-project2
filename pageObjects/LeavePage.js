const { expect } = require('@playwright/test');

class LeavePage {
    constructor(page) {
        this.page = page;
        this.applyLink = page.getByRole('link', { name: 'Apply' });
        this.myLeaveLink = page.getByRole('link', { name: 'My Leave' });
        this.applyLeaveLink = page.getByRole('link', { name: 'Apply Leave' });
        this.leaveTypeDropdown = page.locator('.oxd-select-wrapper').first();
        this.fromDateInput = page.locator('div:has(> label:has-text("From Date")) + div input');
        this.toDateInput = page.locator('div:has(> label:has-text("To Date")) + div input');
        this.applyButton = page.locator('button[type="submit"]');
        this.tableRows = page.locator('.oxd-table-body .oxd-table-card');
        this.toastSuccess = page.locator('.oxd-toast-content');
    }

    async clickApplyLink() {
        await this.applyLink.click();
    }

    async applyLeave(fromDate, toDate) {
        await this.leaveTypeDropdown.click();

        const firstOption = this.page.locator('.oxd-select-dropdown > div').nth(1);
        await firstOption.click();

        await this.fromDateInput.clear();
        await this.fromDateInput.fill(fromDate);
        await this.toDateInput.clear();
        await this.toDateInput.fill(toDate);
        await this.applyButton.click();
        await expect(this.toastSuccess).toBeVisible();
    }

    async clickMyLeaveLink() {
        await this.myLeaveLink.click();
    }

    async getLeaveRow(fromDate, toDate) {
        const leaveRow = this.tableRows.filter({ 
            hasText: fromDate }).filter({ 
                hasText: toDate 
            }).first();
            
            return leaveRow;
    }

    async verifyLeaveStatus(fromDate, toDate, expectedStatus) {
        const leaveRow = await this.getLeaveRow( fromDate, toDate );

        await expect(leaveRow).toBeVisible();
        await expect(leaveRow).toContainText(expectedStatus);
    }

    async cancelLeaveRequest(fromDate, toDate) {
        const leaveRow = await this.getLeaveRow(fromDate, toDate);

        await expect(leaveRow).toBeVisible();
        const cancelButton = leaveRow.getByRole('button', { name: 'Cancel' });
        await expect(cancelButton).toBeVisible();

        await cancelButton.click();

        await expect(this.toastSuccess).toBeVisible();
    }

}

module.exports = { LeavePage };

