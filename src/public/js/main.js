const socket = io();
const downloadSpeedElement = document.getElementById('download-speed');
const uploadSpeedElement = document.getElementById('upload-speed');
const ispInfoElement = document.getElementById('isp-info');
const chartElement = document.getElementById('speed-chart');

let downloadSpeedData = [];
let uploadSpeedData = [];
let chart;

function initializeChart() {
    chart = new Chart(chartElement, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Download Speed (Mbps)',
                    data: downloadSpeedData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                },
                {
                    label: 'Upload Speed (Mbps)',
                    data: uploadSpeedData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
            },
        },
    });
}

function updateChart() {
    const currentTime = new Date().toLocaleTimeString();
    chart.data.labels.push(currentTime);
    chart.data.datasets[0].data.push(downloadSpeedElement.textContent);
    chart.data.datasets[1].data.push(uploadSpeedElement.textContent);
    chart.update();
}

socket.on('networkUpdate', (data) => {
    downloadSpeedElement.textContent = data.downloadSpeed;
    uploadSpeedElement.textContent = data.uploadSpeed;
    ispInfoElement.textContent = data.ispInfo;

    updateChart();
});

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    setInterval(() => {
        socket.emit('requestNetworkData');
    }, 1000);
});