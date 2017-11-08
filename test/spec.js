(function () {
    function openApplicationInBrowser() {
        browser.get("http://localhost:8080/creditCard.html");
    }

    describe('Saving Credit Card Number', function () {
        beforeEach(function () {
            openApplicationInBrowser();
        });
        it('should have correct title', function () {
            expect(browser.getTitle()).toEqual('Credit Card');
        });
        it('checks if the input field is by default disabled', function () {
            expect(element(by.model('data.cardNumber')).isEnabled()).toBe(false);
            expect(element(by.id('save')).isEnabled()).toBe(false);
        });
        it('enables the input field', function () {
            element(by.model('data.checkCard')).click();
            expect(element(by.model('data.cardNumber')).isEnabled()).toBe(true);
        });
        it('gives an error message on writing invalid credit card number', function () {
            element(by.model('data.checkCard')).click();
            element(by.model('data.cardNumber')).sendKeys("abcdefghijkikiki");
            element(by.id('save')).click();
            expect(element(by.binding('errorMessage')).getText()).toEqual("Credit card number can have only Numbers(0-9)");
        });
        it('gives a success message on writing a valid credit card number', function () {
            var cardNumber = "1234567899009876";
            element(by.model('data.checkCard')).click();
            element(by.model('data.cardNumber')).sendKeys(cardNumber);
            element(by.id('save')).click();
            expect(element(by.binding('successMessage')).getText()).toEqual("Your credit card number " + cardNumber + " has been saved with us.");
        });
        it('gives an error message when credit card number entered is less than 16 digits', function () {
            element(by.model('data.checkCard')).click();
            element(by.model('data.cardNumber')).sendKeys("1234567890");
            element(by.id('save')).click();
            expect(element(by.binding('errorMessage')).getText()).toEqual("Please enter a valid credit card number");
        });
    });
})();