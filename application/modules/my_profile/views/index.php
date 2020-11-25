<div id="main">
    <div class="main_area">
        <div class="profile_container">
            <h1 class="headingTitle"><i class="fa fa-user"></i> <?=$title?></h1>
            <form action="#" @submit.prevent="submitForm()" method="post" class="profile_form">
                <div class="row">
                    <div class="col-md-4">
                        <label for="">First Name</label>
                        <input required name="fname" v-model="frmdata.fname" type="text" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="">Middle Name</label>
                        <input required name="mname" type="text" v-model="frmdata.mname" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="">Last Name</label>
                        <input required name="lname" v-model="frmdata.lname" type="text" class="form-control">
                    </div>
                    <div class="col-md-8">
                        <label for="">Address</label>
                        <input name="address" v-model="frmdata.address" required type="text" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="">Birth Date</label>
                        <input name="bday" v-model="frmdata.bday" required type="date" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">Gender</label>
                        <select class="form-control" v-model="frmdata.gender" name="gender" required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>   
                    </div>
                    <div class="col-md-4">
                        <label for="">Username</label>
                        <input name="username" v-model="frmdata.username" required type="text" class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="">Old Password</label>
                        <input name="password" v-model="frmdata.password" required type="password" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="">New Password</label>
                        <input name="con_password" v-model="frmdata.con_password" required type="password" class="form-control">
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12 text-right">
                        <button class="btn btn-success" type="submit"><i class="fa fa-check"></i> Update Profile</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>