+++
title = "Galaxy Image Classification using Deep Learning"
date = 2025-07-09
description = "A convolutional neural network approach to classify galaxies into 10 morphological categories using the Galaxy10 dataset"
[extra]
toc = true
+++

# 🌌 Galaxy Image Classification

> *Deep learning approach to classify galaxies into 10 morphological categories using convolutional neural networks*

## Overview
This project implements a convolutional neural network (CNN) to classify galaxy images into 10 distinct morphological categories using the Galaxy10 dataset. The model achieves robust performance in distinguishing between different galaxy types, from spiral galaxies to edge-on galaxies with various bulge configurations.

### Key Statistics
- **Test Accuracy**: 73.99%
- **Galaxy Classes**: 10
- **Image Resolution**: 69×69 pixels
- **Training Epochs**: 20

## Technology Stack
- Python
- TensorFlow
- Keras
- OpenCV
- NumPy
- Scikit-learn
- AstroNN
- Google Colab

## Dataset
The project utilizes the **Galaxy10** dataset, which evolved from the original Sloan Digital Sky Survey (SDSS) based Galaxy Zoo project to the current high-quality version using images from the Dark Energy Camera Legacy Survey (DECaLS). This dataset combines DECaLS imaging with Galaxy Zoo crowd-sourced classifications, where volunteers classified approximately 270,000 galaxy images into morphological categories. Each image is preprocessed to 69×69 pixels and normalized for optimal training performance.

### Galaxy Classifications
#### Smooth Galaxies
- Completely round smooth
- In-between smooth
- Cigar-shaped smooth

#### Edge-on Galaxies
- Edge-on (no bulge)
- Edge-on (with bulge)

#### Spiral & Barred
- Spiral galaxy
- Galaxy with bar

#### Bulge Variations
- Galaxy with no bulge
- Just noticeable bulge
- Obvious bulge

## Methodology
### Data Loading & Preprocessing
Load the Galaxy10 dataset using AstroNN library, resize images to 69×69 pixels, normalize pixel values to [0,1] range, and convert labels to categorical format for multi-class classification.

### Model Architecture Design
Implement a CNN with multiple convolutional layers, max pooling, global average pooling, and dense layers with dropout for regularization. The architecture progressively increases feature maps from 32 to 256.

### Training & Validation
Split data into training/testing sets (80/20), use 10% of training data for validation, train for 20 epochs with Adam optimizer and categorical crossentropy loss.

### Model Evaluation
Evaluate model performance on test set and implement real-time prediction functionality for new galaxy images with confidence scoring.

## Model Architecture
### CNN Architecture Flow
Input → Conv2D (32 filters) → MaxPool2D (2×2) → Conv2D (64 filters) → MaxPool2D (2×2)
→ Conv2D (128 filters) → MaxPool2D (2×2) → Conv2D (256 filters) → GlobalAvgPool2D
→ Dense (128 units) → Dropout (0.4) → Dense (10 units, Softmax)


## Key Implementation Details
### Data Preprocessing
Images are resized to 69×69 pixels using OpenCV, converted to float32, and normalized to [0,1] range. Labels are one-hot encoded for multi-class classification.

### Model Compilation
The model uses Adam optimizer with categorical crossentropy loss function and accuracy as the primary metric for evaluation.

### Training Configuration
Training performed with batch size of 64, 20 epochs, and 10% validation split. Dropout layer (0.4) prevents overfitting during training.

## Results & Performance
### Model Performance
#### Test Accuracy
- **73.99%**: Final accuracy achieved on the test dataset

#### Training Accuracy
- **88.87%**: Peak training accuracy in final epoch

#### Training Progress
- **Epoch 1**: 76.04% training accuracy, 68.85% validation accuracy
- **Epoch 10**: 82.74% training accuracy, 70.61% validation accuracy
- **Epoch 20**: 88.87% training accuracy, 72.16% validation accuracy

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