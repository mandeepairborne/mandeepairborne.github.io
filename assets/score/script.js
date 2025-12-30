/**
 * CSIR NET December 2025 Physical Science Score Calculator
 * Updated with Official Answer Key for Dec 2025 Cycle.
 */

// --- CONFIGURATION ---
// Mapped from Official Answer Key HTML (Option IDs converted to 1-4 index)
const OFFICIAL_ANSWERS = {
    "916710241": "3", "916710242": "3", "916710243": "3", "916710244": "3", "916710245": "2",
    "916710246": "2", "916710247": "1", "916710248": "1", "916710249": "4", "916710250": "3",
    "916710251": "2", "916710252": "4", "916710253": "3", "916710254": "3", "916710255": "3",
    "916710256": "2", "916710257": "1", "916710258": "1", "916710259": "2", "916710260": "3",
    "916710261": "3", "916710262": "4", "916710263": "1", "916710264": "1", "916710265": "1",
    "916710266": "4", "916710267": "3", "916710268": "3", "916710269": "4", "916710270": "2",
    "916710271": "3", "916710272": "2", "916710273": "4", "916710274": "4", "916710275": "2",
    "916710276": "1", "916710277": "3", "916710278": "4", "916710279": "2", "916710280": "3",
    "916710281": "1", "916710282": "2", "916710283": "2", "916710284": "4", "916710285": "3",
    "916710286": "1", "916710287": "3", "916710288": "2", "916710289": "1", "916710290": "4",
    "916710291": "2", "916710292": "4", "916710293": "3", "916710294": "2", "916710295": "2",
    "916710296": "2", "916710297": "4", "916710298": "3", "916710299": "4", "916710300": "1",
    "916710301": "2", "916710302": "3", "916710303": "1", "916710304": "4", "916710305": "1",
    "916710306": "1", "916710307": "3", "916710308": "2", "916710309": "2", "916710310": "3",
    "916710311": "3", "916710312": "4", "916710313": "4", "916710314": "1", "916710315": "2"
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

    outputDiv.innerHTML = '<div class="analysis-box"><p>Fetching your response sheet... Please wait. ⏳</p></div>';

    // List of proxies to try in order
    const proxies = [
        `https://corsproxy.io/?${encodeURIComponent(responseUrl)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(responseUrl)}`
    ];

    let htmlString = null;
    let fetchError = null;

    // 🔄 Try proxies one by one
    for (const proxyUrl of proxies) {
        try {
            console.log(`Attempting fetch via: ${proxyUrl}`);
            const response = await fetch(proxyUrl);
            
            if (response.ok) {
                htmlString = await response.text();
                // Check if we actually got HTML back, sometimes proxies return error text as 200 OK
                if (htmlString.includes("<!DOCTYPE html") || htmlString.includes("<html")) {
                    break; // Success! Stop the loop
                } else {
                    throw new Error("Invalid content received from proxy");
                }
            } else {
                throw new Error(`Status: ${response.status}`);
            }
        } catch (error) {
            console.warn(`Proxy failed: ${proxyUrl}`, error);
            fetchError = error;
        }
    }

    try {
        if (!htmlString) {
            throw new Error(`<strong>Connection Failed.</strong><br>We could not reach your response sheet using any proxy.<br><br><strong>Solution:</strong> Please ensure your URL is correct and public. If the issue persists, the CSIR server might be slow.`);
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const studentInfo = extractStudentInfo(doc);
        const baseUrl = new URL(responseUrl).origin;
        const studentResponses = extractStudentResponses(doc, baseUrl);
        
        // Validation: Did we actually find questions?
        if (Object.keys(studentResponses).length === 0) {
            // Sometimes proxies strip the content. 
            throw new Error("<strong>Parse Error:</strong> The link was fetched, but no questions were found. The response sheet might have expired or the link is invalid.");
        }
        
        const results = calculateScore(studentResponses, OFFICIAL_ANSWERS, EXAM_CONFIG);
        
        displayResults(studentInfo, results, outputDiv);

        // ✅ Call the saveData function after results are displayed
        saveData(studentInfo, results);

    } catch (error) {
        displayError(error, outputDiv);
        console.error("Calculation Error:", error);
    }
}
/**
 * Saves the calculated score and student details to a Google Sheet via Apps Script.
 */
async function saveData(studentInfo, results) {
  // ❗️ IMPORTANT: PASTE YOUR GOOGLE WEB APP URL HERE
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyz3PD-IAkdW26U2HcweNPfxhPyQsfGbAdfZjrDTIHCqIpT7y5cwds02lceJY2g51TdiA/exec';

  if (WEB_APP_URL === 'YOUR_WEB_APP_URL_GOES_HERE') {
      console.warn("Data saving is disabled. Please add your Google Web App URL.");
      return;
  }

  let positiveMarks = 0;
  let negativeMarks = 0;
  results.detailedResults.forEach(r => {
      if (r.marks > 0) positiveMarks += r.marks;
      if (r.marks < 0) negativeMarks += r.marks;
  });

  const dataToSave = {
    rollNo: studentInfo.RollNo || 'N/A',
    name: studentInfo.CandidateName || 'N/A',
    positiveMarks: positiveMarks.toFixed(2),
    negativeMarks: negativeMarks.toFixed(2),
    totalScore: results.totalScore.toFixed(2)
  };

  try {
    await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSave)
    });
  } catch (error) {
    console.error("Error sending data to Google Sheet:", error);
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
            <h3>Exam Summary (Dec 2025)</h3>
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
        <div class="analysis-box error">
            <h3>An Error Occurred</h3>
            <p>${error.message}</p>
        </div>
    `;
}
