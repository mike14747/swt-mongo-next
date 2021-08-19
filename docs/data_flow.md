Here's a list of what data needs to come from either Layout.js or \_app.js... and which components/pages it needs to go to.

Hopefully I can come up with a way to get data passed down without using context.

These all come from the settings collection via getSettings() in /lib/settings.js:

-   contactEmail
    -   Footer.js (it might also be needed in the TextBox component in the future)
-   currentSeasonId
    -   Navbar
-   displaySchedule
    -   Navbar

