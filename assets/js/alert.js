
function alertConfirm(msg,success, sa ){
    alertify.confirm(msg,
    function(){
        alertify.success(success);
    }).setHeader("Confirmation")
}

function successMessage(msg){
    alertify.success(msg); 
}

function errorMessage(msg){
    alertify.error('Error message');
}
