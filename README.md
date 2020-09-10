## Description
This is a web application "Github Stargazer" where you can compare different Github repositories by stars.
The application consists of a form with text input and button, and a table with 2 columns - repository name and stars count.
A user enters a repository name (like rubygarage/truemail) and the app fetches stars count for this repository and adds a new row to the table. If repository not found app shows an error message.
Table sorts rows by stars count from high to low values.
Users can remove any row from the table.
By click on the table row app opens a new page with repository details (repo name, link to clone, stats and language blocks).

Used stack: React, Redux, redux-logic, jest, enzyme
