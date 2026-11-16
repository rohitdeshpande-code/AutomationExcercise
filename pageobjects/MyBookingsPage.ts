
import {type Page, type Locator, expect} from '@playwright/test'
import { faker } from '@faker-js/faker'

export class MyBookingsPage {

    page: Page
    bookingsNav: Locator
    bookingsHeader: Locator
    noBookingsText: Locator
    browserEventsBtn: Locator
    cardTitles: Locator
    bookNowBtn: Locator
    cutomerName: Locator
    customerEmail: Locator
    customerPhone: Locator
    confirmBooking: Locator
    confirmBookingHeader: Locator
    viewMyBookingsBtn: Locator
    homeNav: Locator
    bookingCard: Locator
    bookingFields: Locator
    backToMyBookings: Locator
    deleteModalHeader: Locator
    messageModal: Locator



    constructor(page: Page) {
        this.page = page
        this.bookingsNav = page.locator('#nav-bookings')
        this.bookingsHeader = page.locator(".items-start h1").filter({ hasText: "My Bookings" })
        this.noBookingsText = page.locator(".items-center h3")
        this.browserEventsBtn = page.getByRole("button", { name: "Browse Events" })
        this.cardTitles = page.locator('#event-card')
        this.bookNowBtn = page.getByRole("link", { name: "Book Now" })
        this.cutomerName = page.locator("input#customerName")
        this.customerEmail = page.locator("input#customer-email")
        this.customerPhone = page.locator("input#phone")
        this.confirmBooking = page.getByRole("button", { name: "Confirm Booking" })
        this.confirmBookingHeader = page.locator(".text-xl")
        this.viewMyBookingsBtn = page.getByRole("button", { name: "View My Bookings" })
        this.homeNav = page.locator('#nav-home')
        this.bookingCard = page.locator('#booking-card')
        this.bookingFields = page.locator('.space-y-3 .flex')
        this.backToMyBookings = page.getByRole("button", {name: "← Back to My Bookings"})
        this.deleteModalHeader = page.getByRole("dialog", {name: "Cancel this booking?"})
        this.messageModal = page.locator('p.leading-snug')

    }

    async reachToMyBookingsPage() {

        await this.bookingsNav.click()
        await expect(this.bookingsHeader).toBeVisible()
    }

    async verifyBlankNoBookingMessage(text: string) {

        await expect(this.noBookingsText).toHaveText(text)
    }

    async verifyBlankBrowserEventsButton() {

        await expect(this.browserEventsBtn).toBeVisible()
    }

    async verifyCreationOfBookings(cardTitleLabels: string[], message: string, bookedCustomers: { name: string, email: string, mobile: string }[]) {

        const cardTitles = this.cardTitles
        await cardTitles.first().waitFor()
        const count = await cardTitles.count()
        for (let i = 0; i < count; i++) {

            const name = faker.person.firstName()
            const email = faker.internet.email({ provider: "yahoo.com" })
            const phone = faker.phone.number({ style: 'mobile' })

            const cardTitle = await cardTitles.nth(i).locator('h3').textContent()
            if (cardTitle === cardTitleLabels[i]) {
                await this.bookNowBtn.nth(i).click()
                await this.cutomerName.fill(name)
                await this.customerEmail.fill(email)
                await this.customerPhone.fill(phone)
                await this.confirmBooking.click()
                await expect(this.confirmBookingHeader).toContainText(message)
                bookedCustomers.push({ name: name, email: email, mobile: phone })
                await this.viewMyBookingsBtn.click()
                await this.homeNav.click()
            }
        }

        await this.bookingsNav.click()
        await expect(this.bookingsHeader).toBeVisible()

        for (const title of cardTitleLabels) {

            const card = this.bookingCard.filter({
                has: this.page.locator('h3', { hasText: title })
            })

            await expect(card).toBeVisible()
            await expect(card.locator('h3')).toContainText(title)
        }
    }

    async verifyButtonsOnBookings() {

        const bookingCards = this.bookingCard
        await bookingCards.first().waitFor()
        const cardsCount = await bookingCards.count()

        for(let i=0;i<cardsCount;i++) {
            const card = bookingCards.nth(i)
            expect(card.getByRole("button", {name: "View Details"})).toBeVisible()
            expect(card.getByRole("button", {name: "Cancel Booking"})).toBeVisible()
        }
    }

    async verifyViewDetailsUsingFields(bookedCustomers: { name: string, email: string, mobile: string }[]) {

        const bookingCards = this.bookingCard
        await bookingCards.first().waitFor()
        const cardsCount = await bookingCards.count()

        const bookingFields = this.bookingFields

        for(let i=0;i<cardsCount;i++) {

            const card = bookingCards.nth(i)
            await card.getByRole("button", {name: "View Details"}).click()

            // My Bookings list shows most recently created booking first (LIFO),
            // while bookedCustomers was recorded in booking order — read from the end.
            const expectedCustomer = bookedCustomers[cardsCount - 1 - i]
            await expect(bookingFields.locator('.text-gray-900').nth(5)).toContainText(expectedCustomer.name)
            await expect(bookingFields.locator('.text-gray-900').nth(6)).toContainText(expectedCustomer.email, { ignoreCase: true })
            await expect(bookingFields.locator('.text-gray-900').nth(7)).toContainText(expectedCustomer.mobile)

            await this.backToMyBookings.click()

        }
    }

    async verifyDeleteBookings(abbrText: string, messageText: string) {

        const bookingCards = this.bookingCard
        await bookingCards.first().waitFor()
        const cardsCount = await bookingCards.count()

        for(let i=0;i<cardsCount;i++) {

            const card = bookingCards.first()
            await card.getByRole("button", {name: "Cancel Booking"}).click()
            const deleteModal = this.deleteModalHeader
            await expect(deleteModal.locator('.px-6 p')).toContainText(abbrText)
            await deleteModal.getByRole("button", {name: "Yes, cancel it"}).click()
            await expect(this.messageModal.last()).toHaveText(messageText)
        }
    } 


}