<?php

class user
{
    public $db;

    public function __construct()
    {
        $db = new DB;
        $this->db = $db->connect();
    }
}