<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends MX_Controller {

	public function __construct(){
		$route = $this->router->fetch_class();

		if($route  == "api_generate_code" || $route == "api_mobile"){
			
		} else{
			if($route == 'login'){
				if($this->session->has_userdata('is_logged')){
					redirect(base_url());
				}
			}
			else {
				if(!$this->session->has_userdata('is_logged')){
					redirect(base_url('login'));
				}
				else{
					if(!verify_tab_access()){
						show_404();
					}
				}
			}
		}

		

	}

	public function load_login_page($page, $data = array()){
		$this->load->view($page, $data);
	}

	public function load_page($page, $data = array()){
		$this->load->view('includes/admin/header',$data);
		$this->load->view('includes/admin/nav',$data);
		$this->load->view('includes/admin/head',$data);
		$this->load->view($page, $data);
		$this->load->view('includes/admin/footer',$data);
	}

	public function load_employee_page($page, $data = array()){
		$this->load->view('includes/employee/header',$data);
		$this->load->view('includes/employee/nav',$data);
		$this->load->view('includes/employee/head',$data);
		$this->load->view($page, $data);
		$this->load->view('includes/employee/footer',$data);
	}

	public function load_student_page($page, $data = array()){
		$this->load->view('includes/employee/head',$data);
		$this->load->view('includes/employee/header',$data);
		$this->load->view('includes/employee/sidebar',$data);
		$this->load->view($page, $data);
		$this->load->view('includes/employee/footer',$data);
	}

	// agent page
	public function load_agent_page($page, $data = array()){
		$this->load->view('includes/agent/header',$data);
		$this->load->view('includes/agent/nav',$data);
		$this->load->view('includes/agent/head',$data);
		$this->load->view($page, $data);
		$this->load->view('includes/agent/footer',$data);
	}


	public function load_global_page($page, $data = array()){

		if(get_user_type() == 2){
			$this->load->view('includes/employee/header',$data);
			$this->load->view('includes/employee/nav',$data);
			$this->load->view('includes/employee/head',$data);
			$this->load->view($page, $data);
			$this->load->view('includes/employee/footer',$data);
		}

		else if(get_user_type() == 4){
			$this->load->view('includes/agent/header',$data);
			$this->load->view('includes/agent/nav',$data);
			$this->load->view('includes/agent/head',$data);
			$this->load->view($page, $data);
			$this->load->view('includes/agent/footer',$data);
		}
		else{
			$this->load->view('includes/admin/header',$data);
			$this->load->view('includes/admin/nav',$data);
			$this->load->view('includes/admin/head',$data);
			$this->load->view($page, $data);
			$this->load->view('includes/admin/footer',$data);
		}
		
	}

}
