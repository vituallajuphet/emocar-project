$(document).ready(function () {

    let global_locations = [];


    function _init (){
        axios.post(base_url+"admin_verification/get_verification_code").then(res =>{
            ehide(".preloader");
            if(res.data.status == "success"){
                const data = res.data.data
                $('.code-span').html(data[0].code)
            }
        }).catch(err => {ehide(".preloader");errorMessage("Something Wrong!")})
    }
    _init()

    $(".btnGenerateNewCode").on('click', () => {
        alertConfirm("Are you sure to generate new code?" , function(){
            eshow(".preloader");
            axios.post(base_url+"admin_verification/generate_newcode").then(res =>{
                ehide(".preloader");
                if(res.data.status == "success"){
                    if(res.data.status == "success"){
                        const data = res.data.data
                        $('.code-span').html(data[0].code)
                    }
                    successMessage("Generated successfully!")
                }else{
                    errorMessage(res.data.message);
                }
            }).catch(err => {ehide(".preloader");errorMessage("Something Wrong!")})
        })
    })


   
    function getDateFormat(cur_date) {
        let d = new Date(cur_date);
        return `${d.getMonth()}-${d.getDate() + 1}-${d.getFullYear()}`;
    }




})


