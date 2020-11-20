$(document).ready(function () {

    var trans_table = $('#trans_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
            console.log(row, data);
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
            { "data": "trans_type" },
            { "data": "mb_file_no" },
            { "data": "plate_no" },
            { "data": "first_name" },
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
        $(".preloader").hide();

        axios.get(`${base_url}/admin_policies/get_trans_info/${trans_id}`).then(res => {

            $(".preloader").hide();
            if(res.data.status == "success"){
                let dta = res.data.data[0];
                console.log(dta)
                $(".dta_mv_file").html(dta.mb_file_no)
                $(".dta_model_no").html(dta.model_no)
                $(".dta_date_issued").html(dta.date_issued)
                $(".dta_plate_no").html(dta.plate_no)
                $(".dta_make").html(dta.make)
                $(".dta_date_from").html(dta.date_from)
                $(".dta_motor_no").html(dta.motor_no)
                $(".dta_type_body").html(dta.type_of_body)
                $(".dta_date_to").html(dta.date_to)
                $(".dta_serial_chassis").html(dta.serial_chassis)
                $(".dta_of_receipt").html(dta.official_receipt)
                $(".dta_policy_no").html(dta.policy_no)
                $(".dta_color").html(dta.color)

                $(".dta_place").html(dta.place)
                $(".dta_others").html('₱ '+dta.others)
                $(".dta_date_day").html(dta.policy_day)
                $(".dta_docs_stamp").html('₱ '+dta.pol_docs_stamp)
                $(".dta_month").html(dta.policy_month)
                $(".dta_lgt").html('₱'+dta.lgt)
                $(".dta_year").html(dta.policy_year)

                $(".dta_received_from").html(dta.received_from)
                $(".dta_premium_sales").html('₱ '+dta.premium_sales)
                $(".dta_or_misc").html('₱ '+dta.misc)
                $(".dta_or_address").html(dta.address)
                $(".dta_or_doc_stamp").html('₱ '+dta.docs_stamp)
                $(".dta_or_total").html('₱ '+dta.or_total)
                $(".dta_or_date").html(dta.or_date)
                $(".dta_lg_tax").html('₱ '+dta.lg_tax)
                $(".dta_sum_pesos").html(dta.the_sum_of_pesos)

                $("#policies_modal").modal();
            }
            else{
                alert("something wrong!")
            }

        })
    })

   

    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }




})


