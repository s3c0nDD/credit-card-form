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

    console.group('objects in config');
    for (let el in config) console.log(el);
    console.groupEnd();
    console.group('objects in inputs');
    for (let el in inputs) console.log(el);
    console.groupEnd();

    /* handle email checkbox */
    config.$checkbox.click(()=>{
        let isChecked = config.$checkbox.is(':checked');
        (isChecked) ?
            config.$colEmail.show() :
            config.$colEmail.hide();
    });

    /* handle valildation */
    config.$button.on('click', () => {
        console.log('submit click');
        validation();
    });

    let validation = () => {
        inputs.$cardNr.parent().addClass('has-error');
        inputs.$expDate.parent().addClass('has-error');
        inputs.$cvvNumber.parent().addClass('has-error');
        inputs.$email.parent().addClass('has-error');
    }


});