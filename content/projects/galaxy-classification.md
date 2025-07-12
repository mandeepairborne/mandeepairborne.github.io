+++
title = "Galaxy Classification with Deep Learning"
date = 2025-07-09
description = "A convolutional neural network trained on Galaxy10 dataset to classify galaxy morphologies"
[extra]
show_date = true
+++

# Galaxy Classification with Deep Learning

*Building a CNN to classify galaxy morphologies using the Galaxy10 dataset*

---

## Project Overview

This project implements a convolutional neural network (CNN) to classify galaxy images into 10 different morphological categories. Using the Galaxy10 dataset from DECaLS (Dark Energy Camera Legacy Survey), I trained a deep learning model to automatically identify galaxy types based on their visual characteristics.

<div class="callout named">
<span>Key Results</span>
Achieved 73.98% test accuracy on galaxy classification with 10 distinct morphological categories
</div>

## Dataset & Methodology

The Galaxy10 dataset contains over 17,000 galaxy images labeled by citizen scientists through the Galaxy Zoo project. Each image is 69×69 pixels and represents one of ten galaxy morphologies:

1. **Completely round smooth galaxy**
2. **In-between smooth galaxy** 
3. **Cigar-shaped smooth galaxy**
4. **Edge-on galaxy (no bulge)**
5. **Edge-on galaxy (with bulge)**
6. **Spiral galaxy**
7. **Galaxy with bar**
8. **Galaxy with no bulge**
9. **Galaxy with just noticeable bulge**
10. **Galaxy with obvious bulge**

## Model Architecture

The CNN architecture consists of four convolutional layers with progressively increasing filter sizes, followed by global average pooling and dense layers:

```python
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), 
                          activation='relu', 
                          input_shape=(69, 69, 3)),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Conv2D(64, (3, 3), 
                          activation='relu'),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Conv2D(128, (3, 3), 
                          activation='relu'),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Conv2D(256, (3, 3), 
                          activation='relu'),
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.4),
    tf.keras.layers.Dense(10, activation='softmax')
])
```

<div class="project-stats">
<div class="stat-item">
<strong>Total Parameters:</strong> ~1.2M
</div>
<div class="stat-item">
<strong>Training Time:</strong> ~45 minutes
</div>
<div class="stat-item">
<strong>Final Accuracy:</strong> 73.98%
</div>
</div>

## Training Process

The model was trained for 20 epochs with the following configuration:

- **Optimizer:** Adam
- **Loss Function:** Categorical Crossentropy
- **Batch Size:** 64
- **Train/Validation Split:** 90/10
- **Test Split:** 20% of total data

### Training Results

The model showed steady improvement throughout training:

- **Initial Training Accuracy:** 76.04%
- **Final Training Accuracy:** 88.87%
- **Best Validation Accuracy:** 72.66%
- **Final Test Accuracy:** 73.98%

<div class="callout">
The model demonstrated good learning progression with validation accuracy stabilizing around 72%, indicating successful generalization without significant overfitting.
</div>

## Implementation Details

### Data Preprocessing

```python
# Load and preprocess Galaxy10 dataset
X, y = galaxy10.load_data()
X = np.array([cv2.resize(img, (69, 69)) 
              for img in X], 
             dtype='float32') / 255.0
y_cat = tf.keras.utils.to_categorical(y, 10)
```

### Prediction Pipeline

```python
# Image preprocessing for inference
img = cv2.imread(img_path)
img = cv2.resize(img, (69, 69))
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
img = img.astype('float32') / 255.0
img = np.expand_dims(img, axis=0)

# Generate prediction
pred = model.predict(img)
pred_class = np.argmax(pred)
confidence = np.max(pred)
```

## Model Testing Results

### Test Image Analysis

Here's an example of the model in action on a real galaxy image:

<div class="question-image">
<img src="/img/projects/tes.jpg" alt="Test Galaxy Image" class="question-img">
<p><em>Original galaxy image used for testing</em></p>
</div>

### Prediction Results

<div class="question-image">
<img src="/img/projects/result.jpg" alt="Model Prediction Results" class="question-img">
<p><em>Model prediction output showing classification results</em></p>
</div>

**Model Prediction:**
- **Predicted Class:** Spiral galaxy
- **Confidence:** 46%
- **Processing Time:** <0.1 seconds

While the confidence is moderate, this reflects the inherent difficulty in galaxy classification, where morphological boundaries can be subtle and subjective even for human experts.

## Technical Stack

<div class="tech-stack">
<div class="tech-item"><strong>Deep Learning:</strong> TensorFlow/Keras</div>
<div class="tech-item"><strong>Data Processing:</strong> NumPy, OpenCV</div>
<div class="tech-item"><strong>Dataset:</strong> astroNN Galaxy10</div>
<div class="tech-item"><strong>Environment:</strong> Google Colab</div>
</div>

## Key Learnings

1. **Morphological Classification Complexity:** Galaxy classification is inherently challenging due to the continuous nature of morphological features and subjective classification boundaries.

2. **Data Augmentation Potential:** The model could benefit from data augmentation techniques to improve generalization and handle orientation variations.

3. **Transfer Learning Opportunities:** Pre-trained models could potentially improve performance, especially given the limited dataset size.

4. **Validation Strategy:** The relatively stable validation accuracy suggests the model learned meaningful features without excessive overfitting.

## Future Improvements

- **Data Augmentation:** Implement rotation, scaling, and brightness variations
- **Transfer Learning:** Experiment with pre-trained CNN backbones
- **Ensemble Methods:** Combine multiple models for improved accuracy
- **Attention Mechanisms:** Incorporate attention layers to focus on relevant morphological features

---

*This project was developed using Google Colab and leverages the Galaxy10 dataset, which combines high-quality DECaLS imaging with Galaxy Zoo classifications originally derived from the Sloan Digital Sky Survey (SDSS) project.*

