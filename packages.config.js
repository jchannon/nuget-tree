var fs = require('fs');
var path = require('path');
var parseXml = require('xml2js').parseString;

module.exports.list = function(dir){

    if (!fs.existsSync(path.join(dir,'packages.config'))){
        console.log('ERROR: cannot find packages.config');
        process.exit(-1);
        return;
    }

    var xml = fs.readFileSync(path.join(dir,'packages.config')).toString();

    var parsedOutput;
    parseXml(xml, function (err, result) {
        parsedOutput = result;
    });

    return parsedOutput.packages.package.map(x => {
        return {
            id : x.$.id,
            version: x.$.version,
            targetFramework : x.$.targetFramework
        }
    });
}