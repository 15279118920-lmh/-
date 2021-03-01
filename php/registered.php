<?php
header('Content-Type:text/html;charset=UTF-8');
$user = $_POST["user"];
$pas=$_POST['password'];
$link = mysqli_connect('localhost','root','','dangdang');
mysqli_set_charset($link,'utf8');
$sql = "insert into `account` values (null,'$user','$pas')";
mysqli_query($link,$sql);
mysqli_close($link);