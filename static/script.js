// Correct answers database
const CORRECT_ANSWERS = {
"705101": "2",
"705102": "4",
"705103": "4",
"705104": "1",
"705105": "1",
"705106": "2",
"705107": "4",
"705108": "2",
"705109": "4",
"705110": "1",
"705111": "2",
"705112": "3",
"705113": "4",
"705114": "1",
"705115": "2",
"705116": "4",
"705117": "4",
"705118": "2",
"705119": "2",
"705120": "2",
"705121": "4",
"705122": "3",
"705123": "3",
"705124": "2",
"705125": "1",
"705126": "2",
"705127": "2",
"705128": "3",
"705129": "3",
"705130": "2",
"705131": "3",
"705132": "1",
"705133": "2",
"705134": "2",
"705135": "1",
"705136": "3",
"705137": "3",
"705138": "4",
"705139": "2",
"705140": "4",
"705141": "2",
"705142": "2",
"705143": "3",
"705144": "4",
"705145": "1",
"705146": "4",
"705147": "2",
"705148": "1",
"705149": "4",
"705150": "3",
"705151": "1",
"705152": "4",
"705153": "1",
"705154": "1",
"705155": "3",
"705156": "4",
"705157": "4",
"705158": "3",
"705159": "4",
"705160": "4",
"705161": "2",
"705162": "4",
"705163": "1",
"705164": "4",
"705165": "3",
"705166": "3",
"705167": "1",
"705168": "1",
"705169": "4",
"705170": "1",
"705171": "2",
"705172": "4",
"705173": "2",
"705174": "1",
"705175": "2"
};

// Initialize theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
});

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Theme toggle click event
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
// Main function to fetch and analyze response sheet
async function fetchDetails() {
    const rollNo = document.getElementById('rollNoInput').value.trim();
    const output = document.getElementById('output');
    output.innerHTML = 'Loading...';

    try {
        // Validate input
        if (!rollNo) throw new Error('Please enter a valid roll number');
        
        // Construct URL from roll number
        const url = `https://narm28csir12ugc54hdb.onlineregistrationform.org/NMCSIRUGC/02Mar2025/09001200/${rollNo}.html`;
        
        // Use AllOrigins proxy instead of CORS Anywhere
        const allOriginsUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const response = await fetch(allOriginsUrl);
        
        if (!response.ok) throw new Error(`Invalid response for roll number ${rollNo}`);
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Rest of the code remains the same...
        // Extract student details
        const student = extractStudentInfo(doc);

        // Parse questions and answers
        const questions = parseQuestions(doc);

        // Calculate scores
        const results = calculateScores(questions);
        
        // Display results
        displayResults(student, questions, results);

    } catch (error) {
        displayError(error);
        console.error('Error details:', error);
    }
}

// Extract student information from document
function extractStudentInfo(doc) {
    const extractDetail = (label) => {
        const regex = new RegExp(`${label}[\\s:]*([^\\n]+)`, 'i');
        const mainTable = doc.querySelector('table[width="90%"]');
        const match = mainTable.textContent.match(regex);
        return match ? match[1].trim() : 'N/A';
    };

    return {
        rollNo: extractDetail('Roll No'),
        regNo: extractDetail('Registration No'),
        name: extractDetail('Candidate Name'),
        module: extractDetail('Module Name'),
        examDate: extractDetail('Exam Date'),
        batch: extractDetail('Exam Batch')
    };
}

// Parse questions and responses
function parseQuestions(doc) {
    return Array.from(doc.querySelectorAll('table.legend-table')).map(table => {
        const header = table.querySelector('.legend-text')?.textContent.trim() || '';
        const marksText = table.querySelector('.legend-text + td')?.textContent.match(/[\d.]+/)?.[0] || '0';
        
        // Extract question number and ID
        const [questionPart, idPart] = header.split('/').map(s => s.replace(/\D/g, '').trim());
        const questionId = idPart || 'N/A';

        // Get chosen answer
        const chosenOption = table.querySelector('input[type="radio"][checked]')
            ?.closest('tr')
            ?.querySelector('span:first-child')
            ?.textContent
            ?.replace(/\D/g, '') // Extract only numbers
            ?.trim();

        // Check correctness
        const correctAnswer = CORRECT_ANSWERS[questionId];
        const isCorrect = chosenOption === correctAnswer;
        const isAttempted = !!chosenOption;
        const marks = parseFloat(marksText) || 0;
        
        // Calculate negative marking (1/4 of the question marks for incorrect answers)
        let earnedMarks = 0;
        let negativeMarks = 0;
        
        if (isAttempted) {
            if (isCorrect) {
                earnedMarks = marks;
            } else {
                negativeMarks = marks * 0.25; // 1/4 negative marking
            }
        }

        return {
            questionNo: questionPart?.replace('QuestionNo', '') || 'N/A',
            questionId,
            chosen: chosenOption || 'Not attempted',
            correct: isCorrect,
            marks,
            attempted: isAttempted,
            earnedMarks,
            negativeMarks
        };
    }).filter(q => q.questionId !== 'N/A');
}

// Calculate overall scores
function calculateScores(questions) {
    const attemptedQuestions = questions.filter(q => q.attempted);
    const correctQuestions = questions.filter(q => q.attempted && q.correct);
    const incorrectQuestions = questions.filter(q => q.attempted && !q.correct);
    const notAttemptedQuestions = questions.filter(q => !q.attempted);
    
    const positiveMarks = correctQuestions.reduce((sum, q) => sum + q.earnedMarks, 0);
    const negativeMarks = incorrectQuestions.reduce((sum, q) => sum + q.negativeMarks, 0);
    const totalMarks = positiveMarks - negativeMarks;
    
    return {
        total: questions.length,
        attempted: attemptedQuestions.length,
        correct: correctQuestions.length,
        incorrect: incorrectQuestions.length,
        notAttempted: notAttemptedQuestions.length,
        positiveMarks,
        negativeMarks,
        totalMarks
    };
}

// Display results in the output div
function displayResults(student, questions, results) {
    const output = document.getElementById('output');
    
    output.innerHTML = `
        <div class="student-info">
            <h2>Student Details</h2>
            <p><strong>Roll No:</strong> ${student.rollNo}</p>
            <p><strong>Registration No:</strong> ${student.regNo}</p>
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Module:</strong> ${student.module}</p>
            <p><strong>Exam Date:</strong> ${student.examDate}</p>
            <p><strong>Batch:</strong> ${student.batch}</p>
        </div>
        
        <div class="stats">
            <h3>Exam Summary</h3>
            <p>Total Questions: ${results.total}</p>
            <p>Attempted: ${results.attempted}</p>
            <p>Correct Answers: ${results.correct}</p>
            <p>Incorrect Answers: ${results.incorrect}</p>
            <p>Not Attempted: ${results.notAttempted}</p>
            <div>
                <span class="summary-box positive">Positive Marks: +${results.positiveMarks.toFixed(2)}</span>
                <span class="summary-box negative">Negative Marks: -${results.negativeMarks.toFixed(2)}</span>
                <span class="summary-box total">Total Score: ${results.totalMarks.toFixed(2)}</span>
            </div>
        </div>

        <div class="questions">
            <h3>Question-wise Analysis</h3>
            ${questions.map(q => {
                let statusClass = q.attempted ? (q.correct ? 'correct' : 'incorrect') : 'not-attempted';
                let statusText = q.attempted ? 
                    (q.correct ? 
                        `✅ Correct (+${q.earnedMarks.toFixed(2)})` : 
                        `❌ Incorrect (-${q.negativeMarks.toFixed(2)})`) : 
                    '⚪ Not Attempted (0.00)';
                
                return `
                    <div class="question ${statusClass}">
                        <p><strong>Question ${q.questionNo}</strong> (ID: ${q.questionId})</p>
                        <p>Your Answer: ${q.attempted ? q.chosen : 'Not attempted'} | Correct Answer: ${CORRECT_ANSWERS[q.questionId] || 'Unknown'}</p>
                        <p>Status: ${statusText} | Question Value: ${q.marks.toFixed(2)}</p>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Display error message
function displayError(error) {
    const output = document.getElementById('output');
    output.innerHTML = `
        <div class="error">
            <h3>Error</h3>
            <p>${error.message}</p>
            <p>Possible fixes:</p>
            <ul>
                <li>Ohh! not again, CORS seems to not work properly" target="_blank">cors-anywhere demo</a></li>
                <li>Check URL validity</li>
                <li>Verify response sheet structure</li>
            </ul>
        </div>
    `;
}
