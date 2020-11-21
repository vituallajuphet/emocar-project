$(document).ready(function () {

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
            {
                "data": "published_status", "render": function (data, type, row, meta) {
                    return row.published_status == 1 ? "Approved" : "Pending";
                }
            },
            { "data": "date_issued" },
            {
                "data": "trans_id", "render": function (data, type, row, meta) {
                    var btns = `
                        <div class="action_btns"><a class="btn_restore" data-id="${row.trans_id}" href="#"><i class="fa fa-recycle"></i> Restore</a></div>
                    `
                    return btns;
                }
            },
        ],
        "ajax": {
            "url": base_url + "employee_archived/get_transaction_data",
            "type": "POST"
        },
        "columnDefs": [
            {
                "targets": [7],
                "orderable": false,
            },
        ]
    });

    
    $(document).on("click", ".btn_restore", function(){

        const trans_id = $(this).data("id");

        alertConfirm("Are you sure to restore this policy?" , function(){
            let frmdata = new FormData();
            $(".preloader").show();
            frmdata.append("trans_id", trans_id )

            axios.post(`${base_url}employee_archived/api_restore_policy/`, frmdata).then(res => {
                $(".preloader").hide();
                if(res.data.status == "success"){
                    successMessage("Successfully Restored!");
                    trans_table.ajax.reload();
                }
                else{
                    errorMessage("something wrong!")
                }
            })
        })
    })
    
    // submit form edit

    $("#datatable_sorter_select").on("change", function(){
        trans_table.search($(this).val()).draw() ;
    })


    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }

})


