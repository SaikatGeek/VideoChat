<?php

class User
{
    public $db, $userID, $sessionID;

    public function __construct()
    {
        $db             = new DB;
        $this->db       = $db->connect();
        $this->userID   = $this->ID();
        $this->sessionID   = $this->getSessionID();
    }

    public function ID()
    {
        if($this->isLoggedIn()){
            return $_SESSION['userID'];
        }
    }

    public function getSessionID()
    {
        return session_id();
    }

    public function emailExist($email)
    {
        $statement = $this->db->prepare("SELECT * FROM `users` WHERE `email` = :email");
        
        $statement->bindParam(':email', $email, PDO::PARAM_STR);
        
        $statement->execute();
        
        $user = $statement->fetch(PDO::FETCH_OBJ);

        if(!empty($user)){
            return $user;
        }
        else{
            return false;
        }
    }

    public function hash($password)
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public function redirect($location)
    {
        header("Location: ".BASE_URL.$location);
    }

    public function isLoggedIn()
    {
        return isset($_SESSION['userID']) ? true : false;
    }

    public function userData($userID = "")
    {
        $userID = empty($userID) ? $this->userID : $userID;

        $statement = $this->db->prepare("SELECT * FROM `users` WHERE `userID` = :userID");
        
        $statement->bindParam(':userID', $userID, PDO::PARAM_STR);
        
        $statement->execute();
        
        return $statement->fetch(PDO::FETCH_OBJ);
    }

    public function getUsers()
    {
        $statement = $this->db->prepare("SELECT * FROM `users` WHERE `userID` != :userID");

        $statement->bindParam(':userID', $this->userID, PDO::PARAM_INT);

        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_OBJ);
    }

    public function getUserByUsername($userName)
    {
        $statement = $this->db->prepare("SELECT * FROM `users` WHERE `userName` = :userName");

        $statement->bindParam(':userName', $userName, PDO::PARAM_STR);

        $statement->execute();

        return $statement->fetch(PDO::FETCH_OBJ);
    }

    public function updateSession()
    {
        $statement = $this->db->prepare("UPDATE `users` SET `sessionID` = :sessionID  WHERE `userID` = :userID");
        
        $statement->bindParam(':sessionID', $this->sessionID, PDO::PARAM_STR);
        $statement->bindParam(':userID', $this->userID, PDO::PARAM_INT);
        
        $statement->execute();
    }

    public function getUserBySession($sessionID)
    {
        $statement = $this->db->prepare("SELECT * FROM `users` WHERE `sessionID` = :sessionID");

        $statement->bindParam(':sessionID', $sessionID, PDO::PARAM_STR);

        $statement->execute();

        return $statement->fetch(PDO::FETCH_OBJ);
    }



    public function logout()
    {
        $_SESSION = [];
        session_destroy();
        session_regenerate_id();
        $this->redirect('index.php');
    }


    
}