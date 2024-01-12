<!DOCTYPE html>
<html>
<head>
<title>CallType</title>
</head>
<body>
<?php
if (isset($_GET['type'])) {
	$calltype = $_GET['type'];
} else {
	$calltype = 'default';
}
?>
  <h1>The call type is <?php echo $calltype; ?></h1>
  <audio id="audio" controls autoplay>
  <source src="<?php echo $calltype; ?>.mp3" preload="auto" type="audio/mpeg"/>
  Audio cannot be played on this browser - please use Edge, Chrome or Firefox
</audio>
</body>
</html>
