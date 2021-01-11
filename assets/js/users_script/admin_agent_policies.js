
$(document).ready(function () {

    let global_locations = [];
    let sorted_by = {sorted:"", sorted_value:""};
    let global_users = [];

    function _init (){

        get_all_users();
        
        axios.get(`${base_url}admin/api_get_locations`).then(res => {
            
            if(res.data.status == "success"){
                global_locations = res.data.data;
                let elm = $("#sel_sort_location");
                fill_locations(elm)
                $("#sel_sort_location").select2();

            }else{
                errorMessage("Something Wrong!")
            }

        }).catch(err=>{errorMessage("Something Wrong!"); ehide(".preloader");} )

        // $('#sel_sort_user').select2();

    }
    _init()

    function get_all_users(){

        axios.get(`${base_url}admin_policies/api_get_all_users`).then(res => {
            
            if(res.data.status == "success"){
                global_users = res.data.data;

                let options = "<option value=''>Please select...</option>";
                global_users.map(usr => {
                    options += `<option data-loc="${usr.fk_location_id}" data-branch="${usr.branch_id}" value="${usr.user_id}">${usr.first_name} ${usr.last_name}</option>`;
                })
                
                $('#sel_sort_user').html(options);
                $('#sel_sort_user').select2();
                

            }else{
                errorMessage(res.data.message);
            }

        }).catch(err=>{errorMessage("Something Wrong!"); ehide(".preloader");} )
    }

    function convertDate(the_date, get_type = ""){
        let ret_date;
        let ddte = new Date(the_date);
        const month = ddte.toLocaleString('default', { month: 'long' });

        let res = "";

        if(get_type == "month"){
            return month;
        }
        else if(get_type == "day"){
            res = ddte.getDate();
        }
        else if(get_type == "year"){
            res = (ddte.getFullYear()+"").slice(-2); 
        }
        else{
            res = `${month} ${ddte.getDate()}, ${ddte.getFullYear()}`;
        }
        return res;
    }

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

    function fill_branches(loc_id, elem, useSelect2 = false){

        let brnches     = `<option value="">Please select...</option>`;
        let loc = global_locations.filter((loc =>  loc.loc_id == loc_id));

        if(loc != undefined && loc.length != 0){
            loc[0].branches.map(brn => {
                brnches += `<option value="${brn.branch_id}" >${brn.branch_name}</option>`;
            })
        }                                                                                                                          

        $(elem).html(brnches);

        if(useSelect2){
            $(elem).select2();
        }
    }

    var trans_table = $('#trans_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
            if(data.published_status == 1){
                $(row).addClass('row-approved');
            }
            else if(data.published_status == 0){
                $(row).addClass('row-pending');
            }
        },
        "columns": [
            {
                "data": "trans_id", "render": function (data, type, row, meta) {
                    return `TRANS-${row.trans_id}`
                }
            },
            // { "data": "trans_id" },
            { "data": "received_from" },
            { "data": "trans_type" },
            { "data": "mb_file_no" },
            { "data": "plate_no" },
            // {
            //     "data": "published_status", "render": function (data, type, row, meta) {
            //         return row.published_status == 1 ? "Approved" : "Pending";
            //     }
            // },
            { "data": "date_issued" },
            {
                "data": "trans_id", "render": function (data, type, row, meta) {

                    let app_btn = ``;

                    var btns = `
                        <div class="action_btns"> ${app_btn} <a class="btn_view" data-id="${row.trans_id}" href="#"><i class="fa fa-eye"></i> View</a>  <a data-id="${row.trans_id}" class="btn_edit" href="#"><i class="fa fa-pencil"></i> Edit</a> <a class="btn_delete" data-id="${row.trans_id}" href="#"><i class="fa fa-trash"></i> Delete</a></div>
                    `
                    return btns;
                }
            },
        ],
        "ajax": {
            "url": base_url + "admin_policies/get_transaction_data",
            "type": "POST",
            "data" : function(dta){
                dta.sortby = {
                    sorted:sorted_by.sorted, 
                    sort_value:sorted_by.sorted_value
                };
            }
        },
        "columnDefs": [
            {
                "targets": [6],
                "orderable": false,
            },
        ]
    });

    // end new functions

    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }

})
