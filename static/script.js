/**
 * CSIR NET June 2025 Physical Science Score Calculator
 * Final version with corrected parsing and user-preferred styling.
 */

// --- CONFIGURATION ---
const OFFICIAL_ANSWERS = {
    "5629541": "3", "5629542": "3", "5629543": "2", "5629544": "1", "5629545": "1",
    "5629546": "3", "5629547": "2", "5629548": "4", "5629549": "2", "56295410": "2",
    "56295411": "2", "56295412": "3", "56295413": "2", "56295414": "3", "56295415": "4",
    "56295416": "1", "56295417": "1", "56295418": "3", "56295419": "4", "56295420": "2",
    "56295421": "3", "56295422": "2", "56295423": "1", "56295424": "1", "56295425": "1",
    "56295426": "2", "56295427": "3", "56295428": "2", "56295429": "4", "56295430": "1",
    "56295431": "1", "56295432": "2", "56295433": "4", "56295434": "1", "56295435": "4",
    "56295436": "4", "56295437": "2", "56295438": "3", "56295439": "1", "56295440": "4",
    "56295441": "4", "56295442": "3", "56295443": "3", "56295444": "2", "56295445": "2",
    "56295446": "1", "56295447": "1", "56295448": "2", "56295449": "1", "56295450": "4",
    "56295451": "1", "56295452": "2", "56295453": "4", "56295454": "2", "56295455": "4",
    "56295456": "2", "56295457": "2", "56295458": "4", "56295459": "1", "56295460": "4",
    "56295461": "2", "56295462": "1", "56295463": "1", "56295464": "3", "56295465": "1",
    "56295466": "3", "56295467": "1", "56295468": "1", "56295469": "3", "56295470": "4",
    "56295471": "3", "56295472": "2", "56295473": "4", "56295474": "4", "56295475": "3"
};

const EXAM_CONFIG = {
    'A': { correct: 2, incorrect: -0.5 },
    'B': { correct: 3.5, incorrect: -0.875 },
    'C': { correct: 5, incorrect: -1.25 }
};

// --- Main Functionality ---

async function fetchDetails() {
    const urlInput = document.getElementById('rollNoInput');
    const outputDiv = document.getElementById('output');
    const responseUrl = urlInput.value.trim();

    if (!responseUrl) {
        alert('Please enter your response sheet URL.');
        return;
    }

    outputDiv.innerHTML = '<p>Fetching your response sheet... Please wait. ⏳</p>';
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(responseUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`Proxy Error: Could not fetch the URL. Status: ${response.status}`);
        
        const htmlString = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const studentInfo = extractStudentInfo(doc);
        const baseUrl = new URL(responseUrl).origin;
        const studentResponses = extractStudentResponses(doc, baseUrl);
        
        if (Object.keys(studentResponses).length === 0) {
            throw new Error("Could not find any questions in the response sheet.");
        }
        
        const results = calculateScore(studentResponses, OFFICIAL_ANSWERS, EXAM_CONFIG);
        displayResults(studentInfo, results, outputDiv);

    } catch (error) {
        displayError(error, outputDiv);
        console.error("Calculation Error:", error);
    }
}

function extractStudentInfo(doc) {
    const info = {};
    doc.querySelectorAll('.main-info-pnl table tr').forEach(row => {
        const key = row.cells[0]?.innerText.trim();
        const value = row.cells[1]?.innerText.trim();
        if (key && value) {
            const formattedKey = key.replace(/[^a-zA-Z0-9]/g, '');
            info[formattedKey] = value;
        }
    });
    return info;
}

function extractStudentResponses(doc, baseUrl) {
    const responses = {};
    doc.querySelectorAll(".question-pnl").forEach(panel => {
        let qid = null, status = null, chosenOptionNum = null, qNum = null;
        
        qNum = panel.querySelector('.questionRowTbl .bold')?.innerText.replace('Q.', '').trim();
        
        panel.querySelectorAll(".menu-tbl tr").forEach(row => {
            const key = row.cells[0]?.innerText.trim();
            const value = row.cells[1]?.innerText.trim();
            if (key === "Question ID :") qid = value;
            if (key === "Status :") status = value;
            if (key === "Chosen Option :") chosenOptionNum = value;
        });

        const imgEl = panel.querySelector('.questionRowTbl img');
        const relativeSrc = imgEl ? imgEl.getAttribute('src') : null;
        const imageUrl = relativeSrc ? baseUrl + relativeSrc : null;
        
        const sectionLabel = panel.closest('.section-cntnr')?.querySelector('.section-lbl .bold')?.innerText || '';
        const part = (sectionLabel.match(/PART\s*-\s*([A-C])/) || [])[1] || 'Unknown';

        if (qid) {
            const isAttempted = (status === "Answered" || status === "Marked For Review") && chosenOptionNum !== '--';
            responses[qid] = { qid, part, qNum, status, chosenOptionNum: isAttempted ? chosenOptionNum : null, imageUrl };
        }
    });
    return responses;
}

function calculateScore(studentResponses, officialAnswers, config) {
    const detailedResults = [];
    const summary = {
        'A': { correct: 0, incorrect: 0, unattempted: 0, score: 0 },
        'B': { correct: 0, incorrect: 0, unattempted: 0, score: 0 },
        'C': { correct: 0, incorrect: 0, unattempted: 0, score: 0 }
    };

    for (const qid in studentResponses) {
        const response = studentResponses[qid];
        const correctOptNum = officialAnswers[qid];
        const part = response.part;
        
        if (part === 'Unknown' || !config[part] || !correctOptNum) continue;
        
        const result = { ...response, yourAns: '--', correctAns: correctOptNum, status: 'Unattempted', marks: 0 };
        
        if (response.chosenOptionNum) {
            result.yourAns = response.chosenOptionNum;
            if (response.chosenOptionNum === correctOptNum) {
                result.status = 'Correct';
                result.marks = config[part].correct;
                summary[part].correct++;
            } else {
                result.status = 'Incorrect';
                result.marks = config[part].incorrect;
                summary[part].incorrect++;
            }
        } else {
            summary[part].unattempted++;
        }
        
        summary[part].score += result.marks;
        detailedResults.push(result);
    }
    
    const totalScore = summary.A.score + summary.B.score + summary.C.score;
    return { totalScore, summary, detailedResults };
}

// Replace your existing displayResults function with this one.

function displayResults(student, results, outputDiv) {
    let positiveMarks = 0;
    let negativeMarks = 0;
    results.detailedResults.forEach(r => {
        if (r.marks > 0) positiveMarks += r.marks;
        if (r.marks < 0) negativeMarks += r.marks;
    });

    let html = `
        <div class="analysis-box student-info">
            <h2>Student Details</h2>
            <p><strong>Roll No:</strong> ${student.RollNo || 'N/A'}</p>
            <p><strong>Name:</strong> ${student.CandidateName || 'N/A'}</p>
            <p><strong>Test Date:</strong> ${student.TestDate || 'N/A'}</p>
        </div>
        
        <div class="analysis-box stats">
            <h3>Exam Summary</h3>
            
            <div class="part-stats-container">
                <div class="part-stat positive">
                    <h4>Positive Marks</h4>
                    <p><strong>+${positiveMarks.toFixed(2)}</strong></p>
                </div>
                <div class="part-stat negative">
                    <h4>Negative Marks</h4>
                    <p><strong>${negativeMarks.toFixed(2)}</strong></p>
                </div>
                <div class="part-stat total">
                    <h4>Total Score</h4>
                    <p><strong>${results.totalScore.toFixed(2)}</strong></p>
                </div>
            </div>
        </div>
    `;

    html += `
        <div class="analysis-box part-wise-stats">
            <h3>Part-wise Analysis</h3>
            <div class="part-stats-container">
                ${Object.entries(results.summary).map(([part, stats]) => `
                    <div class="part-stat">
                        <h4>Part ${part}</h4>
                        <p>Attempted: ${stats.correct + stats.incorrect} | Correct: ${stats.correct}</p>
                        <p>Score: <strong>${stats.score.toFixed(2)}</strong></p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    html += ['A', 'B', 'C'].map(part => `
        <div class="analysis-box part-section">
            <h3>Part ${part} Questions</h3>
            <div class="part-questions">
                ${results.detailedResults.filter(q => q.part === part).sort((a,b) => a.qNum - b.qNum).map(q => {
                    const statusClass = q.status.toLowerCase();
                    let statusText = '';
                    if (q.status === 'Correct') statusText = `✅ Correct (+${q.marks.toFixed(2)})`;
                    else if (q.status === 'Incorrect') statusText = `❌ Incorrect (${q.marks.toFixed(2)})`;
                    else statusText = '⚪ Not Attempted (0.00)';
                    
                    return `
                    <div class="question ${statusClass}">
                        <div class="question-header">
                            <p><strong>Question ${q.qNum}</strong> (ID: ${q.qid})</p>
                            <p>Your Answer: ${q.yourAns} | Correct Answer: ${q.correctAns}</p>
                            <p>Status: ${statusText}</p>
                        </div>
                        ${q.imageUrl ? `
                            <div class="question-image">
                                <img src="${q.imageUrl}" alt="Question Image" class="question-img">
                            </div>
                        ` : `<div class="question-image"><p class="no-image">No image for this question.</p></div>`}
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');

    outputDiv.innerHTML = html;
}

function displayError(error, outputDiv) {
    outputDiv.innerHTML = `
        <div class="error">
            <h3>An Error Occurred</h3>
            <p>${error.message}</p>
        </div>
    `;
}