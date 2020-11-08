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
            {
                "data": "pk_user_id", "render": function (data, type, row, meta) {
                    return "ST-" + row.pk_user_id;
                }
            },
            { "data": "firstname" },
            { "data": "lastname" },
            { "data": "course_title" },
            {
                "data": "pk_quiz_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div">';
                    str += '<a href="' + base_url + 'student_results/view_all_results/' + row.pk_user_id + '" class="btn_view_res text-success" data-id="' + row.quiz_result_id + '" title="updated"><i class="fa fa-eye"></i> View  Results</a>';
                    
                    return str; 
                }
            },
        ],
        "ajax": {
            "url": base_url + "student_results/get_student_data_result",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });

    $("#sel_course").change(function () {
        
        let course_id = $(this).val();
        let user_id = $(".user_id").val();
        let course_name =  $("#sel_course option:selected").html();

        if (course_id != "" && course_id != undefined && course_id != 0) {
            
            let frmdata = new FormData();
            frmdata.append("course_id", course_id)
            frmdata.append("user_id", user_id)
            axios.post(`${base_url }student_results/get_all_results`, frmdata).then(res => {
                if (res.data.result) {
                    
                    let datas = res.data.data;

                    let quiz_datas = datas.quiz_data;

                    let html = "";
                
                    let over_total_percentage = 0;

                    if (quiz_datas.length == 0) {
                        html = `
                            <tr>
                                <td class="text-center text-danger" colspan="11">No data found...</td>
                            </tr>
                        `;
                    }
                    else {
                        quiz_datas.map(data => {

                            let total_rate = (Number(data.rate) / 100) * Number(data.percent)

                            let chap = data.chapter;

                            let arr_search = quiz_datas.filter(dta => dta.chapter == chap);

                            let st_class = "";

                            if (arr_search.length == 1) {
                                st_class = "valid_row";
                                over_total_percentage += total_rate;
                            }

                            if (data.taken == 2) {
                                st_class = "valid_row";
                                over_total_percentage += total_rate;
                            }

                           

                            html += `
                            <tr class="${st_class}">
                                <td>${data.quiz_title}</td>
                                <td>${course_name}</td>
                                <td>${data.chapter}</td>
                                <td>${data.rate}%</td>
                                <td>${data.test_type}</td>
                                <td>${data.taken}</td>
                                <td><span class="fbold">${data.score}</span> out of <span class="fbold">${data.total_items}</span></td>
                                <td>${data.percent}%</td>
                                <td>${total_rate}%</td>
                                <td class="fbold">${data.res_status}</td>
                                <td>
                                    <a target="_blank" class="text-success" href="${base_url}student_results/view_quiz_result/${data.quiz_result_id}"><i class="fa fa-eye"></i> View</a>
                                </td>
                            </tr>
                        `
                        })
                    }

                    $(".tb-quiz").html(html);

                    // wb data

                    let wb_datas = datas.wb_data;

                    html = "";

                    if (wb_datas.length == 0) {
                        html = `
                            <tr>
                                <td class="text-center text-danger" colspan="8">No data found...</td>
                            </tr>
                        `;
                    }
                    else {
                        wb_datas.map(data => {

                            let wp_percent = (data.score / data.total_items) * 100;

                            let total_rate = (Number(data.rate) / 100) * Number(wp_percent)

                            over_total_percentage += total_rate;

                            html += `
                            <tr>
                                <tr class="valid_row">
                                <td>${data.title}</td>
                                <td>${course_name}</td>
                                <td>${data.rate}%</td>
                                <td><span class="fbold">${data.score}</span> out of <span class="fbold">${data.total_items}</span></td>
                                <td>${wp_percent}%</td>
                                <td>${total_rate.toFixed(2)}%</td>
                                <td class="fbold">${wp_percent < 80 ? "failed" : "passed"}</td>
                                <td>
                                    <a download class="text-success" href="${base_url}/assets/wb_answer_upload/${data.file_answer}"><i class="fa fa-eye"></i> View Answer</a>
                                </td>
                        `
                        })
                    }

                    $(".tb-workbook").html(html);

                    // exam data

                    let exam_datas = datas.exam_data;

                    html = "";
                    

                    if (exam_datas.length == 0) {
                        html = `
                            <tr>
                                <td class="text-center text-danger" colspan="9">No data found...</td>
                            </tr>
                        `;
                    }
                    else {
                        exam_datas.map(data => {

                            let total_rate = (Number(data.rate) / 100) * Number(data.percent)

                            over_total_percentage += total_rate;

                            html += `
                            <tr class="valid_row">
                                <td>${data.exam_title}</td>
                                <td>${course_name}</td>
                                <td>${data.rate}%</td>
                                <td><span class="fbold">${data.score}</span> out of <span class="fbold">${data.total_items}</span></td>
                                <td>${data.percent}%</td>
                                <td>${total_rate}%</td>
                                <td class="fbold">${data.res_status}</td>
                                <td>
                                    <a target="_blank" class="text-success" href="${base_url}student_results/view_exam_result/${data.exam_result_id}"><i class="fa fa-eye"></i> View</a>
                                </td>
                            </tr>
                        `
                        })
                    }

                    $(".tb-exam").html(html);

                    let valid_row = 0;
                    $(".valid_row").each(function () {
                        valid_row++;
                    })              
                    
                    let over_res = (over_total_percentage / 100) * 100;

                    let course_percentage = (valid_row / 7) * 100;

                    $(".course_completion").html(Math.round(course_percentage) + "%");
                     $(".over-pass").html(over_res < 80 ? "Failed" : "Passed")

                    $(".over-res").html(over_res.toFixed(2) + '%');


                }
            })

        }

    })

    $(".btn_send_result").click(function () {
        let over_result = $(".course_completion").html();

        let quiz_object = [];
        let wb_object = [];
        let exam_object = [];

        $(".tb-quiz tr.valid_row").each(function () {
            let title = $(this).find("td:first-child").html();
            let chapter = $(this).find("td:nth-child(3)").html();
            let score = $(this).find("td:nth-child(7)").text();
            let status = $(this).find("td:nth-child(10)").text();
            
            quiz_object.push({
                title: title,
                chapter: chapter,
                score: score,
                status: status,
            })
            
        })

        $(".tb-workbook tr.valid_row").each(function () {
            let title = $(this).find("td:first-child").html();
            let score = $(this).find("td:nth-child(4)").text();
            let status = $(this).find("td:nth-child(7)").text();

            wb_object.push({
                title: title,
                score: score,
                status: status,
            })

        })

        $(".tb-exam tr.valid_row").each(function () {
            let title = $(this).find("td:first-child").html();
            let score = $(this).find("td:nth-child(4)").text();
            let status = $(this).find("td:nth-child(7)").text();

            exam_object.push({
                title: title,
                score: score,
                status: status,
            })

        })

        let html_data = {
            quiz_object,
            wb_object,
            exam_object
        }


        if (over_result != "100%") {
            s_alert("Course completion must be 100% before sending the result!", "error")
            return;
        }

        confirm_alert("Are you sure to send the overall results to this student?").then(res => {
            $(".preloader").show();
            let course_id = $(this).val();
            let user_id = $(".user_id").val();
            let over_result = $(".over-res").html();
            let over_status = $(".over-pass").html();


            let frmdata = new FormData();
            frmdata.append("course_id", course_id)
            frmdata.append("user_id", user_id)
            frmdata.append("over_result", over_result)
            frmdata.append("over_status", over_status)
            frmdata.append("html_data", JSON.stringify(html_data))

            axios.post(`${base_url}student_results/send_email_result`, frmdata).then(res => {
                $(".preloader").hide();
                if (res.data.result) {
                    s_alert("Result sent!", "success");
                }
            })


        })

    })


    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }




})


