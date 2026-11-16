
import {test, expect} from '@playwright/test'
import {POManager} from '../pageobjects/POManager'
import {validationLoginData} from '../test-data/login-data'
import {eventNameData, eventDateData, eventAddressData, eventAmountData} from '../test-data/home-data'
const data = JSON.parse(JSON.stringify(require('../utils/test-data.json')))

test.describe('Home page Tests', () => {

    test.beforeEach(async({page}) => {
        await page.goto("https://eventhub.rahulshettyacademy.com/")
    })

    test('Verify event cards are displayed', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.homePage.verifyEventCardTitles()

    })

    test('Verify Events cards name, date and location', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.homePage.verifyEventNameAndDateAndAddress(eventNameData.eventName1, eventNameData.eventName2, eventNameData.eventName3, 
            eventDateData.eventDate1, eventDateData.eventDate2, eventDateData.eventDate3, eventAddressData.eventAddress1, eventAddressData.eventAddress2,
            eventAddressData.eventAddress3
        )

    })

    test('Verify Amount of each event and Book now button enabled', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.homePage.verifyEventValueAndBookNowButton(eventAmountData.eventAmount1, eventAmountData.eventAmount2, eventAmountData.eventAmount3)

    })
})

