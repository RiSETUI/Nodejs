const { exec } = require('child_process');

function getNetworkSpeed(callback) {
    exec('cat /proc/net/dev', (error, stdout) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return callback(error);
        }

        const lines = stdout.trim().split('\n');
        const networkData = {};

        lines.slice(2).forEach(line => {
            const parts = line.trim().split(/\s+/);
            const interfaceName = parts[0].replace(':', '');
            const receivedBytes = parseInt(parts[1], 10);
            const transmittedBytes = parseInt(parts[9], 10);

            networkData[interfaceName] = {
                receivedBytes,
                transmittedBytes
            };
        });

        callback(null, networkData);
    });
}

function getISPInfo(callback) {
    exec('curl -s https://ipinfo.io', (error, stdout) => {
        if (error) {
            console.error(`Error fetching ISP info: ${error}`);
            return callback(error);
        }

        try {
            const ispInfo = JSON.parse(stdout);
            callback(null, ispInfo);
        } catch (parseError) {
            console.error(`Error parsing ISP info: ${parseError}`);
            callback(parseError);
        }
    });
}

module.exports = {
    getNetworkSpeed,
    getISPInfo
};