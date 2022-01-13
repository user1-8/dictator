let dire= document.querySelector('.dire');
let dictateread= document.getElementById('dictateread');
let pausebtn= document.getElementById('pause');
let dictateTimeoutArr = [];

// for pausing
let read_or_dictate_clicked = '';
pausebtn.onclick = () =>{

	if(read_or_dictate_clicked == 'dictate'){
		for(let v=0; v<dictateTimeoutArr.length; v++){
			clearTimeout(dictateTimeoutArr[v]);
		}

		pausebtn.innerHTML = 'Stopped <i class="far fa-play-circle"></i>';
		pausebtn.setAttribute('disabled', '');
		dire.classList.remove('disabled');
		document.getElementById('dummy').removeAttribute('disabled');

		document.getElementById('text').setAttribute('style','display:block; z-index:1;');
		document.getElementById('text1').setAttribute('style','display:none; z-index:-1;');

	}else if(read_or_dictate_clicked == 'read'){

		if(pausebtn.innerText.search(/resume/i) == -1){
			spsynth.pause();
			pausebtn.innerHTML = 'Resume <i class="far fa-play-circle"></i>';
		}else{
			spsynth.resume();
			pausebtn.innerHTML = 'Pause <i class="far fa-pause-circle"></i>';
		}
		
	}else{
		alert('error');
	}

	
	
};



// for adding dummy text
addDummy = () => {
	document.getElementById('text').value+="The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex!";

	dire.classList.remove('disabled');
};





// for dictate
var spsynth;
var speech = new SpeechSynthesisUtterance();
speech.rate = .6;
speech.pitch = 1;
speech.volume = 1;

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
  spsynth = window.speechSynthesis;
  spsynth.speak(speech);
  console.log('[SPEAKING] '+speech.text);
}

function dictateread_fun(myThis){
	if(myThis.innerText.search(/dictate/i)!=-1){
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


				let ifLast_fun = function(){};
				if(i>arr.length-3){ // if this is last to be speaked
					ifLast_fun = function(){
						document.getElementById('text').setAttribute('style','display:block; z-index:1;');
						document.getElementById('text1').setAttribute('style','display:none; z-index:-1;');
						document.getElementById('dummy').removeAttribute('disabled');
					};
				}


				let fop = setTimeout(()=>{

					let honeWlaText = '';
					let toBeMatched = '';

					for(let jk=0; jk<arr.length; jk+=3){
						if(arr[jk+2] != undefined){
							toBeMatched = arr[jk]+" "+arr[jk+1]+" "+arr[jk+2];
						}else if(arr[jk+1] != undefined){
							toBeMatched = arr[jk]+" "+arr[jk+1];
						}else{
							toBeMatched = arr[jk];
						}
						
						if(toBeMatched!=toBeSpoken){
							honeWlaText+=toBeMatched+' ';
						}else{
							honeWlaText+='<b>'+toBeMatched+'</b> ';
						}
					}

					speakNow(toBeSpoken);

					document.getElementById('text1').innerHTML = honeWlaText;
					setTimeout(ifLast_fun,8000);

				}, afj*1000);

				dictateTimeoutArr.push(fop);

				let numOfCharsArr = toBeSpoken.split('').filter((curelem)=>{
					return (curelem!=" ");
				});
				let gapBtwnSpokens = 0.52;
				afj+=(numOfCharsArr.length)*gapBtwnSpokens;
				
			}

		},2000);

		read_or_dictate_clicked = 'dictate';

	}else{
		speech.rate = .9;
		speakNow(text.value);
		speech.rate = .6;
		read_or_dictate_clicked = 'read';
		speech.onend=()=>{

			pausebtn.setAttribute('disabled', '');
			dire.classList.remove('disabled');
			document.getElementById('dummy').removeAttribute('disabled');

			document.getElementById('text').setAttribute('style','display:block; z-index:1;');
			document.getElementById('text1').setAttribute('style','display:none; z-index:-1;');

			speech.onend=null;
		};
	}
	

	document.getElementById('text').setAttribute('style','display:none; z-index:-1;');
	document.getElementById('text1').setAttribute('style','display:block; z-index:1;');

	document.getElementById('text1').innerHTML = document.getElementById('text').value;

	document.getElementById('dummy').setAttribute('disabled','');
	// pausebtn.innerHTML = 'Stop <i class="far fa-pause-circle"></i>';
	pausebtn.removeAttribute('disabled');
	dire.classList.add('disabled');

}

let slide_slider_togglevar=0;
function slide_slider(myThis){
	if(slide_slider_togglevar%2==0){
		myThis.style.transform = "rotate(-180deg)";
		document.querySelector('.slider').setAttribute('style','top:100%; opacity:1; pointer-events:auto;');
	}else{
		myThis.style.transform = "rotate(0deg)";
		document.querySelector('.slider').setAttribute('style','top:30%; opacity:0; pointer-events:none;');
	}
	slide_slider_togglevar++;
}

function slct_di(myThis){

	dictateread.innerHTML = 'Dictate <i class="fas fa-volume-up"></i>';

	pausebtn.innerHTML = 'Stop <i class="far fa-pause-circle"></i>';

	slide_slider(document.querySelector('.options .arrow'));
}
function slct_re(myThis){

	dictateread.innerHTML = 'Read <i class="fas fa-volume-up"></i>';

	pausebtn.innerHTML = 'Pause <i class="far fa-pause-circle"></i>';

	slide_slider(document.querySelector('.options .arrow'));
}




// when type in textarea
document.getElementById('text').onkeyup = () => {
	if(document.getElementById('text').value.length < 1){
		dire.classList.add('disabled');
	}else{
		dire.classList.remove('disabled');
	}
};