<?php

class DB 
{
    
    public function connect()
    {
        $db = new PDO("mysql:dbname=wemeet;host=localhost", "root", "");

        return $db;
    }

}