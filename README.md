# Robinhood Stats Helper

A few scripts to pull some additional data from your Robinhood portfolio.

Stats include: 
* Current holdings (Quantity, Equity)
* Profits (realized, unrealized, and total)

## React
TODO

## Python 

### Usage 

1. Input your own credentials into .env-sample file

2. Rename .env-sample to .env

3. Install scripts in requirements.txt:
`$ pip3 install -r requirements.txt`

4. To run:
`$ python3 rh_order_stats.py`

NOTE:
* Script will prompt for MFA code if you have 2-factor-auth activated.
* After running, pyrh will automatically create a file `~/.robinhood/login.json` with your credentials and an auth token. 
