# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Events.spec.ts >> Event Page Tests >> Verify and Search for matching event
- Location: tests\Events.spec.ts:16:10

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.items-end h2')
Expected: "Featured Events"
Received: ""

Call log:
  - Expect "toHaveText" locator('.items-end h2') with timeout 5000ms
  - waiting for locator('.items-end h2')
  - Protocol error (Runtime.callFunctionOn): Internal server error, session closed.

```

# Test source

```ts
  1  | 
  2  | import {expect, Locator, type Page} from '@playwright/test'
  3  | 
  4  | export class LoginPage {
  5  | 
  6  |     page: Page
  7  |     username: Locator
  8  |     password: Locator
  9  |     loginButton: Locator
  10 |     headerFeatureEvents: Locator
  11 |     inlineFieldErrors: Locator
  12 |     errorModal: Locator
  13 | 
  14 | 
  15 |     constructor(page: Page) {
  16 | 
  17 |         this.page = page
  18 |         this.username = page.locator('input#email')
  19 |         this.password = page.locator('input#password')
  20 |         this.loginButton = page.locator('button#login-btn')
  21 |         this.headerFeatureEvents = page.locator('.items-end h2')
  22 |         this.inlineFieldErrors = page.locator('.space-y-4 .text-xs')
  23 |         this.errorModal = page.locator('p.leading-snug')
  24 | 
  25 |     }
  26 | 
  27 |     async validLoginUsingUsernameAndPassword(username: string, password: string, headertext: string) {
  28 | 
  29 |         await this.username.fill(username)
  30 |         await this.password.fill(password)
  31 |         await this.loginButton.click()
> 32 |         await expect(this.headerFeatureEvents).toHaveText(headertext)
     |                                                ^ Error: expect(locator).toHaveText(expected) failed
  33 |     }
  34 | 
  35 |     async invalidLoginUsingInvalidUsername(username: string, password: string, invalidusernameerror: string) {
  36 | 
  37 |         await this.username.fill(username)
  38 |         await this.password.fill(password)
  39 |         await this.loginButton.click()
  40 |         await expect(this.inlineFieldErrors).toHaveText(invalidusernameerror)
  41 | 
  42 |     }
  43 | 
  44 |     async invalidLoginUsingInvalidPassword(username: string, password: string, invalidpassworderror: string) {
  45 | 
  46 |         await this.username.fill(username)
  47 |         await this.password.fill(password)
  48 |         await this.loginButton.click()
  49 |         await expect(this.errorModal).toHaveText(invalidpassworderror)
  50 |     }
  51 | 
  52 |     async invalidLoginUsingPasswordLessThan6Chars(username: string, password: string, invalidpasswordlessthansixchar: string) {
  53 | 
  54 |         await this.username.fill(username)
  55 |         await this.password.fill(password)
  56 |         await this.loginButton.click()
  57 |         await expect(this.inlineFieldErrors).toHaveText(invalidpasswordlessthansixchar)
  58 | 
  59 |     }
  60 | 
  61 |     async invalidLoginUsingBlankUsernameAndPassword(username: string, password: string, invalidusernameerror: string, invalidpassworderror: string) {
  62 | 
  63 |         const expectedErrors = [
  64 |             invalidusernameerror, 
  65 |             invalidpassworderror
  66 |         ]
  67 |         await this.username.fill(username)
  68 |         await this.password.fill(password)
  69 |         await this.loginButton.click()
  70 | 
  71 |         for(let i=0; i< await this.inlineFieldErrors.count(); i++) {
  72 | 
  73 |             await expect(this.inlineFieldErrors.nth(i)).toHaveText(expectedErrors[i])
  74 |         }
  75 | 
  76 |     }
  77 | 
  78 | 
  79 | 
  80 | }
  81 | 
  82 | 
```