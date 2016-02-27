from flask import Flask
import requests
import re
from html.parser import HTMLParser
import bs4
app = Flask(__name__)


@app.route('/')
def index():
	return "Hello World"

# e.g. http://127.0.0.1:5000/myvouchercodes/boots
@app.route('/myvouchercodes/<string:company>')
def my_voucher_codes(company):
    response = requests.get('http://www.myvouchercodes.co.uk/s?q=' + company)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    
    codes = []
    for p in soup.findAll('div'):
	    code = p.find('div', {'class':'Offer-code'})
	    if code:
	        if code.text not in codes: 
		        codes.append(code.text)

    print (codes)
    return ' '.join(codes)

# e.g. http://127.0.0.1:5000/hotukdeals/boots
@app.route('/hotukdeals/<string:company>')
def hotukdeals(company):
    response = requests.get('http://www.hotukdeals.com/vouchers/' + company)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    codes = []
    for p in soup.findAll('div'):
	    code = p.find('input', {'class':'voucherReveal-peel-bottom-code'})
	    if code:
	        if code.attrs["value"] not in codes: 
		        codes.append(code.attrs["value"])

    print (codes)
    return ' '.join(codes)



if __name__ == '__main__':
    app.run()

