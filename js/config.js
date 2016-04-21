////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Config object

/////////////////////////////////////////////////////////////////////////////////
//  Config Object
//
//		Begins a calling loop to the server to get a randomized 
//		staff to display in the designated canvas
//
function Config(name, tempo, beat, beatcount, difficulty) {
    this.name = name;
    this.tempo = tempo;
    this.beat = beat;
    this.beatcount = beatcount;
    this.difficulty = difficulty;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Initialize Configurations

/////////////////////////////////////////////////////////////////////////////////
//  init
//
//		initialize the configuration array from the config file
//
function init_configurations() {
    var configurations = [];
    var cfg = {};
    
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.webkitPersistentStorage.requestQuota(1024*1024, function(grantedBytes) {
        window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
    }, function(e) {
        console.log('Error', e);
    });
    window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
    //configurations = waitinit(configurations, cfg);
    
    return configurations;
}

function onInitFs(fs) {

  fs.root.getFile('config/config.cfg', {}, function(fileEntry) {

    // Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {
         console.log(this.result);
       };
       reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);

}

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

function waitinit(configurations, cfg){
     $.get('config/config.cfg', function(data) {
        var lines = data.split("\n");

        var option;
         
        for (line in lines){

            if (line.includes('CONFIG')){
                option = 'name';
            }
            else if (line.includes('TEMPO')){
                option = 'tempo';
            }
            else if (line.includes('BEAT')){
                option = 'beat';
            }
            else if (line.includes('BEATCOUNT')){
                option = 'beatcount';
            }
            else if (line.includes('DIFFICULTY')){
                option = 'difficulty';
            }
            else if (line.includes('$_END')){
                temp = new Config(cfg['name'], cfg['tempo'],
                                  cfg['beat'], cfg['beatcount'],
                                  cfg['difficulty']);

                configurations.push(temp);
                continue;
            }
            cfg[option] = line.split(':')[1];
        }
    });
    
    return configurations;
}

function add_configuration(configurations, config){
    configurations.push(config);
    write_back(configurations);
}

function delete_configuration(configurations, index){
    configurations.splice(index, 1);
    write_back(configurations);
}

function write_back(configurations){
    var cfgFile = "config/config.cfg";
    var file = new File(cfgFile);

    file.open("w"); // open file with write access
    for (cfg in configurations){
        file.writeln("CONFIG:" + cfg.name);
        file.writeln("TEMPO:" + cfg.tempo);
        file.writeln("BEAT:" + cfg.beat);
        file.writeln("BEATCOUNT:" + cfg.beatcount);
        file.writeln("DIFFICULTY:" + cfg.difficulty);
        file.writeln("$_END");
    }
    file.close();
}