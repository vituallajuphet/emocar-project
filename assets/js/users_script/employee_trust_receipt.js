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


    const calculateTabledata = (trow, dataId) => {

        const serial = trow.find("input[data-id='"+dataId+"'].td-serial").val();
        const tset   = trow.find("input[data-id='"+dataId+"'].td-set").val();

        if(Number.isNaN(serial)  ||  Number.isNaN(tset)){
            trow.find("input[data-id='"+dataId+"'].td-quantity").val("");
            return;
        }

        if((serial != undefined && serial != "") && (tset != undefined && tset != "")){
            const tQty = Number(serial) + Number(tset);
            trow.find("input[data-id='"+dataId+"'].td-quantity").val(tQty);
        }
    }

    const getTrustIdNumber = () =>{
        axios.get(`${base_url}employee_trust_receipt/get_trust_number`).then(res => {
             if(res.data.status == "success"){

                const  trust_id = res.data.trust_id;
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

                $("input[name='trust_id']").val(convertedTrustId)

             }
             else{
                 errorMessage(res.data.message)
             }
         }).catch(err => {errorMessage("Something Wrong")})
    }
    
    const incrementTrusTRequestId = () => {
        axios.get(`${base_url}employee_trust_receipt/increment_trust_number`).then(res => {
            if(res.data.status == "success"){

            }
            else{
                errorMessage(res.data.message)
            }
        }).catch(err => {errorMessage("Something Wrong")})
    }
    
    const getAllUserData = () =>{

        $("input[name='date_of_issued']").val(convertDate(new Date()))

        axios.post(`${base_url}employee_trust_receipt/get_all_user_data`).then(res => {
            ehide(".preloader");
             if(res.data.status == "success"){
                
                const data = res.data.data;
                let html = '<option value="">Select user</option>';

                data.map(dta => {
                    html += `
                     <option data-fullname="${dta.first_name + " "+ dta.last_name}" data-gender="${dta.gender}" data-address="${dta.location_name}" value="${dta.user_id}">${dta.first_name + " "+ dta.last_name}</option>
                    `
                })

                $(".trust_receipt #employee_id").html(html)

             }
             else{
                 errorMessage(res.data.message)
             }
         }).catch(err => {ehide(".preloader");errorMessage("Something Wrong")})

    }

    getAllUserData();
    getTrustIdNumber();
    
    $(document).on("click", ".btn_restore", function(){

        const trans_id = $(this).data("id");

        alertConfirm("Are you sure to restore this policy?" , function(){
            let frmdata = new FormData();
            eshow(".preloader")
            frmdata.append("trans_id", trans_id )

            axios.post(`${base_url}employee_archived/api_restore_policy/`, frmdata).then(res => {
               ehide(".preloader");
                if(res.data.status == "success"){
                    successMessage("Successfully Restored!");
                    trans_table.ajax.reload();
                }
                else{
                    errorMessage("something wrong!")
                }
            }).catch(err => {ehide(".preloader");errorMessage("Something Wrong")})
        })
    })

    $("#formTrustReceipt").submit(function(e){
        e.preventDefault();

        const trowCount = $(".tbody-tbl .tr-row").length;
        
        if(trowCount == 0){
            errorMessage("Please add atleast one option first!")
            return;
        }

        alertConfirm("Are you sure to generate this trust receipt? The Trust Receipt Number will be incremented once you proceed." , function(){

            const uname = $("#employee_id").val(); 
            const uNameText = $("#employee_id option:selected").data("fullname"); 
            const rDate = $("input[name='date_of_issued']").val(); 
            const treceipt = $("input[name='trust_id']").val();
            const placeIssued = $("input[name='place_issued']").val();
            const gender =  $("#employee_id option:selected").data("gender")
            const nameFirst  = (gender == "Female" ? "Mrs." : "Mr.") + ` ${uNameText}`;
            const userLocation = $("#employee_id option:selected").data("address")
            
            $(".prDate").html(rDate)
            $(".prName").html(nameFirst)
            $(".prDearName").html(`Dear ${nameFirst}`)
            $(".prTreceipt").html(treceipt)
            $(".prPlace").html(placeIssued)
            $(".prLocation").html(userLocation)

            let html = "";

            $(".tbody-tbl .tr-row").each(function (){

                const dta_id = $(this).data("id");
                
                const tcont = $(this).find(".first_td span.d-block");
                const tserial = $(this).find("input.td-serial");
                const tset = $(this).find("input.td-set");
                const tqty = $(this).find("input.td-quantity");

                const headerCol = () => {
                    let res = '';
                    tcont.map((idx, inp) => {
                        res += `<div style='text-transform: uppercase;
                        '>${inp.getAttribute("data-id")} #</div>`
                    }) 
                    return res;
                }

                const serialCont = () => {
                    let res = '';
                    tserial.map((idx, inp) => {
                        res += `<div>${inp.value}</div>`
                    }) 
                    return res;
                }

                const qtyCont = () => {
                    let res = '';
                    tqty.map((idx, inp) => {
                        res += `<div>${inp.value} = ${tset[idx].value} Sets</div>`
                    }) 
                    return res;
                }

                let tcontDta = ""
                html += `
                    <tr>
                        <td style='padding: 15px 0; '>
                            <div><strong style='text-transform: capitalize;
                            '>${dta_id} Policy</strong></div> 
                            ${headerCol()}
                        </td>
                        <td>
                            ${serialCont()}
                        </td>
                        <td>
                            ${qtyCont()}
                        </td>
                    </tr>
                `;

            })

            $(".tbody_trustReceipt").html(html)

            $("#print_trust_receipt").show();

            setTimeout(() => {
                $("#print_trust_receipt").printElement();
                $("#print_trust_receipt").hide();
                incrementTrusTRequestId()

                $("#employee_id").val("")
                $(".tbody-tbl").html("")
                getTrustIdNumber()
            }, 1000);

        })
    })

    $(document).on("change keyup", ".tr-row .td-serial, .tr-row .td-quantity,  .tr-row .td-set", function (){
        const trow = $(this).closest(".tr-row");
        const dataId = $(this).data("id");
        calculateTabledata(trow, dataId);
    })

    $(".trust_receipt .btn-add-row").on("click", function(params) {

        const sel_val = $("#sel_type").val();

        if (sel_val!= undefined && sel_val !="") {
            const sel_converted_val = get_select_val(sel_val)

            if(is_exist_row(sel_val)){
                errorMessage(`${sel_converted_val} is already added on the table!`)
                return;
            }
            
            let html = `
                <tr class="tr-row" data-id="${sel_val}">
                    <td class="first_td"> 
                        <strong class="d-block mb-3">${sel_val.toUpperCase()} <span class="removeRow"><a href="javascipt:;"><i class="fa fa-trash"></i></a></span></strong>
                        <span data-id="coc" class='d-block'>Confirmation of Cover</span>
                        <span data-id="or" class='d-block'>Official Receipt</span>
                        <span data-id="policy" class='d-block'>Policy</span>
                    </td>
                    <td> 
                        <div class="td-cont serialCont">  
                            <div class="serial_separator">
                                <div>
                                    <div><strong>From</strong></div>
                                    <input type="number" min="1" required class="form-control td-serial serialFrom" data-id='coc'>
                                    <input type="number" min="1" required class="form-control td-serial serialFrom" data-id='or'>
                                    <input type="number" min="1" required class="form-control td-serial serialFrom" data-id='policy'>            
                                </div>     
                                <div>
                                    <div><strong>To</strong></div>
                                    <input type="number" min="1" required class="form-control td-serial serialTo" data-id='coc'>
                                    <input type="number" min="1" required class="form-control td-serial serialTo" data-id='or'>
                                    <input type="number" min="1" required class="form-control td-serial serialTo" data-id='policy'>            
                                </div>     
                            </div>
                        </div>
                    </td>
                    <td> 
                        <div class="td-cont">
                            <input type="number" min="1" required class="form-control td-set" data-id='coc'>
                            <input type="number" min="1" required class="form-control td-set" data-id='or'>
                            <input type="number" min="1" required class="form-control td-set" data-id='policy'>
                        </div>
                    </td>
                    <td> 
                        <div class="td-cont">
                            <input type="number" readonly required class="form-control td-quantity" data-id='coc'>
                            <input type="number" readonly required class="form-control td-quantity" data-id='or'>
                            <input type="number" readonly required class="form-control td-quantity" data-id='policy'>
                        </div>
                    </td>       
                    <td class="td-action">
                        <a class="d-block" data-val="coc" href="javascript:;"> <i class='fa fa-trash'></i></a>
                        <a class="d-block" data-val="or" href="javascript:;"> <i class='fa fa-trash'></i></a>
                        <a class="d-block" data-val="policy" href="javascript:;"> <i class='fa fa-trash'></i></a>
                    </td>
                </tr>
            `

            $(".tbody-tbl").append(html);
        }else{
            errorMessage("Please select option first!")
        }

    })

    $(document).on("click", ".td-action a", function(){
        const action_val = $(this).data("val");
        
        const row = $(this).closest(".tr-row");
        row.find(".first_td span[data-id='"+action_val+"']").remove()
        row.find(".td-cont input[data-id='"+action_val+"']").remove()
        row.find(".td-action a[data-val='"+action_val+"']").remove()
    })

    $(document).on("click", ".removeRow", function(){
         $(this).closest(".tr-row").remove();
    })

    $(document).on("change", ".trust_receipt #employee_id", function(){
        
        const id = $(this).val();

        $(".trust_receipt .btn-submit").attr("disabled", !(id != undefined && id != ""));
    })

    

    // useful functions


    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }
    
    const is_exist_row = (val) => {
        
        const trow = $(".tbody-tbl .tr-row");

        let res = false;

        trow.each(function (i) {
            let row_id = $(this).data("id"); 
            
            if(row_id == val ){
                res = true;
            }
            
        })

        return res;

    }

    const get_select_val = (sel) => {

        switch (sel) {
            case "motorcycle":
                return  "MOTORCYCLE (MC)";
            case "tricycle":
                return  "TRICYCLE (TC-Hire)";
            case "private":
                return  "PRIVATE CAR (UV - CAR)";
            case "commercial":
                return  "COMMERCIAL VEHICLE (TRUCK)";
            default:
                return  "trailer";
        }

    }

})


