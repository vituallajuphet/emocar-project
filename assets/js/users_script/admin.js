// const { use } = require("browser-sync");

$(document).ready(function () {

    let global_locations = [];

    function _init (){

        axios.get(`${base_url}admin/api_get_locations`).then(res => {
            
            if(res.data.status == "success"){
                global_locations = res.data.data;

            }else{
                errorMessage("Something wrong!")
            }

        }).catch(err => errorMessage("Something wrong!2"))

    }
    _init()


    var employee_table = $('#trans_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            { 
                "data":  "employee_id", "render": function (data, type, row, meta) {
                    return "EMP-"+row.employee_id;
                 }
            },
            { "data": "first_name" },
            { "data": "middle_name" },
            { "data": "last_name" },
            { 
                "data":  "location", "render": function (data, type, row, meta) {
                    return row.usr_location.location_name;
                 }
            },
            { 
                "data":  "branch", "render": function (data, type, row, meta) {
                    return row.usr_branch.branch_name;
                 }
            },
            {
                "data": "employee_id", "render": function (data, type, row, meta) {
                    var btns = `
                    <div class="action_btns"><a class="btn_view" data-id="${row.fk_user_id}" href="#"><i class="fa fa-eye"></i> View</a>  <a data-id="${row.fk_user_id}" class="btn_edit" href="#"><i class="fa fa-pencil"></i> Edit</a> <a class="btn_delete" data-id="${row.fk_user_id}" href="#"><i class="fa fa-trash"></i> Delete</a></div>
                `
                return btns;
                }
            },
        ],
        "ajax": {
            "url": base_url + "admin/get_employees_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [6],
                "orderable": false,
            },
        ],
    });

    $("#add_emp_admin").submit(function(e){
        e.preventDefault();
        
        let frmdata = $(this).serialize();

        axios.post(base_url+"admin/save_employee/", frmdata).then(res =>{

        })

    })

    $(document).on("click",".btn_view", function(){

        const user_id = $(this).data("id");
        $(".preloader").show();
        
        axios.get(`${base_url}/admin/api_get_userinfo/${user_id}`).then(res => {
            $(".preloader").hide();
            if(res.data.status == "success"){
                let dta = res.data.data[0];
                $("#view_user_modal").modal()
                fill_fields(dta, "view");
            }
            else{
                errorMessage("Something wrong!")
            }
        })
        // .catch(err => errorMessage(err))
    })

    $(document).on("click",".btn_edit", function(){

        const user_id = $(this).data("id");
        $(".preloader").show();
        
        axios.get(`${base_url}/admin/api_get_userinfo/${user_id}`).then(res => {
            $(".preloader").hide();
            if(res.data.status == "success"){
                let dta = res.data.data[0];
                fill_locations();
                $("#edit_user_modal").modal()
                fill_fields(dta, "view", "dta_edit_");
                setTimeout(() => { fill_branches(dta.branch.branch_id) }, 500);
            }
            else{
                errorMessage("Something wrong!")
            }
        })
        // .catch(err => errorMessage(err))
    })

    $("#frm_update_user").submit(function (e) { 
        e.preventDefault();
        const frm = $("#frm_update_user");
        let frmdata = new FormData(frm[0]);
        alertConfirm("Are you sure to update this employee information?" , function(){
            $(".preloader").show();
            axios.post(`${base_url}admin/api_update_user/`, frmdata).then(res => {
               $(".preloader").hide();
                // if(res.data.status == "success"){
                //     $("#edit_policy_modal").modal("hide");
                //     successMessage("Successfully Updated!");
                //     trans_table.ajax.reload();
                // }
                // else{
                //     errorMessage("Something wrong!")
                // }
            })
        })
    });
    
    function fill_locations (){
        let locs = `<option value="">Please select...</option>`;

        global_locations.map (loc => {
            locs += `<option data-id=${loc.loc_id} value="${loc.loc_id}">${loc.location_name}</option>`
        })
        $(".dta_edit_location").html(locs);
    }

    function fill_branches(brn_id){

        let location_id = $(".dta_edit_location").val();
        let brnches     = `<option value="">Please select...</option>`;
        let loc = global_locations.filter((loc =>  loc.loc_id == location_id));

        if(loc != undefined && loc.length != 0){

            console.log(brn_id)

            loc[0].branches.map(brn => {
                brnches += `<option ${brn_id == brn.branch_id ? "selected" :""} value="${brn.branch_id}" >${brn.branch_name}</option>`;
            })
        }

        $(".dta_edit_branches").html(brnches);
    }
    
   
    function fill_fields(dta = [], view ="view", $prefix="dta_"){
        if(dta != undefined){
            for (const key in dta) {

            
                if(key == "branch"){
                    $(`.${$prefix}${key}`).val(dta[key].branch_id);
                }
                else if(key == "location"){
                    $(`.${$prefix}${key}`).val(dta[key].loc_id);
                }else{
                    $(`.${$prefix}${key}`).val(dta[key]);
                }

            }
        }
        else{
            errorMessage("Something wrong!");
        }
    }

    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }
})


