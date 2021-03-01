<?php
header('Content-Type:text/plain;charset=UTF-8');
$id = $_GET['id'];
$link = mysqli_connect('localhost', 'root', '', 'dangdang');
mysqli_set_charset($link, 'utf8');
$sql = "select*from item limit $id";
$res = mysqli_query($link, $sql);
$arr = [];
while ($row = mysqli_fetch_assoc($res)) {
    array_push($arr, $row);
}
echo json_encode($arr);