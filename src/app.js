$(document).ready(() => {

    const config = {
        $form: $('#form'),
        $checkbox: $('#storeTheCard'),
        $colEmail: $('.col-email'),
        $button: $('#submitBtn')
    };
    const inputs = {
        $cardNr: $('#cardNumber'),
        $expDate: $('#expirationDate'),
        $cvvNumber: $('#cvvNumber'),
        $email: $('#userEmail'),
    };

    // console.group('objects in config');
    // for (let el in config) console.log(el);
    // console.groupEnd();
    // console.group('objects in inputs');
    // for (let el in inputs) console.log(el);
    // console.groupEnd();

    /* handle email checkbox */
    config.$checkbox.click(()=>{
        let isChecked = config.$checkbox.is(':checked');
        if (isChecked) {
            inputs.$email.parent().removeClass('has-error');
            inputs.$email.val('');
            config.$colEmail.show();
        }
        else {
            config.$colEmail.hide();
        }
    });

    /* handle card Number */
    //$('.field').val().replace(/\s+/g, '').length
    // ^-- len without space
    let lastCard;
    inputs.$cardNr.on('input', (e) => {
        let el = inputs.$cardNr,
            val = el.val(),
            len = el.val().length;
        const MAX_LEN = 19;
        if ( len > MAX_LEN ) {
            el.val(lastCard);
            alert('Maximum card number length is 19 digits');
        } else {
            lastCard = val;
        }
    });

    /* handle CVV input */
    let lastCVV;
    inputs.$cvvNumber.on('input', (e) => {
        let el = inputs.$cvvNumber,
            val = el.val(),
            len = el.val().length;
        const MAX_LEN = 3;
        if ( len > MAX_LEN ) {
            el.val(lastCVV);
            alert('Maximum CVV length is 3 digits');
        } else {
            lastCVV = val;
        }
    });

    /* handle validation */
    config.$button.on('click', () => {
        console.log('submit click');
        let valid = validation();
        if (valid) {
            console.log('PRAWIDLOWO');
        }
    });

    let validation = () => {
        console.group('validation');
        let test1 = validationCardNumber(inputs.$cardNr);
        let test2 = validationExpDate(inputs.$expDate);
        let test3 = validationCVV(inputs.$cvvNumber);
        let valid = !!test1 && !!test2 && !!test3;
        if (config.$checkbox.is(':checked')) {
            let test4 = validationEmail(inputs.$email);
            valid = valid && !!test4;
            console.log('ALL valid in email', valid);
        }
        console.groupEnd();

        return valid;
    };

    let validationCardNumber = ($el) => {
        let len = $el.val().length,
            valid = false;
        if ((len >= 12) && (len <= 19) && luhnTest($el.val())) {
            $el.parent()
                .addClass('has-success')
                .removeClass('has-error');
            valid = true;
        }
        else {
            $el.parent()
                .removeClass('has-success')
                .addClass('has-error');
        }
        console.log('Card Number:', $el.val(), 'is valid:', valid);
        return valid;
    };

    let validationExpDate = ($el) => {
        let date = new Date($el.val()),
            today = new Date(),
            valid = false;
        if (date > today) {
            $el.parent()
                .addClass('has-success')
                .removeClass('has-error');
            valid = true;
        } else {
            $el.parent()
                .removeClass('has-success')
                .addClass('has-error');
        }
        console.log('Date:', $el.val(), 'is valid:', valid);
        return valid;
    };

    let validationCVV = ($el) => {
        let len = $el.val().length,
            valid = false;

        if ((len === 3) && ($el.val() > 0)) {
            $el.parent()
                .addClass('has-success')
                .removeClass('has-error');
            valid = true;
        }
        else {
            $el.parent()
                .removeClass('has-success')
                .addClass('has-error');
        }
        console.log("CVV:", $el.val(), 'is valid:', valid);
        return valid;
    };

    let validationEmail = ($el) => {
        let val = $el.val(),
            valid = false,
            check = /.+@.+\..+/i;

        if (check.test(val)) {
            $el.parent()
                .addClass('has-success')
                .removeClass('has-error');
            valid = true;
        } else {
            $el.parent()
                .removeClass('has-success')
                .addClass('has-error');
        }

        console.log("Email:", $el.val(), 'is valid:', valid);
        return valid;
    };

    // from: https://gist.github.com/DiegoSalazar/4075533
    let luhnTest = (value) => {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value)) return false;

        // The Luhn Algorithm. It's so pretty.
        var nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) === 0;
    };

    let testLuhn = () => {
        //array from:
        // https://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm
        const testArr = [
            '378282246310005',
            '371449635398431',
            '378734493671000',
            '5610591081018250',
            '30569309025904',
            '38520000023237',
            '6011111111111117',
            '6011000990139424',
            '3530111333300000',
            '3566002020360505',
            '5555555555554444',
            '5105105105105100',
            '4111111111111111',
            '4012888888881881',
            '4222222222222',
            '76009244561',
            '5019717010103742',
            '6331101999990016'
        ];
        testArr.forEach((val, idx) => {
            console.log(idx, ':', val, luhnTest(val));
        });
    };
    // testLuhn();

});