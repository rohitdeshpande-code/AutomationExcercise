
import {expect, type Page, type Locator} from '@playwright/test'

export class EventsPage {

    page: Page
    eventsButton: Locator
    eventPageHeader: Locator
    cardTitles: Locator
    eventName: Locator
    noEventFoundTxt: Locator
    selectCategory: Locator
    selectCity: Locator
    eventsDateAndAddress: Locator
    searchEventBox: Locator
    noEventsFound: Locator
    clearFiilterButton: Locator


    constructor(page: Page) {

        this.page = page
        this.eventsButton = page.locator("#nav-events")
        this.eventPageHeader = page.locator('.mb-8 h1')
        this.cardTitles = page.locator("#event-card")
        this.eventName = this.cardTitles.locator('h3')
        this.noEventFoundTxt = page.locator(".py-20 h3")
        this.selectCategory = page.locator('select').nth(0)
        this.selectCity = page.locator('select').nth(1)
        this.eventsDateAndAddress = this.cardTitles.locator('span.line-clamp-1')
        this.searchEventBox = page.getByPlaceholder("Search events, venues…")
        this.noEventsFound = page.getByText("No events found")
        this.clearFiilterButton = page.getByRole("button", {name: "Clear filters"})
    }

    async verifyEventsPage() {

        this.eventsButton.click()
        await expect(this.eventPageHeader).toHaveText('Upcoming Events')

    }

    async verifySearchEventAndMatch(eventName: string) {

        await this.searchEventBox.fill(eventName)
        await expect(this.cardTitles).toHaveCount(1)
        const cardTitle = await this.eventName.textContent()
        const searchedCardTitle = await this.searchEventBox.inputValue()
        expect(cardTitle).toContain(searchedCardTitle)
    }

    async verifyNotExistingEventWithError(notExisitingEventName: string, error: string) {

        await this.searchEventBox.fill(notExisitingEventName)
        await expect(this.noEventFoundTxt).toHaveText(error)

    }

    async verifySearchWithPartialEventName(partialEventName: string, eventName1: string, eventName2: string, eventName3: string) {

        await this.searchEventBox.fill(partialEventName)

        const cardTitles = this.cardTitles
        await expect(cardTitles).toHaveCount(3)
        
        const eventsName = [
            eventName1,
            eventName2,
            eventName3
        ]

        for(let i=0;i<await cardTitles.count(); i++) {
            await expect(this.eventName.nth(i)).toContainText(eventsName[i])
        }
    }


    async verifyWithFilterEvents(category1: string, category2: string, category3: string, category4: string, category5: string, 
        eventName3: string, eventName2: string, eventName1: string
    ) {

        const categoriesData = [
            category1,
            category2,
            category3,
            category4,
            category5
        ]

        for(const category of categoriesData) {

            await this.selectCategory.selectOption(category)
            const count = await this.cardTitles.count()

            if(count>0) {

                const titles = await this.eventName.allTextContents()

                if(category === "Conference") {
                    expect(titles).toContain(eventName3)
                } else if(category === "Concert") {
                    expect(titles).toContain(eventName2)
                } else if(category === "Festival") {
                    expect(titles).toContain(eventName1)
                } else {
                    await expect(this.noEventsFound).toBeVisible()
                }
            }
        }
    }

    async verifyWithFilterCities(city1: string, city2: string, city3: string, city4: string, city5: string, city6: string,
        eventName1: string, eventName3: string
    ) {


        const cities = [
            city1, 
            city2,
            city3,
            city4,
            city5, 
            city6
        ]

        for(const city of cities) {

            await this.selectCity.selectOption(city)
            const count = await this.cardTitles.count()

            if(count > 0) {
                const titles = await this.eventName.allTextContents()

                if(city === 'Delhi') {
                    expect(titles).toContain(eventName1)

                }
                if(city === 'Hyderabad') {
                    expect(titles).toContain(eventName3)
                } else {
                    await expect(this.page.getByText(/no events found/i)).toBeVisible();
                }
            }
        }
    }

    async verifyApplyAndClearFiltersForCategoryAndCity(category: string, city: string, eventName3: string,
        eventDate3: string, eventAddress3: string
    ) {

        await this.selectCategory.selectOption(category)
        await this.selectCity.selectOption(city)

        await expect(this.cardTitles.first()).toBeVisible()
        expect(await this.cardTitles.count()).toBeGreaterThanOrEqual(1)
        await expect(this.eventName).toHaveText(eventName3)
        await expect(this.eventsDateAndAddress.nth(0)).toHaveText(eventDate3)
        await expect(this.eventsDateAndAddress.nth(1)).toHaveText(eventAddress3)

        await this.clearFiilterButton.click()

        await expect(this.cardTitles.first()).toBeVisible()
        expect(await this.cardTitles.count()).toBeGreaterThan(1)
    }

}