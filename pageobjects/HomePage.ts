
import {expect, type Page, type Locator} from '@playwright/test'

export class HomePage {

    page: Page
    cardTitles: Locator
    eventsName: Locator
    eventsDateAndAddress: Locator
    eventsAmount: Locator

    constructor(page: Page) {
        this.page = page
        this.cardTitles = page.locator("#event-card")
        this.eventsName = this.cardTitles.locator('h3')
        this.eventsDateAndAddress = this.cardTitles.locator('span.line-clamp-1')
        this.eventsAmount = this.cardTitles.locator('p')

    }

    async verifyEventCardTitles() {
        for(let i=0;i< await this.cardTitles.count(); i++) {
            await expect(this.cardTitles.nth(i)).toBeVisible()
        }
    }

    async verifyEventNameAndDateAndAddress(eventName1: string, eventName2: string, eventName3: string, eventDate1: string, eventDate2: string, eventDate3: string,
        eventAddress1: string, eventAddress2: string, eventAddress3: string
    ) {

        const eventsName = [
            eventName1,
            eventName2,
            eventName3
        ]

        const eventsDate = [
            eventDate1,
            eventDate2,
            eventDate3
        ]

        const eventsAddress = [
            eventAddress1,
            eventAddress2,
            eventAddress3
        ]

        for(let i=0; i<await this.cardTitles.count(); i++) {
            await expect(this.eventsName.nth(i)).toContainText(eventsName[i])
            await expect(this.eventsDateAndAddress.nth(0)).toContainText(eventsDate[i])
            await expect(this.eventsDateAndAddress.nth(1)).toContainText(eventsAddress[i])
        }
    }

    async verifyEventValueAndBookNowButton(eventAmount1: string, eventAmount2: string, eventAmount3: string) {

        const eventsAmount = [
            eventAmount1,
            eventAmount2,
            eventAmount3
        ]

        for(let i=0;i<await this.cardTitles.count(); i++) {

            await expect(this.eventsAmount.nth(i)).toContainText(eventsAmount[i])
            await expect(this.cardTitles.getByRole("button", {name: 'Book Now'}).nth(i)).toBeEnabled()
        }

    }
}