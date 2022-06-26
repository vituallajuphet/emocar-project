
function alertConfirm(msg, confirmed ){
    alertify.confirm(msg,
    function(){
      confirmed()
    }).setHeader("<i class='fa fa-question-circle'></i> Confirmation")
}

function printSaveConfirm(msg, callback, headerContent="", customID={id1:'printSaveBtn', id2:'printOnlyBtn'} ){
    alertify.alert("",function(){
        callback()
    })
    .setHeader(!!headerContent ? headerContent : "<i class='fa fa-question-circle'></i> Confirmation")
    .setContent(`
        <div class='entryBtnDiv'>
        <button class='entryBtn' id="${customID.id1}"><i class="fa fa-save"></i> Save and Print</button>
        <button class='entryBtn' id="${customID.id2}"> <i class="fa fa-print"></i> Print Only</button>
        </div>
    `).show()
}

function successMessage(msg){
    alertify.success(msg); 
}

function errorMessage(msg){
    alertify.error(msg);
}

function swalMessage(msg, err){
    if(err == "error"){
        errorMessage(msg);
    }else{
        successMessage(msg)
    }
}

function capitalize(txt){
    return txt.charAt(0).toUpperCase() + txt.slice(1)
}

function mhide(elem){
    $(elem).modal("hide");
}
function mshow(elem){
    $(elem).modal();
}

function ehide(elem){
    $(elem).hide();
}
function eshow(elem){
    $(elem).show();
}
