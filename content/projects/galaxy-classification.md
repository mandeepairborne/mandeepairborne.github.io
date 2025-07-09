+++
title = "Galaxy Image Classification using Deep Learning"
date = 2025-07-09
description = "A convolutional neural network approach to classify galaxies into 10 morphological categories using the Galaxy10 dataset"
[extra]
toc = true
+++

<style>
.project-hero {
    background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-color-2) 100%);
    color: white;
    padding: 3rem 2rem;
    border-radius: 3px;
    margin-bottom: var(--spacing-large);
    text-align: center;
}

.project-hero h1 {
    font-family: var(--heading-font);
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.project-hero p {
    font-family: var(--body-font);
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-large);
    margin: var(--spacing-large) 0;
}

.stat-card {
    background: var(--bg-color);
    padding: 1.5rem;
    border-radius: 3px;
    text-align: center;
    border-left: 4px solid var(--accent-color-2);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;
    border: 1px solid var(--crisp-border);
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
}

.stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: var(--accent-color-2);
    display: block;
}

.stat-label {
    color: var(--fade-text-color);
    font-size: 0.85rem;
    margin-top: 0.5rem;
    font-family: var(--body-font);
}

.code-section {
    background: var(--bg-color);
    border-radius: 3px;
    padding: var(--spacing-large);
    margin: var(--spacing-large) 0;
    border-left: 4px solid #28a745; /* You can change this to match accent if needed */
    border: 1px solid var(--crisp-border);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
}

.code-section h3 {
    color: #28a745;
    font-family: var(--heading-font);
    margin-top: 0;
    margin-bottom: var(--spacing-small);
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-small);
    margin: var(--spacing-small) 0;
}

.tech-badge {
    background: var(--accent-color-2);
    color: var(--bg-color);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    font-family: var(--body-font);
}

.results-section {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    padding: var(--spacing-large);
    border-radius: 3px;
    margin: var(--spacing-large) 0;
    border: 1px solid var(--crisp-border);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
}

.results-section h2 {
    font-family: var(--heading-font);
    margin-top: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.galaxy-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-small);
    margin: var(--spacing-small) 0;
}

.galaxy-type {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 3px;
    backdrop-filter: blur(10px);
    border: 1px solid var(--crisp-border);
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
    border-left: 4px solid #fd7e14;
    position: relative;
    border: 1px solid var(--crisp-border);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
}

.methodology-step::before {
    content: counter(step-counter);
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    background: #fd7e14;
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

.training-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-large);
    margin: var(--spacing-large) 0;
}

.metric-card {
    background: var(--bg-color);
    padding: var(--spacing-large);
    border-radius: 3px;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
    border-top: 4px solid #17a2b8;
    border: 1px solid var(--crisp-border);
}

.metric-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #17a2b8;
}

.architecture-diagram {
    background: var(--bg-color);
    padding: var(--spacing-large);
    border-radius: 3px;
    margin: var(--spacing-large) 0;
    text-align: center;
    border: 1px solid var(--crisp-border);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
}

.layer-box {
    display: inline-block;
    background: var(--accent-color-2);
    color: var(--bg-color);
    padding: 0.8rem;
    margin: 0.5rem;
    border-radius: 3px;
    font-size: 0.9rem;
    min-width: 120px;
    font-family: var(--body-font);
}

.arrow {
    display: inline-block;
    margin: 0 1rem;
    font-size: 1.5rem;
    color: var(--fade-text-color);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .project-hero h1 {
        font-size: 2rem;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .training-metrics {
        grid-template-columns: 1fr;
    }
}
</style>

> *Deep learning approach to classify galaxies into 10 morphological categories using convolutional neural networks*

## Overview

This project implements a convolutional neural network (CNN) to classify galaxy images into 10 distinct morphological categories using the Galaxy10 dataset. The model achieves robust performance in distinguishing between different galaxy types, from spiral galaxies to edge-on galaxies with various bulge configurations.

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

## Technology Stack

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

## Dataset

The project utilizes the **Galaxy10** dataset, which evolved from the original Sloan Digital Sky Survey (SDSS) based Galaxy Zoo project to the current high-quality version using images from the Dark Energy Camera Legacy Survey (DECaLS). This dataset combines DECaLS imaging with Galaxy Zoo crowd-sourced classifications, where volunteers classified approximately 270,000 galaxy images into morphological categories. Each image is preprocessed to 69×69 pixels and normalized for optimal training performance.

### Galaxy Classifications

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

## Methodology

<div class="methodology-steps">
    <div class="methodology-step">
        <h3>Data Loading & Preprocessing</h3>
        <p>Load the Galaxy10 dataset using AstroNN library, resize images to 69×69 pixels, normalize pixel values to [0,1] range, and convert labels to categorical format for multi-class classification.</p>
    </div>
    
    <div class="methodology-step">
        <h3>Model Architecture Design</h3>
        <p>Implement a CNN with multiple convolutional layers, max pooling, global average pooling, and dense layers with dropout for regularization. The architecture progressively increases feature maps from 32 to 256.</p>
    </div>
    
    <div class="methodology-step">
        <h3>Training & Validation</h3>
        <p>Split data into training/testing sets (80/20), use 10% of training data for validation, train for 20 epochs with Adam optimizer and categorical crossentropy loss.</p>
    </div>
    
    <div class="methodology-step">
        <h3>Model Evaluation</h3>
        <p>Evaluate model performance on test set and implement real-time prediction functionality for new galaxy images with confidence scoring.</p>
    </div>
</div>

## Model Architecture

<div class="architecture-diagram">
    <h3>CNN Architecture Flow</h3>
    <div style="margin: 2rem 0;">
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
    <div style="margin: 2rem 0;">
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
    <div style="margin: 2rem 0;">
        <div class="layer-box">Dropout<br>0.4</div>
        <span class="arrow">→</span>
        <div class="layer-box">Dense<br>10 units<br>(Softmax)</div>
    </div>
</div>

## Key Implementation Details

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

## Results & Performance

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

## Real-time Prediction

The model includes functionality for real-time galaxy classification:

- **Image Upload**: Users can upload galaxy images for classification
- **Preprocessing**: Automatic resizing and normalization
- **Prediction**: Multi-class classification with confidence scores
- **Visualization**: Display of original image with prediction results

### Example Prediction Result
- **Predicted Class**: Spiral galaxy
- **Confidence Score**: 46%

## Technical Challenges & Solutions

**Challenge 1: Memory Management**
- Implemented proper memory cleanup with garbage collection
- Used efficient data loading and preprocessing pipelines

**Challenge 2: Overfitting Prevention**
- Applied dropout regularization (0.4 rate)
- Used validation split for monitoring training progress
- Implemented early stopping considerations

**Challenge 3: Model Optimization**
- Utilized Global Average Pooling instead of flattening
- Progressive feature map increase (32→64→128→256)
- Appropriate activation functions (ReLU, Softmax)

## Future Enhancements

1. **Data Augmentation**: Implement rotation, scaling, and brightness adjustments
2. **Transfer Learning**: Utilize pre-trained models for improved performance
3. **Ensemble Methods**: Combine multiple models for better accuracy
4. **Real-time Web Interface**: Deploy model for public use
5. **Advanced Architectures**: Experiment with ResNet, EfficientNet variants

## Conclusion

This galaxy image classification project demonstrates the effectiveness of convolutional neural networks in astronomical image analysis. With a test accuracy of 73.99%, the model successfully distinguishes between various galaxy morphologies, providing a solid foundation for automated galaxy classification systems.

The implementation showcases modern deep learning practices including proper data preprocessing, architectural design, and evaluation methodologies. The project serves as an excellent example of applying machine learning to astronomical research and citizen science applications.

---

*This project was developed using Google Colab and leverages the Galaxy10 dataset, which combines high-quality DECaLS imaging with Galaxy Zoo classifications originally derived from the Sloan Digital Sky Survey (SDSS) project.*