////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Objects

/////////////////////////////////////////////////////////
// Staves			- Contains both the treble Staff 
//						- and bass Staff. Beats per
//						- minute and iteration count
//						- information
function Staves(){
	this.treble;
	this.bass;
	this.bpm=0;
	this.iteration = 0;
	this.maxIteration = 0;
	
	this.iter = function() {iteration++;};
	this.checkLoopComplete = function() {
		if (iteration >= maxIteration) {
			return true;
		}
		return false;
	};
	this.setMaxIter = function(max) {this.maxIteration = max;};
	this.setBPM = function(val) { this.bpm = val; };
	
	this.setTreble = function(t) {this.treble = t;};
	this.setBass = function(b) {this.bass = b;};
}

/////////////////////////////////////////////////////////
// Staff			- Holds multiple StaveNotes
//					- Key	signature
//					- Clef
function Staff(){
	this.notes=[];
	//this.clef="";
	this.keySignature="";
	this.timeSignature="";
	this.timeSignatureVal=0;
	this.timeFilled=0;
	
	this.setTimeSigVal = function(val) { this.timeSignatureVal = val; };
	this.setTimeSignature = function(ts) { this.timeSignature = ts; };
	this.setKeySignature = function(ks) { this.keySignature = ks; };
	//this.setClef = function(c) { this.clef = c; };
	this.addStaveNote = function(sn) { 
		var total = timeFilled;
		if (sn.duration=="w") {
			total += 4;
		}
		else if (sn.duration=="h") {
			total += 2;
		}
		else if (sn.duration=="q") {
			total += 1;
		}
		////magic
		// find out if the added stavenote will go past the allotted time
		// if it will, don't push. If it won't, push it
		this.notes.push(sn); 
	};
	
}

/////////////////////////////////////////////////////////
// StaveNote	- Vertical grouping of notes
function StaveNote() {
	this.keys=[];
	this.duration="";
	
	this.addNote = function(note, accidental) { 
		var n = new Note();
		n.setNote(note);
		n.setAccidental(accidental);
		this.keys.push(n);
	};
	
	this.addNote = function(note) { this.keys.push(note); };
	
	this.setDuration = function(time) { this.duration=time; };
}

/////////////////////////////////////////////////////////
// Note			- Information for a single note
function Note(){
	this.key="";
	this.accidental="";
	
	this.setNote = function(n) { this.key = n; };
	this.setAccidental = function(a) { this.accidental = a; };
}