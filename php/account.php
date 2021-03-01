<?php
header('Content-type:text/html,charset=utf-8');
$account = $_POST['account'];
$psd = $_POST['psd'];
$link = mysqli_connect('localhost','root','',"dangdang");
mysqli_set_charset($link,'utf8');
$sql="select*from account where user='$account' and password='$psd'";
$res = mysqli_query($link,$sql);
if(mysqli_fetch_assoc($res)){
    echo 1;
}else{
    echo 0;
};