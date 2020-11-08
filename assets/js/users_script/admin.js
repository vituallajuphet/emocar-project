$(document).ready(function () {

    var employee_table = $('#trans_table').DataTable({
        "language": { "infoFiltered": "" },
        "processing": true, //Feature control the processing indicator.
        "serverSide": true, //Feature control DataTables' server-side processing mode.
        "responsive": true,
        "order": [[0, 'desc']], //Initial no order.
        "createdRow": function (row, data, dataIndex) {
        },
        "columns": [
            { "data": "employee_id" },
            { "data": "first_name" },
            { "data": "middle_name" },
            { "data": "last_name" },
            { "data": "branch" },
            { "data": "location" },
            {
                "data": "employee_id", "render": function (data, type, row, meta) {
                    var btns = `
                        <div><a href="#">edit</a><a href="#">delete</a></div>
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

        // $.ajax({
        //     url:  base_url+"/admin/save_employee/",
        //     data : frmdata,
        //     method: "post",
        //     type:"json",
        //     sucesss: function( res ){

        //     }
        // })
        

    })
   

    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }




})


