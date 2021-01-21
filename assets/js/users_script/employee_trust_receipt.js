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

        const serialFrom = trow.find("input[data-id='"+dataId+"'].serialFrom").val();
        const serialTo = trow.find("input[data-id='"+dataId+"'].serialTo").val();
        const rowType = trow.find("input[data-id='"+dataId+"'].serialTo").data("id");
        const tname = trow.find("input[data-id='"+dataId+"'].serialTo").data("tname");
        // const tset   = trow.find("input[data-id='"+dataId+"'].td-set").val();

        if(Number.isNaN(serialTo)  ||  Number.isNaN(serialFrom)){
            trow.find("input[data-id='"+dataId+"'].td-quantity").val("");
            trow.find("input[data-id='"+dataId+"'].td-set").val();
            return;
        }
        else if(Number(serialTo)  <   Number(serialFrom)){
            trow.find("input[data-id='"+dataId+"'].td-quantity").val("");
            trow.find("input[data-id='"+dataId+"'].td-set").val("");
            return;
        }
        

        if((serialTo != undefined && serialTo != "") && (serialFrom != undefined && serialFrom != "")){
           
            let frmdata = new FormData();

            frmdata.append("sfrom", serialFrom)
            frmdata.append("sto", serialTo)
            frmdata.append("type", rowType)
            frmdata.append("trans_type", tname)
            
            axios.post(`${base_url}employee_trust_receipt/validate_range/`, frmdata).then(res => {
                if(res.data.status == "success"){
                    
                }
                else{
                    trow.find("input[data-id='"+dataId+"'].td-quantity").val("");
                    trow.find("input[data-id='"+dataId+"'].td-set").val("");
                    errorMessage(res.data.message)
                }
            }).catch(err => {errorMessage("Something Wrong")})

            const totalQty = ((parseInt(serialTo) - parseInt(serialFrom)) + 1 ) 
            const totalSet = (totalQty / 50);
            trow.find("input[data-id='"+dataId+"'].td-set").val(totalSet);
            trow.find("input[data-id='"+dataId+"'].td-quantity").val(totalQty);
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
 
    $("#formTrustReceipt").submit(function(e){
        e.preventDefault();

        const trowCount = $(".tbody-tbl .tr-row").length;
        
        if(trowCount == 0){
            errorMessage("Please add atleast one option first!")
            return;
        }

      

        alertConfirm("Are you sure to save this trust receipt?" , function(){

            const uname = $("#employee_id").val(); 
            const uNameText = $("#employee_id option:selected").data("fullname"); 
            const rDate = $("input[name='date_of_issued']").val(); 
            const treceipt = $("input[name='trust_id']").val();
            const placeIssued = $("input[name='place_issued']").val();
            const gender =  $("#employee_id option:selected").data("gender")
            const nameFirst  = (gender == "Female" ? "Mrs." : "Mr.") + ` ${uNameText}`;
            const userLocation = $("#employee_id option:selected").data("address")
            
           
            let frmdata = new FormData();

            frmdata.append("agent_id", uname)
            frmdata.append("date", rDate)
            frmdata.append("trust_id", treceipt)
            frmdata.append("address", userLocation)

            const tableData = [];

            // generate form data
            $(".tbody-tbl .tr-row").each(function (){

                const dta_id = $(this).data("id");
                const tcont = $(this).find(".first_td span.d-block");
                const tserialFrom = $(this).find("input.serialFrom");
                const tserialTo = $(this).find("input.serialTo");
                const tset = $(this).find("input.td-set");
                const tqty = $(this).find("input.td-quantity");

                const getTabledata = () => {
                    let res = [];
                    tcont.map((idx, inp) => {
                       res.push({
                           id:inp.getAttribute("data-id"),
                           sfrom:  tserialFrom[idx].value,
                           sTo:  tserialTo[idx].value,
                           set:  tset[idx].value,
                           qty:  tqty[idx].value,
                       })
                    }) 
                    return res;
                }

                let rowData = {
                    id:dta_id,
                    tble_data: getTabledata()
                };

                tableData.push(rowData)                             
            })  

            frmdata.append("tableData", JSON.stringify(tableData)) 
            
            axios.post(`${base_url}employee_trust_receipt/save_trust_receive/`, frmdata).then(res => {
                ehide(".preloader");
                 if(res.data.status == "success"){
                     successMessage("Successfully Saved!");
                     setTimeout(() => {
                         printDocument()
                        //window.location.href =`${base_url}employee_trust_receipt`;
                     }, 500);
                 }
                 else{
                     errorMessage("something wrong!")
                 }
            }).catch(err => {ehide(".preloader");errorMessage("Something Wrong")})
        })

        // printDocument()
    })


    $(".btn-print_here").click(function(){
        printDocument()
    })

    const printDocument = () => {
        let html = "";

        const uname = $("#employee_id").val(); 
        const uNameText = $("#employee_id option:selected").data("fullname"); 
        const rDate = $("input[name='date_of_issued']").val(); 
        const treceipt = $("input[name='trust_id']").val();
        const placeIssued = $("input[name='place_issued']").val();
        const gender =  $("#employee_id option:selected").data("gender")
        const nameFirst  = (gender == "Female" ? "Mrs." : "Mr.") + ` ${uNameText}`;
        const userLocation = $("#employee_id option:selected").data("address")

        if(uname == ""  || uname == undefined){
            errorMessage("Please select a agent first!")
            return;
        }

        $(".prDate").html(rDate)
        $(".prName").html(nameFirst)
        $(".prDearName").html(`Dear ${nameFirst}`)
        $(".prTreceipt").html(treceipt) 
        $(".prPlace").html(placeIssued)
        $(".prLocation").html(userLocation)
        $(".receive_print").html(uNameText)
        
        let totalqtyvalue = 0;
            $(".tbody-tbl .tr-row").each(function (){

                const dta_id = $(this).data("id");
                
                const tcont = $(this).find(".first_td span.d-block");
                const tserial = $(this).find("input.serialFrom");
                const tserialto = $(this).find("input.serialTo");
                const tset = $(this).find("input.td-set");
                const tqty = $(this).find("input.td-quantity");

                

                const headerCol = () => {
                    let res = '';
                    tcont.map((idx, inp) => {
                        res += `<div style='text-transform: uppercase;
                        '>${getHeading(inp.getAttribute("data-id"))}</div>`
                    }) 
                    return res;
                }
                
            

                const serialCont = () => {
                    let res = '';
                    tserial.map((idx, inp) => {
                        res += `<div>${inp.value} --  ${tserialto[idx].value}</div>`
                    }) 
                    return res;
                }

                
                const qtyCont = () => {
                    let res = '';
                    tqty.map((idx, inp) => {
                        res += `<div>${inp.value} = ${tset[idx].value} Sets</div>`

                        totalqtyvalue += parseInt(inp.value);
                    }) 
                    return res;
                }

                let tcontDta = ""
                html += `
                    <tr>
                        <td style='padding: 7px 0 0;width: 40%;'>
                            <div><strong style='text-transform: uppercase;
                            '>${dta_id}</strong></div> 
                            ${headerCol()}
                        </td>
                        <td style="text-align: center; width: 30%;">
                            <div style="visibility:hidden;"><strong style='text-transform: uppercase;
                        '>${dta_id}</strong></div> 
                            ${serialCont()}
                        </td>
                        <td style="text-align: center; width: 30%;">
                            <div style="visibility:hidden;"><strong style='text-transform: uppercase;
                        '>${dta_id}</strong></div> 
                            ${qtyCont()}
                        </td>
                    </tr>
                `;

            })

            $(".tbody_trustReceipt").html(html)

            let totalQty =`
                <tr>
                    <td colspan="4">
                        <div style='text-align:right;margin-right:75px;'>
                            Total Quantity: <span>${totalqtyvalue} pcs.</span>
                        </div>
                    </td>
                </tr>
            `

            $(".tbody_trustReceipt").append(totalQty)

            const psize = $("#paper_size").val();

            if(psize == "long"){
                $("#print_bottom_part").css("bottom", "65px")
            }
            else if(psize == "short"){
                $("#print_bottom_part").css("bottom", "-12px")
            }
            else if(psize == "a4"){
                $("#print_bottom_part").css("bottom", "-12px")
            }

           

            const theheight = $(".top_area_print").height();

            setTimeout(() => {
                $("#print_trust_receipt").show();
                $(".printing_loader").show();
                $("#print_trust_receipt").printElement();
                $(".printing_loader").hide();
                $("#print_trust_receipt").hide();
                incrementTrusTRequestId()

                $("#employee_id").val("")
                $(".tbody-tbl").html("")
                getTrustIdNumber()
            }, 100);
    }

    $(document).on("change", ".tr-row .td-serial", function (){
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
            eshow(".preloader");
            axios.get(`${base_url}employee_trust_receipt/get_last_data/${sel_val}`).then(res => {
                ehide(".preloader");
                const maxdata = res.data.data;
                 if(res.data.status == "success"){
                    let html = `
                        <tr class="tr-row" data-id="${sel_val}">
                            <td class="first_td"> 
                                <strong class="d-block mb-3">${sel_val.toUpperCase()} <span class="removeRow"><a href="javascipt:;"><i class="fa fa-trash"></i></a></span></strong>
                                <span data-id="or" class='d-block'>Official Receipt</span>
                                <span data-id="coc" class='d-block'>Confirmation of Cover</span>
                                <span data-id="policy" class='d-block'>Policy</span>
                            </td>
                            <td> 
                                <div class="td-cont serialCont">  
                                    <div class="serial_separator">
                                        <div>
                                            <div><strong>From</strong></div>
                                            <input type="number" min="1" data-tname="${sel_val}" required class="form-control td-serial serialFrom" data-id='or'>
                                            <input type="number" min="1" data-tname="${sel_val}" required class="form-control td-serial serialFrom" data-id='coc'>
                                            <input type="number" min="1" data-tname="${sel_val}" required class="form-control td-serial serialFrom" data-id='policy'>            
                                        </div>     
                                        <div>
                                            <div><strong>To</strong></div>
                                            <input type="number" min="1" data-tname="${sel_val}" required class="form-control td-serial serialTo" data-id='or'>
                                            <input type="number" min="1" data-tname="${sel_val}" required class="form-control td-serial serialTo" data-id='coc'>
                                            <input type="number" min="1" data-tname="${sel_val}" required class="form-control td-serial serialTo" data-id='policy'>            
                                        </div>     
                                    </div>
                                </div>
                            </td>
                            <td> 
                                <div class="td-cont">
                                <input type="number" min="1" readonly required class="form-control td-set" data-id='or'>
                                    <input type="number" min="1" readonly required class="form-control td-set" data-id='coc'>
                                    <input type="number" min="1" readonly required class="form-control td-set" data-id='policy'>
                                </div>
                            </td>
                            <td> 
                                <div class="td-cont">
                                <input type="number" readonly required class="form-control td-quantity" data-id='or'>
                                    <input type="number" readonly required class="form-control td-quantity" data-id='coc'>
                                    <input type="number" readonly required class="form-control td-quantity" data-id='policy'>
                                </div>
                            </td>       
                            <td class="td-action">
                            <a class="d-block" data-val="or" href="javascript:;"> <i class='fa fa-trash'></i></a>
                                <a class="d-block" data-val="coc" href="javascript:;"> <i class='fa fa-trash'></i></a>
                                <a class="d-block" data-val="policy" href="javascript:;"> <i class='fa fa-trash'></i></a>
                            </td>
                        </tr>
                    `

                    $(".tbody-tbl").append(html);
                 
                    $(".last_digits").show();
                    $(".last_digits .Heading_max").html(ucFirst(sel_val));
                    $(".last_digits .max_or").html(maxdata.or);
                    
                    $(".last_digits .max_coc").html(maxdata.coc);
                    $(".last_digits .max_policy").html(maxdata.policy);

                }
                 else{
                     errorMessage("something wrong!")
                 }
            }).catch(err => {ehide(".preloader");errorMessage("Something Wrong")})

            


        }else{
            errorMessage("Please select option first!")
        }

    })

    const ucFirst = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

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

        const address = $("#employee_id option:selected").data("address")

        $("input[name='place_issued'").val(address)

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

    const getHeading = (theName) => {
        switch ((theName)) {
            case "coc":
                return "Confirmation of Cover (COC)"
                break;
            case "or":
                return "Official Receipt (OR)"
                break;
            case "policy":
                return "Policy"
                break;
            default:
                break;
        }
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


