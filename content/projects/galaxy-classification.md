+++
title = "Galaxy Image Classification using Deep Learning"
date = 2025-07-09
description = "A convolutional neural network approach to classify galaxies into 10 morphological categories using the Galaxy10 dataset"
[extra]
toc = true
+++

<style>
.project-page {
    max-width: var(--main-width);
    margin: auto;
    padding: var(--spacing-large) calc(2 * var(--spacing-small));
    font-family: var(--body-font);
    color: var(--text-color);
}

.project-header {
    text-align: center;
    margin-bottom: var(--spacing-large);
}

.project-header h1 {
    font-family: var(--heading-font);
    font-size: 2.5rem;
    color: var(--accent-color);
    margin-bottom: var(--spacing-small);
}

.project-meta {
    font-size: 0.9rem;
    color: var(--super-fade-text-color);
    margin-bottom: var(--spacing-large);
}

.section-title {
    font-family: var(--heading-font);
    font-size: 1.7rem;
    color: var(--accent-color);
    margin-top: var(--spacing-large);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-large);
    margin: var(--spacing-large) 0;
}

.stat-card {
    background: var(--bg-color);
    padding: var(--spacing-large);
    border-radius: 3px;
    text-align: center;
    border-left: 4px solid var(--accent-color);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: var(--accent-color);
    display: block;
}

.stat-label {
    color: var(--fade-text-color);
    font-size: 0.9rem;
    margin-top: var(--spacing-small);
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-small);
    margin: var(--spacing-large) 0;
}

.tech-badge {
    background: var(--accent-color-2);
    color: white;
    padding: var(--spacing-small) calc(var(--spacing-small) + 5px);
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: var(--body-font);
}

.galaxy-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-large);
    margin: var(--spacing-large) 0;
}

.galaxy-type {
    background: rgba(0, 0, 0, 0.02);
    padding: var(--spacing-large);
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.methodology-steps {
    counter-reset: step-counter;
}

.methodology-step {
    counter-increment: step-counter;
    background: var(--bg-color);
    padding: var(--spacing-large);
    margin: var(--spacing-large) 0;
    border-radius: 3px;
    border-left: 4px solid var(--accent-color-2);
    position: relative;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.methodology-step::before {
    content: counter(step-counter);
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--accent-color-2);
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
}

.code-section {
    background: var(--bg-color);
    border-radius: 3px;
    padding: var(--spacing-large);
    margin: var(--spacing-large) 0;
    border-left: 4px solid var(--accent-color-2);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.code-section h3 {
    color: var(--accent-color-2);
    margin-top: 0;
    margin-bottom: var(--spacing-small);
}

.results-section {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    padding: var(--spacing-large);
    border-radius: 3px;
    margin: var(--spacing-large) 0;
}

.results-section h2 {
    margin-top: 0;
    font-family: var(--heading-font);
}

.metric-card {
    background: white;
    padding: var(--spacing-large);
    border-radius: 3px;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    border-top: 4px solid var(--accent-color-2);
    color: var(--text-color);
}

.metric-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--accent-color-2);
}

.architecture-diagram {
    background: var(--bg-color);
    padding: var(--spacing-large);
    border-radius: 3px;
    margin: var(--spacing-large) 0;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.layer-box {
    display: inline-block;
    background: var(--accent-color-2);
    color: white;
    padding: 8px 12px;
    margin: var(--spacing-small);
    border-radius: 3px;
    font-size: 0.9rem;
    min-width: 100px;
}

.arrow {
    display: inline-block;
    margin: 0 var(--spacing-small);
    font-size: 1.2rem;
    color: var(--fade-text-color);
}

.callout {
    text-align: center;
    border: 1px solid black;
    border-radius: 3px;
    padding: var(--spacing-small);
    font-size: 0.85rem;
    font-family: var(--accent-font);
    font-weight: 600;
    margin: var(--spacing-large) 0;
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }

    .project-header h1 {
        font-size: 2rem;
    }
}
</style>

<div class="project-page">
    <div class="project-header">
        <h1>🌌 Galaxy Image Classification</h1>
        <p class="project-meta">Published on July 9, 2025</p>
    </div>

    <section>
        <h2 class="section-title">Overview</h2>
        <p>This project implements a convolutional neural network (CNN) to classify galaxy images into 10 distinct morphological categories using the Galaxy10 dataset.</p>
    </section>

    <section>
        <h2 class="section-title">Performance Summary</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number">73.99%</span>
                <div class="stat-label">Test Accuracy</div>
            </div>
            <div class="stat-card">
                <span class="stat-number">10</span>
                <div class="stat-label">Galaxy Classes</div>
            </div>
            <div class="stat-card">
                <span class="stat-number">69×69</span>
                <div class="stat-label">Image Resolution</div>
            </div>
            <div class="stat-card">
                <span class="stat-number">20</span>
                <div class="stat-label">Training Epochs</div>
            </div>
        </div>
    </section>

    <section>
        <h2 class="section-title">Technology Stack</h2>
        <div class="tech-stack">
            <span class="tech-badge">Python</span>
            <span class="tech-badge">TensorFlow</span>
            <span class="tech-badge">Keras</span>
            <span class="tech-badge">OpenCV</span>
            <span class="tech-badge">NumPy</span>
            <span class="tech-badge">Scikit-learn</span>
            <span class="tech-badge">AstroNN</span>
            <span class="tech-badge">Google Colab</span>
        </div>
    </section>

    <section>
        <h2 class="section-title">Dataset</h2>
        <p>The project utilizes the <strong>Galaxy10</strong> dataset derived from DECaLS imaging and Galaxy Zoo classifications. Each image is preprocessed to 69×69 pixels and normalized for optimal training performance.</p>

        <h3>Galaxy Classifications</h3>
        <div class="galaxy-types">
            <div class="galaxy-type">
                <strong>Smooth Galaxies</strong>
                <ul>
                    <li>Completely round smooth</li>
                    <li>In-between smooth</li>
                    <li>Cigar-shaped smooth</li>
                </ul>
            </div>
            <div class="galaxy-type">
                <strong>Edge-on Galaxies</strong>
                <ul>
                    <li>Edge-on (no bulge)</li>
                    <li>Edge-on (with bulge)</li>
                </ul>
            </div>
            <div class="galaxy-type">
                <strong>Spiral & Barred</strong>
                <ul>
                    <li>Spiral galaxy</li>
                    <li>Galaxy with bar</li>
                </ul>
            </div>
            <div class="galaxy-type">
                <strong>Bulge Variations</strong>
                <ul>
                    <li>Galaxy with no bulge</li>
                    <li>Just noticeable bulge</li>
                    <li>Obvious bulge</li>
                </ul>
            </div>
        </div>
    </section>

    <section>
        <h2 class="section-title">Methodology</h2>
        <div class="methodology-steps">
            <div class="methodology-step">
                <h3>Data Loading & Preprocessing</h3>
                <p>Load dataset, resize images to 69×69 pixels, normalize pixel values to [0,1] range, convert labels to categorical format.</p>
            </div>
            <div class="methodology-step">
                <h3>Model Architecture Design</h3>
                <p>CNN architecture with multiple convolutional layers, max pooling, global average pooling, and dense layers with dropout for regularization.</p>
            </div>
            <div class="methodology-step">
                <h3>Training & Validation</h3>
                <p>Split data (80/20), use 10% of training data for validation, train for 20 epochs with Adam optimizer and categorical crossentropy loss.</p>
            </div>
            <div class="methodology-step">
                <h3>Evaluation</h3>
                <p>Evaluate model performance on test set and implement real-time prediction functionality for new galaxy images.</p>
            </div>
        </div>
    </section>

    <section>
        <h2 class="section-title">Model Architecture</h2>
        <div class="architecture-diagram">
            <h3>CNN Architecture Flow</h3>
            <div style="margin: 1.5rem 0;">
                <div class="layer-box">Input<br>69×69×3</div>
                <span class="arrow">→</span>
                <div class="layer-box">Conv2D<br>32 filters</div>
                <span class="arrow">→</span>
                <div class="layer-box">MaxPool2D<br>2×2</div>
                <span class="arrow">→</span>
                <div class="layer-box">Conv2D<br>64 filters</div>
                <span class="arrow">→</span>
                <div class="layer-box">MaxPool2D<br>2×2</div>
            </div>
            <div style="margin: 1.5rem 0;">
                <div class="layer-box">Conv2D<br>128 filters</div>
                <span class="arrow">→</span>
                <div class="layer-box">MaxPool2D<br>2×2</div>
                <span class="arrow">→</span>
                <div class="layer-box">Conv2D<br>256 filters</div>
                <span class="arrow">→</span>
                <div class="layer-box">GlobalAvgPool2D</div>
                <span class="arrow">→</span>
                <div class="layer-box">Dense<br>128 units</div>
            </div>
            <div style="margin: 1.5rem 0;">
                <div class="layer-box">Dropout<br>0.4</div>
                <span class="arrow">→</span>
                <div class="layer-box">Dense<br>10 units<br>(Softmax)</div>
            </div>
        </div>
    </section>

    <section>
        <h2 class="section-title">Key Implementation Details</h2>
        <div class="code-section">
            <h3>Data Preprocessing</h3>
            <p>Images are resized to 69×69 pixels using OpenCV, converted to float32, and normalized to [0,1] range. Labels are one-hot encoded for multi-class classification.</p>
        </div>
        <div class="code-section">
            <h3>Model Compilation</h3>
            <p>The model uses Adam optimizer with categorical crossentropy loss function and accuracy as the primary metric for evaluation.</p>
        </div>
        <div class="code-section">
            <h3>Training Configuration</h3>
            <p>Training performed with batch size of 64, 20 epochs, and 10% validation split. Dropout layer (0.4) prevents overfitting during training.</p>
        </div>
    </section>

    <section>
        <h2 class="section-title">Results & Performance</h2>
        <div class="results-section">
            <h2>🎯 Model Performance</h2>
            <div class="training-metrics">
                <div class="metric-card">
                    <div class="metric-value">73.99%</div>
                    <h4>Test Accuracy</h4>
                    <p>Final accuracy achieved on the test dataset</p>
                </div>
                <div class="metric-card">
                    <div class="metric-value">88.87%</div>
                    <h4>Training Accuracy</h4>
                    <p>Peak training accuracy in final epoch</p>
                </div>
            </div>
            <h3>Training Progress</h3>
            <ul>
                <li><strong>Epoch 1:</strong> 76.04% training accuracy, 68.85% validation accuracy</li>
                <li><strong>Epoch 10:</strong> 82.74% training accuracy, 70.61% validation accuracy</li>
                <li><strong>Epoch 20:</strong> 88.87% training accuracy, 72.16% validation accuracy</li>
            </ul>
        </div>
    </section>

    <section>
        <h2 class="section-title">Real-time Prediction</h2>
        <p>The model includes functionality for real-time galaxy classification:</p>
        <ul>
            <li><strong>Image Upload</strong>: Users can upload galaxy images for classification</li>
            <li><strong>Preprocessing</strong>: Automatic resizing and normalization</li>
            <li><strong>Prediction</strong>: Multi-class classification with confidence scores</li>
            <li><strong>Visualization</strong>: Display of original image with prediction results</li>
        </ul>
        <div class="callout">
            Example Prediction Result:
            <br><strong>Predicted Class:</strong> Spiral galaxy
            <br><strong>Confidence Score:</strong> 46%
        </div>
    </section>

    <section>
        <h2 class="section-title">Technical Challenges & Solutions</h2>
        <ul>
            <li><strong>Memory Management</strong>: Implemented garbage collection and efficient pipelines</li>
            <li><strong>Overfitting Prevention</strong>: Used dropout (rate 0.4), validation split, early stopping</li>
            <li><strong>Model Optimization</strong>: Global Average Pooling, progressive feature maps, ReLU/Softmax activations</li>
        </ul>
    </section>

    <section>
        <h2 class="section-title">Future Enhancements</h2>
        <ol>
            <li>Implement data augmentation techniques</li>
            <li>Utilize transfer learning with pre-trained models</li>
            <li>Explore ensemble methods for better accuracy</li>
            <li>Deploy model via web interface</li>
            <li>Experiment with ResNet, EfficientNet variants</li>
        </ol>
    </section>

    <section>
        <h2 class="section-title">Conclusion</h2>
        <p>This galaxy image classification project demonstrates the effectiveness of CNNs in astronomical image analysis. With a test accuracy of 73.99%, it successfully distinguishes between various galaxy morphologies, providing a foundation for automated systems.</p>
        <p>The implementation showcases modern deep learning practices including proper data preprocessing, architectural design, and evaluation methodologies. The project serves as an excellent example of applying machine learning to astronomical research and citizen science applications.</p>
    </section>

    <footer>
        *This project was developed using Google Colab and leverages the Galaxy10 dataset, which combines high-quality DECaLS imaging with Galaxy Zoo classifications originally derived from the Sloan Digital Sky Survey (SDSS) project.*
    </footer>
</div>