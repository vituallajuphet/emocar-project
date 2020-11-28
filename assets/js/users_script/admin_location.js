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


    var location_tble = $('#trans_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            {
                "data": "loc_id", "render": function (data, type, row, meta) {
                    return "LID-"+row.loc_id
                }
            },
            { "data": "location_name" },
            { "data": "date_added" },
            {
                "data": "loc_id", "render": function (data, type, row, meta) {
                    var btns = `
                    <div class="action_btns"><a data-type="${row.loc_id}" data-id="${row.loc_id}" class="btn_edit" href="#"><i class="fa fa-pencil"></i> Edit</a> <a class="btn_delete" data-type="${row.loc_id}" data-id="${row.loc_id}" href="#"><i class="fa fa-trash"></i> Delete</a></div>
                `
                return btns;
                }
            },
        ],
        "ajax": {
            "url": base_url + "admin_location/get_location_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [3],
                "orderable": false,
            },
        ],
    });

    $(document).on("click",".btn_edit", function(){

        const loc_id = $(this).data("id");

        eshow(".preloader");
        axios.get(`${base_url}/admin_location/api_get_location/${loc_id}`).then(res => {
            ehide(".preloader")
            if(res.data.status == "success"){
                let dta = res.data.data[0];
                $(".dta_edit_location").val(dta.location_name);
                $(".dta_edit_loc_id").val(dta.loc_id);
                
                mshow("#edit_location_modal");
            }
            else{
                errorMessage("Something Wrong!")
            }
        }).catch(err => {errorMessage("Something Wrong!");ehide(".preloader");})
    })

    $(".btn_addlocation").on("click", function(){
        let elm = $(".dta_add_location");
        mshow("#add_location_modal");
    })

    
    $("#frm_add_location").on("submit", function(e){
       
        e.preventDefault();
        
        let frmdata = $("#frm_add_location").serialize();

        alertConfirm("Are you sure to save this location?", function(){
            eshow(".preloader");
            axios.post(base_url+"admin_location/api_save_location/", frmdata).then(res =>{
                 ehide(".preloader");
                if(res.data.status == "success"){
                    successMessage("Saved successfully!")
                    mhide("#add_location_modal");
                    location_tble.ajax.reload();
                }else{
                    errorMessage(res.data.message);
                }
            }).catch(err => {ehide(".preloader");errorMessage("Something Wrong!")})
        })
    })

    $("#frm_edit_location").on("submit", function(e){
       
        e.preventDefault();
    
        let frmdata = $("#frm_edit_location").serialize();

        alertConfirm("Are you sure to update this location?", function(){
             eshow(".preloader");
            axios.post(base_url+"admin_location/api_update_location/", frmdata).then(res =>{
                 ehide(".preloader");
                if(res.data.status == "success"){
                    successMessage("Updated successfully!")
                   mhide("#edit_location_modal");
                    location_tble.ajax.reload();
                }else{
                    errorMessage(res.data.message);
                }
            }).catch(err => {ehide(".preloader");errorMessage("Something Wrong")})
        })
    })

    

    $(document).on("click",".btn_delete", function(){

        const loc_id = $(this).data("id");
        
        alertConfirm("Are you sure to delete this location?" , function(){
            let frmdata = new FormData();
             eshow(".preloader");
            frmdata.append("loc_id", loc_id);

            axios.post(`${base_url}admin_location/api_delete_location/`, frmdata).then(res => {
                 ehide(".preloader");
                if(res.data.status == "success"){
                    successMessage("Successfully Deleted!");
                    location_tble.ajax.reload();
                }
                else{
                    errorMessage(res.data.message)
                }
            }).catch(err => {  ehide(".preloader");errorMessage("Something Wrong!")})
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


