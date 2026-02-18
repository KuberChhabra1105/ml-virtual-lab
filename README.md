🌐 Machine Learning Virtual Lab (ML-VLab)
Welcome to the ML Virtual Lab! This project is a modern, interactive Learning Management System (LMS) designed to make complex Machine Learning concepts intuitive. Instead of just reading about algorithms, you get to play with them in a high-performance 3D environment.

Inspired by the IIT Virtual Labs initiative, we built this to bridge the gap between heavy theory and hands-on simulation.

🧪 What's inside?
We’ve currently implemented three core experiments that cover the pillars of ML:

Linear Regression: Watch Gradient Descent in real-time as it tries to find the line of best fit. You can see the MSE (Error) drop as the model learns.

Neural Networks (ANN): A visualizer that shows how data pulses through input, hidden, and output layers.

K-Means Clustering: See unsupervised learning in action as centroids move to group scattered data points automatically.

🛠 The Tech Stack
Frontend: Vanilla JS (ES6+), Three.js for the 3D world, Chart.js for the math viz, and Navigo for smooth, no-refresh routing.

Backend: Node.js & Express.

Database: MongoDB for saving your progress and quiz scores.

Build Tool: Vite (because waiting for slow builds is the worst).

🚀 Getting Started
1. Requirements
Make sure you have Node.js installed on your machine.

2. Setup
First, clone this repo and grab the dependencies:

Bash
# Install frontend tools
npm install

# Setup the backend
cd server
npm install
cd ..
3. Environment Variables
Inside the /server folder, create a .env file and add your MongoDB connection string:

Code snippet
MONGO_URI=your_mongodb_atlas_link_here
JWT_SECRET=something_super_secret
4. Let's Go!
Run the master command to start both the frontend and the backend at once:

Bash
npm run dev
Now, open your browser to http://localhost:5173 and start learning!

📖 How to use the Lab
Login: Enter as a student or use 'Guest Access' to browse.

Pick a Topic: From the dashboard, enter the ML Lab to see the list of experiments.

Learn: Start with Theory, check the Procedure, then jump into the Simulation to get your hands dirty.

Test Yourself: Wrap up with the Quiz to see if you’ve mastered the concept.

🤝 Contributing
Found a bug? Want to add a Decision Tree or SVM simulation? Feel free to fork this, make your changes, and send a PR.