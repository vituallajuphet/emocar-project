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

    var tableGlobalData = [];
    var tableUsedData = [];
    var table_trust;

    $(document).on("click", ".btn_view", function(){
        const id = $(this).data("id");

        eshow(".preloader");
        axios.get(`${base_url}agent/get_trust_details/${id}`).then(res => {
           
           if(res.data.status == "success"){

             if(res.data.data.length > 0){
                const dta = res.data.data[0];


                (async () => {
                    try {
                        const resp = await axios.get(`${base_url}agent/get_used_trust/${dta.trust_receipt_no}`)
                        const resData = resp.data.data;

                        tableUsedData = gettrustrow(resData);

                        console.log(tableUsedData)

                        const tbleData = JSON.parse(dta.table_data);

                        tableGlobalData = tbleData;

                        $(".trs-issued_by").val("Anabelle Bejagan")
                        $(".trs-date_issued").val(convertDate(dta.date_added))
                        $(".trs-place_issued").val(dta.place_issued)
                        $(".trs-receipt_no").val(convertTrustid(dta.trust_receipt_no))

                        const tableResult =  generateTrustTable(tbleData, "", tableUsedData)
                        

                        $("#table_trust_list .tbody").html(tableResult)
                        $("#view_trust_info").modal()
                        table_trust = $("#table_trust_list").DataTable();
                        $("#table-sorter").trigger("change");
                        ehide(".preloader");
                        } catch (error) {
                            errorMessage("Something Wrong!")
                            console.log(error)
                        }
                })()        
             }

           }
           else{
               errorMessage(res.data.message)
           }
        }).catch(err => {  ehide(".preloader");errorMessage("Something Wrong!"); console.log(err)})
    })

    const gettrustrow = (resData) => {

        let ret = [];

        if(resData.length > 0){
            resData.map(dta => {
                
                let thedata = JSON.parse(dta.trust_data);

                const newData = thedata.map(d => {
                    d.trans_id = dta.trans_id 
                    return d;
                })

                ret.push(newData)
            })
        }

        return ret;
    }

    const generateTrustTable = ( tbleData = [], selected ="", usedData = []) => {

        let trow  = "";
        let selectOptions ="";

        tbleData.map(tbl => {

            selectOptions += `"<option class="text-capitalize" value="${tbl.id}">${ucFirst(tbl.id)}</option>`

            tbl.tble_data.map(tdta => {

                const qtys = tdta.qty;

                for (let i = 0; i < Number(qtys); i++) {

                    let is_used = false;
                    let t_id = 0;
                    usedData.map(used => {
                        used.map(inner => {
                            if(
                                tbl.id == inner.name &&
                                (Number(tdta.sfrom) + i) == inner.serNum &&
                                tdta.id == inner.type
                              ){
                                  is_used = true;
                                  t_id = inner.trans_id
                              }
                        })
                    })

                    if(selected != "" ){

                        if(selected == tbl.id){
                            trow += `
                                <tr>
                                    <td class="text-capitalize font-weight-bold">${tbl.id}</td>
                                    <td>${Number(tdta.sfrom) + i}</td>
                                    <td class="text-uppercase">${tdta.id}</td>
                                    <td class="text-capitalize"><span class="text-${is_used ? 'success font-weight-bold' : 'danger'}">${ is_used ? 'Used' : 'Unused' }</span></td>
                                    <td class="text-center">
                                        ${(!is_used && 
                                            `<input type="checkbox" data-name="${tbl.id}" data-ser_num="${Number(tdta.sfrom) + i}" data-type="${tdta.id}" class="use_checkbox ${is_used ? 'd-none': ''}"> <span class="ml-1">Use</span> `) ||
                                            `<div class="text-center text-success"><i class="fa fa-check"></i> <a href="#" data-trans_trust_id="${t_id}" class="ml-3 text-success btn-view-trans">View</a></div>`
                                        }
                                    </td>
                                </tr>
                            `
                        }
                        
                    }else{
                        trow += `
                        <tr>
                            <td class="text-capitalize font-weight-bold">${tbl.id}</td>
                            <td>${Number(tdta.sfrom) + i}</td>
                            <td class="text-uppercase">${tdta.id}</td>
                            <td class="text-capitalize"><span class="text-${is_used ? 'success font-weight-bold' : 'danger'}">${ is_used ? 'Used' : 'Unused' }</span></td>
                            <td class="text-center">
                                ${(!is_used && 
                                    `<input type="checkbox" data-name="${tbl.id}" data-ser_num="${Number(tdta.sfrom) + i}" data-type="${tdta.id}" class="use_checkbox ${is_used ? 'd-none': ''}"> <span class="ml-1">Use</span> `) ||
                                    `<div class="text-center text-success"><i class="fa fa-check"></i> <a href="#" data-trans_trust_id="${t_id}" class="ml-3 text-success btn-view-trans">View</a></div>`
                                }
                            </td>
                        </tr>
                        `
                    }
                }  
            })
        })

        if (selected == undefined || selected == ""){
            $("#table-sorter").html(selectOptions);
        }

        return trow;
    }

    var selectedUsed=[];

    $(document).on("change", ".use_checkbox", function (){
        const thename = $(this).data("name");
        const serNum = $(this).data("ser_num");
        const theType = $(this).data("type");

        const selected = $(this)

        if(selected[0].checked){
            
            let is_found = false;

            selectedUsed.map(dta => {
                if(dta.name == thename && dta.type == theType ){
                    is_found = true;
                }
            });

            if(selectedUsed > 3){
                errorMessage(`you have already selected 3 files`)
                return;
            }

           if(is_found){
                errorMessage(`You have already selected a ${theType.toUpperCase()} for ${thename.toUpperCase()}`)
                selected[0].checked = false
                return;
           }

           selectedUsed.push({
               name: thename,
               serNum: serNum,
               type: theType,
           })
           
        }else{
            const removeArr = selectedUsed.filter((dta) => (dta.name == thename && dta.type != theType));
            selectedUsed = removeArr;
        }

    })

    $(document).on("click", ".btn-view-trans", function(){
        const trans_id = $(this).data("trans_trust_id");

        window.location.href = `${base_url}agent/view_entries/${trans_id}`;
    })

    $(".btn-use-submit").click(function(){
        if(selectedUsed.length == 3){
            const trust_id = $(".trs-receipt_no").val();
            window.location.href=`${base_url}agent_use_trust?data=${JSON.stringify(selectedUsed)}&trust_id=${trust_id}`
        }else{
            errorMessage(`Please select COC, POLICY, and OR first before submitting!`)
        }
    })

    $("#table-sorter").on("change", function(){
        const selected = $(this).val();

        selectedUsed = [];

        table_trust.destroy();
        const tbres = generateTrustTable(tableGlobalData, selected, tableUsedData)
    
        $("#table_trust_list .tbody").html(tbres)
        table_trust = $("#table_trust_list").DataTable();
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

    const ucFirst = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    
})


