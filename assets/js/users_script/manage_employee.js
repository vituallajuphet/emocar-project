$(document).ready(function () {
    // var purchase_orders = $('#purchase_Orders').DataTable();

    var student_table = $('#student_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "pk_user_id", "render": function (data, type, row, meta) {
                    var str = 'EM-' + row.pk_user_id;
                    return str;
                }
            },
            { "data": "firstname" },
            { "data": "lastname" },
            { "data": "email_address" },
            { "data": "contact_number" },
            { "data": "registration_status" },
            { "data": "date_created" },
            {
                "data": "pk_user_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div"> ';
                    if (row.registration_status == "pending") {
                        str += '<a href="javascript:;" title="approve" class="edit-btn approve_employee_btn text-success" data-id="' + row.pk_user_id + '"><i class="fa fa-check"></i></a>';
                    }
                    str += '<a href="javascript:;" class="btn_edit_user" data-id="' + row.pk_user_id + '" title="edit"><i class="fa fa-edit"></i></a>';
                    str += '<a href="javascript:;" class="btn_delete_user text-danger" data-id="' + row.pk_user_id + '" title="delete"><i class="fa fa-trash"></i></a> </div>';
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "manage_employee/get_student_data",
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
        $(".add_student_modal").modal()
    })

    $(document).on("click", ".btn_edit_user", function () {

        let user_id = $(this).data("id");

        axios.get(`${base_url}global_api/get_user_data/${user_id}`).then(res => {
            if (res.data.result) {
                let user_data = res.data.data;

                $(".st_user_id").val(user_data.pk_user_id)
                $(".st_firstname").val(user_data.firstname)
                $(".st_lastname").val(user_data.lastname)
                $(".st_email").val(user_data.email_address)
                $(".st_contact_number").val(user_data.contact_number)
                $(".st_username").val(user_data.username)
                $(".st_password").val(user_data.password)
                $(".st_reg_status").val(user_data.registration_status)
            }
        })
        $(".edit_student_modal").modal()
    })

    $("#add_student_form").on("submit", function (e) {
        e.preventDefault();
        let data = JSON.stringify($(this).serializeObject())
        let frmdata = new FormData();

        frmdata.append("frmdata", data)

        confirm_alert("Are you sure to save this student?").then(res => {
            axios.post(`${base_url}manage_employee/save_student`, frmdata).then(res => {
                if (res.data.result) {
                    $(".add_student_modal").modal("hide");
                    s_alert("Saved Successfully!", "success");
                    student_table.ajax.reload();
                } else {
                    s_alert(res.data.message, "error");
                }
            })
        })
    })

    $(document).on("click", ".btn_delete_user", function () {
        let user_id = $(this).data("id");

        let frmdata = new FormData();
        frmdata.append("user_id", user_id);

        confirm_alert("Are you sure to delete this student?").then(res => {
            axios.post(`${base_url}manage_employee/delete_student`, frmdata).then(res => {
                if (res.data.result == "success") {
                    s_alert("Deleted Successfully!", "success");
                    student_table.ajax.reload();
                }
            })
        })

    })

    $(document).on('click', '.approve_employee_btn', function () {
        let user_id = $(this).data("id");

        let frmdata = new FormData();
        frmdata.append("user_id", user_id);

        confirm_alert("Are you sure to approve this employee?").then(res => {
            axios.post(`${base_url}manage_employee/approve_employee/`, frmdata).then(res => {
                if (res.data.result) {
                    s_alert("Approved Successfully!", "success");
                    student_table.ajax.reload();
                } else {
                    alert("something wrong!")
                }
            })
        })
    })

    $("#edit_student_form").on("submit", function (e) {
        e.preventDefault();
        let data = JSON.stringify($(this).serializeObject())
        let frmdata = new FormData();

        frmdata.append("frmdata", data)

        confirm_alert("Are you sure to update this student?").then(res => {
            axios.post(`${base_url}manage_employee/update_student`, frmdata).then(res => {
                if (res.data.result) {
                    $(".edit_student_modal").modal("hide");
                    s_alert("Updated Successfully!", "success");
                    student_table.ajax.reload();
                } else {
                    s_alert(res.data.message, "error");
                }
            })
        })

    })


})


