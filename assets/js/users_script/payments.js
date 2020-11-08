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
            { "data": "firstname" },
            { "data": "lastname" },
            { "data": "amount" },
            { "data": "transaction_id" },
            { "data": "payment_status" },                
            { "data": "date_created" },
            {
                "data": "pk_user_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div"> <a href="javascript:;" class="edit-btn btn_view_payment text-success" data-id="' + row.payment_id + '"><i class="fa fa-eye"></i></a></div>';
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "payments/get_payment_data",
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

        axios.get(`${base_url}payments/get_payment/${payment_id}`).then(res => {
            
            if (res.data.result == "success") {
                $(".view_payment_modal").modal();

                let data = res.data.data;

                $("#firstname").val(data.firstname);
                $("#lastname").val(data.lastname);
                $("#amount").val("$"+data.amount);
                $("#transcode").val(data.transaction_id);
                $("#payment_status").val(data.payment_status);
                $("#date_added").val(data.date_created);
                $("#add_info").val(data.additional_information);
                $("#payment_form").val(data.payment_for);
                
            }
            
        })

        

    })





})


