import { AppointmentPage } from "../pageObjects/apointment.page";
import { SummaryForAppointments } from "../pageObjects/summary.page";
import { HistoryPage } from "../pageObjects/history.page";
import { LoginPage } from "../pageObjects/login.page";
import { MainPage } from "../pageObjects/main.page";

describe('Katalon', () => {

  it('Make Appointment', () => {
    MainPage.visitMainPage;
    MainPage.pressMakeAppointment.click();

    cy.get("[aria-describedby='demo_username_label']").invoke('val').then(username => {
      LoginPage.enterUsername.type(username);
    });
    cy.get("[aria-describedby='demo_password_label']").invoke('val').then(password => {
      LoginPage.enterPassword.type(password);
    });

    LoginPage.pressLoginButton.click();
    AppointmentPage.clickFacility.select("Seoul CURA Healthcare Center");
    AppointmentPage.clickCheckbox.click();
    AppointmentPage.clickRadioButton.click();
    AppointmentPage.enterVisitDate.click();
    AppointmentPage.clickDate30.click();
    AppointmentPage.writeComment.type("CURA Healthcare Service");
    AppointmentPage.bookAppointmentBtn.click();

    SummaryForAppointments.checkFacility.should("have.text", "Seoul CURA Healthcare Center");
    SummaryForAppointments.checkReadMission.should("have.text", "Yes");
    SummaryForAppointments.checkProgram.should("have.text", "Medicaid");
    SummaryForAppointments.checkDate.should("have.text", "30/04/2024");
    SummaryForAppointments.checkComment.should("have.text", "CURA Healthcare Service");

  });

  it('Appointment history empty', () => {
    MainPage.visitMainPage;
    MainPage.pressMakeAppointment.click();

    cy.get("[aria-describedby='demo_username_label']").invoke('val').then(username => {
      LoginPage.enterUsername.type(username);
    });
    cy.get("[aria-describedby='demo_password_label']").invoke('val').then(password => {
      LoginPage.enterPassword.type(password);
    });

    LoginPage.pressLoginButton.click();
    LoginPage.clickMenuButton.click();
    LoginPage.checkIfSidebarActive.should("have.class", "active");
    LoginPage.goToHistory.click();
    HistoryPage.checkIfNoAppoinment.should("have.text", "No appointment.");
  });

});

