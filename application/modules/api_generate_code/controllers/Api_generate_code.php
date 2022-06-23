<?php

header("Access-Control-Allow-Origin: *");   
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

require($_SERVER["DOCUMENT_ROOT"] . '/emocar/vendor/autoload.php');
use Twilio\Rest\Client;

defined('BASEPATH') OR exit('No direct script access allowed');

class Api_generate_code extends MY_Controller {


    private $pkey = "emocar";

    public function __construct(){
        
        parent::__construct();

    }


    public function index(){
         $this->generate_newcode();
    }

    public function generate_newcode(){

        $code = $this->generate_code(6);

        deleteData("tbl_verification_code", 'id  != 0');
        

		$data = array(
            "code" => $code,
            "user_id" => 1,
        );

        $res = insertData("tbl_verification_code",  $data);

        $account_sid = 'AC3d5057fe0d7540e730a0a6a3b60f56a8';
        $auth_token = '653a2866a09c094e19296d9aa412a26b';
        // In production, these should be environment variables. E.g.:
        // $auth_token = $_ENV["TWILIO_AUTH_TOKEN"]

        // A Twilio number you own with SMS capabilities
        $twilio_number = "+19785413794";

        $client = new Client($account_sid, $auth_token);
        $client->messages->create(
            // Where to send a text message (your cell phone?)
            '+639058927403',
            array(
                'from' => $twilio_number,
                'body' => 'verification code is: '.$code.'           from: emocarinsurancebrokerage.com'
            )
        );

        $response = ["status" => "success"];
        echo json_encode($response);
        
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

    
}
