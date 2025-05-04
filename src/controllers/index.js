class IndexController {
    constructor(networkMonitor) {
        this.networkMonitor = networkMonitor;
    }

    async getNetworkSpeed(req, res) {
        try {
            const { uploadSpeed, downloadSpeed } = await this.networkMonitor.getNetworkSpeed();
            res.json({ uploadSpeed, downloadSpeed });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch network speed' });
        }
    }

    async getISPInfo(req, res) {
        try {
            const ispInfo = await this.networkMonitor.getISPInfo();
            res.json(ispInfo);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch ISP information' });
        }
    }

    async getMonitoringData(req, res) {
        try {
            const networkData = await this.networkMonitor.getMonitoringData();
            res.json(networkData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch monitoring data' });
        }
    }
}

module.exports = IndexController;