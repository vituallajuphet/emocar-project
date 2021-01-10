// const { use } = require("browser-sync");

$(document).ready(function () {

    var trust_table = $('#trans_table').DataTable({
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
                "data":  "agent_policy_id", "render": function (data, type, row, meta) {
                    return "Trans-"+row.agent_policy_id;
                 }
            },
            { 
                "data": "trust_receipt_no", "render" : function(data, type, row, meta) {
                    return convertTrustid(row.trust_receipt_no)
                } 
            },
            { 
                "data": "agent_policy_id", "render" : function(data, type, row, meta) {
                    return "Anabelle Bejagan"
                } 
            },
            { "data": "date_added" },
            {
                "data": "agent_policy_id", "render": function (data, type, row, meta) {
                    var btns = `
                    <div class="action_btns"><a class="btn_view bg-success" data-id="${row.agent_policy_id}" href="#"><i class="fa fa-eye"></i> View</a>  </div>
                `
                return btns;
                }
            },
        ],
        "ajax": {
            "url": base_url + "agent/get_trust_data",
            "type": "POST"
                
        },
        "columnDefs": [
            {
                "targets": [2],
                "orderable": false,
            },
        ],
    });


    $(document).on("click", ".btn_view", function(){
        const id = $(this).data("id");

        axios.get(`${base_url}agent/get_trust_details/${id}`).then(res => {
           ehide(".preloader");
           if(res.data.status == "success"){

             if(res.data.data.length > 0){
                const dta = res.data.data[0];

                const tbleData = dta.table_data;

                $(".trs-issued_by").val("Anabelle Bejagan")
                $(".trs-date_issued").val(convertDate(dta.date_added))
                $(".trs-place_issued").val(dta.place_issued)
                $(".trs-receipt_no").val(convertTrustid(dta.trust_receipt_no))
                 

                $("#view_trust_info").modal()

                $("#table_trust_list").DataTable();

             }

             
           }
           else{
               errorMessage(res.data.message)
           }
        }).catch(err => {  ehide(".preloader");errorMessage("Something Wrong!")})
    })


    const convertTrustid = (trust_id) => {

        let convertedTrustId = '';
        const len = trust_id.toString().length;

        if(len > 5){
            convertedTrustId = trust_id;
        }else{
            
            const maxchar = 4;
            const toLoop = maxchar - len;
            
            for (let index = 0; index < toLoop; index++) {
                convertedTrustId += "0";
            }
            convertedTrustId += trust_id;
        }

        return convertedTrustId;
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

    const convertDate = (the_date, get_type = "") => {

        let ret_date;
        let ddte = new Date(the_date);
        const month = ddte.toLocaleString('default', { month: 'long' });

        res = `${month} ${ddte.getDate()}, ${ddte.getFullYear()}`;
        return res;
    }

    
})


