(function(){
    setInterval(() => {
        var time = new Date();
         let curtime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        $(".time_div").html(curtime);

    }, 1000);
})();
