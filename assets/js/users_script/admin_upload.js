$(document).ready(function () {

    $(".btn_add_upload").click(function(){
        $("#add_upload_modal").modal();
    })

    $(".btn_new_row").on("click", function(){

        let html = `
        <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="">Type</label>
                    <select name="" id="" class="form-control">
                        <option value="">Please Select...</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Tricycle">Tricycle</option>
                        <option value="Private Car">Private Car</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Truck">Truck</option>
                    </select>
                </div>                    
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="">From</label>
                    <input type="text" class="form-control">
                </div>  
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="">Qty.</label>
                    <input type="text" class="form-control">
                </div>  
            </div>
        </div>
        `;
        
        $(".cont_grid").append(html);


    })

})


