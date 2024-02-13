## Tax Calculator - By Darin Wellons

### Project Images
![Start Page](resources/images/TaxCalculatorStart.png)
![Results Example](resources/images/TaxCalculatorResults.png)

### How the application works
The user will input a salary amount. Clicking "Calculate Taxes" will call the method to fetch the salary they input
(fetchSalary). 
* This method (fetchSalary) will verify that the user has entered a dollar amount. If there is a letter, an alert
    will pop up, that includes an example of a dollar amount. When it is verified, this method then removes any
    punctuation marks from the entry ($, ',', and '.'), and then converts the entry into a number (input comes in as a 
    string). It then passes that new number (inputSalaryNumber) to the method that calculates the taxes (calculateTaxes).
* This method (calculateTaxes) will perform the calculations to determine the different amount of taxes owed in each
    subject (Federal, State, Medicare, Social Security). After those calculations are made, the method that formats
    those totals is called (formatTotal). After the numbers are formatted, they are passed to the method that outputs
    them to the HTML page (outputResults).
* The method for formatting the totals receives the numbers, and limits them to two decimal places at the end. It 
    then checks to see if the number is a whole number, without any decimal places at the end. If it is, it adds two
    decimal places to the end of it. It then returns that amount as a string back to the method calculating the taxes.
* The method that will output the results to the HTML page will receive the values from the method calculating the 
    taxes. It will create a table and insert it using inner HTML into the DIV labeled "results" in the HTML page.
* The use can enter another salary amount, and clicking "Calculate Taxes" will refresh the values with new totals.

### How I calculated the taxes
There are different tax amounts based on the gross salary. Income limits are placed and tax percentages are calculated
based on those limits.
* For the first (lowest) limit, multiply the income by the tax percentage amount. For example, 10% = .10.
* For the following income limit, first I multiply the first (lowest) income limit by its tax amount. 
* I then find the amount over the first limit that we have, by subtracting the first income limit from the input salary. 
* Next I multiply that amount (amount over the first limit), by the second income limits tax percentage. 
* We get a total by adding these two numbers together.
* For concurring income limits, follow this procedure by first finding the totals for the limits they passed through, 
    finding the difference (or none if they are over the max limit), and adding the totals together.

### Resources Used
CC0 Public Domain Background image source:
https://pxhere.com/en/photo/1109940

Background Repeating:
https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat

RGBA - Transparent background
https://stackoverflow.com/questions/15958565/should-you-use-rgba0-0-0-0-or-rgba255-255-255-0-for-transparency-in-cs

Border Collapse:
https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse

Format to two decimal places reference:
https://www.tutorialspoint.com/How-to-format-a-number-with-two-decimals-in-JavaScript

Remove punctuation from User input:
https://www.w3schools.com/jsref/jsref_regexp_0-9.asp

