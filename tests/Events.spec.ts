

import {test, expect} from '@playwright/test'
import {POManager} from '../pageobjects/POManager'
import {validationLoginData} from '../test-data/login-data'
import {eventNameData, eventDateData, eventAddressData} from '../test-data/home-data'
import {eventsError, categories, cities } from '../test-data/events-data'
const data = JSON.parse(JSON.stringify(require('../utils/test-data.json')))

test.describe('Event Page Tests', async() => {

    test.beforeEach(async({page}) => {
        await page.goto("https://eventhub.rahulshettyacademy.com/")
    })

    test('Verify and Search for matching event', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.eventsPage.verifyEventsPage()
        await poManager.eventsPage.verifySearchEventAndMatch(eventNameData.eventName1)

    })

    test('Verify Not exisiting event not getting searched with error message', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.eventsPage.verifyEventsPage()
        await poManager.eventsPage.verifyNotExistingEventWithError(eventNameData.notExisitingEventName, eventsError.notExisitingEventsError)
    })


    test('Verify user is able to search with partial event name', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.eventsPage.verifyEventsPage()
        await poManager.eventsPage.verifySearchWithPartialEventName(eventNameData.partialEventName, eventNameData.eventName1, eventNameData.eventName2, eventNameData.eventName3)

    })

    test('Verify filter events and check the cards', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.eventsPage.verifyEventsPage()
        await poManager.eventsPage.verifyWithFilterEvents(categories.category1, categories.category2, categories.category3, categories.category4, categories.category5, 
            eventNameData.eventName3, eventNameData.eventName2, eventNameData.eventName1)
   
    })

    test('Verify filter cities and check the cards', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.eventsPage.verifyEventsPage()
        await poManager.eventsPage.verifyWithFilterCities(cities.city1, cities.city2, cities.city3, cities.city4,
            cities.city5, cities.city6, eventNameData.eventName1, eventNameData.eventName3)
    })

    test('Verify apply filter and clear filter working as expected', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.eventsPage.verifyEventsPage()
        await poManager.eventsPage.verifyApplyAndClearFiltersForCategoryAndCity(
            categories.category1, cities.city4, eventNameData.eventName3, eventDateData.eventDate3, eventAddressData.eventAddress3)
        
    })
})

