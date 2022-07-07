<?php

header("Access-Control-Allow-Origin: *");   
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

require($_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php');
use \Firebase\JWT\JWT;

defined('BASEPATH') OR exit('No direct script access allowed');

class Api_generate_code extends MY_Controller {


    private $pkey = "emocar";

    public function __construct(){
        
        parent::__construct();
        $this->formatNumber(get_user_contact(true));

    }


    public function index(){
         $this->generate_newcode();
    }

    public function verify_code(){
        if(is_ajaxs()){
            $response = ["status" => "error"];
            if(!empty($_POST["code"])){
                $par["select"] ="*";
                $par["order"] = "id DESC";
                $par["limit2"] = [1];
                $res = getData("tbl_verification_code", $par);
                if($res[0]['code'] == $_POST["code"]){
                    $response = ["status" => "success"];
                    $this->generate_newcode(false);
                }
            }
            
            echo json_encode($response);
        }
    }

    public function generate_newcode($sendMessage =true){

        $code = $this->generate_code(6);

        deleteData("tbl_verification_code", 'id  != 0');
        

		$data = array(
            "code" => $code,
            "user_id" => 1,
        );

        $res = insertData("tbl_verification_code",  $data);

        $account_sid = 'AC3d5057fe0d7540e730a0a6a3b60f56a8';
        $auth_token = '1bffbb550e024649008ce24c5144a929';
        $twilio_number = "+19785413794";

        if($sendMessage){
            // $client = new Client($account_sid, $auth_token);
            // $client->messages->create(
            //     // Where to send a text message (your cell phone?)
            //     $this->formatNumber(get_user_contact())."",
            //     array(
            //         'from' => $twilio_number,
            //         'body' => 'verification code is: '.$code.'           from: emocarinsurancebrokerage.com'
            //     )
            // );
            $response = ["status" => "success"];
            echo json_encode($response);    
        }
        
	}

	private function generate_code($length) {
		$characters = '0123456789';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}


    private function formatNumber($number) {
        if(!empty($number)){
            if(empty(strpos($number, '+63'))){
                return "+63".substr($number, 1);
            }
        }
        return $number;

    }
    
}
