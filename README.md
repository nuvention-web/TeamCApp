# Collective

**How to run locally:**
- Download and install MAMP from https://www.mamp.info/
- Clone repo and move all files into Applications > MAMP > htdocs
- Go to MAMP > Preferences > Ports, and set Apache port to 80 and MySQL port to 3306
- Click on "Start Servers" in the MAMP homepage
- Note: make sure MAMP is running properly by going to localhost:80 (you should see all the files from htdocs there)
- Open Google Chrome and go to chrome://extensions
- Make sure "Developer Mode" is checked
- Click "Load unpacked extension"
- Select the htdocs folder (where all the files from the repo should be)
- The extension is now available in your Google extensions (and should appear on the right side of the browser)


**Required for the credit card transaction to process properly**
- Add the following to your .bash file PATH=/Applications/MAMP/bin/php/php7.1.1/bin:$PATH
- Install Composer locally in your htdocs directory using curl -s https://getcomposer.org/installer | php
- run php composer.phar install to install the dependencies.

**How to use:**
- Go on a retailer/food website and add something to your shopping cart (e.g. UberEATs, Postmates, Forever 21)
- Open the Chrome extension and you should see a donation amount
- Click Donate
- Click "Add a new credit card"
- This should direct you to a new webpage with a Stripe element
- Use the fake credit card number 4242 4242 4242 4242 (put random details for the other fields, they don't really matter)
- You should see a generated token for the purchase

If you have any trouble, please feel free to contact brittanyherr2018@u.northwestern.edu or kittyliu2018@u.northwestern.edu.
