# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: add-employee-test.spec.js >> Add a new employee and verify in employee list
- Location: tests\add-employee-test.spec.js:5:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('oxd-table-row').filter({ hasText: 'Kylie' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('oxd-table-row').filter({ hasText: 'Kylie' }) with timeout 5000ms
  - waiting for locator('oxd-table-row').filter({ hasText: 'Kylie' })

```

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "PIM" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: manda user
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem: Configuration 
      - listitem:
        - link "Employee List":
          - /url: "#"
      - listitem:
        - link "Add Employee":
          - /url: "#"
      - listitem:
        - link "Reports":
          - /url: "#"
      - button ""
- heading "Employee Information" [level=5]
- button ""
- separator
- text: Employee Name
- textbox "Type for hints...": Kylie
- text: Employee Id
- textbox
- text: Employment Status -- Select --  Include Current Employees Only  Supervisor Name
- textbox "Type for hints..."
- text: Job Title -- Select --  Sub Unit -- Select -- 
- separator
- button "Reset"
- button "Search"
- button " Add"
- separator
- text: No Records Found
- table:
  - rowgroup:
    - row " Id  First (& Middle) Name  Last Name  Job Title  Employment Status  Sub Unit  Supervisor  Actions":
      - columnheader "":
        - checkbox ""
        - text: 
      - columnheader "Id "
      - columnheader "First (& Middle) Name "
      - columnheader "Last Name "
      - columnheader "Job Title "
      - columnheader "Employment Status "
      - columnheader "Sub Unit "
      - columnheader "Supervisor "
      - columnheader "Actions"
  - rowgroup
- paragraph: OrangeHRM OS 5.9
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | 
  3  | class PimPage {
  4  |     constructor(page) {
  5  |         this.page = page;
  6  |         this.addemployee = page.getByRole('link', { name: 'Add Employee' });
  7  |         this.firstName = page.locator('input[name="firstName"]');
  8  |         this.middleName = page.locator('input[name="middleName"]');
  9  |         this.lastName = page.locator('input[name="lastName"]');
  10 |         this.employeeId = page.locator('label:has-text("Employee Id").locator("..").locator("input")');
  11 |         this.saveButton = page.locator('button[type="submit"]');
  12 |         this.employeeList = page.getByRole('link', { name: 'Employee List' });
  13 |         this.searchEmployeeName = page.locator('input[placeholder="Type for hints..."]').first();
  14 |         this.searchButton = page.getByRole('button', { name: 'Search' });
  15 |     }
  16 | 
  17 |     async clickAddEmployee() {
  18 |         await this.addemployee.click();
  19 |     }
  20 | 
  21 |     async enterEmployeeDetails(firstName, middleName, lastName) {
  22 |         await this.firstName.fill(firstName);
  23 |         await this.middleName.fill(middleName);
  24 |         await this.lastName.fill(lastName);
  25 |     }
  26 | 
  27 |     async clickSaveButton() {
  28 |         await this.saveButton.click();
  29 |     }
  30 | 
  31 |     async goToEmployeeList() {
  32 |         await this.employeeList.click();
  33 |     }
  34 | 
  35 |     async searchEmployee(employeeName) {
  36 |         await this.searchEmployeeName.fill(employeeName);
  37 |         await this.searchButton.click();
  38 |     }
  39 | 
  40 |     async verifyEmployeeInList(employeeName) {
  41 |         const searchResult = this.page.locator('oxd-table-row').filter({ hasText: employeeName });
> 42 |         await expect(searchResult).toBeVisible();
     |                                    ^ Error: expect(locator).toBeVisible() failed
  43 |     }
  44 | }
  45 | 
  46 | module.exports = { PimPage };
  47 | 
  48 | 
```