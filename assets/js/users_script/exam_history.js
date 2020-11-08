$(document).ready(function () {
    // var purchase_orders = $('#purchase_Orders').DataTable();

    let questions = [];
    let questions_edit = [];
    let quiz_data = {}
    let quiz_data_edit = {}
    
    // get courses


    var history_table = $('#history_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            { "data": "quiz_result_id" },
            { "data": "test_type" },
            { "data": "course_title" },
            { "data": "quiz_title" },
            { "data": "chapter" },
            { "data": "score" },
            { "data": "total_items" },
            {
                "data": "quiz_status", "render": function (data, type, row, meta) {
                    let row_class = (row.quiz_status == "failed") ? "text-danger" : "text-success";
                    return `<span class="fbold ${row_class}">${row.quiz_status}</span>`
                }
            },
            { "data": "taken" },
            {
                "data": "date_added", "render": function (data, type, row, meta) {
                    var str = getDateFormat(row.date_added)

                    return str;
                }
            },
            {
                "data": "pk_quiz_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div">';
                    str += '<a href="' + base_url + 'exam_history/view_results/' + row.quiz_result_id + '" class="btn_view_res text-success" data-id="' + row.quiz_result_id + '" title="updated"><i class="fa fa-eye"></i> View</a>';
                    
                    return str; 
                }
            },
        ],
        "ajax": {
            "url": base_url + "exam_history/get_history_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });

    var history_table_exam = $('#history_table_exam').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            { "data": "exam_result_id" },
            { "data": "course_title" },
            { "data": "exam_title" },
            { "data": "score" },
            { "data": "total_items" },
            {
                "data": "exam_status", "render": function (data, type, row, meta) {
                    let row_class = (row.exam_status == "failed") ? "text-danger" : "text-success";
                    return `<span class="fbold ${row_class}">${row.exam_status}</span>`
                }
            },
            {
                "data": "date_added", "render": function (data, type, row, meta) {
                    var str = getDateFormat(row.date_added)

                    return str;
                }
            },
            {
                "data": "exam_result_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div">';
                    str += '<a href="' + base_url + 'exam_history/view_results_exam/' + row.exam_result_id + '" class="btn_view_res text-success" data-id="' + row.exam_result_id + '" title="updated"><i class="fa fa-eye"></i> View</a>';

                    return str;
                }
            },
        ],
        "ajax": {
            "url": base_url + "exam_history/get_history_exam_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });


    $(".btn-view-result").click(function () {
        axios.get(`${base_url}global_api/get_my_course`).then(res => {
            if (res.data.result) {
                
                let datas = res.data.data;
                let html = "<option value=''>Please Select.</option>";

                datas.map(data => {
                    html += `<option value='${data.pk_course_id}'>${data.course_title}</option>`;
                })

                $("#select_course").html(html);

                $(".overall_modal").modal();
                $(".tr-body-over-res").html('<tr class="text-center"> <td colspan="7">No data found...</td> </tr>')

            }
            else {
                s_alert("Something went wrong!", "error");
            }
        })
        
    })

    $("#select_course").change(function () {
        let course_id = $(this).val();
        
        if (course_id != 0 && course_id != "" && course_id != undefined) {
            
            let frmdata = new FormData();
            frmdata.append("course_id", course_id);

            $(".tr-body-over-res").html("")

            axios.post(`${base_url }exam_history/get_overall_result`, frmdata).then(res => {
                if (res.data.result) {
                    let datas = res.data.data.quiz_data;
                    let lopdata = datas;

                    for (let index = 0; index < lopdata.length; index++) {
                        if (lopdata[index].taken == 2) {
                            let chapter = lopdata[index].chapter;
                            

                            let find_id = datas.find((data) => (data.taken == 1 && data.chapter == chapter))
                            
                           
                             datas = datas.filter(data => data.quiz_result_id != find_id.quiz_result_id)
                            
                           
                        }
                    }

                    let html = "";

                    let over_total_percentage = 0;

                    datas.map(data => {
                        let total_rate = (Number(data.rate) / 100) * Number(data.percent)

                        over_total_percentage += total_rate;

                        html += `
                            <tr>
                                <td>${data.quiz_title}</td>
                                <td>${data.rate}%</td>
                                <td><span class="fbold">${data.score}</span> out of <span class="fbold">${data.total_items}</span></td>
                                <td>${data.percent}%</td>
                                <td>${total_rate}%</td>
                                <td>${data.taken} take</td>
                                <td class="fbold">${data.res_status}</td>
                            </tr>
                        `
                    })

                    $(".tr-body-over-res").append(html);

                    // workbook

                    html = "";
                    let wb_data = res.data.data.wb_data;

                    if (wb_data.length == 0) {
                        html = `
                            <tr>
                                <td class="text-center text-danger" colspan="7">No Workbook data...</td>
                            </tr>
                        `;
                    }
                    else {
                        wb_data.map(data => {
                           
                            let wp_percent = (data.score / data.total_items) * 100;

                            let total_rate = (Number(data.rate) / 100) * Number(wp_percent)

                            over_total_percentage += total_rate;



                            html += `
                            <tr>
                                <td>${data.title}</td>
                                <td>${data.rate}%</td>
                                <td><span class="fbold">${data.score}</span> out of <span class="fbold">${data.total_items}</span></td>
                                <td>${wp_percent}%</td>
                                <td>${total_rate.toFixed(2)}%</td>
                                <td>1 take</td>
                                <td class="fbold">${wp_percent < 80 ? "failed" : "passed"}</td>
                            </tr>
                        `
                        })
                    }

                    $(".tr-body-over-res").append(html);

                    // exam data

                    html = "";
                    let exam_data = res.data.data.exam_data;

                    if (exam_data.length == 0) {
                        html = `
                            <tr>
                                <td class="text-center text-danger" colspan="7">No Exam data...</td>
                            </tr>
                        `;
                    }
                    else {
                        exam_data.map(data => {
                            let total_rate = (Number(data.rate) / 100) * Number(data.percent)

                            over_total_percentage += total_rate;

                            html += `
                            <tr>
                                <td>${data.exam_title}</td>
                                <td>${data.rate}%</td>
                                <td><span class="fbold">${data.score}</span> out of <span class="fbold">${data.total_items}</span></td>
                                <td>${data.percent}%</td>
                                <td>${total_rate}%</td>
                                <td>1 take</td>
                                <td class="fbold">${data.res_status}</td>
                            </tr>
                        `
                        })
                    }

                    $(".tr-body-over-res").append(html);

                    let over_res = (over_total_percentage / 100) * 100;


                    let rowcount = 0;
                    $(".tr-body-over-res tr").each(function () {
                        rowcount++;
                    })

                    let course_percentage = (rowcount / 7) * 100;

                    $(".course_completion").html(Math.round(course_percentage)+"%");
                    $(".over-pass").html(over_res < 80 ? "Failed" : "Passed")

                    $(".over-res").html(over_res.toFixed(2) + '%');


                    
                }
            })

        }

    })

    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }




})


