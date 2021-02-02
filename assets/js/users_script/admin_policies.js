
$(document).ready(function () {

    let global_locations = [];
    let sorted_by = {sorted:"", sorted_value:""};
    let global_users = [];

    function _init (){

        get_all_users();
        
        axios.get(`${base_url}admin/api_get_locations`).then(res => {
            
            if(res.data.status == "success"){
                global_locations = res.data.data;
                let elm = $("#sel_sort_location");
                fill_locations(elm)
                $("#sel_sort_location").select2();

            }else{
                errorMessage("Something Wrong!")
            }

        }).catch(err=>{errorMessage("Something Wrong!"); ehide(".preloader");} )

        // $('#sel_sort_user').select2();

    }
    _init()

    function get_all_users(){

        axios.get(`${base_url}admin_policies/api_get_all_users`).then(res => {
            
            if(res.data.status == "success"){
                global_users = res.data.data;

                let options = "<option value=''>Please select...</option>";
                global_users.map(usr => {
                    options += `<option data-loc="${usr.fk_location_id}" data-branch="${usr.branch_id}" value="${usr.user_id}">${usr.first_name} ${usr.last_name}</option>`;
                })
                
                $('#sel_sort_user').html(options);
                $('#sel_sort_user').select2();
                

            }else{
                errorMessage(res.data.message);
            }

        }).catch(err=>{errorMessage("Something Wrong!"); ehide(".preloader");} )
    }

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

    function fill_locations (elem = ""){
        let locs = `<option value="">Please select...</option>`;

        global_locations.map (loc => {
            locs += `<option data-id=${loc.loc_id} value="${loc.loc_id}">${loc.location_name}</option>`
        })

        if(elem == ""){
            $(".dta_edit_location").html(locs);
        }
        else{
            elem.html(locs);
        }
    }

    function fill_branches(loc_id, elem, useSelect2 = false){

        let brnches     = `<option value="">Please select...</option>`;
        let loc = global_locations.filter((loc =>  loc.loc_id == loc_id));

        if(loc != undefined && loc.length != 0){
            loc[0].branches.map(brn => {
                brnches += `<option value="${brn.branch_id}" >${brn.branch_name}</option>`;
            })
        }                                                                                                                          

        $(elem).html(brnches);

        if(useSelect2){
            $(elem).select2();
        }
    }

    var trans_table = $('#trans_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
            if(data.published_status == 1){
                $(row).addClass('row-approved');
            }
            else if(data.published_status == 0){
                $(row).addClass('row-pending');
            }
        },
        "columns": [
            {
                "data": "trans_id", "render": function (data, type, row, meta) {
                    return `TRANS-${row.trans_id}`
                }
            },
            // { "data": "trans_id" },
            { "data": "received_from" },
            { "data": "trans_type" },
            { "data": "mb_file_no" },
            { "data": "plate_no" },
            // {
            //     "data": "published_status", "render": function (data, type, row, meta) {
            //         return row.published_status == 1 ? "Approved" : "Pending";
            //     }
            // },
            { "data": "date_issued" },
            {
                "data": "trans_id", "render": function (data, type, row, meta) {

                    let app_btn = ``;

                    var btns = `
                        <div class="action_btns"> ${app_btn} <a class="btn_view" data-id="${row.trans_id}" href="#"><i class="fa fa-eye"></i> View</a>  <a data-id="${row.trans_id}" class="btn_edit" href="#"><i class="fa fa-pencil"></i> Edit</a> <a class="btn_delete" data-id="${row.trans_id}" href="#"><i class="fa fa-trash"></i> Delete</a></div>
                    `
                    return btns;
                }
            },
        ],
        "ajax": {
            "url": base_url + "admin_policies/get_transaction_data",
            "type": "POST",
            "data" : function(dta){
                dta.sortby = {
                    sorted:sorted_by.sorted, 
                    sort_value:sorted_by.sorted_value
                };
            }
        },
        "columnDefs": [
            {
                "targets": [6],
                "orderable": false,
            },
        ]
    });


    $("#sel_sort_user").change(function(){
        const usr_id = $(this).val();

        if(usr_id != "" && usr_id != undefined){
            sorted_by.sorted = "user";
            sorted_by.sorted_value = usr_id;
        }else{
            sorted_by.sorted = "";
            sorted_by.sorted_value = "";   
        }

        trans_table.ajax.reload();
    })

    $("#sel_sort_branch").change(function(){
        const brn_id = $(this).val();
        const loc_id = $("#sel_sort_location").val();

        if((brn_id != "" && brn_id != undefined) && (loc_id != "" && loc_id != undefined)){
            sorted_by.sorted = "location";
            sorted_by.sorted_value = [brn_id, loc_id];
        }else{
            sorted_by.sorted = "";
            sorted_by.sorted_value = "";   
        }

        trans_table.ajax.reload();
    })


    $("#sel_sort_location").change(function(){
        const val   = $(this).val();
        fill_branches(val, "#sel_sort_branch", true);
    })

    $(document).on("click", ".btn_view" , function(){
        let trans_id = $(this).data("id");
        $(".preloader").show();

        axios.get(`${base_url}/admin_policies/get_trans_info/${trans_id}`).then(res => {
            $("#view_policy_modal").modal();
            $(".preloader").hide();
            $("#view_policy_modal input").attr("readonly","readonly")
            if(res.data.status == "success"){
                let dta = res.data.data[0];
                $(".vtrans_id").val(dta.trans_id)
                $(".vtrans_type").val(dta.trans_type)
                $(".dta_mv_file").val(dta.mb_file_no)
                $(".dta_model_no").val(dta.model_no)
                $(".dta_date_issued").val(convertDate(dta.date_issued))
                $(".dta_plate_no").val(dta.plate_no)
                $(".dta_make").val(dta.make)
                $(".dta_date_from").val(convertDate(dta.date_from))
                $(".dta_motor_no").val(dta.motor_no)
                $(".dta_type_body").val(dta.type_of_body)
                $(".dta_date_to").val(convertDate(dta.date_to))
                $(".dta_serial_chassis").val(dta.serial_chassis)
                $(".dta_of_receipt").val(dta.official_receipt)
                $(".dta_policy_no").val(dta.policy_no)
                $(".dta_color").val(dta.color)

                $(".dta_place").val(dta.place)
                $(".dta_others").val('₱ '+dta.others)
                $(".dta_date_day").val(dta.policy_day)
                $(".dta_docs_stamp").val('₱ '+dta.pol_docs_stamp)
                $(".dta_month").val(dta.policy_month)
                $(".dta_lgt").val('₱'+dta.lgt)
                $(".dta_year").val(dta.policy_year)

                $(".dta_received_from").val(dta.received_from)
                $(".dta_premium_sales").val('₱ '+dta.premium_sales)
                $(".dta_or_misc").val('₱ '+dta.misc)
                $(".dta_or_address").val(dta.t_address)
                $(".dta_or_doc_stamp").val('₱ '+dta.docs_stamp)
                $(".dta_or_total").val('₱ '+dta.or_total)
                $(".dta_or_date").val(convertDate(dta.or_date))
                $(".dta_lg_tax").val('₱ '+dta.lg_tax)
                $(".dta_sum_pesos").val(dta.the_sum_of_pesos)
                $(".policy_type").html(capitalize(dta.trans_type))

                const published_status = (dta.published_status == 1 ? "Approved" : "Pending")

                $(".policy_status").html(published_status).addClass(published_status.toLocaleLowerCase())
            }
            else{
                errorMessage("something wrong!")
            }
        })
    })

    $("#datatable_sorter_select").on("change", function(){
        trans_table.search($(this).val()).draw() ;
    })
    
    $(document).on("click", ".btn_approve", function (e){
        
        const trans_id  = $(this).data("id");
         
        alertConfirm("Are you sure to approve this policy?" , function(){
            let frmdata = new FormData();
            eshow(".preloader");
            frmdata.append("trans_id", trans_id);

            axios.post(`${base_url}admin_policies/api_approve_policy/`, frmdata).then(res => {
                 ehide(".preloader");
                if(res.data.status == "success"){
                    successMessage("Approved Successfully!");
                    trans_table.ajax.reload();
                }
                else{
                    errorMessage(res.data.message)
                }
            }).catch(err => {  ehide(".preloader");errorMessage("Something Wrong!")})
        })
    })

    $(document).on("click", ".btn_edit", function (e){
        
        let trans_id = $(this).data("id");
        $(".preloader").show();

        axios.get(`${base_url}/admin_policies/get_trans_info/${trans_id}`).then(res => {
            
            $(".preloader").hide();
            if(res.data.status == "success"){
                let dta = res.data.data[0];
                $(".dta_edit_mv_file").val(dta.mb_file_no)
                $(".dta_edit_model_no").val(dta.model_no)
                $(".dta_edit_date_issued").val(convertDate(dta.date_issued))
                $(".dta_edit_plate_no").val(dta.plate_no)
                $(".dta_edit_make").val(dta.make)
                $(".dta_edit_date_from").val(convertDate(dta.date_from))
                $(".dta_edit_motor_no").val(dta.motor_no)
                $(".dta_edit_type_body").val(dta.type_of_body)
                $(".dta_edit_date_to").val(convertDate(dta.date_to))
                $(".dta_edit_serial_chassis").val(dta.serial_chassis)
                $(".dta_edit_of_receipt").val(dta.official_receipt)
                $(".dta_edit_policy_no").val(dta.policy_no)
                $(".dta_edit_color").val(dta.color)
                
                $(".dta_edit_place").val(dta.place)
                $(".dta_edit_others").val(dta.others)
                $(".dta_edit_date_day").val(dta.policy_day)
                $(".dta_edit_docs_stamp").val(dta.pol_docs_stamp)
                $(".dta_edit_month").val(dta.policy_month)
                $(".dta_edit_lgt").val(dta.lgt)
                $(".dta_edit_year").val(dta.policy_year)
                
                $(".dta_edit_received_from").val(dta.received_from)
                $(".dta_edit_premium_sales").val(dta.premium_sales)
                $(".dta_edit_or_misc").val(+dta.misc)
                $(".dta_edit_or_address").val(dta.t_address)
                $(".dta_edit_or_doc_stamp").val(dta.docs_stamp)
                $(".dta_edit_or_total").val(dta.or_total)
                $(".dta_edit_or_date").val(convertDate(dta.or_date))
                $(".dta_edit_lg_tax").val(dta.lg_tax)
                $(".dta_edit_sum_pesos").val(dta.the_sum_of_pesos)
                $(".dta_edit_trans_type").val(dta.trans_type)
                $(".dta_edit_trans_id").val(dta.trans_id)
                $(".policy_edit_type").html(capitalize(dta.trans_type))


                $("#edit_policy_modal").modal();

                const published_status = (dta.published_status == 1 ? "Approved" : "Pending")

                $(".policy_edit_status").html(published_status).addClass(published_status.toLocaleLowerCase())
            }
            else{
                errorMessage("Something wrong!")
            }
        })
        
    })

    $(document).on("click", ".btn_delete", function(){
        const trans_id = $(this).data("id");
        
        alertConfirm("Are you sure to delete this policy?" , function(){
            let frmdata = new FormData();
            $(".preloader").show();
            frmdata.append("trans_id", trans_id )

            axios.post(`${base_url}admin_policies/api_delete_policy/`, frmdata).then(res => {
                $(".preloader").hide();
                if(res.data.status == "success"){
                    successMessage("Successfully Deleted!");
                    trans_table.ajax.reload();
                }
                else{
                    errorMessage("Something wrong!")
                }
            })
        })
    })
    
    // submit form edit
    $(".form_edit_policy").submit(function (e) { 
        e.preventDefault();
        const frm = $(".form_edit_policy");
        let frmdata = new FormData(frm[0]);
        alertConfirm("Are you sure to update this policy?" , function(){
            
            $(".preloader").show();
            axios.post(`${base_url}admin_policies/api_update_policy/`, frmdata).then(res => {
               $(".preloader").hide();
                if(res.data.status == "success"){
                    $("#edit_policy_modal").modal("hide");
                    successMessage("Successfully Updated!");
                    trans_table.ajax.reload();
                }
                else{
                    errorMessage("Something wrong!")
                }
            })
        })
    });

    // added new functions here...
    $("#btnPrintOR").click(function(){

        const trans_id = $(".vtrans_id").val();
        const trans_type = $(".vtrans_type").val();

        console.log(trans_id, trans_type)

        if(trans_id != 0 && trans_id != undefined) {

            axios.get(`${base_url}admin/search_policy?search_val=${trans_id}&search_by_id=1`).then(res => {
                $("#print_OR").show();

                if(res.data.status == "success"){
                    const dta = res.data.data[0];

                    const amt_of_cov = 100000;

                    $("#date_trans").html(convertDate(dta.date_issued));
                    $("#trans_rec_from").html(dta.received_from);
                    $("#trans_address").html(dta.t_address);
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
                    }, 1000);
                }
                
            })
        }
        else{
            errorMessage("Please search a policy first!")
        }
        
    })

    $("#btnPrintCoc").click(function(){

        const trans_id = $(".vtrans_id").val();
        const trans_type = $(".vtrans_type").val();

        if(trans_id != 0 && trans_id != undefined) {

            axios.get(`${base_url}admin/search_policy?search_val=${trans_id}&search_by_id=1`).then(res => {
                $("#printCOC_elem").show();

                if(res.data.status == "success"){
                    const dta = res.data.data[0];

                    $("#pcocpolicy").html(dta.policy_no);
                    $("#pcoc_or").html(dta.official_receipt);
                    $("#pcoc_address").html(dta.t_address);
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
                    }, 1000);   
                }
                
            })
        }
        else{
            errorMessage("Please search a policy first!")
        }
    })

    $("#btnPrintPolicy").click(function(){
        
        const trans_id = $(".vtrans_id").val();
        const slectab = $(".vtrans_type").val().toLocaleLowerCase();

        if(trans_id != 0 && trans_id != undefined) {

            axios.get(`${base_url}admin/search_policy?search_val=${trans_id}&search_by_id=1`).then(res => {

                if(res.data.status == "success"){
                    const dta = res.data.data[0];

                    $(".ppop_policy").html(dta.policy_no);
                    $(".ppop_name").html(dta.received_from);
                    $(".ppop_address").html(dta.t_address);
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
                    

                    if(slectab =="private" || slectab == "commercial"){
                        $("#print_Policy_elem").show();
                        setTimeout(() => {
                            $("#print_Policy_elem").printElement();
                            $("#print_Policy_elem").hide();
                        }, 1000);
                    }
                    else if(slectab =="motorcycle" || slectab == "tricycle" || slectab == "trailer"){
                        $("#print_Policy_elem_motor").show();
                        setTimeout(() => {
                            $("#print_Policy_elem_motor").printElement();
                            $("#print_Policy_elem_motor").hide();
                        }, 1000);

                    }  
                }

            })
        }
        else{
            errorMessage("Please search a policy first!")
        }  
    })


    function numberWithCommas(num) {
        let res = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        if((res.split(".")[1] == undefined)){
            res = res+".00"
        }

        return res;
    }

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

    // end new functions


    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }

})


