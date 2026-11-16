import {Page} from '@playwright/test'
import {LoginPage} from '../pageobjects/LoginPage'
import {HomePage} from '../pageobjects/HomePage'
import {EventsPage} from '../pageobjects/EventsPage'
import {BookingPage} from '../pageobjects/BookingPage'
import { MyEventsPage } from '../pageobjects/MyEventsPage'
import { MyBookingsPage } from './MyBookingsPage'

export class POManager {

    loginPage: LoginPage
    homePage: HomePage
    eventsPage: EventsPage
    bookingPage: BookingPage
    myEventsPage: MyEventsPage
    myBookingsPage: MyBookingsPage

    constructor(page:Page) {
        this.loginPage = new LoginPage(page)
        this.homePage = new HomePage(page)
        this.eventsPage = new EventsPage(page)
        this.bookingPage = new BookingPage(page)
        this.myEventsPage = new MyEventsPage(page)
        this.myBookingsPage = new MyBookingsPage(page)
    }

}