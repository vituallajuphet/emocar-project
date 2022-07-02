<?php   
header("Access-Control-Allow-Origin: *");   
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

require($_SERVER["DOCUMENT_ROOT"] . '/emocar//vendor/autoload.php');
use \Firebase\JWT\JWT;

defined('BASEPATH') OR exit('No direct script access allowed');

class Api_mobile extends MY_Controller {


    private $pkey = "emocar";

    public function __construct(){
        parent::__construct();
    }

    public function index(){

        $this->auth_user();
    }

    public function auth_user(){

        

        if(getReqMethod() == "POST"){

            if(is_ajaxs()){
                $post = json_decode(file_get_contents("php://input"),true);
                $response = ["status" => "error", "message" => "Something wrong!", "data" => [] ];

                if(!empty($post["username"] && !empty($post["password"]))){

                    $par["where"]   = ["username" => $post["username"], "usr.status" => 1];
                    $par["join"]    = [
                        "user_meta meta" => "meta.fk_user_id = usr.user_id",
                    ];

                    $res = getData("users usr", $par, "obj");

                    if(!empty($res)) {

                        $password = $post["password"];

                        if(password_verify($password, $res[0]->password)){
                            unset($res[0]->password);
                            $res[0]->time = time();
                            $jwt = JWT::encode($res[0], $this->pkey);
                            $res[0]->token_value = $jwt;

                            $cdate = new DateTime();
                            $cdate->modify('+1 day');

                            $data = [
                                "fk_user_id" => $res[0]->user_id,
                                "token_value" =>  $jwt,
                                "date_added" =>  date("Y-m-d"),
                                "date_expired" =>  $cdate->format('Y-m-d'),
                                "status" => 1                                
                            ];
                            $res[0]->password = '';

                            insertData("tbl_log_tokens", $data);
                            $response = ["status" => "success", "message" => "Successfully Logged-in", "data" => $res[0] ];
                        }
                        else{ 
                            $response = ["status" => "error", "message" => "Incorrect Username or Password!", "data" => [] ];
                        }
                    }else{
                        $response = ["status" => "error", "message" => "Incorrect Username or Password!", "data" => [] ];
                    }
                }
                
                $this->setResponse($response);
            }
        }else{
            echo 1;
        }
    }

    public function verify_token(){

        if(getReqMethod() == "POST"){
            if(is_ajaxs()){
                $post = $this->input->post();
                $response = ["status" => "error", "message" => "Something wrong!", "data" => [] ];

                if(!empty($post["token"])){

                    $par["where"]   = ["token_value" => $post["token"], "date_expired >" => date("Y-m-d")];

                    $res = getData("tbl_log_tokens", $par, "obj");

                    if(!empty($res)) {

                        $this->removeExpiredToken($res[0]->fk_user_id);

                        $decoded = JWT::decode($post["token"], $this->pkey, array('HS256'));

                        $response = ["status" => "success", "message" => "Verified", "data" => $decoded ];
                    }
                }
        
                $this->setResponse($response);
            }
        }
    }

    public function logout(){

        if(getReqMethod() == "POST"){

            if(is_ajaxs()){
                $post = json_decode(file_get_contents("php://input"),true);
                $response = ["status" => "error", "message" => "Something wrong!", "data" => [] ];

                if(!empty($post["token"])){

                    $where  = ["token_value" => $post["token"]];

                    deleteData("tbl_log_tokens", $where);
                    $response = ["status" => "success", "message" => "logged out", "data" => [] ];
                  
                }
        
                $this->setResponse($response);
            }
        }

    }

    private function removeExpiredToken($user_id){
        
        $where= ["fk_user_id" => $user_id, "date_expired <=" => date("Y-m-d") ];
        deleteData("tbl_log_tokens", $where);
    }

    private function setResponse($response =[], $httpCode= 200){
        echo json_encode($response);
        exit;
    }

}
