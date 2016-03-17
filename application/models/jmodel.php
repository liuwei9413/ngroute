<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Jmodel extends CI_Model
{
    function getRedis() 
    {
    	$redis = new Redis();

    	if ( !$redis->connect( '127.0.0.1' ) )
    		return false;

    	return $redis;
    }
        
}

?>
