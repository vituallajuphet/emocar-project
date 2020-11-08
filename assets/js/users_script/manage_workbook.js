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
            $("#course_id_edit").html(html);
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
            {
                "data": "pk_workbook_id", "render": function (data, type, row, meta) {
                    var str = 'WB-' + row.pk_workbook_id;
                    return str;
                }
            },
            { "data": "title" },
            { "data": "course_title" },
            { "data": "rate" },       
            { "data": "date_added" },
            {
                "data": "pk_workbook_id", "render": function (data, type, row, meta) {
                    var str = `<div class="mx-auto action-btn-div"> 
                    <a href="${base_url}assets/file_uploads/${row.file_name}" download class="edit-btn btn_view_payment text-success" data-id="${row.pk_workbook_id}"><i class="fa fa-eye"></i> View</a>
                    <a href="javascript:;" class="edit-btn-workbook  text-primary" data-id="${row.pk_workbook_id}"><i class="fa fa-edit"></i> Edit</a>
                    <a href="javascript:;" class="btn_send_work_book text-themecolor" data-id="${row.pk_workbook_id}"><i class="fa fa-share"></i> Send</a>
                    </div>`;
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "manage_workbook/get_workbooks_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });

    var workbook_table_assign = $('#workbook_table_assign').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "pk_workbook_id", "render": function (data, type, row, meta) {
                    var str = 'WB-' + row.pk_workbook_id;
                    return str;
                }
            },
            { "data": "title" },
            { "data": "course_title" },
            {
                "data": "pk_workbook_id", "render": function (data, type, row, meta) {
                    return row.firstname + " "+row.lastname 
                }
            },
            { "data": "answer_status" },
            { "data": "score" },
            { "data": "date_added" },
            {
                "data": "pk_workbook_id", "render": function (data, type, row, meta) {

                    let ans = "";
                    
                    if (row.answer_status == "for checking") {
                        ans = `<a href="javascript:;" data-id="${row.pk_wb_assign_id}" download class="edit-btn  btn-check-workbook text-warning"><i class="fa fa-check"></i> Check Answer</a>`;
                    }
                    else if (row.answer_status == "completed") {
                        ans = `<a href="${base_url}assets/wb_answer_upload/${row.file_answer}" data-id="${row.pk_wb_assign_id}" download class="edit-btn text-warning"><i class="fa fa-check"></i> View Answer</a>`;
                    }
                


                    var str = `<div class="mx-auto action-btn-div"> 
                    <a href="${base_url}assets/file_uploads/${row.file_name}" download class="edit-btn btn_view_payment text-success" data-id="${row.pk_workbook_id}"><i class="fa fa-eye"></i> View</a>
                    ${ans}
                    </div>`;
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "manage_workbook/get_workbooks_assigned_data",
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

    $(document).on('click', '.edit-btn-workbook', function () {
        let id = $(this).data("id")
        
        axios.get(`${base_url }manage_workbook/get_workbook/${id}`).then(res => {
            if (res.data.result) {

                let data = res.data.data;

                $(".btn-wb-file").attr("href", `${base_url}assets/file_uploads/${data.file_name}`)
                $("#course_id_edit").val(data.fk_course_id)
                $("#wb_title_edit").val(data.title)
                $("#rate_edit").val(data.rate)
                $("#add_info_edit").val(data.description);
                $("#total_item_edit").val(data.total_items);
                $("#filename_edit").val(data.file_name);
                $("#wb_id_edit").val(id);
                $(".edit_workbook_modal").modal();
                

            }
        })

    })

    $(document).on('change', '#student_select', function () {
        let user_id = $(this).val();
        let wb_id = $("#work_book_id").val();

        if (user_id == "" || user_id == undefined) {
            return;
        }

        let frmdata = new FormData();
        frmdata.append("user_id", user_id)
        frmdata.append("wb_id", wb_id)

        axios.post(`${base_url }global_api/validate_workbook`, frmdata).then(res => {
            if (res.data.result) {
                $(this).val("")
                s_alert("This work book is already sent to this student", "error")
            }
        })

    })

    $(document).on("click", ".btn_send_work_book", function () {

        let wk_id = $(this).data("id");
        let students = [];
        
        axios.get(`${base_url}global_api/get_students`).then(res => {
            if (res.data.result) {
                students = res.data.data;
                
                let opt = `<option value="">Please Select</option>`;

                students.map(user => {
                    opt += `<option value="${user.pk_user_id}">${user.firstname + " " + user.lastname}</option>`;
                })
                $("#work_book_id").val(wk_id)
                $("#student_select").html(opt);
                $(".send_work_book_modal").modal();
            }
        })        
    })

    $(document).on('click', '.btn-check-workbook', function () {
        let id = $(this).data("id");
    
        axios.get(`${base_url}manage_workbook/get_assigned_wb/${id}`).then(res => {
            if (res.data.result) {

                let data = res.data.data;

                $(".view-answer-wb").attr("href", `${base_url}assets/wb_answer_upload/${data.file_answer}`)
                $(".btn-wb-file").attr("href", `${base_url}assets/file_uploads/${data.file_name}`)
                $(".check_wb_modal").modal();
                $("#wp_id_answer").val(id)
            }
        })

    })

    $("#send_workbook_form").submit(function (e) {
        
        e.preventDefault();

        let student_id      = $("#student_select").val();
        let add_info        = $("#add_info2").val();
        let work_book_id    = $("#work_book_id").val()

        if ((student_id == "" || student_id == undefined) || (add_info == "" || add_info == undefined)) {
            s_alert("Please input the required fields", "error");
            return;
        }

        confirm_alert("Are you sure to send this workbook?").then(resp => {

            let frmdata = new FormData();
            frmdata.append("user_id", student_id);
            frmdata.append("add_info", add_info);
            frmdata.append("work_book_id", work_book_id);

            $(".preloader").show();

            axios.post(`${base_url}manage_workbook/send_workbook`, frmdata).then(res => {
                $(".preloader").hide();
                if (res.data.result) {
                    setTimeout(() => {
                        $(".send_work_book_modal").modal("hide");
                        s_alert("Send Successfully", "success");
                    }, 300);
                }
               
            })

        })
    })

    $("#check_workbook_form").submit(function (e) {
        
        e.preventDefault();

        let score = $(".wb-score").val();
        let wp_id = $("#wp_id_answer").val();

        if (score == undefined || score == "") {
            s_alert("Please add the required fields", "error");
            return;
        }

        confirm_alert("Are you sure to save this data?").then(res => {
            
            let frmdata = new FormData();
            frmdata.append("wp_id", wp_id);
            frmdata.append("score", score);

            axios.post(`${base_url }manage_workbook/answer_workbook`, frmdata).then(res => {
                if (res.data.result) {
                       $(".check_wb_modal").modal("hide");  
                   setTimeout(() => {
                       s_alert("Saved Successfully", "success");
                       workbook_table_assign.ajax.reload();
                   }, 200);
                }
            })

        })
        
    })

})


