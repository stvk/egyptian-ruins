/*
The JavaScript function below parses and returns the parameters.
*/

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

/*
Select a parameter, and set a default value to the variable if it doesn't exist

Use like this:
var mytext = getUrlParam('parameter_name','Default Value');
*/
function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

function printLetters(destination, message, speed, callback){
    var i = 0;
	document.getElementById(destination).innerHTML = ""
    var interval = setInterval(function(){
		if (message.charAt(i) == '\n')
			document.getElementById(destination).innerHTML += '<br/>';
        else
			document.getElementById(destination).innerHTML += message.charAt(i);
        i++;
        if (i > message.length){
            clearInterval(interval);
			callback();
        }
    }, speed);
}

function showDiv(destination, delay) {
	console.log('go og go');
	setTimeout( function () { document.getElementById(destination).style.display = "block"; }, delay);
}