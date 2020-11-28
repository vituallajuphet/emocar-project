$(document).ready(function () {

    let global_locations = [];


    function _init (){

        axios.get(`${base_url}admin/api_get_locations`).then(res => {
            
            if(res.data.status == "success"){
                global_locations = res.data.data;

            }else{
                errorMessage("Something wrong!")
            }

        }).catch(err => errorMessage("Something wrong!"))

    }
    _init()


    var branches_table = $('#trans_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "branch_id", "render": function (data, type, row, meta) {
                    return "BID-"+row.branch_id
                }
            },
            { "data": "branch_name" },
            { "data": "location_name" },
            { "data": "date_added" },
            {
                "data": "branch_id", "render": function (data, type, row, meta) {
                    var btns = `
                    <div class="action_btns"><a data-type="${row.branch_id}" data-id="${row.branch_id}" class="btn_edit" href="#"><i class="fa fa-pencil"></i> Edit</a> <a class="btn_delete" data-type="${row.branch_id}" data-id="${row.branch_id}" href="#"><i class="fa fa-trash"></i> Delete</a></div>
                `
                return btns;
                }
            },
        ],
        "ajax": {
            "url": base_url + "admin_branches/get_branches_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [4],
                "orderable": false,
            },
        ],
    });

    $(document).on("click",".btn_edit", function(){

        const brn_id = $(this).data("id");

        $(".preloader").show();
        
        axios.get(`${base_url}/admin_branches/api_get_branch/${brn_id}`).then(res => {
            $(".preloader").hide();
            if(res.data.status == "success"){
                let dta = res.data.data[0];


            }
            else{
                errorMessage("Something Wrong!")
            }
        }).catch(err => errorMessage(err))
    })

    $(".btn_addbranch").on("click", function(){
        let elm = $(".dta_add_location");
        fill_locations(elm)
        $("#add_branch_modal").modal()
    })

    
    $("#frm_add_branch").on("submit", function(e){
       
        e.preventDefault();
        
        let frmdata = $("#frm_add_branch").serialize();

        alertConfirm("Are you sure to save this brancg?", function(){
            $(".preloader").show();
            axios.post(base_url+"admin_branches/api_save_branch/", frmdata).then(res =>{
                $(".preloader").hide();
                if(res.data.status == "success"){
                    successMessage("Saved successfully!")
                    $("#add_branch_modal").modal("hide")
                    branches_table.ajax.reload();
                }else{
                    errorMessage("Something Wrong!");
                }
            }).catch(err => { $(".preloader").hide();errorMessage("Something Wrong!")})
        })
    })

    $(document).on("click",".btn_delete", function(){

        const brn_id = $(this).data("id");
        
        alertConfirm("Are you sure to delete this branch?" , function(){
            let frmdata = new FormData();
            $(".preloader").show();
            frmdata.append("branch_id", brn_id);

            axios.post(`${base_url}admin_branches/api_delete_branch/`, frmdata).then(res => {
                $(".preloader").hide();
                if(res.data.status == "success"){
                    successMessage("Successfully Deleted!");
                    branches_table.ajax.reload();
                }
                else{
                    errorMessage("Something wrong!")
                }
            }).catch(err => { $(".preloader").hide();errorMessage("Something Wrong!")})
        })
    })

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


   
    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }




})


