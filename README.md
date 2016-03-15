# Couper

Couper is a Google Chrome extension that automatically finds the most relevant online coupon codes, and applies the best one to your order before you checkout.

# Chrome Extension Installation

https://developer.chrome.com/extensions/getstarted#unpacked

# Server Configuration

```
pip install virtualenv
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
pip install beautifulsoup4
```

# Running the Server

```
python server.py
```

# Contribution
Please do not contribute directly to the master or develop branch. 
For fixing any issue or adding new features, create a branch from develop. After that, create a new pull request from within your branch and the base as the develop branch. This will allow for code review before merging. 
