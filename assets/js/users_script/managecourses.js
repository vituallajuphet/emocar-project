$(document).ready(function () {
    // var purchase_orders = $('#purchase_Orders').DataTable();

    var courses_table = $('#courses_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "pk_course_id", "render": function (data, type, row, meta) {
                    var str = 'CO-' + row.pk_course_id;
                    return str;
                }
            },
            { "data": "course_title" },
            {
                "data": "date_added", "render": function (data, type, row, meta) {
                    var str = getDateFormat(row.date_added)

                    return str;
                }
            },
            {
                "data": "pk_user_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div"> <a href="javascript:;" class="edit-btn btn_view_user text-success" data-id="' + row.pk_course_id + '"><i class="fa fa-eye"></i></a>';
                    str += '<a href="javascript:;" class="btn_edit_course" data-id="' + row.pk_course_id + '" title="updated"><i class="fa fa-edit"></i></a>';
                    str += '<a href="javascript:;" class="btn_delete_course text-danger" data-id="' + row.pk_course_id + '" title="Receive"><i class="fa fa-trash"></i></a> </div>';
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "managecourses/get_courses_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });

    $(".show-add-modal").click(function () {
        $(".add_course_modal").modal()
    })

    $(document).on("click", ".btn_edit_course", function () {
        
        let course_id = $(this).data("id");

        axios.get(`${base_url}global_api/get_course_data/${course_id}`).then(res => {
            if (res.data.result == "success") {
                let course_data = res.data.data;
                $(".course_id").val(course_data.pk_course_id)
                $(".edit_course_title").val(course_data.course_title)
                $(".edit_description").val(course_data.course_description)
                
            }
        })
        $(".edit_course_modal").modal()
    })

    $("#add_course_form").on("submit", function (e) {
        e.preventDefault();
        let data    = JSON.stringify($(this).serializeObject())
        let frmdata = new FormData();

        frmdata.append("frmdata", data)

        confirm_alert("Are you sure to save this course?").then(res => {
            axios.post(`${base_url}managecourses/save_course`, frmdata).then(res => {
                if (res.data.result == "success") {
                    $(".add_course_modal").modal("hide");
                    s_alert("Saved Successfully!", "success");
                    courses_table.ajax.reload();
                }
            })
        })
    })

    $(document).on("click", ".btn_delete_course", function () {
        let course_id = $(this).data("id");
        
        let frmdata = new FormData();
        frmdata.append("course_id", course_id);

        confirm_alert("Are you sure to delete this course?").then(res => {
            axios.post(`${base_url}managecourses/delete_course`, frmdata).then(res => {
                if (res.data.result == "success") {
                    s_alert("Deleted Successfully!", "success");
                    courses_table.ajax.reload();
                }
            })
        })

    })

    $("#update_course_form").on("submit", function (e) {
        e.preventDefault();
        let data = JSON.stringify($(this).serializeObject())
        let frmdata = new FormData();

        frmdata.append("frmdata", data)

        confirm_alert("Are you sure to update this course?").then(res => {
            axios.post(`${base_url}managecourses/update_course`, frmdata).then(res => {
                if (res.data.result == "success") {
                    $(".edit_course_modal").modal("hide");
                    s_alert("Updated Successfully!", "success");
                    courses_table.ajax.reload();
                }
            })
        })

    })

    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate()+1}-${d.getFullYear()}`;
    }


})


