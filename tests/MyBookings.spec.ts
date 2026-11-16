
import { test, expect } from '@playwright/test'
import { POManager } from '../pageobjects/POManager'
const data = JSON.parse(JSON.stringify(require('../utils/test-data.json')))
import { validationLoginData } from '../test-data/login-data'
import { blankBookingText, cardTitleLabels, bookingConfirmed, deleteModal } from '../test-data/mybookings-data'

test.describe.serial('Test suite for My bookings related scenarios', async () => {

    const bookedCustomers: { name: string, email: string, mobile: string }[] = []

    test.beforeEach('Login scenario', async ({ page }) => {

        await page.goto('https://eventhub.rahulshettyacademy.com/')
    })

    test('Verify when no bookings are there then should show clear message "No bookings yet"', async ({ page }) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

        await poManager.myBookingsPage.reachToMyBookingsPage()
        await poManager.myBookingsPage.verifyBlankNoBookingMessage(blankBookingText)

    })

    test('Verify when no bookings are there then "Browse Events" button is displayed ', async ({ page }) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

        await poManager.myBookingsPage.reachToMyBookingsPage()
        await poManager.myBookingsPage.verifyBlankBrowserEventsButton()
    })

    test('Verify after all 3 bookings using events those are displayed under My booking page ', async ({ page }) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

        await poManager.myBookingsPage.verifyCreationOfBookings(cardTitleLabels, bookingConfirmed, bookedCustomers)

    })

    test('Verify "View Details" and "Cancel Booking" buttons are present for created bookings', async ({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

        await page.locator('#nav-bookings').click()
        await expect(page.locator(".items-start h1").filter({ hasText: "My Bookings" })).toBeVisible()

        await poManager.myBookingsPage.reachToMyBookingsPage()
        await poManager.myBookingsPage.verifyButtonsOnBookings()

    })

    test('Verify after click on "View Details" appropriate page opens and check customer name, email and phone ', async({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

        await poManager.myBookingsPage.reachToMyBookingsPage()
        await poManager.myBookingsPage.verifyViewDetailsUsingFields(bookedCustomers)

    })

    test('Verify user is able to delete the bookings one by one', async ({page}) => {

        const poManager = new POManager(page)
        await poManager.loginPage.validLoginUsingUsernameAndPassword(data.username, data.password, validationLoginData.headerTextForEventsPage)

        await poManager.myBookingsPage.reachToMyBookingsPage()
        await poManager.myBookingsPage.verifyDeleteBookings(deleteModal.deleteModalText, deleteModal.deleteConfirmMessage)



    })
})