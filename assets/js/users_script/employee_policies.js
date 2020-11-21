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

        $("#view_policy_modal").modal();

        let trans_id = $(this).data("id");
        $(".preloader").hide();

        axios.get(`${base_url}/employee_policies/get_trans_info/${trans_id}`).then(res => {

            $(".preloader").hide();
            $("#view_policy_modal input").attr("readonly","readonly")
            if(res.data.status == "success"){
                let dta = res.data.data[0];
                console.log(dta)
                $(".dta_mv_file").val(dta.mb_file_no)
                $(".dta_model_no").val(dta.model_no)
                $(".dta_date_issued").val(dta.date_issued)
                $(".dta_plate_no").val(dta.plate_no)
                $(".dta_make").val(dta.make)
                $(".dta_date_from").val(dta.date_from)
                $(".dta_motor_no").val(dta.motor_no)
                $(".dta_type_body").val(dta.type_of_body)
                $(".dta_date_to").val(dta.date_to)
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
                $(".dta_or_date").val(dta.or_date)
                $(".dta_lg_tax").val('₱ '+dta.lg_tax)
                $(".dta_sum_pesos").val(dta.the_sum_of_pesos)

                $("#policies_modal").modal();

                const published_status = (dta.published_status == 1 ? "Approved" : "Pending")

                $(".policy_status").html(published_status).addClass(published_status.toLocaleLowerCase())
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


