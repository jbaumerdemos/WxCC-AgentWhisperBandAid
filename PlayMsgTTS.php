<?php
require '../vendor/autoload.php';



use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\TextToSpeech\V1\AudioEncoding;
use Google\Cloud\TextToSpeech\V1\SynthesisInput;
use Google\Cloud\TextToSpeech\V1\TextToSpeechClient;
use Google\Cloud\TextToSpeech\V1\VoiceSelectionParams;

//$textToSpeechClient = new TextToSpeechClient();

$textToSpeechClient = new TextToSpeechClient([
    'credentials' => '/home3/admin911/public_html/oursites/cisco/vendor/google/ttscredentials.json'
]);

if (isset($_GET['type'])) {
	$calltype = $_GET['type'];
} else {
	$calltype = 'General';
}

$input = new SynthesisInput();
$input->setText($calltype . ' call!');
$voice = new VoiceSelectionParams();
$voice->setLanguageCode('en-US');
$audioConfig = new AudioConfig();
$audioConfig->setAudioEncoding(AudioEncoding::MP3);

$resp = $textToSpeechClient->synthesizeSpeech($input, $voice, $audioConfig);
file_put_contents('test.mp3', $resp->getAudioContent());
?>

<!DOCTYPE html>
<html>
<head>
<title>CallType</title>
</head>
<body>
<?php

?>
  <h1>The call type is <?php echo $calltype; ?></h1>
  <audio id="audio" controls autoplay>
  <source src="test.mp3" preload="auto" type="audio/mpeg"/>
  Audio cannot be played on this browser - please use Edge, Chrome or Firefox
</audio>
</body>
</html>
