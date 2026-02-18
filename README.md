

🌐 Machine Learning Virtual Lab (ML-VLab)
Welcome to the ML Virtual Lab! This project is an interactive Learning Management System (LMS) designed to make complex Machine Learning concepts intuitive. Instead of just reading about algorithms, you can experiment with them in a high-performance 3D environment.

Live Site: https://mlvirtuallab.vercel.app/

🧪 What's Inside?
This lab provides a student-centric, remote-access environment to master fundamental ML algorithms through visualization and simulation.

Linear Regression: Watch Gradient Descent in real-time as it finds the line of best fit. Observe how the Mean Squared Error (MSE) drops as the model learns.

Neural Networks (ANN): An interactive visualizer showing how data pulses through input, hidden, and output layers.

K-Means Clustering: See unsupervised learning in action with step-by-step animations of centroid convergence.

🛠 The Tech Stack
Frontend: Vanilla JS (ES6+), Three.js for the 3D environment, Chart.js for mathematical visualization, and Navigo for smooth routing.

Backend: Node.js & Express.

Database: MongoDB for storing student progress and quiz results.

Deployment: Hosted on Vercel with continuous integration from GitHub.

🚀 Getting Started
1. Requirements
Ensure you have Node.js installed on your system.

2. Installation
Bash
# Clone the repository
git clone https://github.com/KuberChhabra1105/ml-virtual-lab.git
cd ml-virtual-lab

# Install frontend dependencies
npm install

# Setup the backend
cd server
npm install
cd ..
3. Environment Setup
In the /server folder, create a .env file:

Code snippet
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Run Locally
Bash
npm run dev
📖 How to Use the Lab
Access: Enter as a student or use 'Guest Access' to explore.

Explore: Use the Dashboard to pick an experiment from the ML Lab list.

Learn: Each experiment includes Theory, Procedure, and an interactive Simulation.

Assess: Wrap up with a Quiz to evaluate your understanding of the topic.