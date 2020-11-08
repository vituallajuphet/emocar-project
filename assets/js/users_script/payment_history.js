$(document).ready(function () {
    // var purchase_orders = $('#purchase_Orders').DataTable();

    var student_table = $('#payment_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "payment_id", "render": function (data, type, row, meta) {
                    var str = 'PA-' + row.payment_id;
                    return str;
                }
            },
            { "data": "amount" },
            { "data": "transaction_id" },
            { "data": "payment_status" },                
            { "data": "date_created" },
            {
                "data": "pk_user_id", "render": function (data, type, row, meta) {

                    let action = "";
                    if (row.amount == 500) {
                        action = `<a href="${base_url}paybalance/payment_form/${row.payment_id}"><i class="fa fa-money"></i> Pay</a>`
                    }

                    var str = `<div class="mx-auto action-btn-div"> <a href="javascript:;" class="edit-btn btn_view_payment text-success" data-id="${row.payment_id}"><i class="fa fa-eye"></i> View</a>
                    ${action}
                    </div>`;
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "payment_history/get_payment_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });

    $(document).on("click", ".btn_view_payment", function () {
        let payment_id = $(this).data("id");


        axios.get(`${base_url}payment_history/get_payment/${payment_id}`).then(res => {
            
            if (res.data.result) {

                let data = res.data.data;

                $(".pay_code").html(data.transaction_id);
                $(".pay_amount").html("$"+data.amount);
                $(".pay_status").html(data.payment_status);
                $(".pay_for").html(data.payment_for);
                $(".pay_date").html(data.date_created);
                $(".pay_add_info").html(data.additional_information);

                $(".payment_modal").modal();
            }
            else {
                s_alert(res.data.message,"error")
            }
            
        })
    })

    





})


