
$(document).ready(function () {

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
                    var btns = `
                        <div class="action_btns"><a class="btn_view" data-id="${row.trans_id}" href="#"><i class="fa fa-eye"></i> View</a>  <a data-id="${row.trans_id}" class="btn_edit" href="#"><i class="fa fa-pencil"></i> Edit</a> <a class="btn_delete" data-id="${row.trans_id}" href="#"><i class="fa fa-trash"></i> Delete</a></div>
                    `
                    return btns;
                }
            },
        ],
        "ajax": {
            "url": base_url + "employee_policies/get_transaction_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [7],
                "orderable": false,
            },
        ]
    });

    

    $(document).on("click", ".btn_view" , function(){
        let trans_id = $(this).data("id");
        $(".preloader").show();

        axios.get(`${base_url}/employee_policies/get_trans_info/${trans_id}`).then(res => {
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

    $(document).on("click", ".btn_edit", function (e){
        
        let trans_id = $(this).data("id");
        $(".preloader").show();

        axios.get(`${base_url}/employee_policies/get_trans_info/${trans_id}`).then(res => {
            
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
                errorMessage("something wrong!")
            }
        })
        
    })

    $(document).on("click", ".btn_delete", function(){
        const trans_id = $(this).data("id");
        
        alertConfirm("Are you sure to delete this policy?" , function(){
            let frmdata = new FormData();
            $(".preloader").show();
            frmdata.append("trans_id", trans_id )

            axios.post(`${base_url}employee_policies/api_delete_policy/`, frmdata).then(res => {
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
            axios.post(`${base_url}employee_policies/api_update_policy/`, frmdata).then(res => {
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


