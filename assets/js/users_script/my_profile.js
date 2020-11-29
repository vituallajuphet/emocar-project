var app = new Vue({
    el: '#main',
    data () {
      return {
        frmdata:{
            user_id:"",
            fname:"",
            mname:"",
            lname:"",
            address:"",
            bday:"",
            gender:"",
            username:"",
            password:"",
            con_password:"",
            user_type:2,
          },
          profile_picture:"",
          file_to_upload: undefined
      }
    },
    methods:{
        submitForm(){
            const self = this;
            
            if(self.frmdata.con_password.length < 6){
                errorMessage("Password must at least 6 letters!")
                return;
            }

            alertConfirm("Are you sure to update your profile?", ()=>{ 
                eshow(".preloader")
                axios.post(`${base_url}my_profile/update_profile`, self.frmdata).then(res => {
                    ehide(".preloader")
                    if(res.data.status == "error"){
                        errorMessage(res.data.message)
                        return;
                    }else{
                        successMessage("Updated Successfully!");
                        self.get_userinfo();
                    } 

                }).catch(err =>{ ehide(".preloader");errorMessage("Something Wrong!")} )
            });
        },

        upload_profile(){

            const self = this;

            if(this.file_to_upload == undefined || this.file_to_upload == ""){
                errorMessage("Please select a file first!")
                return;
            }

            alertConfirm("Are you sure to update your profile picture?", ()=>{ 
                eshow(".preloader")

                let formData = new FormData();
                formData.append('file', this.file_to_upload);

                axios.post(`${base_url}my_profile/api_update_profilepic`, formData).then(res => {
                    ehide(".preloader")

                    if(res.data.status == "error"){
                        errorMessage(res.data.message)
                        return;
                    }else{
                        successMessage("Uploaded Successfully!");
                        self.get_userinfo();
                    } 
                    $(".my_profile__form_cont input").val("");

                }).catch(err =>{ ehide(".preloader");errorMessage("Something Wrong!")} )
            });

        },
        get_userinfo(){
            const self = this;

            axios.get(`${base_url}my_profile/get_profile_info/`, self.frmdata).then(res => {

                if(res.data.status != "success"){
                    errorMessage(res.data.message)
                    return;
                }
                const dta = res.data.data;

                self.frmdata.fname      = dta.first_name;
                self.frmdata.mname      = dta.middle_name;
                self.frmdata.lname      = dta.last_name;
                self.frmdata.address    = dta.address;
                self.frmdata.bday       = dta.birth_date;
                self.frmdata.gender     = dta.gender;
                self.frmdata.username   = dta.username;
                self.frmdata.user_id    = dta.fk_user_id;
                self.frmdata.user_type  = dta.user_type;
                self.frmdata.password   = "";
                self.profile_picture       = dta.profile_name;

                console.log(dta.profile_name)

            }).catch(err => errorMessage("Something Wrong!"))
        },
        processFile(e){
        
            if(e.target.files.length != 0){
               
                const the_file = e.target.files[0];
                const extAllowed = ["png","jpg", "jpeg"];
                const fileExt = the_file.name.split('.').pop();

                if(the_file.size > 2000000){
                    errorMessage("Picture size must below 2MB");
                    return;
                }
                else if(!extAllowed.includes(fileExt.toLowerCase())){
                    errorMessage("Profile must be an image file type!");
                    return;
                }         
                
                this.file_to_upload = the_file;
            }

        }
      
    },
    computed:{
        get_profile_pic(){
            let fullpath = "";
            if(this.profile_picture == ""){
                fullpath = base_url + "assets/profiles/dummy-profile.jpg";
            }else{
                fullpath = base_url + "assets/profiles/"+this.profile_picture;
            } 
            return fullpath;
        }
    },
    mounted(){
         this.get_userinfo();
    }
})