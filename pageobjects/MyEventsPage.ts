
import { type Page, type Locator, expect } from '@playwright/test'

export class MyEventsPage {

    page: Page
    adminTab: Locator
    header: Locator
    tableRows: Locator
    deleteModalTitle: Locator
    deleteEventButton: Locator
    messageModal: Locator
    title: Locator
    description: Locator
    category: Locator
    city: Locator
    venue: Locator
    eventDateAndTime: Locator
    price: Locator
    seats: Locator
    addEventButton: Locator
    errors: Locator
    updateEventButton: Locator

    constructor(page: Page) {
        this.page = page
        this.adminTab = page.getByRole("button", { name: "Admin" })
        this.header = page.locator('section .text-lg')
        this.tableRows = page.locator('tbody tr')
        this.deleteModalTitle = page.locator('#modal-title')
        this.deleteEventButton = page.getByRole("button", { name: "Delete event" })
        this.messageModal = page.locator('p.leading-snug')
        this.title = page.getByLabel("Title")
        this.description = page.locator(".placeholder-gray-400")
        this.category = page.locator('#category')
        this.city = page.locator('#city')
        this.venue = page.locator('#venue')
        this.eventDateAndTime = page.getByLabel('Event Date & Time')
        this.price = page.getByLabel('Price ($)')
        this.seats = page.getByLabel('Total Seats')
        this.addEventButton = page.getByRole("button", { name: "+ Add Event" })
        this.errors = page.locator('.text-red-600')
        this.updateEventButton = page.getByRole("button", { name: "💾 Update Event" })

    }

    async reachToManageEventsPage() {

        await this.adminTab.click()
        await this.page.locator('.relative').getByRole("link", { name: "Manage Events" }).click()
        await this.header.first().waitFor()
        await expect(this.header.first()).toHaveText('+ New Event')
    }

    async fillEventFields(
        title: string,
        description: string,
        category: string,
        city: string,
        venue: string,
        dateAndTime: string,
        price: any,
        seats: any,
        action: 'add' | 'update' = 'add'
    ) {
        await this.title.fill(title)
        await this.description.fill(description)
        await this.category.selectOption(category)
        await this.city.fill(city)
        await this.venue.fill(venue)
        await this.eventDateAndTime.fill(dateAndTime)
        await this.price.fill(price)
        await this.seats.fill(seats)

        if (action === 'update') {
            await this.updateEventButton.click()
        } else {
            await this.addEventButton.click()
        }
    }

    async verifyModalMessages(eventMessages: string | string[]) {
        if (Array.isArray(eventMessages)) {
            for (let i = 0; i < eventMessages.length; i++) {
                await expect(this.messageModal.nth(i))
                    .toHaveText(eventMessages[i])
            }
        } else {
            await expect(this.messageModal).toHaveText(eventMessages)
        }
    }

    async deleteNewlyCreatedEvent(title: string, city: string) {

        const count = await this.tableRows.count()

        for (let i = 0; i < count; i++) {
            const row = this.tableRows.nth(i)
            await expect(row).toBeVisible()
            const newEvent = await row.locator('.text-gray-900').textContent()
            if (newEvent === title) {
                await expect(row.locator('td').filter({ hasText: city })).toBeVisible()
                await row.locator('td').filter({ hasText: 'Delete' }).click()
                break
            }
        }
        await expect(this.deleteModalTitle).toHaveText('Delete this event?')
        await this.deleteEventButton.click()
    }

    async verifyErrorsOnEventsPage(errorMessage: string) {
        await expect(this.errors).toHaveText(errorMessage)
    }

    async editNewlyCreatedEvent(title: string) {

        const count = await this.tableRows.count()

        for (let i = 0; i < count; i++) {
            const row = this.tableRows.nth(i)
            const newEvent = await row.locator('.text-gray-900').textContent()
            if (newEvent === title) {
                await row.locator('td').getByRole("button", { name: "Edit" }).click()
                break
            }
        }
    }

    async verifyErrorsForBlankSubmission(errors: string[]) {
        await this.addEventButton.click()

        const errorFields = this.errors

        await expect(errorFields).toHaveCount(errors.length)

        for (let i = 0; i < errors.length; i++) {
            await expect(errorFields.nth(i)).toHaveText(errors[i])
        }
    }





}