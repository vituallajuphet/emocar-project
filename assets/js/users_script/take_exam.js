$(document).ready(function () {
    // var purchase_orders = $('#purchase_Orders').DataTable();

    var exam_table = $('#exam_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "pk_exam_id", "render": function (data, type, row, meta) {
                    var str = 'EX-' + row.pk_exam_id;
                    return str;
                }
            },
            { "data": "course_title" },
            { "data": "exam_title" },
            {
                "data": "rate", "render": function (data, type, row, meta) {
                    var str = row.rate + "%";

                    return str;
                }
            },
            { "data": "total_items" },
            {
                "data": "date_added", "render": function (data, type, row, meta) {
                    var str = getDateFormat(row.date_added)

                    return str;
                }
            },
            {
                "data": "pk_quiz_id", "render": function (data, type, row, meta) {
                    let lnk = `<a href="${base_url}take_exam/student_take_exam/${row.pk_exam_id}" class="fbold edit-btn btn-take-quiz text-success" data-id="${row.pk_quiz_id}">Take</a>`;

                    if (row.exam_taken == 1) {
                        lnk = `<a href="${base_url}take_exam/view_exam_result/${row.exam_taken_id}" class="fbold edit-btn btn-take-quiz text-warning" data-id="${row.exam_taken_id}">View Result</a>`
                    }

                    var str = `<div class="mx-auto action-btn-div"> ${lnk} </div>`;
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "take_exam/get_exam_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });


    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate()+1}-${d.getFullYear()}`;
    }

    $(".btn-quiz-submit").click(function () {
        
        let checked = 0;
        let elm = $(".quiz_choices input[type=radio]");
        let total = elm.length / 4;
        $(".quiz_choices input[type=radio]").each(function () {
            checked += ($(this).get(0).checked ? 1 : 0);
            
        })

        console.log(total, checked)
        if (total != checked) {
            s_alert("Please fill the unanswered question.", "error");
            return;
        }

        confirm_alert("Are you sure to submit your answer?").then(res => {
            $("#form_quiz").submit();
        })
       
        
    })


})

