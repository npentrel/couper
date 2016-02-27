from flask import Flask
import requests
import re
from html.parser import HTMLParser
import bs4
app = Flask(__name__)

@app.route('/')
def hello_world():
    response = requests.get('http://www.myvouchercodes.co.uk/boots')
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    
    codes = []
    for p in soup.findAll('div'):
	    code = p.find('div',{'class':'Offer-code'})
	    if code:
	        if code.text not in codes: 
		        codes.append(code.text)

    print (codes)
    return ' '.join(codes)

if __name__ == '__main__':
    app.run()

