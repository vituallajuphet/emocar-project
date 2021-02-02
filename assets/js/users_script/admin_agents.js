// const { use } = require("browser-sync");

$(document).ready(function () {

    let global_locations = [];


    function _init (){

        axios.get(`${base_url}admin_agents/api_get_locations`).then(res => {
            
            if(res.data.status == "success"){
                global_locations = res.data.data;

            }else{
                errorMessage("Something wrong!")
            }

        }).catch(err=>{errorMessage("Something Wrong!"); ehide(".preloader");} )

    }
    _init()


    var employee_table = $('#trans_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "bDestroy":true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            { 
                "data":  "employee_id", "render": function (data, type, row, meta) {
                    return "USER-"+row.fk_user_id;
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
                "data": "fk_user_id", "render": function (data, type, row, meta) {
                    var btns = `
                    <div class="action_btns"><a class="btn_view" data-type="${row.user_type}" data-id="${row.fk_user_id}" href="#"><i class="fa fa-eye"></i> View</a>  <a data-type="${row.user_type}" data-id="${row.fk_user_id}" class="btn_edit" href="#"><i class="fa fa-pencil"></i> Edit</a> <a class="btn_delete" data-type="${row.user_type}" data-id="${row.fk_user_id}" href="#"><i class="fa fa-trash"></i> Delete</a></div>
                `
                return btns;
                }
            },
        ],
        "ajax": {
            "url": base_url + "admin_agents/get_employees_data",
            "type": "POST",
            "data" : function(dta){
                dta.sortby = $(".tab_sort_value").val();
            }
                
        },
        "columnDefs": [
            {
                "targets": [6],
                "orderable": false,
            },
        ],
    });

    // sorter button function
    $(".btn_sort_employee").click(function(){
        $(".tab_sort_value").val("employee");
        employee_table.ajax.reload();
        $(".user_header").html("List of Employees");
    })    
    $(".btn_sort_admin").click(function(){
        $(".tab_sort_value").val("admin");
        employee_table.ajax.reload();
        $(".user_header").html("List of Administrator");
        
    })  
    $(".btn_sort_semiadmin").click(function(){
        $(".tab_sort_value").val("semi");
        employee_table.ajax.reload();
        $(".user_header").html("List of Semi Administrator");
    })  

    

    $("#add_emp_admin").on("submit", function(e){
       
        e.preventDefault();
        
        let passval = $(".add_password").val();
        if(passval.length < 6){
            errorMessage("Password must be 6 characters!");
            return;
        } 

        let frmdata = $("#add_emp_admin").serialize();

        alertConfirm("Are you sure to save this user?", function(){
            console.log(frmdata)
            eshow(".preloader");
            axios.post(base_url+"admin_agents/save_employee/", frmdata).then(res =>{
                 ehide(".preloader");
                if(res.data.status == "success"){
                    successMessage("Saved successfully!")
                    $(".pop_app_add_Emp").removeClass("active_popup");
                    $("#add_emp_admin select, #add_emp_admin input").val("");

                }else{
                    errorMessage(res.data.message);
                }
            }).catch(err=>{errorMessage("Something Wrong!"); ehide(".preloader");} )
        })
    })

    

    $(document).on("click",".btn_view", function(){

        const user_id = $(this).data("id");
        const user_type = $(this).data("type");
         eshow(".preloader");
        
        axios.get(`${base_url}/admin_agents/api_get_userinfo/${user_id}?type= ${user_type}`).then(res => {
             ehide(".preloader");
            if(res.data.status == "success"){
                let dta = res.data.data[0];

                const profile_pic = dta.profile_name == "" ?
                                    `${base_url}assets/profiles/dummy-profile.jpg` :
                                    `${base_url}assets/profiles/${dta.profile_name}`;
                $(".user_profile_cont img").attr("src", profile_pic);

                dta.user_type = "Agent";
                $("#view_user_modal").modal()
                fill_fields(dta, "view");
            }
            else{
                errorMessage("Something wrong!")
            }
        }).catch(err => {  ehide(".preloader");errorMessage("Something Wrong!")})
    })

    $(document).on("click",".btn_delete", function(){

        const user_id = $(this).data("id");
        const user_type = $(this).data("type");
        
        alertConfirm("Are you sure to delete this employee" , function(){
            let frmdata = new FormData();
             eshow(".preloader");
            frmdata.append("user_id", user_id )

            axios.post(`${base_url}admin_agents/api_delete_employee/`, frmdata).then(res => {
                 ehide(".preloader");
                if(res.data.status == "success"){
                    successMessage("Successfully Deleted!");
                    employee_table.ajax.reload();
                }
                else{
                    errorMessage("Something wrong!")
                }
            }).catch(err => { console.log(err); ehide(".preloader");errorMessage("Something Wrong!")})
        })
    })

    $(document).on("click",".btn_edit", function(){

        const user_id = $(this).data("id");
        const user_type = $(this).data("type");

        eshow(".preloader");
        
        axios.get(`${base_url}/admin_agents/api_get_userinfo/${user_id}?type=${user_type}`).then(res => {
             ehide(".preloader");
            if(res.data.status == "success"){
                let dta = res.data.data[0];
                dta.hidden_user_type = dta.user_type;
                dta.user_type = "Agent"
                fill_locations();
                $("#edit_user_modal").modal()
                fill_fields(dta, "view", "dta_edit_");
                setTimeout(() => { fill_branches(dta.branch.branch_id) }, 500);
            }
            else{
                errorMessage("Something wrong!")
            }
        }).catch(err => {  ehide(".preloader");errorMessage("Something Wrong!")})
    })

    $("#frm_update_user").submit(function (e) { 
        e.preventDefault();
        const frm = $("#frm_update_user");
        let frmdata = new FormData(frm[0]);
        alertConfirm("Are you sure to update this employee information?" , function(){
             eshow(".preloader");
            axios.post(`${base_url}admin_agents/api_update_user/`, frmdata).then(res => {
                ehide(".preloader");
                if(res.data.status == "success"){
                    $("#edit_user_modal").modal("hide");
                    successMessage("Successfully Updated!");
                    employee_table.ajax.reload();
                }
                else{
                    errorMessage("Something wrong")
                }
            }).catch(err => { ehide(".preloader");errorMessage("Something Wrong!")})
        })

    });
    
    function fill_locations (elem = ""){
        let locs = `<option value="">Please select...</option>`;

        global_locations.map (loc => {
            locs += `<option data-id=${loc.loc_id} value="${loc.loc_id}">${loc.location_name}</option>`
        })

        if(elem == ""){
            $(".dta_edit_location").html(locs);
        }
        else{
            elem.html(locs);
        }
    }

    function fill_branches(brn_id){

        let location_id = $(".dta_edit_location").val();
        let brnches     = `<option value="">Please select...</option>`;
        let loc = global_locations.filter((loc =>  loc.loc_id == location_id));

        if(loc != undefined && loc.length != 0){
            loc[0].branches.map(brn => {
                brnches += `<option ${brn_id == brn.branch_id ? "selected" :""} value="${brn.branch_id}" >${brn.branch_name}</option>`;
            })
        }

        $(".dta_edit_branches").html(brnches);
    }
    
    $(".addemp_button").on("click", function(){

        let elem = $(".add_location");
        fill_locations(elem); 

        $(".add_location").trigger("change");

        $(".pop_app_add_Emp").addClass("active_popup"); 
     });

     

    $(".close_pop_up").on("click", function(){
        $(".pop_app_add_Emp").removeClass("active_popup"); 
    });


    $(".add_location").change(function(){

        const loc_value = $(this).val();

        if(loc_value != "" && loc_value != undefined){
            let location = global_locations.find(loc => loc.loc_id == loc_value);

            if(location != "" && location != undefined){
                const branches = location.branches;

                if(branches.length != 0){
                    let option  = `<option value="">Please select...</option>`;
                    
                    branches.map(brn => {
                        option += `<option value="${brn.branch_id}">${brn.branch_name}</option>`;
                    })

                    $(".add_branch").html(option);
                }
            }
        }
    })

    $(".dta_edit_location").change(function(){

        const loc_value = $(this).val();

        if(loc_value != "" && loc_value != undefined){
            let location = global_locations.find(loc => loc.loc_id == loc_value);

            if(location != "" && location != undefined){
                const branches = location.branches;

                if(branches.length != 0){
                    let option  = '';
                    
                    branches.map(brn => {
                        option += `<option value="${brn.branch_id}">${brn.branch_name}</option>`;
                    })

                    $(".dta_edit_branches").html(option);
                }
            }
        }
    })

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


