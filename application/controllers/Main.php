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
		// print_r($_REQUEST); die;
		$this->load->model('NewsModel');
		$postData = $this->input->post();
		//获取当前新增或修改文章的id
		$id = $this->NewsModel->save($postData);

		echo $id; 
	}

	public function update() {
		// print_r($_REQUEST); die;
		$this->load->model('NewsModel');
		$postData = $this->input->post();
		$id = $postData['id'];

		$this->NewsModel->save($postData, $id);

	}

	public function delete() {
		$this->load->model('NewsModel');
		$id = $this->input->post('id');

		$status = $this->NewsModel->delete($id);
		if ( $status ) {
			echo "ok";
		}
	}
}
