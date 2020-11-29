
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
            {
                "data": "published_status", "render": function (data, type, row, meta) {
                    return row.published_status == 1 ? "Approved" : "Pending";
                }
            },
            { "data": "date_issued" },
            {
                "data": "trans_id", "render": function (data, type, row, meta) {

                    let app_btn = ``;

                    if(row.published_status != 1){
                        app_btn = `<a class="btn_approve" data-id="${row.trans_id}" href="#"><i class="fa fa-check"></i> Approve</a>`;
                    }

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
                "targets": [7],
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
                $(".dta_or_address").val(dta.address)
                $(".dta_or_doc_stamp").val('₱ '+dta.docs_stamp)
                $(".dta_or_total").val('₱ '+dta.or_total)
                $(".dta_or_date").val(convertDate(dta.or_date))
                $(".dta_lg_tax").val('₱ '+dta.lg_tax)
                $(".dta_sum_pesos").val(dta.the_sum_of_pesos)

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
                $(".dta_edit_or_address").val(dta.address)
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


    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }

})


