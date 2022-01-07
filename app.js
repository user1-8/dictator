let dictate= document.getElementById('dictate');
let pausebtn= document.getElementById('pause');
let dictateTimeoutArr = [];

// for pausing
pausebtn.onclick = () =>{
	for(let v=0; v<dictateTimeoutArr.length; v++){
		clearTimeout(dictateTimeoutArr[v]);
	}

	pausebtn.innerHTML = 'Stopped <i class="far fa-play-circle"></i>';
	pausebtn.setAttribute('disabled', '');
};



// for adding dummy text
addDummy = () => {
	document.getElementById('text').value+="The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack.";

	dictate.removeAttribute('disabled');
};





// for dictate

var speech = new SpeechSynthesisUtterance();
speech.rate = .6;
speech.pitch = 1;
speech.volume=1;

for(let u=0;u<window.speechSynthesis.getVoices().length;u++){
  if(window.speechSynthesis.getVoices()[u]['voiceURI'].search("David")!=-1){
    speech.voice=window.speechSynthesis.getVoices()[u];
  }
}
setTimeout(function(){
  for(let u=0;u<window.speechSynthesis.getVoices().length;u++){
    if(window.speechSynthesis.getVoices()[u]['voiceURI'].search("David")!=-1){
      speech.voice=window.speechSynthesis.getVoices()[u];
    }
  }
},300);

function speakNow(MyText){
  speech.text = MyText;
  window.speechSynthesis.speak(speech);
  console.log('[SPEAKING] '+speech.text);
}


dictate.onclick = () => {
	setTimeout(function(){

		let text= document.getElementById('text').value;
		let arr = text.split(" ");

		arr = arr.filter((curelem)=>{
			return (curelem!='');
		});

		let afj = 0;
		for(let i=0; i<arr.length; i+=3){
			
			let toBeSpoken = '';
			if(arr[i+2] != undefined){
				toBeSpoken = arr[i]+" "+arr[i+1]+" "+arr[i+2];
			}else if(arr[i+1] != undefined){
				toBeSpoken = arr[i]+" "+arr[i+1];
			}else{
				toBeSpoken = arr[i];
			}
			
			let fop = setTimeout(()=>{
				speakNow(toBeSpoken);
				
			}, afj*1000);

			dictateTimeoutArr.push(fop);

			let numOfCharsArr = toBeSpoken.split('').filter((curelem)=>{
				return (curelem!=" ");
			});
			let gapBtwnSpokens = 0.52;
			afj+=(numOfCharsArr.length)*gapBtwnSpokens;
			
		}

	},2000);
	


	pausebtn.innerHTML = 'Stop <i class="far fa-pause-circle"></i>';
	pausebtn.removeAttribute('disabled');


};


// when type in textarea
document.getElementById('text').onkeyup = () => {
	if(document.getElementById('text').value.length < 1){
		dictate.setAttribute('disabled','');
	}else{
		dictate.removeAttribute('disabled');
	}
};