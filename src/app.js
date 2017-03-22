$(document).ready(() => {

    const config = {
        $form: $('#form'),
        $chkbox: $('#storeTheCard'),
        $colEmail: $('.col-email')
    };

    console.group('objects in config');
    for (let prop in config) console.log(prop)
    console.groupEnd();

    /* hide email field */
    config.$colEmail.hide();

    /* handle email checkbox */
    config.$chkbox.click(()=>{
        let isChecked = config.$chkbox.is(':checked');
        (isChecked) ?
            config.$colEmail.show() :
            config.$colEmail.hide();
    });

});