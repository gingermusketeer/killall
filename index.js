var spawn = require('child_process').spawn;
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

module.exports = function(name, callback){
  var defaults = spawn('killall', [name]);

  var result = '';
  defaults.stdout.on('data', function(data){
    result += decoder.write(data);
  });
  defaults.on('close', function(code){
    if(code === 0){
      callback(null, result);
    } else {
      var message = 'Unable to killall processes "' +
        name + '". Result was: ' + result;
      callback(new Error(message));
    }
  });
};