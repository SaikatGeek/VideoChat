<?php

class DB 
{
    public function connect()
    {
        $db = new PDO('mysql:host=localhost;dbname=wemeet', 'root', '');

        return $db;
    }

}