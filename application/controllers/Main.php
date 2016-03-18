<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {
	public function index()
	{		
		$this->load->model('NewsModel');
		//新闻列表
		$newsList = $this->NewsModel->getAll();
		echo json_encode($newsList); 
		// $this->load->view('main/index.php', array(
		// 		"newsList" => json_encode($newsList)
		// 	));
	}


	public function add() {
		$this->load->model('NewsModel');
		$postData = $this->input->post();

		$this->NewsModel->save($postData);


		// print_r($data); die;



	}
}
