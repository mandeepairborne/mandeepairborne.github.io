/**
 * CSIR NET Prediction Module
 * This version uses filler data when real data is sparse, provides a personalized
 * analysis of chances, and shows the chart on page load.
 */

// --- PREDICTION CONFIGURATION (Revised August 2025) ---
const PREDICTION_CONFIG = {
    "JRF (UR)":    { base: 97.5, adjustment: -0.2 },
    "LS (UR)":     { base: 95.8, adjustment: -0.3 },
    "JRF (EWS)":   { base: 95.0, adjustment: -0.3 },
    "LS (EWS)":    { base: 92.5, adjustment: -0.3 },
    "JRF (OBC)":   { base: 94.2, adjustment: -0.2 },
    "LS (OBC)":    { base: 91.5, adjustment: -0.3 },
    "JRF (SC)":    { base: 88.5, adjustment: -0.5 },
    "LS (SC)":     { base: 86.0, adjustment: -0.5 },
    "JRF (ST)":    { base: 85.0, adjustment: -0.5 },
    "LS (ST)":     { base: 82.0, adjustment: -0.5 },
};

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyz3PD-IAkdW26U2HcweNPfxhPyQsfGbAdfZjrDTIHCqIpT7y5cwds02lceJY2g51TdiA/exec';
const MIN_REAL_SCORES = 100; // Use filler data until we have 100 real scores.

/**
 * Generates plausible "filler" scores to use when real data is sparse.
 */
function generateFillerData(count, mean, stdDev) {
    const scores = [];
    for (let i = 0; i < count; i++) {
        let sum = 0;
        for (let j = 0; j < 12; j++) {
            sum += Math.random();
        }
        const randomNormal = (sum - 6) * stdDev + mean;
        scores.push(Math.max(0, Math.min(200, randomNormal)));
    }
    return scores;
}

/**
 * Gets the prediction data, combining real data with fillers if necessary.
 */
async function getPredictionData() {
    let realData = await fetchPredictionData();
    let isSimulated = false;

    if (realData.length < MIN_REAL_SCORES) {
        isSimulated = true;
        const fillerCount = MIN_REAL_SCORES - realData.length;
        const fillerData = generateFillerData(fillerCount, 85, 28); // Simulates a tougher exam
        const combinedData = [...realData, ...fillerData];
        return { data: combinedData, isSimulated: isSimulated };
    }
    
    return { data: realData, isSimulated: isSimulated };
}

/**
 * Runs when the page first loads to draw the initial chart.
 */
async function initializeChart() {
    const loadingText = document.getElementById('chart-loading-text');
    try {
        const { data, isSimulated } = await getPredictionData();

        if (isSimulated) {
            const chartWrapper = document.getElementById('chart-container-wrapper');
            const disclaimer = document.createElement('p');
            disclaimer.className = 'disclaimer';
            disclaimer.innerHTML = `⚠️ <strong>Note:</strong> Current data is limited. This analysis includes simulated data based on past exam trends for a more stable prediction.`;
            chartWrapper.prepend(disclaimer);
        }

        renderPredictionChart(null, data); 
        loadingText.style.display = 'none';

    } catch (error) {
        loadingText.innerText = "Could not load chart data.";
        console.error("Initialization Error:", error);
    }
}

/**
 * Runs after the user's score is calculated to update the page.
 * This function is called by the original score_calculator.js.
 */
async function runPredictionAnalysis(userScore) {
    console.log("--- Starting Prediction Analysis ---");
    console.log("User score received:", userScore);

    const outputDiv = document.getElementById('output');
    const predictionContainer = document.createElement('div');
    predictionContainer.id = 'prediction-output';
    predictionContainer.innerHTML = `<div class="analysis-box"><p>Loading predictions... 📈</p></div>`;
    
    if(outputDiv.firstChild) {
        outputDiv.insertBefore(predictionContainer, outputDiv.firstChild.nextSibling);
    } else {
         outputDiv.appendChild(predictionContainer);
    }

    try {
        const { data, isSimulated } = await getPredictionData();
        
        // This will tell us exactly how many scores the script sees
        console.log("Prediction data fetched. Total scores:", data.length);
        console.log("Is data simulated?", isSimulated);

        const MIN_SCORES_FOR_CHART = 5;

        if (data && data.length > MIN_SCORES_FOR_CHART) {
            console.log("Condition met. Proceeding with prediction display.");
            const percentileInfo = calculatePercentile(userScore, data); 
            const cutoffs = predictCutoffs(data, PREDICTION_CONFIG);
            displayPredictionResults(percentileInfo, cutoffs, data.length, isSimulated, predictionContainer); 
            renderPredictionChart(userScore, data);
        } else {
            console.log("Condition failed. Not enough data to display prediction.");
            predictionContainer.innerHTML = `<div class="analysis-box"><p>Not enough data for a prediction yet.</p></div>`;
        }
    } catch (error) {
        console.error("Prediction Update Error:", error);
        predictionContainer.innerHTML = `<div class="analysis-box error"><p>Could not update prediction data.</p></div>`;
    }
}

/**
 * Displays the final prediction results, including the personalized chance analysis.
 */
/**
 * Displays the final prediction results, including the personalized chance analysis.
 */
function displayPredictionResults(percentileInfo, cutoffs, studentCount, isSimulated, container) {
    // --- Personalized Chance Analysis ---
    let analysisHtml = '';
    // FIX: Changed 'percentile' to 'percentileInfo' to correctly get the user's score
    const userScore = parseFloat(percentileInfo.userScore);
    const jrfCutoffUR = parseFloat(cutoffs["JRF (UR)"]);
    const lsCutoffUR = parseFloat(cutoffs["LS (UR)"]);

    let status = '';
    let statusClass = '';

    if (userScore >= jrfCutoffUR + 5) {
        status = 'Excellent chance for JRF & LS.';
        statusClass = 'status-excellent';
    } else if (userScore >= jrfCutoffUR) {
        status = 'Good chance for JRF & LS.';
        statusClass = 'status-good';
    } else if (userScore > lsCutoffUR + 5) {
        status = 'Excellent chance for LS.';
        statusClass = 'status-good';
    } else if (userScore >= lsCutoffUR) {
        status = 'Good chance for LS. Borderline for JRF.';
        statusClass = 'status-borderline';
    } else if (userScore >= lsCutoffUR - 5) {
        status = 'Borderline case for LS. Qualification is possible.';
        statusClass = 'status-borderline';
    } else {
        status = 'Chances for qualification appear tough this session.';
        statusClass = 'status-tough';
    }

    analysisHtml = `
        <div class="analysis-box chances-assessment ${statusClass}">
            <h4>Your Chances (vs. UR Category)</h4>
            <p>${status}</p>
        </div>
    `;
    // --- End of Analysis ---

    let cutoffHtml = Object.entries(cutoffs).map(([category, score]) => `<tr><td>${category}</td><td>${score}</td></tr>`).join('');
    
    let disclaimerHtml = '';
    if (isSimulated) {
        disclaimerHtml = `<p class="disclaimer">⚠️ <strong>Note:</strong> This prediction uses simulated data and will become more accurate as more real scores are added.</p>`;
    }

    container.innerHTML = `
        ${disclaimerHtml}
        ${analysisHtml} 
        <div class="analysis-box prediction">
            <h3>Your Predicted Rank 🎯</h3>
            <p class="percentile-display">Based on a pool of <strong>${studentCount}</strong> students (real & simulated), your percentile is:</p>
            
            <p class="percentile-score">${percentileInfo.percentile}%</p>
        </div>
        <div class="analysis-box">
             <h3>Predicted Cutoffs (Marks)</h3>
             <table class="cutoff-table">
                <thead><tr><th>Category</th><th>Score</th></tr></thead>
                <tbody>${cutoffHtml}</tbody>
             </table>
        </div>
    `;
}

// --- Core Helper Functions ---
async function fetchPredictionData() {
    const response = await fetch(WEB_APP_URL, { redirect: 'follow', cache: 'no-cache' });
    if (!response.ok) throw new Error(`Failed to fetch prediction data. Status: ${response.status}`);
    const data = await response.json();
    if (!data.success || !data.scores) throw new Error('Invalid prediction data from server.');
    return data.scores;
}

function calculatePercentile(userScore, allScores) {
    const scoresBelow = allScores.filter(score => score < userScore).length;
    const percentile = ((scoresBelow / allScores.length) * 100).toFixed(2);
    return { percentile: percentile, userScore: userScore }; // Return an object
}

function predictCutoffs(allScores, config) {
    const sortedScores = [...allScores].sort((a, b) => a - b);
    const totalCount = sortedScores.length;
    const predictedCutoffs = {};

    for (const categoryName in config) {
        const categoryData = config[categoryName];
        const effectivePercentile = categoryData.base + categoryData.adjustment;
        const index = Math.ceil((effectivePercentile / 100) * totalCount) - 1;
        const cutoffScore = sortedScores[Math.max(0, Math.min(index, totalCount - 1))];
        predictedCutoffs[categoryName] = cutoffScore ? parseFloat(cutoffScore).toFixed(2) : 'N/A';
    }
    return predictedCutoffs;
}

// Attach the initialization function to the window's load event
window.onload = initializeChart;