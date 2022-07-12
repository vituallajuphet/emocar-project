
$(document).ready(function(){

    let selectedPrinting = ''
    let printCount = 0;

    function convertDate(the_date, get_type = ""){

        let ret_date;
        let ddte = new Date(the_date);
        const month = ddte.toLocaleString('default', { month: 'long' });

        let res = "";

        if(get_type == "month"){
            return month;
        }
        else if(get_type == "day"){
            res = ddte.getDate();
        }
        else if(get_type == "year"){
            res = (ddte.getFullYear()+"").slice(-2);
        }
        else{
            res = `${month} ${ddte.getDate()}, ${ddte.getFullYear()}`;
        }
        return res;
    }

    $("#search_bar").keyup(function(e){
        if(e.keyCode == 13){
            let search_val = $(this).val();
            search_process(search_val, true)
        }
    })

    $("input[name='official_receipt']").on("keyup change", function(){
        const or_value = $(this).val();
        const self = $(this);

        if(or_value !== "" && or_value !== undefined){
            axios.get(`${base_url}employee/api_check_transaction/${or_value}`).then(res => {
                
                if(res.data.status == "error"){
                    errorMessage(res.data.message)
                    setTimeout(() => { self.val("")}, 1000);
                }
            })
        }
    })

    function search_process (search_val, show_err = false, tab_value=""){
        if( (search_val != "" && search_val != undefined) &&
            tab_value != "" && tab_value != undefined){
            printCount =0;
            const url_value = `?search_val=${search_val}&tab_value=${tab_value}`;

            axios.get(`${base_url}employee/search_policy${url_value}`).then(res => {
                
                if(res.data.status == "success"){
                    let dta = res.data.data[0];
                    $(".hidden_trans_id").val(dta.trans_id)
                    $("input[name='mb_file_no']").val(dta.mb_file_no)
                    $("input[name='model_no']").val(dta.model_no)
                    $("input[name='date_issued']").val(dta.date_issued)

                    $("input[name='date_issued']").val(convertDate(dta.date_issued))
                    $("input[name='date_from']").val(convertDate(dta.date_from))

                    $("input[name='date_to']").val(convertDate(dta.date_to))

                    $("input[name='plate_no']").val(dta.plate_no)
                    $("input[name='make']").val(dta.make)
                    $("input[name='motor_no']").val(dta.motor_no)
                    $("input[name='type_of_body']").val(dta.type_of_body)
                    
                    $("input[name='serial_chassis']").val(dta.serial_chassis)
                    $("input[name='official_receipt']").val(dta.official_receipt)
                    $("input[name='policy_no']").val(dta.policy_no)
                    $("input[name='color']").val(dta.color)
                    $("input[name='coc_no']").val(dta.coc_no)

                    $("input[name='place']").val(dta.place)
                    $("input[name='others']").val(dta.others)
                    $("input[name='policy_day']").val(dta.policy_day)
                    $("input[name='pol_docs_stamp']").val(dta.pol_docs_stamp)
                    $("input[name='policy_month']").val(dta.policy_month)
                    $("input[name='lgt']").val(dta.lgt)
                    $("input[name='policy_year']").val(dta.policy_year)

                    $("input[name='received_from']").val(dta.received_from)
                    $("input[name='premium_sales']").val(dta.premium_sales)
                    $("input[name='misc']").val(dta.misc)
                    $("input[name='address']").val(ucFirst(dta.t_address))
                    $("input[name='docs_stamp']").val(dta.docs_stamp)
                    $("input[name='or_total']").val(dta.or_total)
                    $("input[name='or_date']").val(convertDate(dta.or_date))
                    $("input[name='lg_tax']").val(dta.lg_tax)
                    $("input[name='series_no']").val(dta.series_no)
                    $("textarea[name='the_sum_of_pesos']").val(dta.the_sum_of_pesos)
                    $(".counter-value").html(res.data.counts.length)
                    printCount = res.data.counts.length; 
                }
                else{
                    $(".hidden_trans_id").val(0)

                    if(show_err){
                        errorMessage("Search not found!")
                    }
                }   

            })
        }
    }

    function numberWithCommas(num) {
        let res = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        if((res.split(".")[1] == undefined)){
            res = res+".00"
        }

        return res;
    }

    
    $("#printOr").click(function(){
        selectedPrinting = "OR"
        printSaveConfirm("", function(){ printing = false }, "<i class='fa fa-question-circle'></i> Save or Print OR Confirmation")        
    })

    function printOR (useTransId=true, tr_id=0) {
        const trans_id = useTransId ? $(".hidden_trans_id").val() : tr_id;
        if(printCount !== 0 ){
            $("#modal_code").modal();
            return false;
        }

        if(trans_id != 0 && trans_id != undefined) {

            alertConfirm("It will add print count once printed, do you want to proceed?", function (){
                axios.get(`${base_url}employee/search_policy?search_val=${trans_id}&search_by_id=1&print=1`).then(res => {
                    $("#print_OR").show();
                    
    
                    if(res.data.status == "success"){
                        const dta = res.data.data[0];
    
                        const amt_of_cov = 100000;
    
                        $("#date_trans").html(convertDate(dta.date_issued));
                        $("#trans_rec_from").html(dta.received_from);
                        $("#trans_address").html(ucFirst(dta.t_address));
                        $("#trans_amount_text").html(dta.the_sum_of_pesos);
                        $("#trans_amount_of_cov").html(numberWithCommas(amt_of_cov));
                        $("#trans_policy").html(dta.policy_no);
                        $("#trans_date_from_month").html(convertDate(dta.date_from, "month"));
                        $("#trans_date_from_day").html(convertDate(dta.date_from, "day")  +", ");
                        $("#trans_date_from_year").html(convertDate(dta.date_from, "year"));
                        $("#trans_date_to_month").html(convertDate(dta.date_to, "month"));
                        $("#trans_date_to_day").html(convertDate(dta.date_to, "day") +", ");
                        $("#trans_date_to_year").html(convertDate(dta.date_to, "year"));
    
                        $("#trans_prem").html(numberWithCommas(dta.premium_sales));
                        $("#trans_doc_stamp").html(numberWithCommas(dta.docs_stamp));
                        $("#trans_tax").html(numberWithCommas(dta.lg_tax));
                        $("#trans_misc").html(numberWithCommas(dta.misc));
                        $("#trans_total").html(numberWithCommas(dta.or_total));
                        $("#pcocplate").html(dta.plate_no);
                        
                        let html_elm = `<div style="font-size:18px;margin-top:35px">&check;</div>`;
    
                        if(dta.paid_type == "Check"){
                            html_elm = `<div style="margin-left:90px;font-size:12px;margin-top:40px">${dta.check_no}</div>`;
                        }
                
                        $("#trans_paid_type").html(html_elm)
                        
                        setTimeout(() => {
                            $("#print_OR").printElement();
                            $("#print_OR").hide();
                            alertify.alert().close()
                        }, 1000);
                    }
                    
                })
            })
        }
        else{
            errorMessage("Please search a policy first!")
        }
    }

    

    $("#printCOC").click(function(){
        selectedPrinting = "COC"
        printSaveConfirm("", function(){ printing = false }, "<i class='fa fa-question-circle'></i> Save or Print COC Confirmation", {id1: "printSaveBtnCOC", id2: 'printOnlyBtnCOC'})        
    })

    function printCOC (useTransId=true, tr_id=0) {
        const trans_id = useTransId ? $(".hidden_trans_id").val() : tr_id;

        if(printCount !== 0 ){
            $("#modal_code").modal();
            return false;
        }

        if(trans_id != 0 && trans_id != undefined) {
            alertConfirm("It will add print count once printed, do you want to proceed?", function (){ 
                axios.get(`${base_url}employee/search_policy?search_val=${trans_id}&search_by_id=1&print=1`).then(res => {
                    $("#printCOC_elem").show();
    
                    if(res.data.status == "success"){
                        const dta = res.data.data[0];
    
                        $("#pcocpolicy").html(dta.policy_no);
                        $("#pcoc_or").html(dta.official_receipt);
                        $("#pcoc_address").html(ucFirst(dta.t_address));
                        $("#pcoc_receivedfrom").html(dta.received_from);
                        $("#pcoc_date_issued").html(convertDate(dta.date_issued));
                        $("#pcoc_date_from").html(convertDate(dta.date_from));
                        $("#pcoc_date_to").html(convertDate(dta.date_to));
                        $("#pcoc_model").html(dta.model_no);
                        $("#pcoc_make").html(dta.make);
                        $("#pcoc_body").html(dta.type_of_body);
                        $("#pcoc_color").html(dta.color);
                        $("#pcoc_mv_file").html(dta.mb_file_no);
                        $("#pcoc_plate_no").html(dta.plate_no);
                        $("#pcoc_serial").html(dta.serial_chassis);
                        $("#pcoc_motor").html(dta.motor_no);
                        
                        
                        setTimeout(() => {
                            $("#printCOC_elem").printElement();
                            $("#printCOC_elem").hide();
                            alertify.alert().close()
                        }, 1000);
                    }
                    
                })
            })
            
        }
        else{
            errorMessage("Please search a policy first!")
        }
    }

    $("#printPolicy").click(function(){
        selectedPrinting = "POLICY"
        printSaveConfirm("", function(){ printing = false }, "<i class='fa fa-question-circle'></i> Save or Print Policy Confirmation", {id1: "printSaveBtnPolicy", id2: 'printOnlyBtnPolicy'})        
    })


    function printPolicy (useTransId=true, tr_id=0) {
            
        let  slectab =  $(".mn_heading_tabs ul li.active").html();

        const trans_id = useTransId ? $(".hidden_trans_id").val() : tr_id;

        if(trans_id != 0 && trans_id != undefined) {
            alertConfirm("It will add print count once printed, do you want to proceed?", function (){
                axios.get(`${base_url}employee/search_policy?search_val=${trans_id}&search_by_id=1&print=1`).then(res => {

                if(res.data.status == "success"){
                    const dta = res.data.data[0];

                    $(".ppop_policy").html(dta.policy_no);
                    $(".ppop_name").html(dta.received_from);
                    $(".ppop_address").html(ucFirst(dta.t_address));
                    $(".popaddress2").html(ucFirst(dta.t_address));                    
                    $(".ppop_dateissued").html(convertDate(dta.date_issued));
                    $(".ppop_or").html(dta.official_receipt);
                    $(".ppop_dfrom").html(convertDate(dta.date_from));
                    $(".ppop_dto").html(convertDate(dta.date_to));
                    $(".ppop_model").html(dta.model_no);
                    $(".ppop_make").html(dta.make);
                    $(".ppop_body").html(dta.type_of_body);
                    $(".ppop_color").html(dta.color);
                    $(".ppop_mv_file").html(dta.mb_file_no);
                    $(".ppop_plate").html(dta.plate_no);
                    $(".ppop_serial").html(dta.serial_chassis);
                    $(".ppop_motor").html(dta.motor_no);

                    $(".ppop_prem_paid").html(numberWithCommas(dta.premium_sales));
                    $(".ppop_docstamp").html(numberWithCommas(dta.pol_docs_stamp));
                    $(".ppop_vattax").html(numberWithCommas(dta.others));
                    $(".ppop_lgtax").html(numberWithCommas(dta.lg_tax));
                    $(".ppop_total_amount_due").html(numberWithCommas(dta.or_total));
                    
                    $(".ppop_place").html(dta.place);
                    $(".ppop_pop_day").html(dta.policy_day);
                    $(".ppop_pop_month").html(dta.policy_month);
                    $(".ppop_pop_year").html(convertDate(dta.policy_year, "year"));
                    
                    if(slectab =="PRIVATE CAR (UV - CAR)" || slectab == "COMMERCIAL VEHICLE (TRUCK)"){
                        $("#print_Policy_elem").show();
                        setTimeout(() => {
                            $("#print_Policy_elem").printElement();
                            $("#print_Policy_elem").hide();
                            alertify.alert().close()
                        }, 1000);
                    }
                    else if(slectab =="MOTORCYCLE (MC)" || slectab == "TRICYCLE (TC-Hire)" || slectab == "TRAILER"){
                        $("#print_Policy_elem_motor").show();
                        setTimeout(() => {
                            $("#print_Policy_elem_motor").printElement();
                            $("#print_Policy_elem_motor").hide();
                            alertify.alert().close()
                        }, 1000);
                    }  
                }

            })
            })
            
        }
        else{
            errorMessage("Please search a policy first!")
        }  
    }

    $(document).on('click', '#printSaveBtn', () =>{
        $(".form_field_emocar input[type='submit']").trigger('click');
    })

    //submit print and save for OR

    $(".form_field_emocar").submit(function(e){
        let callback = undefined
        switch (selectedPrinting) {
            case "COC":
                callback = printCOC
                break;
            case "OR":
                callback = printOR
                break;
            case "POLICY":
                callback = printPolicy
                    break;
            default:
                callback = undefined
                break;
        }
        const options={saveOnly:true, callback: callback}
        submitGlobal(e,options)
    })
    $(document).on('click', '#printOnlyBtn', () =>{
        printOR(true);
        alertify.alert().close()
    })

    $(document).on('click', '#printSaveBtnCOC', () =>{
        $(".form_field_emocar input[type='submit']").trigger('click');
    })

    $(document).on('click', '#printOnlyBtnCOC', () =>{
        printCOC(true);
        alertify.alert().close()
    })

    $(document).on('click', '#printSaveBtnPolicy', () =>{
        $(".form_field_emocar input[type='submit']").trigger('click');
    })

    $(document).on('click', '#printOnlyBtnPolicy', () =>{
        printPolicy(true);
        alertify.alert().close()
    })


    $(".buttonSearch").click(function(){
        
        const search_val = $("#search_bar").val();
        const tab_value = $(".trans_type").val();

        if(search_val == "" || search_val == undefined){
            alert("Please input the search field...")
            return;
        }
        
        search_process(search_val, true, tab_value);

    })

    let btnState = 'success';

    $("#btnSendCode").on('click', function(){
        let self = $(this);
        if(btnState ==="success"){
            btnState = "loading"
            axios.post(`${base_url}api_generate_code`).then(res => {
                if(res.data.status == 'success'){
                    successMessage("Successfully Sent!");
                    $(".form-verification").show()
                    let sec = 15;
                    const times = setInterval(() => {
                        self.html("<i class='fa fa-send'></i> Resend in "+sec)
                        sec -= 1;
                        if(sec === 0 || btnState === 'success'){
                            clearInterval(times)
                            self.html("<i class='fa fa-send'></i> Resend Code ")
                            btnState = "success"
                        }
                    }, 1000)
                }
            })
        }
        
    })

    $("#form_verification_code").submit((e) => {
        e.preventDefault();
        const frmdata = new FormData()
        frmdata.append("code", $(".code-inputfield").val())

        axios.post(`${base_url}api_generate_code/verify_code`, frmdata).then(res => {
            if(res.data.status == 'success'){
                $("#btnSendCode").html("<i class='fa fa-send'></i> Send Code to Admin ")
                $(".form-verification").hide()
                $("#modal_code").modal('hide')
                alertify.alert().close(); 
                btnState ='success'
                successMessage("Verified");
                printCount = 0;
                switch (selectedPrinting) {
                    case "COC":
                        printCOC(true)
                        break;
                    case "OR":
                        printOR(true)
                        break;
                    case "POLICY":
                        printPolicy(true)
                            break;
                    default:
                        break;
                }
            }else{
                errorMessage("Not Verified!");
            }
        })
    })

    const ucFirst = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];       
    var tomorrow = new Date();
    tomorrow.setTime(tomorrow.getTime() + (1000*3600*24));       
    document.getElementById("spanDate").innerHTML = months[tomorrow.getMonth()] + " " + tomorrow.getDate()+ ", " + tomorrow.getFullYear();

    


})