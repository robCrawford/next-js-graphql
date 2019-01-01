const fs = require('fs');
const os = require('os');

const packageData = fs.readFileSync('package.json', 'utf8');
const version = JSON.parse(packageData).version;
const serviceName = "GraphQL";
console.log(`${serviceName} version ${version}`);

exports.serviceName = serviceName;
exports.version = version;
exports.hostname = os.hostname();

