const ctx = document.getElementById('networkChart').getContext('2d');

const networkChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Time labels will be added dynamically
        datasets: [{
            label: 'Download Speed (Mbps)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            fill: true,
        }, {
            label: 'Upload Speed (Mbps)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Time (seconds)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Speed (Mbps)'
                },
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        }
    }
});

// Function to update the chart with new data
function updateChart(downloadSpeed, uploadSpeed) {
    const currentTime = networkChart.data.labels.length;
    networkChart.data.labels.push(currentTime);
    networkChart.data.datasets[0].data.push(downloadSpeed);
    networkChart.data.datasets[1].data.push(uploadSpeed);

    // Limit the number of data points to the last 60 seconds
    if (networkChart.data.labels.length > 60) {
        networkChart.data.labels.shift();
        networkChart.data.datasets[0].data.shift();
        networkChart.data.datasets[1].data.shift();
    }

    networkChart.update();
}

// Socket.IO connection
const socket = io();

// Listen for updates from the server
socket.on('networkUpdate', (data) => {
    updateChart(data.downloadSpeed, data.uploadSpeed);
});