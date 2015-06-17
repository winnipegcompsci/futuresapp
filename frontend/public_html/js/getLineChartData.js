var xmlhttp = null;
xmlhttp = new XMLHttpRequest();
var okcoin_url = "../../history/reader_okcoin.php";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var okcoin_data = JSON.parse(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", okcoin_url, true);
xmlhttp.send();

var seven_nine_six_url = "../../history/reader_sevenninesix.php";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var data_796 = JSON.parse(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", seven_nine_six_url, true);
xmlhttp.send();



