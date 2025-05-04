# Node.js Monitoring App

This project is a real-time monitoring application built with Node.js, Express, Socket.IO, EJS, and Tailwind CSS. It is designed to monitor Android devices, providing insights into network speed, ISP information, and other relevant metrics.

## Features

- Real-time monitoring of network upload and download speeds.
- Detailed information about the Internet Service Provider (ISP).
- Modern and responsive UI using Tailwind CSS.
- Interactive charts for visualizing network data with Chart.js.
- Modular architecture with controllers, routes, and views.

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- An Android device with root access (using Magisk and BusyBox)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nodejs-monitoring-app.git
   cd nodejs-monitoring-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure your Android device to allow monitoring. Ensure that you have the necessary permissions and tools installed.

## Usage

1. Start the server:

   ```bash
   node server.js
   ```

2. Open your web browser and navigate to `http://localhost:3000` to access the monitoring dashboard.

## Real-time Updates

The application updates network speed and other metrics every second, providing a seamless monitoring experience.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.