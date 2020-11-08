$(document).ready(function () {
    // var purchase_orders = $('#purchase_Orders').DataTable();

    var file1_table = $('#file1_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "pk_file_id", "render": function (data, type, row, meta) {
                    var str = 'FL-' + row.pk_file_id;
                    return str;
                }
            },
            { "data": "file_name" },
            {
                "data": "pk_file_id", "render": function (data, type, row, meta) {
                    return "Doc/Teaching Materials";
                }
            },
            { "data": "date_added" },
            {
                "data": "pk_file_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div"> ';
                    str += '<a href="javascript:;" class="btn_edit_file" data-id="' + row.pk_file_id + '" title="edit"><i class="fa fa-edit"></i></a>';
                    str += '<a href="javascript:;" class="btn_delete_file text-danger" data-id="' + row.pk_file_id + '" title="delete"><i class="fa fa-trash"></i></a>';
                    str += '<a href="' + base_url + 'assets/file_uploads/' + row.raw_name + '" download class="download_file text-success" data-id="' + row.pk_file_id + '" title="delete"><i class="fa fa-download"></i></a> </div>';
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "manage_files/get_file_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });

    var file2_table = $('#file2_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "pk_file_id", "render": function (data, type, row, meta) {
                    var str = 'FL-' + row.pk_file_id;
                    return str;
                }
            },
            { "data": "file_name" },
            {
                "data": "pk_file_id", "render": function (data, type, row, meta) {
                    return "Meeting Notes";
                }
            },
            { "data": "date_added" },
            {
                "data": "pk_file_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div"> ';
                    str += '<a href="javascript:;" class="btn_edit_file" data-id="' + row.pk_file_id + '" title="edit"><i class="fa fa-edit"></i></a>';
                    str += '<a href="javascript:;" class="btn_delete_file text-danger" data-id="' + row.pk_file_id + '" title="delete"><i class="fa fa-trash"></i></a>';
                    str += '<a href="' + base_url + 'assets/file_uploads/' + row.raw_name + '" download class="download_file text-success" data-id="' + row.pk_file_id + '" title="delete"><i class="fa fa-download"></i></a> </div>';
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "manage_files/get_meeting_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });

    var file3_table = $('#file3_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "pk_file_id", "render": function (data, type, row, meta) {
                    var str = 'FL-' + row.pk_file_id;
                    return str;
                }
            },
            { "data": "file_name" },
            {
                "data": "pk_file_id", "render": function (data, type, row, meta) {
                    return "Company Policies";
                }
            },
            { "data": "date_added" },
            {
                "data": "pk_file_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div"> ';
                    str += '<a href="javascript:;" class="btn_edit_file" data-id="' + row.pk_file_id + '" title="edit"><i class="fa fa-edit"></i></a>';
                    str += '<a href="javascript:;" class="btn_delete_file text-danger" data-id="' + row.pk_file_id + '" title="delete"><i class="fa fa-trash"></i></a>';
                    str += '<a href="' + base_url + 'assets/file_uploads/' + row.raw_name + '" download class="download_file text-success" data-id="' + row.pk_file_id + '" title="delete"><i class="fa fa-download"></i></a> </div>';
                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "manage_files/get_company_data",
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

    $(document).on("click", ".btn_edit_file", function () {

        let file_id = $(this).data("id");

        axios.get(`${base_url}manage_files/get_file_info/${file_id}`).then(res => {
            if (res.data.result) {
                let file_data = res.data.data;

                $("input[name=f_file_id]").val(file_id)
                $(".f_file").val(file_data.file_name)
                $(".f_file_type").val(file_data.file_type)
                $(".f_add_information").val(file_data.add_information)
            }
        })
        $(".edit_student_modal").modal()
    })

    $("#add_file_form").on("submit", function (e) {
        e.preventDefault();
        // let data = JSON.stringify($(this).serializeObject())
        var frmdata = new FormData(this);

        confirm_alert("Are you sure to save this file?").then(res => {
            axios.post(`${base_url}manage_files/save_file`, frmdata).then(res => {
                if (res.data.result) {
                    $(".add_student_modal").modal("hide");
                    s_alert("Saved Successfully!", "success");
                    file1_table.ajax.reload();
                    file2_table.ajax.reload();
                    file3_table.ajax.reload();
                } else {
                    s_alert(res.data.error, "error");
                }
            })
        })
    })

    $(document).on("click", ".btn_delete_file", function () {
        let file_id = $(this).data("id");

        let frmdata = new FormData();
        frmdata.append("file_id", file_id);

        confirm_alert("Are you sure to delete this file?").then(res => {
            axios.post(`${base_url}manage_files/delete_file`, frmdata).then(res => {
                if (res.data.result) {
                    s_alert("Deleted Successfully!", "success");
                    file1_table.ajax.reload();
                    file2_table.ajax.reload();
                    file3_table.ajax.reload();
                }
                else {
                    s_alert(res.data.error, "error");
                }
            })
        })

    })

    $("#edit_student_form").on("submit", function (e) {
        e.preventDefault();
        var frmdata = new FormData(this);

        confirm_alert("Are you sure to update this file?").then(res => {
            axios.post(`${base_url}manage_files/update_file`, frmdata).then(res => {
                if (res.data.result) {
                    $(".edit_student_modal").modal("hide");
                    s_alert("Updated Successfully!", "success");
                    file1_table.ajax.reload();
                    file2_table.ajax.reload();
                    file3_table.ajax.reload();
                } else {
                    s_alert(res.data.error, "error");
                }
            })
        })

    })


})


