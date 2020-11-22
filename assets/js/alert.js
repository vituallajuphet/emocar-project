
function alertConfirm(msg, confirmed ){
    alertify.confirm(msg,
    function(){
        confirmed()
    }).setHeader("<i class='fa fa-question-circle'></i> Confirmation")
}

function successMessage(msg){
    alertify.success(msg); 
}

function errorMessage(msg){
    alertify.error('Error message');
}

function capitalize(txt){
    return txt.charAt(0).toUpperCase() + txt.slice(1)
}