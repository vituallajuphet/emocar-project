$(document).ready(function () {
    // var purchase_orders = $('#purchase_Orders').DataTable();

    let questions = [];
    let questions_edit = [];
    let quiz_data = {}
    let quiz_data_edit = {}
    // get courses
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

    var quizzes_table = $('#quizzes_table').DataTable({
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
                    var str = 'CO-' + row.pk_quiz_id;
                    return str;
                }
            },
            { "data": "quiz_title" },
            { "data": "course_title" },
            { "data": "test_type" },
            { "data": "chapter" },
            { "data": "total_items" },
            { "data": "rate" },
            {
                "data": "date_added", "render": function (data, type, row, meta) {
                    var str = getDateFormat(row.date_added)

                    return str;
                }
            },
            {
                "data": "pk_user_id", "render": function (data, type, row, meta) {
                    var str = '<div class="mx-auto action-btn-div">';
                    str += '<a href="javascript:;" class="btn_edit_quiz" data-id="' + row.pk_quiz_id + '" title="updated"><i class="fa fa-edit"></i></a>';
                    str += '<a href="javascript:;" class="btn_delete_quiz text-danger" data-id="' + row.pk_quiz_id + '" title="Receive"><i class="fa fa-trash"></i></a> </div>';
                    return str; 
                }
            },
        ],
        "ajax": {
            "url": base_url + "managequizzes/get_quizzes_data",
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
        $(".add_quiz_modal").modal()
        questions = [];
        quiz_data = {};
        $("#accordion").html("");
    })

    $(document).on("click", ".btn_view_quiz", function () {
        let quiz_id = $(this).data("id");
        alert(quiz_id)
    })

    $(document).on("click", ".btn_edit_quiz", function () {
        let quiz_id = $(this).data("id");
        questions_edit = [];
        axios.get(`${base_url}managequizzes/get_questionaire_data/${quiz_id}`).then(res => {
            if (res.data.result) {
                let data = res.data.data;

                $(".quiz_id_edit").val(data.pk_quiz_id)
                $(".quiz_title_edit").val(data.quiz_title)
                $("#course_id_edit").val(data.fk_course_id)
                $("#chapter_edit").val(data.chapter)
                $("#test_type_edit").val(data.test_type)
                
                $("#rate_edit").val(data.rate)
                $(".quiz_description_edit").val(data.quiz_description)
                
                data.questions.map(qst => {

                    let obj_quest = {
                        quest_type: qst.question_type,
                        question: qst.question,
                        choices: JSON.parse(qst.choices),
                        answer: qst.answer
                    }

                    questions_edit.push(obj_quest);
                })


                generate_question_Table(questions_edit, "#accordion_edit", "remove-question_edit");

                $(".edit_quiz_modal").modal();
            }
        })

        
    })

    $(document).on("click", ".btn_delete_quiz", function () {
        let quiz_id = $(this).data("id");
        confirm_alert("Are you sure to delete this quiz?").then(resp => {
            
            let frmdata = new FormData();
            frmdata.append("quiz_id", quiz_id);

            axios.post(`${base_url}managequizzes/delete_quiz`, frmdata).then(res => {
                if (res.data.result) {
                    quizzes_table.ajax.reload();
                    s_alert("Deleted Successfully!", "success");
                }
            })

        })
    })


    $("#add_quiz_form").submit(function (e) {
        e.preventDefault()
        $('.add_quiz_question').modal();
        $(".add_quiz_modal").modal("hide")
        questions = [];
        quiz_data = {
            title            : $(".quiz_title").val(),
            course_id        : $("#course_id").val(),
            chapter          : $("#chapter").val(),
            test_type        : $("#test_type").val(),
            rate             : $("#rate").val(),
            quiz_description : $(".quiz_description").val(),
        }
    })

    $("#edit_quiz_form").submit(function (e) {
        e.preventDefault()
        $('.edit_quiz_question').modal();
        $(".edit_quiz_modal").modal("hide")
        quiz_data_edit = {
            quiz_id: $(".quiz_id_edit").val(),
            title: $(".quiz_title_edit").val(),
            course_id: $("#course_id_edit").val(),
            chapter: $("#chapter_edit").val(),
            test_type: $("#test_type_edit").val(),
            rate: $("#rate_edit").val(),
            quiz_description: $(".quiz_description_edit").val(),
        }
    })


    $("#chapter, #course_id").change(function () {
        let chapter = $("#chapter").val();
        let course = $("#course_id").val()

        if ((chapter != "" && chapter != undefined) && course != "" && course != undefined) {
            validate_chapter({ chapter, course});
        }
        
    })

    function validate_chapter(obj) {
        let frmdata = new FormData();
        frmdata.append("frmdata", JSON.stringify(obj))
        axios.post(`${base_url}/global_api/validate_chapter/`, frmdata).then(res => {
            if (res.data.result) {
                if (res.data.code == 1) {
                    s_alert("Chapter in this course is already exists!", "error");
                    $("#chapter").val("");
                    $("#course_id").val("")
                }
            }
            
        })
    }

    $("#save_quest_form").submit(function (e) {
        e.preventDefault()
        
        if (questions.length < 3) {
            s_alert("Please add at least five questions", "error");
        }
        else {
            confirm_alert("Are you sure to save this quiz?").then(res => {
                let frmdata = new FormData();

                frmdata.append("quiz_data", JSON.stringify(quiz_data));
                frmdata.append("questions", JSON.stringify(questions));

                axios.post(`${base_url}managequizzes/save_quiz`, frmdata).then(res => {
                    if (res.data.result == "success") {
                        questions = [];
                        quiz_data = {};
                        quizzes_table.ajax.reload();
                        s_alert("Saved Successfully!", "success");
                        $(".add_quiz_question").modal("hide");
                    }
                })
            })
        }
    })


    $("#edit_quest_form").submit(function (e) {
        e.preventDefault()

        if (questions_edit.length < 3) {
            s_alert("Please add at least five questions", "error");
        }
        else {
            confirm_alert("Are you sure to update this quiz?").then(res => {
                let frmdata = new FormData();

                frmdata.append("quiz_data", JSON.stringify(quiz_data_edit));
                frmdata.append("questions", JSON.stringify(questions_edit));

                axios.post(`${base_url}managequizzes/update_quiz`, frmdata).then(res => {
                    if (res.data.result == "success") {
                        questions_edit = [];
                        quiz_data_edit = {};
                        quizzes_table.ajax.reload();
                        s_alert("Updated Successfully!", "success");
                        $(".edit_quiz_question").modal("hide");
                    }
                })
            })
        }
    })
    

    $(".btn-add-question").click(function () {
        let q_type = $(".quest_type").val();
        let question = $(".question").val();
        let answer = $(".answer").val();

        let has_empty_choice = false;

        let choice = [];

        $(".choices").each(function () {
            choice.push($(this).val());
            if ($(this).val() == "") {
                has_empty_choice = true;
            }
        })

        if (q_type == "" || question == "" || answer == "" || has_empty_choice) {
            s_alert("Please input the required fields", "error");
        }
        else {
            
            let obj_quest = {
                quest_type: q_type,
                question: question,
                choices: choice,
                answer: answer
            }

            questions.push(obj_quest);

            generate_question_Table(questions);
        }
        
    })

    $(".btn-add-edit-question").click(function () {
        let q_type = $(".quest_type_edit").val();
        let question = $(".question_edit").val();
        let answer = $(".answer_edit").val();

        let has_empty_choice = false;

        let choice = [];

        $(".choices_edit").each(function () {
            choice.push($(this).val());
            if ($(this).val() == "") {
                has_empty_choice = true;
            }
        })

        if (q_type == "" || question == "" || answer == "" || has_empty_choice) {
            s_alert("Please input the required fields", "error");
        }
        else {

            let obj_quest = {
                quest_type: q_type,
                question: question,
                choices: choice,
                answer: answer
            }

            questions_edit.push(obj_quest);

            generate_question_Table(questions_edit, "#accordion_edit", "remove-question_edit");
        }

    })

    function generate_question_Table(questionaire, renderElem = "#accordion", removeBtn = "remove-question") {
        let html = "";

        questionaire.map((quest, index) => {

            html += `
                    <div class="card">
                        <div class="card-header">
                            <a class="card-link" data-toggle="collapse" href="#collapse${index + 1}">
                                Question #${index + 1}
                            </a>
                            <a class="text-danger ${removeBtn} ml-3" href="javascript:;" data-index="${index}"><i class="fa fa-remove"></i></a>
                        </div>
                        <div id="collapse${index + 1}" class="collapse" data-parent="${renderElem}">
                            <div class="card-body">
                                <div class="form row">
                                    <div class="col-md-12">
                                        <h5 class="fbold">Question:</h5>
                                        <p>${quest.question}</p>
                                         <hr>
                                    </div>
                                    <div class="col-md-6">
                                        <h5 class="fbold">Choices:</h5>
                                        <div class="fbold">A. <span style="font-weight:normal;">${quest.choices[0]}</span></div> 
                                        <div class="fbold">B. <span style="font-weight:normal;">${quest.choices[1]}</span></div> 
                                        <div class="fbold">C. <span style="font-weight:normal;">${quest.choices[2]}</span></div> 
                                        <div class="fbold">D. <span style="font-weight:normal;">${quest.choices[3]}</span></div> 
                                    </div>
                                    <div class="col-md-6">
                                        <h5 class="fbold">Answer: </h5>
                                        <div style="font-weight:normal;"></div> 
                                        <div class="fbold">Letter <span style="font-weight:normal;">${quest.answer}</span></div>
                                        
                                    </div>
                                </div>  
                            
                            </div>
                        </div>
                    </div>

                `
        })

        $(renderElem).html(html);

        $(".quest_type").val("");
        $(".question").val("");
        $(".answer").val("");

        $(".choices").each(function () {
            $(this).val("")
        })

        $(".quest_type_edit").val("");
        $(".question_edit").val("");
        $(".answer_edit").val("");

        $(".choices_edit").each(function () {
            $(this).val("")
        })
    }

    $(document).on("click", ".remove-question", function () {
        let index = $(this).data("index");

        questions = questions.filter((quest, ind) => index != ind);

        generate_question_Table(questions);

    })

    $(document).on("click", ".remove-question_edit", function () {
        let index = $(this).data("index");

        console.log(questions_edit)

        questions_edit = questions_edit.filter((quest, ind) => index != ind);

        generate_question_Table(questions_edit, "#accordion_edit", "remove-question_edit");

    })




    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }


})


