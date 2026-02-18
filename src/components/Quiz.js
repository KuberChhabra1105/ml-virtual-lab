export default class Quiz {
    constructor(container, questions) {
        this.container = container;
        this.questions = questions || [];
        this.score = 0;
        this.submitted = false;
        // Simple state persistence for this instance
        this.userAnswers = new Array(questions.length).fill(null);

        this.render();
    }

    render() {
        if (!this.questions.length) {
            this.container.innerHTML = "<h3>No questions available.</h3>";
            return;
        }

        let html = `
            <div class="quiz-container" style="max-width: 700px; margin: 0 auto; padding: 20px;">
                <h3 style="border-bottom: 2px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">Knowledge Check</h3>
        `;

        this.questions.forEach((q, index) => {
            html += `
                <div class="question-block" id="q-${index}" style="margin-bottom: 25px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                    <p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 15px; color: #2c3e50;">${index + 1}. ${q.question}</p>
                    <div class="options">
            `;

            q.options.forEach(opt => {
                // Check if previously selected
                const checked = this.userAnswers[index] === opt ? 'checked' : '';
                html += `
                    <label style="display: flex; align-items: center; margin: 8px 0; cursor: pointer; padding: 10px; border-radius: 8px; transition: background 0.1s;">
                        <input type="radio" name="q-${index}" value="${opt}" ${checked} style="margin-right: 12px; width: 18px; height: 18px; cursor: pointer; accent-color: #FF7444;"> 
                        <span style="font-size: 1rem; color: #444;">${opt}</span>
                    </label>
                `;
            });

            html += `
                    </div>
                    <!-- Feedback Section -->
                    <div id="feedback-${index}" style="margin-top: 15px; padding: 15px; border-radius: 8px; display: none; background: #fafafa; border-left: 4px solid #ccc;">
                        <p class="feedback-text" style="margin: 0; font-size: 0.95rem; line-height: 1.5;"></p>
                    </div>
                </div>`;
        });

        html += `
                <button id="submit-quiz" class="btn-primary" style="
                    padding: 14px 28px; 
                    background: #FF7444; 
                    color: white; 
                    border: none; 
                    border-radius: 8px; 
                    cursor: pointer; 
                    font-size: 1.1rem; 
                    font-weight: 600; 
                    display: block; 
                    width: 100%; 
                    margin-top: 30px;
                    transition: transform 0.1s;
                    box-shadow: 0 4px 6px rgba(255, 116, 68, 0.2);
                ">Submit Answers</button>
                
                <div id="quiz-result" style="margin-top: 25px; text-align: center; font-weight: bold; font-size: 1.4rem;"></div>
            </div>
        `;

        this.container.innerHTML = html;

        // Event Delegation for Radio Buttons to update State
        this.container.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                const index = parseInt(e.target.name.split('-')[1]);
                this.userAnswers[index] = e.target.value;
            }
        });

        // Submit Button Logic
        setTimeout(() => {
            const btn = document.getElementById('submit-quiz');
            if (btn) {
                btn.onclick = () => this.checkAnswers();
            }
        }, 100);
    }

    checkAnswers() {
        if (this.submitted) return;

        this.score = 0;

        this.questions.forEach((q, index) => {
            const selectedVal = this.userAnswers[index];
            const block = document.getElementById(`q-${index}`);
            const feedbackBox = document.getElementById(`feedback-${index}`);
            const feedbackText = feedbackBox.querySelector('.feedback-text');

            // Reset styles
            block.style.border = '1px solid #e0e0e0';
            feedbackBox.style.display = 'block';

            if (selectedVal) {
                if (selectedVal === q.answer) {
                    this.score++;
                    block.style.border = '2px solid #00c853';
                    block.style.background = 'rgba(0, 200, 83, 0.05)';

                    feedbackBox.style.borderLeft = '4px solid #00c853';
                    feedbackBox.style.background = '#e8f5e9';
                    feedbackText.innerHTML = `<strong style="color: #2e7d32;">Correct!</strong> ${this.getExplanation(q)}`;
                } else {
                    block.style.border = '2px solid #d32f2f';
                    block.style.background = 'rgba(211, 47, 47, 0.05)';

                    feedbackBox.style.borderLeft = '4px solid #d32f2f';
                    feedbackBox.style.background = '#ffebee';
                    feedbackText.innerHTML = `<strong style="color: #c62828;">Incorrect.</strong> The correct answer is: <em>${q.answer}</em>.<br><br>${this.getExplanation(q)}`;
                }
            } else {
                block.style.border = '2px solid #ff9800';
                feedbackBox.style.borderLeft = '4px solid #ff9800';
                feedbackBox.style.background = '#fff3e0';
                feedbackText.innerHTML = `<strong style="color: #ef6c00;">Skipped.</strong> Answer: ${q.answer}`;
            }
        });

        this.submitted = true;

        const resultDiv = document.getElementById('quiz-result');
        const percentage = Math.round((this.score / this.questions.length) * 100);

        let color = '#333';
        if (percentage >= 80) color = '#00c853';
        else if (percentage < 60) color = '#d32f2f';

        resultDiv.innerHTML = `<span style="color: ${color}">Final Score: ${this.score} / ${this.questions.length} (${percentage}%)</span>`;

        const btn = document.getElementById('submit-quiz');
        if (btn) {
            btn.innerText = "Results Locked";
            btn.disabled = true;
            btn.style.opacity = 0.5;
            btn.style.cursor = 'not-allowed';
            btn.style.boxShadow = 'none';
        }
    }

    getExplanation(q) {
        if (q.explanation) return q.explanation;
        return "Review the Theory section to deepen your understanding.";
    }
}
