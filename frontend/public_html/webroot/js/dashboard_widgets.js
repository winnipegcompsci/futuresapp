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
 
    $.ajax({
       type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
           console.dir(json.ticker);
        },
        error: function(e) {
           console.log(e.message);
        }
    });
    
}



