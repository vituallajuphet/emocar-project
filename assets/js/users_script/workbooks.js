$(document).ready(function () {
    // var purchase_orders = $('#purchase_Orders').DataTable();

    axios.get(`${base_url}global_api/get_courses`).then(res => {
        if (res.data.result == "success") {
            let data = res.data.data;
            let html = "<option value=''>Please Select.</option>";
            data.map(dta => {
                html += `<option value="${dta.pk_course_id}">${dta.course_title}</option>`;
            })

            $("#course_id").html(html);
        }
    })

    var workbook_table = $('#workbook_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            { "data": "title" },
            { "data": "course_title" },
            {
                "data": "rate", "render": function (data, type, row, meta) {
                    var str = row.rate +"%";
                    return str;
                }
            },
            { "data": "total_items" },
            { "data": "score" },
            { "data": "answer_status" },
            { "data": "date_added" },
            {
                "data": "pk_workbook_id", "render": function (data, type, row, meta) {

                    let ans = (row.answer_status == "pending") ?
                        `<a href="javascript:;" class="edit-btn btn-send-wb-answer text-warning" data-id="${row.pk_workbook_id}"><i class="fa fa-send"></i> Send Answer</a>` :
                        `<a href="${base_url}assets/wb_answer_upload/${row.file_answer}" download class="edit-btn  text-warning"><i class="fa fa-eye"></i> View Answer</a>`

                    var str = `<div class="mx-auto action-btn-div"> 
                    <a href="${base_url}assets/file_uploads/${row.file_name}" download class="edit-btn btn_view_payment text-success" data-id="${row.pk_workbook_id}"><i class="fa fa-eye"></i> View</a>
                    ${ans}
                    </div>`;
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "workbooks/get_workbooks_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });

    $(document).on("click", ".show-add-modal", function () {
        $(".add_workbook").modal();
    })

    $(document).on('click', '.btn-send-wb-answer', function () {
        let id = $(this).data("id");

        $("#wb_id").val(id)

        $(".send_answer_modal").modal();
        
    })

    



})


