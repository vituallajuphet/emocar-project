
$(document).ready(function () {


    const _init = () => {


        let tdata = [];
        let ttype = "";

        if(JSON.parse(trust_data).length  > 0){
            tdata = JSON.parse(trust_data)
            ttype = tdata[0].name;
        }
        console.log(ttype)


        $('#docs_or_vat').text('DOCS. STAMP');
        $('#docs_or_vat').siblings('input').attr('name','pol_docs_stamp');

        var months = ['January','February','March','April','May','June','July',
    'August','September','October','November','December'];
        var date = new Date();
        var curr_day = date.getDate();
        var curr_month = date.getMonth();
        var curr_year = date.getFullYear();

        $('#pol_date').val(curr_day);
        $('#pol_months').val(months[curr_month]);
        $('#pol_year').val(curr_year);


        switch (ttype) {
            case "tricycle":
                $('#docs_or_vat').text('VAT');
                $('#docs_or_vat').siblings('input').attr({'name':'pol_vat', 'value':'100'});
                $('#pol_lgt').val('100');
                $('#pol_others').val('200');
                $('#or_prem_sales').val('250');
                $('#or_docs_stamp').val('100');
                $('#or_lg_tax').val('100');
                $('#or_misc').val('200');
                $('#or_total').val('650');
                $('#or_total_text').val('SIX HUNDRED FIFTY PESOS ONLY');
                $(".trans_type").val("tricycle");
                break;

            case "motorcycle":
                $(".trans_type").val("motorcycle");
                $('#or_prem_sales').val('250');
                $('#or_docs_stamp').val('100');
                $('#or_lg_tax').val('100');
                $('#or_misc').val('200');
                $('#or_total').val('650');
                $('#or_total_text').val('SIX HUNDRED FIFTY PESOS ONLY');
                $('#pol_others').val('200');
                $('#pol_docs_stamp').val('200');
                $('#pol_lgt').val('200');
                break;
            case "private":
                $(".trans_type").val("private");
                $('#or_prem_sales').val('560');
                $('#or_docs_stamp').val('200');
                $('#or_lg_tax').val('200');
                $('#or_misc').val('290');
                $('#or_total').val('1250');
                $('#or_total_text').val('ONE THOUSAND TWO HUNDRED FIFTY PESOS ONLY');
                $('#pol_others').val('290');
                $('#pol_docs_stamp').val('200');
                $('#pol_lgt').val('200');
                break;
            case "commercial":
                $(".trans_type").val("commercial");
                $('#or_prem_sales').val('1200');
                $('#or_docs_stamp').val('100');
                $('#or_lg_tax').val('50');
                $('#or_misc').val('200');
                $('#or_total').val('1550');
                $('#or_total_text').val('ONE THOUSAND FIVE HUNDRED FIFTY ONLY');
                $('#pol_others').val('300');
                $('#pol_docs_stamp').val('50');
                $('#pol_lgt').val('50');
                break;
            case "trailer":
                $(".trans_type").val("trailer");
                $('#or_prem_sales').val('250');
                $('#or_docs_stamp').val('250');
                $('#or_lg_tax').val('250');
                $('#or_misc').val('500');
                $('#or_total').val('1250');
                $('#or_total_text').val('ONE THOUSAND TWO HUNDRED FIFTY PESOS ONLY');
                $('#pol_others').val('500');
                $('#pol_docs_stamp').val('250');
                $('#pol_lgt').val('250');
                break;
            
        }

        const dte = new Date();
        const dte2 = new Date();
        dte2.setFullYear(dte.getFullYear() + 1)

        $("input[name='date_issued']").val(convertDate(dte))
        $("input[name='date_from']").val(convertDate(dte))
        $("input[name='date_to']").val(convertDate(dte2))
    }
    
    _init();

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

    $("#trust_form").submit(function(e){

        e.preventDefault();

        let frmdata = $("#trust_form").serialize();

        alertConfirm("Are you sure to save this transaction?" , function(){
            axios.post(base_url+"admin_use_trust/save_transaction/", frmdata).then(res =>{
                ehide(".preloader");
                if(res.data.status == "success"){
                    successMessage("Saved successfully!")
                    setTimeout(() => {
                        window.location.href=`${base_url}admin_agent_policies/`
                    }, 1000);
                }else{
                    errorMessage(res.data.message);
                }
            }).catch(err => {ehide(".preloader");errorMessage("Something Wrong!")})
        })

    })

    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }

    function convertDate (the_date, get_type = "")  {

        let ret_date;
        let ddte = new Date(the_date);
        const month = ddte.toLocaleString('default', { month: 'long' });

        res = `${month} ${ddte.getDate()}, ${ddte.getFullYear()}`;
        return res;
    }

    const ucFirst = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    
})


