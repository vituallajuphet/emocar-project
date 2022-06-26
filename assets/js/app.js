var submitGlobal = undefined

$(document).ready(function(){

    function _init(){

        var months = ['January','February','March','April','May','June','July',
    'August','September','October','November','December'];
        var date = new Date();
        var curr_day = date.getDate();
        var curr_month = date.getMonth();
        var curr_year = date.getFullYear();
        var next_curr_year = curr_year + 1;

        $('#date_final_get').val(months[curr_month] + " " + curr_day + ", " + curr_year);
        $('#date_nn').val(months[curr_month] + " " + curr_day + ", " + curr_year);
        $('#date_end').val(months[curr_month] + " " + curr_day + ", " + next_curr_year);
        $('#or_curr_date').val(months[curr_month] + " " + curr_day + ", " + curr_year);

        $('#pol_date').val(curr_day);
        $('#pol_months').val(months[curr_month]);
        $('#pol_year').val(curr_year);

        setCheck();
        

    }

    function setCheck(){
        setTimeout(() => {
            $("#paid_type_check").trigger("click")
            $("input[name='paid_type']").trigger("change");
        }, 1000);
    }

    _init();

    $('.date_issued').change(function(){
        var string = $(this).val();
        var sp_strong = string.split('-');
        var sp_date = sp_strong[1];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        $('.dummy_date_text').val(months[sp_date - 1] + ' ' + sp_strong[2] + ', ' + sp_strong[0]);
        // $('.dummy_date_text1').val(months[sp_date - 1] + ' ' + sp_strong[2] + ', ' + sp_strong[0]);
    });


    $('.date_issued1').change(function(){
        var string = $(this).val();
        var sp_strong = string.split('-');
        var sp_date = sp_strong[1];
        var sp_year = sp_strong[0];
        var sponeyear = parseInt(sp_year) + 1;
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        $('.dummy_date_text1').val(months[sp_date - 1] + ' ' + sp_strong[2] + ', ' + sp_strong[0]);
        $('.dummy_date_text2').val(months[sp_date - 1] + ' ' + sp_strong[2] + ', ' + sponeyear);
    });

    $('.date_issued2').change(function(){
        var string = $(this).val();
        var sp_strong = string.split('-');
        var sp_date = sp_strong[1];
        var sp_year = sp_strong[0];
        var sponeyear = parseInt(sp_year) + 1;
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        $('.dummy_date_text2').val(months[sp_date - 1] + ' ' + sp_strong[2] + ', ' + sp_strong[0]);
    });

    // $('.date_issued2').change(function(){
    //     var string = $(this).val();
    //     var sp_strong = string.split('-');
    //     var sp_date = sp_strong[1];
    //     var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    //     $('.dummy_date_text2').val(months[sp_date - 1] + ' ' + sp_strong[2] + ', ' + sp_strong[0]);
    // });

    $('.mn_heading_tabs ul li').click(function(){
        $('.mn_heading_tabs ul li').removeClass('active');
        $(this).addClass('active');


        reset_fields();        
        _init();
        setCheck();

        var textline = $(this).html();

        if(textline == 'TRICYCLE (TC-Hire)') {
            $('#docs_or_vat').text('VAT');
            $('#docs_or_vat').siblings('input').attr({'name':'pol_vat', 'value':'100'});
            $('#pol_lgt').val('100');
            $('#pol_others').val('200');
            $('#pol_docs_stamp').val('100');
            $('#pol_lgt').val('100');
            $('#or_prem_sales').val('250');
            $('#or_docs_stamp').val('100');
            $('#or_lg_tax').val('100');
            $('#or_misc').val('200');
            $('#or_total').val('650');
            $('#or_total_text').text('SIX HUNDRED FIFTY PESOS ONLY');

            $(".trans_type").val("tricycle");
        } else {
            $('#docs_or_vat').text('DOCS. STAMP');
            $('#docs_or_vat').siblings('input').attr('name','pol_docs_stamp');
        }

        if(textline == "MOTORCYCLE (MC)"){
            $(".trans_type").val("motorcycle");
            $('#or_prem_sales').val('250');
            $('#or_docs_stamp').val('100');
            $('#or_lg_tax').val('100');
            $('#or_misc').val('200');
            $('#or_total').val('650');
            $('#or_total_text').text('SIX HUNDRED FIFTY PESOS ONLY');
            $('#pol_others').val('200');
            $('#pol_docs_stamp').val('200');
            $('#pol_lgt').val('200');
        }

        else if(textline == 'PRIVATE CAR (UV - CAR)') {
            $(".trans_type").val("private");
            $('#or_prem_sales').val('560');
            $('#or_docs_stamp').val('200');
            $('#or_lg_tax').val('200');
            $('#or_misc').val('290');
            $('#or_total').val('1250');
            $('#or_total_text').text('ONE THOUSAND TWO HUNDRED FIFTY PESOS ONLY');
            $('#pol_others').val('290');
            $('#pol_docs_stamp').val('200');
            $('#pol_lgt').val('200');
        } 

        else if(textline == 'COMMERCIAL VEHICLE (TRUCK)') {
            $(".trans_type").val("commercial");
            $('#or_prem_sales').val('1200');
            $('#or_docs_stamp').val('100');
            $('#or_lg_tax').val('50');
            $('#or_misc').val('200');
            $('#or_total').val('1550');
            $('#or_total_text').text('ONE THOUSAND FIVE HUNDRED FIFTY ONLY');
            $('#pol_others').val('250');
            $('#pol_docs_stamp').val('50');
            $('#pol_lgt').val('50');
        }

        else if(textline == 'TRAILER') {
            $(".trans_type").val("trailer");
            $('#or_prem_sales').val('250');
            $('#or_docs_stamp').val('250');
            $('#or_lg_tax').val('250');
            $('#or_misc').val('500');
            $('#or_total').val('1250');
            $('#or_total_text').text('ONE THOUSAND TWO HUNDRED FIFTY PESOS ONLY');
            $('#pol_others').val('500');
            $('#pol_docs_stamp').val('250');
            $('#pol_lgt').val('250');
        }

    });

    submitGlobal = (event, options={saveOnly:true, callback}) => {
        event.preventDefault();
        
        let frmdata = $(".form_field_emocar").serialize();

        alertConfirm("Are you sure to save this transaction?" , function(){
            axios.post(base_url+"employee/save_transaction/", frmdata).then(res =>{
                ehide(".preloader");
                if(res.data.status == "success"){
                    
                    if(options.callback!== undefined){
                        options.callback(false, res.data.id)
                    }
                    if(options.saveOnly){
                        successMessage("Saved successfully!")
                        reset_fields();        
                        _init();
                        setCheck();
                    }

                }else{
                    errorMessage(res.data.message);
                }
            }).catch(err => {ehide(".preloader");errorMessage("Something Wrongs!")})
        })
    } 

    

    $("input[name='paid_type']").change(function(){
        let val = $(this).val();

        if(val == "Check"){
            $(".check_field").show()
            $(".check_field input").attr("required", "required")
        }else{
            $(".check_field").hide()
            $(".check_field input").removeAttr("required")
        }

    })

    // function reset here...
    function reset_fields(){
        $('.form_field_emocar input[type="text"]').val("");
    }

});