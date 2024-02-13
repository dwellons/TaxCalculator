/**
 * This class will perform all of tha calculations to determine the tax amounts owed, based on the
 * input salary. The results will then be returned and displayed as a table to the HTML page.
 * @author Darin Wellons
 * @version 1.0
 * @since 1.0
 */

/**
 * Gets the salary input by the user.
 * @param inlineEvent
 */
const fetchSalary = inlineEvent => {

    // Regex for verifying a dollar amount was entered.
    const regexDollarAmount = /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/;

    // Gets the input salary from the form.
    let inputSalary = document.getElementById("grossSalary").value;

    // Compare the input grossSalary to the Regex pattern.
    if (!regexDollarAmount.test(inputSalary)) {
        alert("Please enter a valid dollar amount. Example: $10,000.00")
        return;
    }

    // Ensure there are no punctuation marks before converting to a number, or will get NaN error.
    let cleanedInput = inputSalary.replace(/[^0-9.-]/g, '');

    // Have to convert it from a string into a number.
    let inputSalaryNumber = parseFloat(cleanedInput);

    // Sends input salary to calculate taxes method.
    calculateTaxes(inputSalaryNumber);
}

/**
 * This method will calculate the taxes.
 * @param inputSalaryNumber
 * @returns {number}
 */
const calculateTaxes = inputSalaryNumber => {

    // Federal Taxes.
    let federalTaxes = 0;
    const fedLimit1 = 9875.00;
    const fedLimit2 = 40125.00;
    const fedLimit3 = 85525.00;
    const fedLimit4 = 163300.00;
    const fedLimit5 = 207350.00;
    const fedLimit6 = 518400.00;

    if (inputSalaryNumber <= fedLimit1) {
        federalTaxes = inputSalaryNumber * 0.10;
    } else if (inputSalaryNumber <= fedLimit2) {
        federalTaxes = fedLimit1 * 0.10 + (inputSalaryNumber - fedLimit1) * 0.12;
    } else if (inputSalaryNumber <= fedLimit3) {
        federalTaxes = fedLimit1 * 0.10 + (fedLimit2 - fedLimit1) * 0.12 +
                (inputSalaryNumber - fedLimit2) * 0.22;
    } else if (inputSalaryNumber <= fedLimit4) {
        federalTaxes = fedLimit1 * 0.10 + (fedLimit2 - fedLimit1) * 0.12 +
                (fedLimit3 - fedLimit2) * 0.22 + (inputSalaryNumber - fedLimit3) * 0.24;
    } else if (inputSalaryNumber <= fedLimit5) {
        federalTaxes = fedLimit1 * 0.10 + (fedLimit2 - fedLimit1) * 0.12 +
            (fedLimit3 - fedLimit2) * 0.22 + (fedLimit4 - fedLimit3) * 0.24 + (inputSalaryNumber - fedLimit4) * 0.32;
    } else if (inputSalaryNumber <= fedLimit6) {
        federalTaxes = fedLimit1 * 0.10 + (fedLimit2 - fedLimit1) * 0.12 +
            (fedLimit3 - fedLimit2) * 0.22 + (fedLimit4 - fedLimit3) * 0.24 + (fedLimit5 - fedLimit4) * 0.32 +
            (inputSalaryNumber - fedLimit5) * 0.35;
    } else {
        federalTaxes = fedLimit1 * 0.10 + (fedLimit2 - fedLimit1) * 0.12 +
            (fedLimit3 - fedLimit2) * 0.22 + (fedLimit4 - fedLimit3) * 0.24 + (fedLimit5 - fedLimit4) * 0.32 +
            (fedLimit6 - fedLimit5) * 0.35 + (inputSalaryNumber - fedLimit6) * 0.37;
    }

    // State Taxes.
    let stateTaxes = 0;
    const stateLimit1 = 11970.00;
    const stateLimit2 = 23930.00;
    const stateLimit3 = 263480.00;

    if (inputSalaryNumber <= stateLimit1) {
        stateTaxes = inputSalaryNumber * 0.0354;
    } else if (inputSalaryNumber > stateLimit1 && inputSalaryNumber <= stateLimit2) {
        stateTaxes = (inputSalaryNumber - stateLimit1) * 0.0465 + 423.74;
    } else if (inputSalaryNumber > stateLimit2 && inputSalaryNumber <= stateLimit3) {
        stateTaxes = (inputSalaryNumber - stateLimit2) * 0.0627 + 979.88 ;
    } else {
        stateTaxes = (inputSalaryNumber - stateLimit3) * 0.0765 + 15999.67 ;
    }

    // Medicare.
    let medicareTaxes = 0.00;
    const medicareLimit = 200000.00;

    if (inputSalaryNumber <= medicareLimit) {
        medicareTaxes = inputSalaryNumber * 0.0145;
    } else {
        medicareTaxes = (inputSalaryNumber - medicareLimit) * 0.0235 + (medicareLimit * 0.0145);
    }

    // Social Security.
    let socialSecurityTaxes = 0;
    const socialSecurityLimit = 137000.00;

    if (inputSalaryNumber <= socialSecurityLimit) {
        socialSecurityTaxes = inputSalaryNumber * 0.062;
    } else {
        socialSecurityTaxes = (socialSecurityLimit * 0.062);
    }

    // Totals.
    let totalTaxes = federalTaxes + stateTaxes + medicareTaxes + socialSecurityTaxes;
    let netPay = inputSalaryNumber - totalTaxes;
    let inputGrossPay = formatTotal(inputSalaryNumber);

    // Call the formatTotal method on the totals.
    federalTaxes = formatTotal(federalTaxes);
    stateTaxes = formatTotal(stateTaxes);
    medicareTaxes = formatTotal(medicareTaxes);
    socialSecurityTaxes = formatTotal(socialSecurityTaxes);
    totalTaxes = formatTotal(totalTaxes);
    netPay = formatTotal(netPay);

    // Pass the calculations to outputResults.
    outputResults(inputGrossPay, federalTaxes, stateTaxes, medicareTaxes, socialSecurityTaxes, totalTaxes, netPay);
}

/**
 * This method will output the results to a table on the webpage.
 * @param inputGrossPay The Gross Salary
 * @param federalTaxes The Calculated Federal Taxes
 * @param stateTaxes The Calculated State Taxes
 * @param medicareTaxes The Calculated Medicare Taxes
 * @param socialSecurityTaxes The Calculated Social Security Taxes
 * @param totalTaxes The total of all the calculated taxes
 * @param netPay The net pay after tax deductions
 */
const outputResults = (inputGrossPay, federalTaxes, stateTaxes, medicareTaxes, socialSecurityTaxes, totalTaxes, netPay) => {

    // Displays the results in the DIV labeled results.
    document.getElementById("results").innerHTML =
        "<table id='resultsTable'>" +

        "<tr><th>Gross Pay</th>" +
        "<td>$" + inputGrossPay + "</td></tr>" +

        "<tr><th>Federal Taxes</th>" +
        "<td>$" + federalTaxes + "</td></tr>" +

        "<tr><th>State Taxes</th>" +
        "<td>$" + stateTaxes + "</td></tr>" +

        "<tr><th>Medicare</th>" +
        "<td>$" + medicareTaxes + "</td></tr>" +

        "<tr><th>Social Security</th>" +
        "<td>$" + socialSecurityTaxes + "</td></tr>" +

        "<tr><th>Total Taxes</th>" +
        "<td>$" + totalTaxes + "</td></tr>" +

        "<tr><th>Net Pay</th>" +
        "<td>$" + netPay + "</td></tr>" +

        "</table>";
}

/**
 * Format the totals to two decimal places and add decimals for whole numbers.
 * @param amount The amount to format.
 * @returns {string} The formatted amount.
 */
const formatTotal = amount => {
    // Limit to two decimal places at the end.
    amount = parseFloat(amount.toFixed(2));

    // Check if the amount is a whole number.
    if (Number.isInteger(amount)) {
        // add two decimal places to the end.
        return amount.toFixed(2);
    }

    return amount.toString();
}