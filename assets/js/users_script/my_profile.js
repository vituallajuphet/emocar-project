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
          }
      }
    },
    methods:{
        submitForm(){

            const self = this;
            
            alertConfirm("Are you sure to update your profile?", ()=>{ 
                axios.post(`${base_url}my_profile/update_profile`, self.frmdata).then(res => {
                    
                    if(!res.data.status == "success"){
                        errorMessage(res.data.message)
                        return;
                    }   

                    successMessage("Updated Successfully!");

                }).catch(err => errorMessage("Something Wrong!"))
            });
        },
        get_userinfo(){
            const self = this;
            axios.get(`${base_url}my_profile/get_profile_info/`, self.frmdata).then(res => {

                if(res.data.status != "success"){
                    errorMessage("Something Wrong!")
                    return;
                }

                const dta = res.data.data;

                self.frmdata.fname      = dta.first_name
                self.frmdata.mname      = dta.middle_name
                self.frmdata.lname      = dta.last_name
                self.frmdata.address    = dta.address
                self.frmdata.bday       = dta.birth_date
                self.frmdata.gender     = dta.gender
                self.frmdata.username   = dta.username
                self.frmdata.user_id    = dta.fk_user_id
                self.frmdata.user_type  = dta.user_type

            }).catch(err => errorMessage("Something Wrong!"))
        }
      
    },
    computed:{
        
    },
    mounted(){
         this.get_userinfo();
    }
})