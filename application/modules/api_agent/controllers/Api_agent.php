<?php

defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");   
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

class Api_agent extends MY_Controller {

    public function __construct(){
        
        parent::__construct();

    }

    public function index(){
        $response = ["status" => "error", "message" => ""];
        $this->setResponse($response);
    }

    public function auth_user(){

        if(getReqMethod() == "POST"){

            if(is_ajaxs()){
                $post = $this->input->post();
                $response = ["status" => "error", "message" => "Something wrong!", "data" => [] ];

                if(!empty($post)){
                    $response = ["status" => "false", "message" => "Something wrong!", "data" => $post ];
                }
                
                $this->setResponse($response);
            }
        }
    }

    private function setResponse($response =[], $httpCode= 200){

        echo json_encode($response);
        exit;

    }	
}
