+++
title = "GNN-based Jet Classification Using Public LHC Data"
date = 2025-06-09
description = "A convolutional neural network trained on Galaxy10 dataset to classify galaxy morphologies"
[extra]
show_date = true
+++

---

> _Ongoing Project — June 2025 to Present_  
> _Conducted under the supervision of [Dr. Suneel Dutt](https://departments.nitj.ac.in/dept/ph/Faculty/6430446a38bff038a7808216) (NIT Jalandhar)_

---

## 🎯 Objective

This project applies **Graph Neural Networks (GNNs)** to classify **top-quark jets** vs. **QCD background** using public LHC data. GNNs allow modeling jets as particle-level graphs, capturing fine-grained jet substructure patterns that traditional CNNs or BDTs may miss.

---

## 🔍 Motivation

In high-energy collisions at the LHC, jets from hadronization carry rich internal structure. Standard classifiers often rely on image-like calorimeter data or handcrafted observables.

Here, jets are treated as graphs $\( G = (V, E) \)$ where:

- $\( V \)$: particles with features $\( \{p_T, \eta, \phi, E\} \)$
- $\( E \)$: kinematic or spatial proximity $(\( \Delta R < 0.4 \))$

This method retains the natural geometry of collider events and is scalable to variable particle counts.

---

## 📁 Dataset

**Top Tagging Reference Dataset**  
[Zenodo: DOI 10.5281/zenodo.2603256](https://zenodo.org/record/2603256)

- 1.2M simulated jets from LHC-like events
- Labels: `1` = top-quark jets, `0` = QCD background
- Each jet contains up to 200 constituents
- Features per particle: $\( p_T, \eta, \phi, E \)$
- Format: HDF5 (loadable via 'h5py', 'JetNet', 'pandas')

---

## 🧠 Methodology

### Graph Construction

- Build edges using $\( k \)$-nearest neighbors or $\( \Delta R \)$ metric in $\( \eta-\phi \)$ space
- Normalize features $(e.g., \( p_T \))$ and truncate/pad particles

### GNN Models

- **Message Passing Neural Networks (MPNN)**
- **EdgeConv Layers** from DGCNN
- Trained using PyTorch Geometric

### Evaluation

- ROC AUC, accuracy, precision-recall
- Compare against CNN baselines (jet images)
- Interpret embeddings via t-SNE/UMAP

---

## 🛠️ Tech Stack
```
Python | PyTorch Geometric | NumPy | JetNet | h5py | matplotlib | scikit-learn
```
---

<div class="scrollable-table">
  <table>
    <thead>
      <tr>
        <th>Phase</th>
        <th>Milestone</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Phase 1</td>
        <td>Literature review on GNNs in jet physics</td>
        <td>✅ Completed</td>
      </tr>
      <tr>
        <td>Phase 2</td>
        <td>Dataset acquisition & preprocessing</td>
        <td>✅ Completed</td>
      </tr>
      <tr>
        <td>Phase 3</td>
        <td>Jet graph construction & baseline model</td>
        <td>🟡 In Progress</td>
      </tr>
      <tr>
        <td>Phase 4</td>
        <td>GNN tuning & evaluation</td>
        <td>🔲 Upcoming</td>
      </tr>
      <tr>
        <td>Phase 5</td>
        <td>Final report & documentation</td>
        <td>🔲 Upcoming</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 📌 Goals

- Demonstrate the utility of GNNs in jet tagging
- Compare with traditional ML and image-based methods
- Develop a clear, reproducible pipeline for collider physicists interested in ML

---

## 📚 References & Related Work

### 🔹 Jet Flavor Identification
- **Bols et al. (2020)** – *Jet Flavour Classification Using DeepJet*  
  Developed DeepJet, a deep learning-based classifier for jet flavor identification using low-level and high-level features.  
  [arXiv:2008.10519](https://arxiv.org/abs/2008.10519)

- **Li & Smith (2024)** – *ParticleNet and its Application on CEPC Jet Flavor Tagging*  
  Explores GNN-based ParticleNet model for identifying heavy-flavor jets in future collider scenarios, achieving strong performance.  
  [EPJC Article](https://link.springer.com/article/10.1140/epjc/s10052-024-12475-5)


### 🔹 Graph Neural Networks in Particle Physics
- **Genovese et al. (2025)** – *Mixture-of-Experts Graph Transformers for Interpretable Particle Collision Detection*  
  Introduces interpretable MoE-Graph Transformers applied to high-energy physics classification tasks.  
  [arXiv:2501.03432](https://arxiv.org/abs/2501.03432)

- **Tripathy et al. (2025)** – *Scaling GNNs for Particle Track Reconstruction*  
  Enhances the Exa.TrkX GNN pipeline for better scalability and efficiency in dense LHC environments.  
  [arXiv:2504.04670](https://arxiv.org/abs/2504.04670)


### 🔹 Jet Substructure and Heavy-Flavor Tagging
- **Hammad & Nojiri (2024)** – *Transformer Networks for Heavy Flavor Jet Tagging*  
  Evaluates transformer-based models for identifying jets from heavy quarks, showing competitive results.  
  [arXiv:2411.11519](https://arxiv.org/abs/2411.11519)

- **EPJC (2022)** – *Jet Flavour Tagging for Future Colliders with Fast Simulation*  
  Discusses use of GNNs and machine learning for jet tagging in future collider detectors like FCC-ee.  
  [Springer Link](https://link.springer.com/article/10.1140/epjc/s10052-022-10609-1)


