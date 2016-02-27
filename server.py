from flask import Flask
import requests
import re
from html.parser import HTMLParser
import bs4
import json
import requests
from keys import NESSIE_CUSTOMER_ID, NESSIE_KEY 
app = Flask(__name__)


@app.route('/')
def index():
	return "Hello World"

# e.g. http://127.0.0.1:5000/myvouchercodes/boots
@app.route('/myvouchercodes/<string:company>')
def my_voucher_codes(company):
    response = requests.get('http://www.myvouchercodes.co.uk/s?q=' + company)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    
    codes = {}
    for p in soup.findAll('div'):
        code = p.find('div', {'class':'Offer-code'})
        title = p.find('h3', {'class':'Offer-title'})
        if code:
            if title:
                codes[code.text] = title.text
    
    # for c in codes:
    #     print (c, codes[c])

    return codes


# e.g. http://127.0.0.1:5000/hotukdeals/boots
@app.route('/hotukdeals/<string:company>')
def hotukdeals(company):
    response = requests.get('http://www.hotukdeals.com/vouchers/' + company)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    codes = {}
    for p in soup.findAll('div'):
        title = p.find('h2', {'class':'thread-title-text voucherbox-thread-title-text hd--inline'})
        code = p.find('input', {'class':'voucherReveal-peel-bottom-code'})
        if code:
            if title:
                if code.attrs["value"] not in codes:
                    codes[code.attrs["value"]] = title.text

    # for c in codes:
    #     print (c, codes[c])

    return codes


@app.route('/<string:company>')
def allvouchers(company):
    c1 = hotukdeals(company)
    c2 = my_voucher_codes(company)

    codeslikely = {}
    codesother = {}

    for c in c1:
        if c in c2:
            codeslikely[c] = c1[c]
        else:
            codesother[c] = c1[c]

    for c in c2:
        if c not in codeslikely:
            codesother[c] = c2[c]

    print ("likely codes: ", codeslikely)
    codesall = codeslikely
    for c in codesother:
        if c not in codeslikely:
            codesall[c] = codesother[c]
    print("")

    print ("all codes: ", codesall)
    print("")

    output = json.dumps(codesall, ensure_ascii=False)

    print (output)

    return output


@app.route('/nessie')
def nessie():    
    customerId = NESSIE_CUSTOMER_ID
    apiKey = NESSIE_KEY

    url = 'http://api.reimaginebanking.com/customers/{}/accounts?key={}'.format(customerId,apiKey)
    print (url)
    payload = {
      "type": "Savings",
      "nickname": "test",
      "rewards": 10000,
      "balance": 10000, 
    }
    # Create a Savings Account
    response = requests.post( 
        url, 
        data=json.dumps(payload),
        headers={'content-type':'application/json'},
        )

    if response.status_code == 201:
        print('account created')

    url2 = 'http://api.reimaginebanking.com/accounts/{}?key={}'.format(customerId,apiKey)
    print (url2)

    res = requests.get(url2)
    print (res.text)

    return "hi"

if __name__ == '__main__':
    app.run()