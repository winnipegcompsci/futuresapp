/*
okcoin_current_price
okcoin_current_balance
okcoin_current_positions
*/

window.setInterval(function(){
  updateOKCoinCurrentPrice();
}, 5000);

function updateOKCoinCurrentPrice () {   
    var url = 'http://www.okcoin.com/api/v1/ticker.do';
 
 
    $.getJSON("http://www.okcoin.com/api/v1/ticker.do?callback=?", function(result){
        //response data are now in the result variable
        setText($("#okcoin_current_price"), result.ticker);
    });
    
}


function setText(elem, text) {
    console.log("Setting " + elem.id + " text to " + text);
}


