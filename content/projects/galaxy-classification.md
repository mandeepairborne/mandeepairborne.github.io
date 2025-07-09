+++
title = "Galaxy Image Classification using Deep Learning"
date = 2025-07-09
description = "A convolutional neural network approach to classify galaxies into 10 morphological categories using the Galaxy10 dataset"
[extra]
toc = true
+++

<div class="project-page">
    <div class="project-header">
        <h1>🌌 Galaxy Image Classification</h1>
        <p class="project-meta">Deep learning approach to classify galaxies into 10 morphological categories using convolutional neural networks</p>
    </div>

    <h2 class="section-title">Overview</h2>
    <p>This project implements a convolutional neural network (CNN) to classify galaxy images into 10 distinct morphological categories using the Galaxy10 dataset. The model achieves robust performance in distinguishing between different galaxy types, from spiral galaxies to edge-on galaxies with various bulge configurations.</p>

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

    <h2 class="section-title">Dataset</h2>
    <p>The project utilizes the <strong>Galaxy10</strong> dataset, which evolved from the original Sloan Digital Sky Survey (SDSS) based Galaxy Zoo project to the current high-quality version using images from the Dark Energy Camera Legacy Survey (DECaLS). This dataset combines DECaLS imaging with Galaxy Zoo crowd-sourced classifications, where volunteers classified approximately 270,000 galaxy images into morphological categories. Each image is preprocessed to 69×69 pixels and normalized for optimal training performance.</p>

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

    <h2 class="section-title">Methodology</h2>
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

    <h2 class="section-title">Model Architecture</h2>
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

    <h2 class="section-title">Real-time Prediction</h2>
    <p>The model includes functionality for real-time galaxy classification:</p>
    <ul>
        <li><strong>Image Upload</strong>: Users can upload galaxy images for classification</li>
        <li><strong>Preprocessing</strong>: Automatic resizing and normalization</li>
        <li><strong>Prediction</strong>: Multi-class classification with confidence scores</li>
        <li><strong>Visualization</strong>: Display of original image with prediction results</li>
    </ul>

    <h3>Example Prediction Result</h3>
    <ul>
        <li><strong>Predicted Class</strong>: Spiral galaxy</li>
        <li><strong>Confidence Score</strong>: 46%</li>
    </ul>

    <h2 class="section-title">Technical Challenges & Solutions</h2>
    <ul>
        <li><strong>Memory Management</strong>: Implemented proper memory cleanup with garbage collection, used efficient data loading and preprocessing pipelines.</li>
        <li><strong>Overfitting Prevention</strong>: Applied dropout regularization (0.4 rate), used validation split for monitoring training progress, considered early stopping.</li>
        <li><strong>Model Optimization</strong>: Utilized Global Average Pooling instead of flattening, progressive feature map increase (32→64→128→256), appropriate activation functions (ReLU, Softmax).</li>
    </ul>

    <h2 class="section-title">Future Enhancements</h2>
    <ol>
        <li><strong>Data Augmentation</strong>: Implement rotation, scaling, and brightness adjustments.</li>
        <li><strong>Transfer Learning</strong>: Utilize pre-trained models for improved performance.</li>
        <li><strong>Ensemble Methods</strong>: Combine multiple models for better accuracy.</li>
        <li><strong>Real-time Web Interface</strong>: Deploy model for public use.</li>
        <li><strong>Advanced Architectures</strong>: Experiment with ResNet, EfficientNet variants.</li>
    </ol>

    <h2 class="section-title">Conclusion</h2>
    <p>This galaxy image classification project demonstrates the effectiveness of convolutional neural networks in astronomical image analysis. With a test accuracy of 73.99%, the model successfully distinguishes between various galaxy morphologies, providing a solid foundation for automated galaxy classification systems.</p>
    <p>The implementation showcases modern deep learning practices including proper data preprocessing, architectural design, and evaluation methodologies. The project serves as an excellent example of applying machine learning to astronomical research and citizen science applications.</p>

    ---
        *This project was developed using Google Colab and leverages the Galaxy10 dataset, which combines high-quality DECaLS imaging with Galaxy Zoo classifications originally derived from the Sloan Digital Sky Survey (SDSS) project.*
    ---
</div>