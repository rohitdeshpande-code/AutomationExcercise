
import {expect, type Page, type Locator} from '@playwright/test'

export class BookingPage {

    page:Page 
    cardTitles: Locator
    ticketCount: Locator
    customerName: Locator
    cutomerEmail: Locator
    customerMobile: Locator
    confirmBooking: Locator
    confirmMessage: Locator
    viewMyBookings: Locator
    bookingName: Locator
    clearAllBooking: Locator
    errorsForBlankSubmission: Locator

    constructor(page: Page) {

        this.page = page
        this.cardTitles = page.locator("#event-card")
        this.ticketCount = page.getByRole("button", {name: "+"})
        this.customerName = page.locator("input#customerName")
        this.cutomerEmail = page.locator("input#customer-email")
        this.customerMobile = page.locator("input#phone")
        this.confirmBooking = page.getByRole("button", {name: "Confirm Booking"})
        this.confirmMessage = page.locator(".text-xl")
        this.viewMyBookings = page.getByRole("button", {name: "View My Bookings"})
        this.bookingName = page.locator(".text-base")
        this.clearAllBooking = page.getByRole("button", {name: "Clear all bookings"})
        this.errorsForBlankSubmission = page.locator('.text-red-600')

    }

    async createNewBooking(eventName: string, randomName: string, randomEmail: string, randomMobile: string) {

        await this.cardTitles.first().waitFor()
        for (let i = 0; i < await this.cardTitles.count(); i++) {
            const cardTitle = await this.cardTitles.nth(i).locator('h3').textContent()
            if (cardTitle === eventName) {
                await this.cardTitles.nth(i).getByTestId("book-now-btn").click()
                break
            }
        }

        await this.ticketCount.click()
        await this.customerName.fill(randomName)
        await this.cutomerEmail.fill(randomEmail)
        await this.customerMobile.fill(randomMobile)
        await this.confirmBooking.click()  
    }

    async verifyConfirmBooking(confirmMessage: string) {
        await expect(this.confirmMessage).toContainText(confirmMessage)
        await this.viewMyBookings.click()
    }

    async deleteAllBookings(eventName: string) {
        await expect(this.bookingName).toHaveText(eventName)
        this.page.on("dialog", dialog => dialog.accept())
        await this.clearAllBooking.click()
    }

    async verifyErrorsForBlankSubmission() {

        const blankFieldErrors = [
            "Name must be at least 2 chars",
            "Enter a valid email",
            "Enter a valid 10-digit phone"
        ]

        const count = await this.errorsForBlankSubmission.count()

        for(let i=0; i< count; i++) {
            await expect(this.errorsForBlankSubmission.nth(i)).toHaveText(blankFieldErrors[i])
        }
    }
}