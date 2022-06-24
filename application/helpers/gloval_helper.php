<?php
defined('BASEPATH') OR exit('No direct script access allowed');

    if(!function_exists('_user_css')){
        function _user_css($user_css){
            if(file_exists('assets/css/users_css/'.$user_css.'.css')){
                return 'users_css/'.$user_css.'.css';
            }
            return null;
        }
    }

    if(!function_exists('_user_script')){
        function _user_script($user_js){
            if(file_exists('assets/js/users_script/'.$user_js.'.js')){
                return 'users_script/'.$user_js.'.js';
            }
            return null;
        }
    }

    function ajax_response($message, $type){
        $data = array(
            'message' => $message,
            'type' => $type
        );
        echo json_encode($data);
        exit;
    }

    function get_user_type() {
      
        $ci = & get_instance();

         return $ci->session->userdata("user_type");
        
    }

    function get_user_contact($admin=false) {
        $ci = & get_instance();
        if($admin){
            return $ci->session->userdata("contact_no");
        }else{
            $par["where"] = "fk_user_id =1";
            $res = getData("user_meta u_meta", $par);

            return $res[0]["contact_no"];
        }
    }

    function getUserData($show_pass = false){
        $ci = & get_instance();
        
        $user_id = $ci->session->userdata("user_id");

        $res = [];

        $par["join"] = [
            "users usr" => "usr.user_id = u_meta.fk_user_id",
            "tbl_branches brn" => "brn.branch_id = u_meta.branch",
            "tbl_locations loc" => "loc.loc_id = u_meta.location",
        ];

        if(get_user_type() == 2 || get_user_type() == 4){
            $par["where"] = ["fk_user_id" =>  $user_id];
            $res = getData("employees u_meta", $par);
        }
        else{
            $par["where"] = ["fk_user_id" =>  $user_id];
            $res = getData("user_meta u_meta", $par);
        }

        if(isset($res)){
            if(!$show_pass){
                unset($res[0]["password"]);
            }
        }

        return $res[0];
    }

    function get_all_users($user_id = 2){

        $ci = & get_instance();

        $par["where"] = ["user_type" => $user_id, "usr.status" => 1];
        $par["join"]  = [
            "employees emp" => "emp.fk_user_id = usr.user_id",
            "tbl_branches brn" => "brn.branch_id = emp.branch",
            "tbl_locations loc" => "loc.loc_id = emp.location",
        ];

        $res = getData("users usr" , $par);

        if(!empty($res)){
            $c = 0;
            foreach ($res as $key) {
                unset($res[$c]["password"]);
                $c++;
            }
        }
        return $res;
    }

    function get_user_data($par = "user_id"){
        $ci = & get_instance();

        return $ci->session->userdata($par);
    }

    function get_user_id(){
        $ci = & get_instance();
        if($ci->session->has_userdata("user_id")){
            return $ci->session->userdata("user_id");
        }
    }

    function get_post(){
        $ci = & get_instance();
        return $ci->input->post();
    }

    function swal_data($msg, $err = "success"){
        $ci = & get_instance();
        $ci->session->set_flashdata("flash_data", array( "err"=>$err, "message" => $msg));
    }
    

    function get_logged_user($typ = "array"){
        $ci = & get_instance();
        if($typ== "array"){
            return $ci->session->userdata();
        }
        else if($typ== "obj"){
            return (object) $ci->session->userdata();
        }
        else if($typ== "json"){
            return json_encode($ci->session->userdata());
        }
        exit;
    }

    function getData($tbl ="", $par = array(), $r = "array"){
        $ci = & get_instance();
        $res=  $ci->MY_Model->getRows($tbl, $par, $r);
        return $res;
    }

    function insertData($tbl ="", $data = array(), $getID = false){
        $ci = & get_instance();
        $res=  $ci->MY_Model->insert($tbl, $data);
        $latestID = $ci->db->insert_id();
        
        return $getID ? $latestID : $res;

    }

    function getNextId($tblName ="" ){
        $ci =& get_instance();
        $sqlQuery = "SELECT `auto_increment` FROM INFORMATION_SCHEMA.TABLES
        WHERE table_name = '$tblName'";
    
        $exeQuery =  $ci->db->query($sqlQuery);

        $res = $exeQuery->result_object();
        
        return $res[0]->auto_increment;

    }

    function getDataTables($table, $column_order, $select = "*", $where = "", $join = array(), $limit, $offset, $search, $order,$group = ''){
        $ci = & get_instance();
        $ci->db->from($table);
	  	if($select){
	  		$ci->db->select($select);
	  	}
	  	if($where){
	  		$ci->db->where($where);
	  	}
        if(!empty($join)){
            foreach($join as $key => $value){
                if(strpos($value,':') !== false){
                    $_join = explode(":",$value);
                    $ci->db->join($key,$_join[0],$_join[1]);
                } else {
                    $ci->db->join($key,$value);
                }
            }
        }
	  	if($search){
	  		$ci->db->group_start();
	  		foreach ($column_order as $item)
	  		{
	  			$ci->db->or_like($item, $search['value']);
	  		}
	  		$ci->db->group_end();
	  	}
	  	if($group)
	  		$ci->db->group_by($group);

	  	if($order)
	  		$ci->db->order_by($column_order[$order['0']['column']], $order['0']['dir']);
	    	$temp = clone $ci->db;
	    	$data['count'] = $temp->count_all_results();

	  	if($limit != -1)
	  		$ci->db->limit($limit, $offset);

	  	$query = $ci->db->get();
	  	$data['data'] = $query->result();

	  	$ci->db->from($table);
	  	$data['count_all'] = $ci->db->count_all_results();
	  	return $data;
	}


    function updateData($tbl ="", $set, $where = array()){
        $ci = & get_instance();
        $res=  $ci->MY_Model->update($tbl, $set, $where);
        return $res;
    }

    function deleteData($tbl ="", $where = array()){
        $ci = & get_instance();
        $res=  $ci->MY_Model->delete($tbl, $where);
        return $res;
    }

    function batchInsertData($tbl ="", $set = array()){
        $ci = & get_instance();
        $res=  $ci->MY_Model->batch_insert($tbl, $set);
        return $res;
    }

    function upload_file($files, $setting){
        $ci = & get_instance();
        $config['upload_path']     = "./assets/profiles/";
        $config['allowed_types']   = 'jpg|png';
        $config['max_size']        = 9999999999;
        if(!empty($setting)){
            if(!empty($setting["upload_path"])){
                $config['upload_path'] = $setting["upload_path"];
            }
            if(!empty($setting["allowed_types"])){
                $config['allowed_types']     = $setting["allowed_types"];
            }
            if(!empty($setting["max_size"])){
                $config['max_size']     = $setting["max_size"];
            }
            if(!empty($setting["file_name"])){
                $config['file_name']     = $setting["file_name"];
            }
        }
        $ci->load->library('upload', $config);
        $filename = "file";
        if(empty($files["file"])){
            foreach ($files as $file => $value) {
                $filename = $file;
            }
        }
        if ( ! $ci->upload->do_upload("file")){
                return false;
        }
        else{
            return true;
        }
    }

    function getReqMethod(){

        return $_SERVER["REQUEST_METHOD"];

    }

    function get_logged_name(){
        $ci = & get_instance();
        return $ci->session->userdata("first_name") . " " . $ci->session->userdata("last_name");
        
    }

    function sendemail_notification($to_email="", $message ="", $from_name="", $subject="", $type="", $from_email="noreply@system.com", $attachments =""){
        $ci = & get_instance();
        if(empty($to_email)){
            $to_email = "prospteam@gmail.com";
        }
        if(empty($from_name)){
            $from_name = "Compassionate Academy";
        }
        if(empty($subject)){
            $subject = "Email Notification";
        }
        if(empty($message)){
            $message = "This is a message";
        }
        if(empty($type)){
            $type = "html";
        }

        if(!empty($attachments)){
            $settings["attach"] = $attachments;
        }

        $settings["mail_type"] = $type;
        $settings["to_email"] = $to_email;
        $settings["from_name"] = $from_name;
        $settings["from_email"] = $from_email;
        $settings["subject"] = $subject;
        

        $data["content"] = $message;
        $data["title"] = $from_name;
        $data["from_email"] = "noreply@system.com";
        $ci->email_library->initialize($settings);
        if($ci->email_library->sendmail($data)){
            return 1;
        }else{
            return 2;
        }
        exit;

    }

    if(!function_exists('verify_tab_access')){
        function verify_tab_access(){
            $ci = & get_instance();
            $route = $ci->router->fetch_class();
            $tabs_admin = array( 
                "admin", 
                "manage_employee", 
                "home", 
                "global_api",
                "register",
                "admin_policies",
                "my_profile",
                "admin_location",
                "admin_verification",
                "admin_branches",
                "admin_use_trust",
                "admin_archived",
                "admin_upload",
                "admin_agents",
                "admin_agent_policies",
                "logout");

            $tabs_student = array( 
                "home", 
                "employee",
                "employee_archived",
                "employee_policies",
                "employee_trust_receipt",
                "logout",
                "register",
                "global_api",
                "process_register",
                "my_profile",
                "api_generate_code"
            );
            
            $tabs_agent = array(
                "home", 
                "agent", 
                "my_profile",
                "global_api",
                "agent_use_trust",
                "logout",
            );

            $response = false;
            if ( !empty($ci->session->userdata("user_type"))){
                if ($ci->session->userdata("user_type") == 1 ){
                    if (in_array(strtolower($route), $tabs_admin)) {
                         $response = true;
                    }
                }

                else if($ci->session->userdata("user_type") == 4){
                    if (in_array(strtolower($route), $tabs_agent)) {
                        $response = true;
                    }
                }

                else{
                    if (in_array(strtolower($route), $tabs_student)) {
                        $response = true;
                    }
                }
            }

            return $response;
        } 
    }

    if(!function_exists('_get_course')){
        function _get_course(){
            $ci = & get_instance();
            $par["select"] = "*";
            $data = getData("ca_courses", $par, "obj");
            return $data;
        }
    }

    if(!function_exists('check_my_payment')){
        function check_my_payment($return = "json"){

            $response = array(  "result" => false, "data" => [] );

            $par['select'] = 'amount';
            $par['where']  = array('fk_user_id' => get_user_id());
            
            $getdata       = getData('ca_payments payment', $par, 'obj');

            if(!empty($getdata)){
                $response = array(  "result" => true, "data" => array("amount" => $getdata[0]->amount) );
            }

            if($return == "json"){
                echo json_encode($response);
            }
            else{
                return $getdata[0];
            }
            
        }
    }

    function is_ajaxs(){
        if(empty($_SERVER["HTTP_X_REQUESTED_WITH"])){
            show_404();
        }else{
           return true;
        }
    }

    function getJsonData(){

        return json_decode(file_get_contents("php://input"));

    }

    function get_branches_and_location (){

        $ci = & get_instance();
        $par["select"] = "*";
        $result = [];
        $locations = getData("tbl_locations", $par, "obj");

        if(!empty($locations)){
            $c = 0;
           foreach ($locations as $loc) {
               $loc_id = $loc->loc_id;
               $par["where"] = ["fk_location_id" => $loc_id];
               $branches =  getData("tbl_branches", $par, "obj");

               $locations[$c]->branches = [];

                if(!empty($branches)){
                    $locations[$c]->branches = $branches;
                }

               $c++;
           }

           $result = $locations;
        }
        return $result;

    }

    function encrypt_data(){

        $plaintext = "test";
        $cipher = "aes-128-gcm";
        if (in_array($cipher, openssl_get_cipher_methods()))
        {
            $ivlen = openssl_cipher_iv_length($cipher);
            $iv = openssl_random_pseudo_bytes($ivlen);
            $ciphertext = openssl_encrypt($plaintext, $cipher, $key, $options=0, $iv, $tag);

            echo $ciphertext;
            //store $cipher, $iv, and $tag for decryption later
            // $original_plaintext = openssl_decrypt($ciphertext, $cipher, $key, $options=0, $iv, $tag);
            // echo $original_plaintext."\n";
        }

    }


?>
