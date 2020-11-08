$(document).ready(function () {
    // var purchase_orders = $('#purchase_Orders').DataTable();

    axios.get(`${base_url }global_api/check_my_payment`).then(res => {
        if (res.data.result) {
        
        }
    })

    var quiz_table = $('#quiz_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'asc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "pk_quiz_id", "render": function (data, type, row, meta) {
                    var str = 'QT-' + row.pk_quiz_id;
                    return str;
                }
            },
            { "data": "course_title" },
            { "data": "quiz_title" },
            { "data": "chapter" },
            {
                "data": "rate", "render": function (data, type, row, meta) {
                    var str = row.rate + "%";

                    return str;
                }
            },
            { "data": "total_items" },
            { "data": "test_type" },
            {
                "data": "date_added", "render": function (data, type, row, meta) {
                    var str = getDateFormat(row.date_added)

                    return str;
                }
            },
            {
                "data": "pk_quiz_id", "render": function (data, type, row, meta) {
                    let lnk = `<a href="${base_url}take_quiz/student_take_quiz/${row.pk_quiz_id}" class="fbold edit-btn btn-take-quiz text-success" data-id="${row.pk_quiz_id}">Take</a>`;

                    if (row.exam_taken == 1 && row.is_passed == "failed") {
                        lnk = `<a href="${base_url}take_quiz/student_take_quiz/${row.pk_quiz_id}" class="fbold edit-btn btn-take-quiz text-warning" data-id="${row.pk_quiz_id}">Re Take</a>`
                    } else if (row.exam_taken == 2 || row.is_passed == "Passed") {
                        lnk = `<a href="${base_url}take_quiz/view_quiz_result/${row.quiz_taken_id}" class="fbold edit-btn btn-take-quiz text-success" data-id="${row.quiz_taken_id}">View</a>`
                    }

                    var str = `<div class="mx-auto action-btn-div"> ${lnk} </div>`;
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "take_quiz/get_quizzes_data",
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

