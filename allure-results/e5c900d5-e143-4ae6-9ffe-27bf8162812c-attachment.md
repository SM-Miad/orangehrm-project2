# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-user-role.spec.js >> search, edit, and verify user role/status
- Location: tests\admin-user-role.spec.js:4:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.oxd-table-body .oxd-table-card').filter({ has: locator('.oxd-table-cell').filter({ hasText: /^FMLName$/ }) }).first().locator('.oxd-table-cell').nth(4)
Expected: "Disabled"
Received: "Enabled"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('.oxd-table-body .oxd-table-card').filter({ has: locator('.oxd-table-cell').filter({ hasText: /^FMLName$/ }) }).first().locator('.oxd-table-cell').nth(4) with timeout 5000ms
  - waiting for locator('.oxd-table-body .oxd-table-card').filter({ has: locator('.oxd-table-cell').filter({ hasText: /^FMLName$/ }) }).first().locator('.oxd-table-cell').nth(4)
    14 × locator resolved to <div role="cell" class="oxd-table-cell oxd-padding-cell">…</div>
       - unexpected value "Enabled"

```

```yaml
- cell "Enabled"
```

# Test source

```ts
  6   |         this.userManagementMenu = page.getByRole('link', { name: 'User Management' });
  7   |         this.userSearchInput = page.locator('div:has(> label:has-text("Username")) + div input');
  8   |         this.searchButton = page.getByRole('button', { name: 'Search' });
  9   |         this.tableRows = page.locator('.oxd-table-body .oxd-table-card');
  10  |         this.userRoleDropdown = page.locator('div:has(> label:has-text("User Role")) + div .oxd-select-wrapper');
  11  |         this.userStatusDropdown = page.locator('div:has(> label:has-text("Status")) + div .oxd-select-wrapper');
  12  |         this.saveButton = page.getByRole('button', { name: 'Save' });
  13  | 
  14  | 
  15  |     }
  16  | 
  17  |     async goToUserManagement() {
  18  |         await this.userManagementMenu.click();
  19  |     }
  20  | 
  21  |     async getRandomUsername() {
  22  |         await expect(this.tableRows.first()).toBeVisible();
  23  | 
  24  |     const rowCount = await this.tableRows.count();
  25  | 
  26  |     const usernames = [];
  27  | 
  28  |     for (let i = 0; i < rowCount; i++) {
  29  |         const username = await this.tableRows
  30  |             .nth(i)
  31  |             .locator('.oxd-table-cell')
  32  |             .nth(1)
  33  |             .textContent();
  34  | 
  35  |         if (username && username.trim() !== 'Admin') {
  36  |             usernames.push(username.trim());
  37  |         }
  38  |     }
  39  | 
  40  |     if (usernames.length === 0) {
  41  |         throw new Error('No suitable username found in the User Management table.');
  42  |     }
  43  | 
  44  |     const randomIndex = Math.floor(Math.random() * usernames.length);
  45  | 
  46  |     return usernames[randomIndex];
  47  |     }
  48  | 
  49  |     async searchUser(username) {
  50  |         await this.userSearchInput.fill(username);
  51  |         await this.searchButton.click();
  52  |     }
  53  | 
  54  |    
  55  |     async verifyUserInResults(username) {
  56  |         const userRow = this.tableRows.filter({ hasText: username }).first();
  57  |         await expect(userRow).toBeVisible();
  58  |         
  59  |     }
  60  | 
  61  |    
  62  |     async editUser(username){
  63  |         const userRow = this.tableRows.filter({
  64  |             has: this.page.locator('.oxd-table-cell').filter({
  65  |                 hasText: RegExp(`^${username}$`)
  66  |             })
  67  |         }).first();
  68  |         await expect(userRow).toBeVisible();
  69  |         await userRow.getByRole('button').last().click();
  70  |     }
  71  | 
  72  | 
  73  |     async changeUserRole(role) {
  74  |         await this.userRoleDropdown.click();
  75  |         await this.page.getByRole('option', { name: role}).click();
  76  |     }
  77  | 
  78  |     async changeUserStatus(status) {
  79  |         await this.userStatusDropdown.click();
  80  |         await this.page.getByRole('option', { name: status}).click();
  81  |     }
  82  | 
  83  |     async saveChange() {
  84  |         await this.saveButton.click();
  85  |     }
  86  | 
  87  |     async verifyUserRole(username, role) {
  88  |         const userRow = this.tableRows.filter({
  89  |             has: this.page.locator('.oxd-table-cell').filter({
  90  |                 hasText: RegExp(`^${username}$`)
  91  |             })
  92  |         }).first()
  93  | 
  94  |         await expect(userRow).toBeVisible();
  95  |         await expect( userRow.locator('.oxd-table-cell').nth(2) ).toHaveText(role);
  96  |     }
  97  | 
  98  |     async verifyUserStatus(username, status) {
  99  |         const userRow = this.tableRows.filter({ 
  100 |             has: this.page.locator('.oxd-table-cell').filter({ 
  101 |                 hasText: new RegExp(`^${username}$`)
  102 |             }) 
  103 |         }).first(); 
  104 | 
  105 |         await expect(userRow).toBeVisible();
> 106 |         await expect( userRow.locator('.oxd-table-cell').nth(4) ).toHaveText(status);
      |                                                                   ^ Error: expect(locator).toHaveText(expected) failed
  107 |     }
  108 | 
  109 | 
  110 | }
  111 | 
  112 | 
  113 | module.exports = { AdminPage }
  114 | 
  115 | 
```