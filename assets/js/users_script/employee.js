
$(document).ready(function(){

    function convertDate(the_date){
        let ret_date;
        let ddte = new Date(the_date);
        const month = ddte.toLocaleString('default', { month: 'long' });
        console.log(ddte.getDay()+1)

        return `${month} ${ddte.getDay()+1}, ${ddte.getFullYear()}`;
    }

    $("#search_bar").on("keyup change", function(){
        let search_val = $(this).val();

        // search_process(search_val)

    })

    function search_process (search_val, show_err = false){


        if(search_val != "" && search_val != undefined){

            axios.get(`${base_url}/employee/search_policy/${search_val}`).then(res => {
                
                if(res.data.status == "success"){
                    let dta = res.data.data[0];
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
                    $("input[name='address']").val(dta.address)
                    $("input[name='docs_stamp']").val(dta.docs_stamp)
                    $("input[name='or_total']").val(dta.or_total)
                    $("input[name='or_date']").val(convertDate(dta.or_date))
                    $("input[name='lg_tax']").val(dta.lg_tax)
                    $("input[name='the_sum_of_pesos']").val(dta.the_sum_of_pesos)
                }
                else{
                    if(show_err){
                        alert("Search not found!")
                    }
                }   

            })
        }
    }

    $("#printOr").click(function(){

     

        $("#print_OR").show();
        setTimeout(() => {
            $("#print_OR").printElement();
            $("#print_OR").hide();
        }, 1000);
    })

    $("#printCOC").click(function(){
        $("#print_coc_elem").show();
        setTimeout(() => {
            $("#print_coc_elem").printElement();
            $("#print_coc_elem").hide();
        }, 1000);
    })

    $("#printPolicy").click(function(){
        $("#print_policy_elem").show();
        setTimeout(() => {
            $("#print_policy_elem").printElement();
            $("#print_policy_elem").hide();
        }, 1000);
    })


    $(".buttonSearch").click(function(){
        
        const search_val = $("#search_bar").val();

        if(search_val == "" || search_val == undefined){
            alert("Please input the search field...")
            return;
        }

        search_process(search_val, true)

    })

})