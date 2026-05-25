+++
title = "Autoencoder-based Precision Measurement Techniques"
date = 2025-11-15
description = "Building deep autoencoders to improve detector calibration and reduce systematic uncertainties in high-energy physics experiments."
[extra]
show_date = true
+++

## 🔬 Project Overview

In experimental particle physics, detector measurements are subject to complex systematic uncertainties and distortions caused by detector response, pileup, and material interactions. This project, completed during my research tenure at **Northwestern University**, implements deep autoencoder neural networks to automate and improve the calibration of particle physics measurements. By training autoencoders in an unsupervised manner on standard physics reference channels, the models learn to reconstruct clean kinematic distributions and systematically correct detector effects.

<div class="callout named">
<span>⚡ Key Objective</span>
Develop a deep-learning-based calibration framework to reduce systematic uncertainties in reconstructed particle physics properties, enhancing overall measurement precision.
</div>

---

## 🧠 Methodology & Model Architecture

Autoencoders are neural networks trained to reconstruct their input data through a low-dimensional bottleneck (latent space). For detector calibration:
1. **Input Features:** Particle kinematic vectors $\( (p_T, \eta, \phi, m) \)$ along with detector-specific calorimeter cluster shapes and tracker qualities.
2. **Latent Representation:** The encoder maps high-dimensional reconstructed features to a lower-dimensional representation representing the true physics parameters.
3. **Reconstruction & Calibration:** The decoder reconstructs the calibrated measurements. The reconstruction loss function is weighted by experimental resolution parameters to align the output with true calibration benchmarks (such as the $\( Z \)$-boson mass peak).

### Model Architecture
```python
import tensorflow as tf

class PrecisionCalibrationAutoencoder(tf.keras.Model):
    def __init__(self, input_dim, latent_dim):
        super(PrecisionCalibrationAutoencoder, self).__init__()
        # Encoder Network
        self.encoder = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu', input_shape=(input_dim,)),
            tf.keras.layers.BatchNormalization(),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(latent_dim, activation='relu')
        ])
        # Decoder Network (Calibration)
        self.decoder = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=(latent_dim,)),
            tf.keras.layers.BatchNormalization(),
            self.decoder_output = tf.keras.layers.Dense(input_dim, activation='linear')
        ])
        
    def call(self, inputs):
        latent = self.encoder(inputs)
        calibrated = self.decoder(latent)
        return calibrated
```

---

## 📈 Results & Calibration Impact

- **Resolution Improvement:** Successfully corrected energy/momentum scale offsets, narrowing the reconstructed invariant mass distributions for reference calibration channels.
- **Uncertainty Reduction:** The deep autoencoder framework reduced the systematic uncertainties associated with detector energy scale resolution, improving precision in downstream searches.
- **Pileup Robustness:** The network demonstrated excellent resilience under high-pileup conditions, filtering out extraneous soft-radiation energy contributions.

---

## 🛠️ Tech Stack

```
Python | PyTorch | TensorFlow | Keras | ROOT | NumPy | SciPy | pandas | Matplotlib
```

*This research project was conducted under the supervision of **Dr. Raman Khurana** at Northwestern University (USA).*
