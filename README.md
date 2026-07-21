# Playwright Ecommerce Automation Framework

A scalable UI automation framework built using Playwright and JavaScript following the Page Object Model (POM) design pattern.

## Features

- Page Object Model (POM)
- BasePage abstraction
- Dynamic product selection
- Environment configuration (.env)
- Cross-browser testing
  - Chromium
  - Firefox
  - WebKit
- HTML Test Report
- Screenshots on failure
- Video recording on failure
- Trace collection
- GitHub Actions CI/CD

---

## Tech Stack

- Playwright
- JavaScript
- Node.js
- GitHub Actions

---

## Project Structure

```
.
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── test-data/
│
├── tests/
│
├── playwright.config.js
│
└── .github/
    └── workflows/
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/christianrqa/Ecommerce_Automation.git
```

Install dependencies

```bash
npm install
```

Install browsers

```bash
npx playwright install
```

---

## Run Tests

Run all browsers

```bash
npx playwright test
```

Run Chromium only

```bash
npx playwright test --project=chromium
```

Run headed

```bash
npx playwright test --headed
```

---

## HTML Report

Generate

```bash
npx playwright test
```

Open report

```bash
npx playwright show-report
```

---

## CI/CD

The framework automatically executes on every push to the **main** branch using GitHub Actions.

Artifacts uploaded:

- HTML Report
- Screenshots
- Videos
- Traces

---

## Author

Christian Rjhie Reyes

Associate QA Engineer
