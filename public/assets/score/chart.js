let scoreChart = null; 

/**
 * Renders or updates the score distribution as a smooth curve for a light background.
 * @param {number | null} userScore - The user's score. Pass null for initial view.
 * @param {Array<number>} allScores - An array of all scores.
 */
function renderPredictionChart(userScore, allScores) {
    if (scoreChart) {
        scoreChart.destroy();
    }
    const ctx = document.getElementById('scoreDistributionChart').getContext('2d');
    
    // --- Data Binning (No change here) ---
    const binSize = 10;
    const maxScore = Math.max(...allScores, 150);
    const bins = {};
    const labels = [];
    for (let i = 0; i <= Math.ceil(maxScore / binSize) * binSize; i += binSize) {
        const label = `${i} - ${i + binSize}`;
        labels.push(label);
        bins[label] = 0;
    }
    allScores.forEach(score => {
        const binIndex = Math.floor(score / binSize);
        const label = `${binIndex * binSize} - ${(binIndex + 1) * binSize}`;
        if (bins[label] !== undefined) {
            bins[label]++;
        }
    });
    const dataPoints = Object.values(bins);

    // --- NEW: Professional Light Theme Styling ---

    // 1. Create a gradient for a professional blue theme
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 86, 179, 0.3)'); // Light blue at the top
    gradient.addColorStop(1, 'rgba(0, 86, 179, 0)');   // Fading to transparent

    // 2. Highlight the user's score with a red point
    const userBinIndex = userScore !== null ? Math.floor(userScore / binSize) : -1;
    const pointRadius = labels.map((_, index) => index === userBinIndex ? 6 : 0);
    const pointBackgroundColor = labels.map((_, index) => index === userBinIndex ? '#d9534f' : 'transparent'); // Red highlight

    // --- Create the Chart ---
    scoreChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score Distribution',
                data: dataPoints,
                fill: true,
                backgroundColor: gradient,
                borderColor: '#0056b3', // Strong blue line color
                borderWidth: 2,
                tension: 0.4,
                pointRadius: pointRadius,
                pointBackgroundColor: pointBackgroundColor,
                pointBorderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Frequency', color: '#4A4A4A' }, // Dark text
                    grid: { color: '#EAEAEA' }, // Light grid lines
                    ticks: { color: '#6c757d' } // Gray ticks
                },
                x: {
                    title: { display: true, text: 'Score Range', color: '#4A4A4A' }, // Dark text
                    grid: { color: '#EAEAEA' }, // Light grid lines
                    ticks: { color: '#6c757d' } // Gray ticks
                }
            }
        }
    });
}