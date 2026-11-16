
import {test, expect} from '@playwright/test'
import {POManager} from '../pageobjects/POManager'
import {validationLoginData} from '../test-data/login-data'
import {eventNameData} from '../test-data/home-data'
import {bookingMessages} from '../test-data/booking-data'
const data = JSON.parse(JSON.stringify(require('../utils/test-data.json')))
import {faker} from '@faker-js/faker'

test.describe('Event Page Tests', async() => {

    test.beforeEach(async({page}) => {
        await page.goto("https://eventhub.rahulshettyacademy.com/")
    })

    test('User is able to book seats for Dilli Diwali Mela', async({page}) => {
    
        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        
        const randomCustomerName = faker.person.firstName()
        const randomCustomerEmail = faker.internet.email({provider: "yahoo.com"})
        const randomCustomerMobile = faker.phone.number({ style: 'mobile' });
        await poManager.bookingPage.createNewBooking(eventNameData.eventName1, randomCustomerName, randomCustomerEmail,
            randomCustomerMobile)
        await poManager.bookingPage.verifyConfirmBooking(bookingMessages.bookingConfirmed)
        await poManager.bookingPage.deleteAllBookings(eventNameData.eventName1)
        

    })

    test('User is able to book seats for Hollywood Monsoon Night — Los Angeles', async({page}) => {
    
        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

        const randomCustomerName = faker.person.firstName()
        const randomCustomerEmail = faker.internet.email({provider: "yahoo.com"})
        const randomCustomerMobile = faker.phone.number({ style: 'mobile' });
        await poManager.bookingPage.createNewBooking(eventNameData.eventName2, randomCustomerName, randomCustomerEmail,
            randomCustomerMobile)
        await poManager.bookingPage.verifyConfirmBooking(bookingMessages.bookingConfirmed)
        await poManager.bookingPage.deleteAllBookings(eventNameData.eventName2)

    })

    test('User is able to book seats for World Tech Summit', async({page}) => {
    
        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        
        const randomCustomerName = faker.person.firstName()
        const randomCustomerEmail = faker.internet.email({provider: "yahoo.com"})
        const randomCustomerMobile = faker.phone.number({ style: 'mobile' });
        await poManager.bookingPage.createNewBooking(eventNameData.eventName3, randomCustomerName, randomCustomerEmail,
            randomCustomerMobile)
        await poManager.bookingPage.verifyConfirmBooking(bookingMessages.bookingConfirmed)
        await poManager.bookingPage.deleteAllBookings(eventNameData.eventName3)

    })

    test('Verify required field errors are displaying after submitting blank form', async ({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)
        await poManager.bookingPage.createNewBooking(eventNameData.eventName3, '', '','')
        await poManager.bookingPage.verifyErrorsForBlankSubmission()

    })



})

