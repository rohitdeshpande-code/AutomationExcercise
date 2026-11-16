
import {test, expect} from '@playwright/test'
import {POManager} from '../pageobjects/POManager'
import {validationLoginData} from '../test-data/login-data'
const data = JSON.parse(JSON.stringify(require('../utils/test-data.json')))


test.describe('Login Tests', () => {

    test.beforeEach(async({page}) => {
        await page.goto("https://eventhub.rahulshettyacademy.com/")
    })

    test('Login with valid credentials', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

    })

    test('Login with invalid email address', async ({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.invalidLoginUsingInvalidUsername(data.invalidusername, data.password, validationLoginData.invalidUsernameError)

    })

    test('Login with invalid password', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.invalidLoginUsingInvalidPassword(data.username, data.invalidpassword, validationLoginData.invalidPasswordError)
    })

    test('Login with password requirement less than 6 characters', async ({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.invalidLoginUsingPasswordLessThan6Chars(data.username, data.passwordLessThanSix, validationLoginData.passwordLessThan6CharLength)

        
    })

    test('Login with blank username and password', async ({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.invalidLoginUsingBlankUsernameAndPassword('','',validationLoginData.invalidUsernameError,validationLoginData.passwordLessThan6CharLength )
        
    })

})

