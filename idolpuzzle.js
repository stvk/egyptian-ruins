const IDOL_COUNT = 15;
//const WINNING_CONFIG = Array(1,3,2,4,5,6,7,8,9,10,11,12,13,14,15);
const WINNING_CONFIG = Array(6,5,7,14,2,15,13,8,9,3,1,12,10,4,11);

/*pre-load the crumbling sound*/
crumbleAudio = new Audio('./media/Crumble_Loop.wav'); 
if (typeof crumbleAudio.loop == 'boolean')
{
    crumbleAudio.loop = true;
}
else
{
    crumbleAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

$(function(){
  
$(".connectedSortable").sortable({
	connectWith: ".connectedSortable",
	receive: function (event, ui) {
		var targetul = $(ui.item).parent().attr("id");
		var targetno = parseInt(targetul.split("list-")[1]);
		var sourceul = $(ui.sender).attr("id");
		var sourceno = parseInt(sourceul.split("list-")[1]);

		if (sourceno > targetno)
		 rippleUp(targetno, sourceno);
		else
		 rippleDown(targetno, sourceno);
	},
	stop: function (event, ui) {
		checkCompletion();
	}
})
.disableSelection();

function checkCompletion () {
	var idols = document.getElementsByTagName("li");
	for (var i=0; i<IDOL_COUNT; i++) {
		if (idols[i].id.replace("li-","") != WINNING_CONFIG[i]) {
			//console.log("mismatch: " + idols[i].id.replace("li-","") + " != " + WINNING_CONFIG[i]);
			return false;
		}
		/*else {
		console.log("ok: "+ idols[i].id.replace("li-","") + " == " + WINNING_CONFIG[i]);
		}*/
	}
	console.log("success!");
	
	for (var i=0; i<IDOL_COUNT; i++) {
		idols[i].childNodes[0].className += " shaking";
	}
	
	MESSAGE = `The idols shake in confirmation that a puzzle has been solved. 
	A small scroll drops from an unseen opening in the roof and clatters to the floor.
	
	As you pick it up, the walls and roof begin to groan and crumble, time to make a hasty retreat!`;
	printLetters('messagebox3', MESSAGE, 50, 
				 function () {  $('#inneroverlay').css('background-image', 'url("./media/snow.gif")');
								crumbleAudio.play();
								setTimeout(function(){ window.location.replace('./7fra.html'); },5000) } 
				);
	
	
	
	return true;
}

function rippleUp(start, end) {
	for (var i=start;i<end;i++) {
		 $("#list-"+i+" > li").last().prependTo("#list-"+(i+1));
	}
}

function rippleDown(start, end) {
	for (var i=start;i>end;i--) {
		 $("#list-"+i+" > li").first().appendTo("#list-"+(i-1));
	}
}

$(".connectedSortable").data("ui-sortable").floating = true;
});


$(function () { 
 
  showText("#msg", "Hello, World!", 0, 500);    
 
});