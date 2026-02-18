class LabService {
    getExperiment(labId) {
        const id = labId.toLowerCase();

        if (id === 'linear-regression') {
            return {
                id: 'Linear Regression',
                theory: `
                    <div class="lab-content">
                        <h2>Linear Regression</h2>
                        <div class="objective-box">
                            <h4>Objective</h4>
                            <p>Learn how to fit a straight line to data by minimizing the error between predicted and actual values using Gradient Descent.</p>
                        </div>
                        
                        <h3>Key Concepts</h3>
                        <ul>
                            <li><strong>Hypothesis:</strong> $y = mx + c$</li>
                            <li><strong>Cost Function (MSE):</strong> Measures the average squared difference between estimated values and the actual value.</li>
                            <li><strong>Gradient Descent:</strong> An optimization algorithm used to minimize the cost function by iteratively moving in the direction of steepest descent.</li>
                        </ul>
                    </div>
                `,
                procedure: `
                    <div class="lab-content">
                        <h2>Interactive Procedure</h2>
                        <div class="step-box">
                            <h4>Step 1: Generate Noise</h4>
                            <p>Click "Add Random Data" to create a scatter plot. Notice the linear trend but with noise.</p>
                        </div>
                        <div class="step-box">
                            <h4>Step 2: Initialize Training</h4>
                            <p>Set the Learning Rate to 0.001. This controls how big of a step the algorithm takes.</p>
                        </div>
                        <div class="step-box">
                            <h4>Step 3: Observe Convergence</h4>
                            <p>Click "Train". Watch the red line adjust. The goal is to make the MSE (Mean Squared Error) as close to 0 as possible.</p>
                        </div>
                    </div>
                `,
                quiz: [
                    { question: "What is the goal of Gradient Descent?", options: ["Maximize Error", "Minimize Cost Function", "Increase Complexity"], answer: "Minimize Cost Function", explanation: "It aims to find the local minimum of a differentiable function." },
                    { question: "Which term represents the slope?", options: ["y", "m", "c"], answer: "m", explanation: "Correct! m is the slope/gradient." },
                    { question: "What happens if learning rate is too low?", options: ["Divergence", "Slow convergence", "Overshooting"], answer: "Slow convergence", explanation: "It will take baby steps and take a long time to reach the minimum." },
                    { question: "What does MSE stand for?", options: ["Mean Standard Error", "Mean Squared Error", "Max Sum Error"], answer: "Mean Squared Error", explanation: "It is the average of the squares of the errors." },
                    { question: "Is Linear Regression supervised or unsupervised?", options: ["Supervised", "Unsupervised"], answer: "Supervised", explanation: "It requires labeled data (input-output pairs)." }
                ]
            };
        } else if (id === 'ann') {
            return {
                id: 'Artificial Neural Networks',
                theory: `
                     <div class="lab-content">
                        <h2>Neural Networks</h2>
                        <div class="objective-box">
                            <h4>Objective</h4>
                            <p>Visualize the structure of a Multi-Layer Perceptron (MLP) and understand how signals propagate forward.</p>
                        </div>
                        
                        <h3>Key Concepts</h3>
                        <ul>
                            <li><strong>Neurons (Nodes):</strong> Basic units that receive input, process it, and pass it on.</li>
                            <li><strong>Weights (Edges):</strong> Determine the strength of the connection between neurons.</li>
                            <li><strong>Feed Forward:</strong> The process of passing inputs through the network to get an output.</li>
                        </ul>
                    </div>
                `,
                procedure: `
                     <div class="lab-content">
                        <h2>Interactive Procedure</h2>
                        <div class="step-box">
                            <h4>Step 1: Inspect the Architecture</h4>
                            <p>Hover over nodes to see their connections. Notice the Input, Hidden, and Output layers.</p>
                        </div>
                        <div class="step-box">
                            <h4>Step 2: Simulate a Signal</h4>
                            <p>Click "Run Feed Forward". Watch the pulse travel through the network layer by layer.</p>
                        </div>
                    </div>
                `,
                quiz: [
                    { question: "What is the input layer's job?", options: ["Process data", "Receive raw data", "Output prediction"], answer: "Receive raw data", explanation: "It takes the initial features." },
                    { question: "What connects neurons?", options: ["Synapses (Weights)", "Axons", "Nothing"], answer: "Synapses (Weights)", explanation: "Weights determine signal strength." },
                    { question: "What is a 'Hidden' layer?", options: ["A layer you can't see", "Layers between Input and Output", "The output layer"], answer: "Layers between Input and Output", explanation: "They perform the internal processing." },
                    { question: "What is Feed Forward?", options: ["Training", "Passing signal input to output", "Backpropagation"], answer: "Passing signal input to output", explanation: "Moving data forward through the network." },
                    { question: "What triggers a neuron to fire?", options: ["Activation Function", "Weight", "Bias"], answer: "Activation Function", explanation: "It determines if the output is significant enough." }
                ]
            };
        } else if (id === 'kmeans') {
            return {
                id: 'K-Means Clustering',
                theory: `
                     <div class="lab-content">
                        <h2>K-Means Clustering</h2>
                        <div class="objective-box">
                            <h4>Objective</h4>
                            <p>Understand Unsupervised Learning by grouping data points into 'k' clusters based on similarity.</p>
                        </div>
                        
                        <h3>Key Concepts</h3>
                        <ul>
                            <li><strong>Centroids:</strong> The center point of a cluster.</li>
                            <li><strong>Euclidean Distance:</strong> A measure of similarity (straight-line distance).</li>
                            <li><strong>Assignment:</strong> Each point picks the closest centroid.</li>
                            <li><strong>Update:</strong> Centroids move to the average position of their points.</li>
                        </ul>
                    </div>
                `,
                procedure: `
                     <div class="lab-content">
                        <h2>Interactive Procedure</h2>
                        <div class="step-box">
                            <h4>Step 1: Initialize</h4>
                            <p>Click "Initialize" to create random data points and place 3 random centroids.</p>
                        </div>
                        <div class="step-box">
                            <h4>Step 2: Assign & Update</h4>
                            <p>Alternate clicking "Assign Clusters" and "Update Centroids". Watch the groups form.</p>
                        </div>
                        <div class="step-box">
                            <h4>Step 3: Convergence</h4>
                            <p>Repeat until the centroids stop moving. You have found the clusters!</p>
                        </div>
                    </div>
                `,
                quiz: [
                    { question: "Is K-Means supervised?", options: ["Yes", "No (Unsupervised)"], answer: "No (Unsupervised)", explanation: "The data has no labels." },
                    { question: "What is 'K'?", options: ["Number of steps", "Number of clusters", "Error rate"], answer: "Number of clusters", explanation: "It is the predefined number of groups." },
                    { question: "How do we measure similarity?", options: ["Distance", "Color", "Time"], answer: "Distance", explanation: "Usually Euclidean distance." },
                    { question: "What does a centroid represent?", options: ["An outlier", "Center of a cluster", "Testing data"], answer: "Center of a cluster", explanation: "The mean position of all points in the cluster." },
                    { question: "When does it stop?", options: ["Never", "When max steps reached", "When centroids don't move (Convergence)"], answer: "When centroids don't move (Convergence)", explanation: "Stable state reached." }
                ]
            };
        }

        return {
            id: 'Unknown Lab',
            theory: '<p>Lab not found.</p>',
            procedure: '<p>N/A</p>',
            quiz: []
        };
    }
}

export default new LabService();
