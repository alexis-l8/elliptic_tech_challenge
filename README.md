# Elliptic Challenge ✨

<img width="300" src="https://media.giphy.com/media/JUh0yTz4h931K/200w_d.gif" alt="Investigation">

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Tests](#tests)
- [Start Application](#start-application)
- [Bonus Points](#bonus-points)

<p>&nbsp;</p><!-- Spacing -->

## Overview

This project is my solution to the Elliptic Tech Challenge.

The challenge is to collect "interesting" transactions from the Bitcoin blockchain using an online Block Explorer API. More specifically, transactions with a base58 input address containing a capital "E" are considered interesting.

<p>&nbsp;</p><!-- Spacing -->

## Installation

```bash
> npm install
```

<p>&nbsp;</p><!-- Spacing -->

## Tests

Run Unit tests using [jest](https://facebook.github.io/jest/)

```bash
> npm test
```

<p>&nbsp;</p><!-- Spacing -->

## Start Application

```bash
> npm start
```

<p>&nbsp;</p><!-- Spacing -->

## Bonus Points

### Modular:

- The solution has been created in a modular way such that sections can be easily removed and replaced as well as extended with minimal effect on the rest of the application.
- The route can easily receive parameters for both alternative cryptocurrencies, as well as different matching criteria for interesting transactions

### Rate Limit:

- The API has a rate limit of 30 calls per minute so that application will stop calls for a minute before trying again when this limit has been reached. In order to get all the transactions for a single block, it usually takes ~5-7 minutes (depending on the number of block transactions).

### Further Considerations:

- Error-handling, logging, testing and scaling.

## Time Taken: 1 day
