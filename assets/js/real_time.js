(function(){
    var time = new Date();
    let curtime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    setTimeout(() => {
        $(".time_div").html(curtime);
    }, 500);
})();
