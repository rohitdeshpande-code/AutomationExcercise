
import {expect, Locator, type Page} from '@playwright/test'

export class LoginPage {

    page: Page
    username: Locator
    password: Locator
    loginButton: Locator
    headerFeatureEvents: Locator
    inlineFieldErrors: Locator
    errorModal: Locator


    constructor(page: Page) {

        this.page = page
        this.username = page.locator('input#email')
        this.password = page.locator('input#password')
        this.loginButton = page.locator('button#login-btn')
        this.headerFeatureEvents = page.locator('.items-end h2')
        this.inlineFieldErrors = page.locator('.space-y-4 .text-xs')
        this.errorModal = page.locator('p.leading-snug')

    }

    async validLoginUsingUsernameAndPassword(username: string, password: string, headertext: string) {

        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
        await expect(this.headerFeatureEvents).toHaveText(headertext)
    }

    async invalidLoginUsingInvalidUsername(username: string, password: string, invalidusernameerror: string) {

        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
        await expect(this.inlineFieldErrors).toHaveText(invalidusernameerror)

    }

    async invalidLoginUsingInvalidPassword(username: string, password: string, invalidpassworderror: string) {

        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
        await expect(this.errorModal).toHaveText(invalidpassworderror)
    }

    async invalidLoginUsingPasswordLessThan6Chars(username: string, password: string, invalidpasswordlessthansixchar: string) {

        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
        await expect(this.inlineFieldErrors).toHaveText(invalidpasswordlessthansixchar)

    }

    async invalidLoginUsingBlankUsernameAndPassword(username: string, password: string, invalidusernameerror: string, invalidpassworderror: string) {

        const expectedErrors = [
            invalidusernameerror, 
            invalidpassworderror
        ]
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()

        for(let i=0; i< await this.inlineFieldErrors.count(); i++) {

            await expect(this.inlineFieldErrors.nth(i)).toHaveText(expectedErrors[i])
        }

    }



}

