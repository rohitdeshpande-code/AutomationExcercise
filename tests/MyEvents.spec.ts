
import { test, expect } from '@playwright/test'
import { POManager } from '../pageobjects/POManager'
import { validationLoginData } from '../test-data/login-data'
import {eventFields, eventDeleteMessage, eventCreateMessage, eventUpdatedMessage, errorForCurrentDate, errorForZeroSeats, errorScenarios} from '../test-data/MyEvents-data'
const data = JSON.parse(JSON.stringify(require('../utils/test-data.json')))
import { faker } from '@faker-js/faker'

function formatDateValue(date: Date, time = '10:00') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T${time}`;
}

function currentDateValue() {
    return formatDateValue(new Date());
}

function oneDayForwardValue() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return formatDateValue(date);
}

function twoDaysForwardValue() {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return formatDateValue(date);
}


test.describe('My Events Page Tests', async () => {

    const randomTitle = faker.person.jobTitle()
    const randomDescription = faker.commerce.productDescription()
    const randomCity = faker.location.city()

    test.beforeEach(async ({ page }) => {
        await page.goto("https://eventhub.rahulshettyacademy.com/")
    })

    test('Verify user is able to create the event with required fields', async({ page }) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.myEventsPage.reachToManageEventsPage()
        await poManager.myEventsPage.fillEventFields(randomTitle, randomDescription, eventFields.category, randomCity, eventFields.venue, oneDayForwardValue(), eventFields.price, eventFields.seats)
        await poManager.myEventsPage.verifyModalMessages(eventCreateMessage)

    })

    test('Verify user is able to delete the newly created event', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.myEventsPage.reachToManageEventsPage()
        await poManager.myEventsPage.deleteNewlyCreatedEvent(randomTitle, randomCity)
        await poManager.myEventsPage.verifyModalMessages(eventDeleteMessage)

    })

    test('Verify Event date throws error after selecting current date', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.myEventsPage.reachToManageEventsPage()
        await poManager.myEventsPage.fillEventFields(randomTitle, randomDescription, eventFields.category, randomCity, eventFields.venue, currentDateValue(), eventFields.price, eventFields.seats)
        await poManager.myEventsPage.verifyErrorsOnEventsPage(errorForCurrentDate)

    })

    test('Verify Seats field throws error after entering 0 value', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.myEventsPage.reachToManageEventsPage()
        await poManager.myEventsPage.fillEventFields(randomTitle, randomDescription, eventFields.category, randomCity, eventFields.venue, oneDayForwardValue(), eventFields.price, eventFields.zeroSeats )
        await poManager.myEventsPage.verifyErrorsOnEventsPage(errorForZeroSeats)

    })

    test('Verify user is able to edit newly created event', async ({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

        await poManager.myEventsPage.reachToManageEventsPage()
        await poManager.myEventsPage.fillEventFields(randomTitle, randomDescription, eventFields.category, randomCity, eventFields.venue, oneDayForwardValue(), eventFields.price, eventFields.seats)
        await poManager.myEventsPage.editNewlyCreatedEvent(randomTitle)
        await poManager.myEventsPage.fillEventFields(`Updated-${randomTitle}`, `Updated-${randomDescription}`, eventFields.category1, `Updated-${randomCity}`, eventFields.venue1, twoDaysForwardValue(), eventFields.price1, eventFields.seats1, 'update')
        await poManager.myEventsPage.deleteNewlyCreatedEvent(`Updated-${randomTitle}`, `Updated-${randomCity}`)
        await poManager.myEventsPage.verifyModalMessages([eventCreateMessage,eventUpdatedMessage,eventDeleteMessage])     

    })

    test('Blank required fields submission ', async ({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

        await poManager.myEventsPage.reachToManageEventsPage()
        await poManager.myEventsPage.fillEventFields('', '', eventFields.category, '', '', '', '', '')
        await poManager.myEventsPage.verifyErrorsForBlankSubmission(errorScenarios)

    })

})