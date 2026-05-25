+++
title = "Numerical Modeling of Advective Boundary Layer Dynamics"
date = 2026-05-22
description = "A 2D numerical solver for the Mahrt (1972) boundary layer model initialized with real-world ERA5 Somali Jet wind data."
[extra]
show_date = true
+++

## 🌪️ Project Overview

This project implements a 2D numerical solver for the **Mahrt (1972) advective boundary layer model**. The solver is designed to simulate cross-equatorial wind flow, focusing on the dynamics of the Somali Jet. By integrating real-world meteorological data from the **ERA5 Global Catalog**, we study how pressure forces, horizontal and vertical advection, eddy viscosity, and the changing Coriolis parameter across the equator interact to shape the planetary boundary layer.

<div class="callout named">
<span>💡 Research Summary</span>
Investigated boundary layer response to cross-equatorial gradients along the Somali Jet axis (60°E longitude). Developed an upwind numerical solver initialized with ERA5 data and conducted comparisons between constant and height-dependent eddy viscosity profiles.
</div>

---

## 🔬 Model Physics & Governing Equations

The Mahrt (1972) model governs the steady-state boundary layer velocity fields $\( (u, v, w) \)$ under the influence of pressure gradients, friction (eddy diffusion), and Coriolis acceleration:

$$ v \frac{\partial u}{\partial y} + w \frac{\partial u}{\partial z} = f v + K_z \frac{\partial^2 u}{\partial z^2} - \frac{1}{\rho}\frac{\partial p}{\partial x} $$

$$ v \frac{\partial v}{\partial y} + w \frac{\partial v}{\partial z} = -f u + K_z \frac{\partial^2 v}{\partial z^2} - \frac{1}{\rho}\frac{\partial p}{\partial y} $$

Where:
- $\( f = \beta y \)$ is the Coriolis parameter, which varies linearly with latitude $\( y \)$ (beta-plane approximation).
- $\( K_z \)$ is the vertical eddy diffusion coefficient.
- $\( -\frac{1}{\rho}\frac{\partial p}{\partial x} \)$ and $\( -\frac{1}{\rho}\frac{\partial p}{\partial y} \)$ are the zonal and meridional pressure gradient forces.
- The vertical velocity $\( w \)$ is determined from the continuity equation:

$$ \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0 \implies w(z) = -\int_{0}^{z} \frac{\partial v}{\partial y} dz $$

---

## 🛠️ Numerical Implementation

The solver is written in Python and uses a finite difference grid to discretize the boundary layer:
- **Discretization:** Upwind finite difference scheme is used for horizontal and vertical advection to maintain numerical stability in strongly advective flows.
- **Eddy Diffusion:** Standard second-order central difference scheme.
- **Time Integration:** Explicit forward-Euler scheme used to step the equations of motion to a steady state (spin-up).
- **Coriolis near Equator:** A reference latitude method is used to avoid singularities at the exact equator ($\( f=0 \)$).

### Core Solver Step
```python
def step(self, dt):
    # Calculate vertical velocity w from continuity
    self._calculate_vertical_velocity()
    
    # Calculate advection, diffusion, and Coriolis terms
    adv_u = self._advection_u()
    adv_v = self._advection_v()
    diff_u = self._diffusion_u()
    diff_v = self._diffusion_v()
    cor_u, cor_v = self._coriolis_beta_term()
    
    # Update velocity fields with pressure gradient force (dpdx, dpdy)
    u_new = self.u + dt * (adv_u + cor_u + diff_u - self.dpdx)
    v_new = self.v + dt * (adv_v + cor_v + diff_v - self.dpdy)
    
    # Enforce boundary conditions (no-slip at surface, geostrophic at top)
    u_new[0, :] = 0.0
    v_new[0, :] = 0.0
    u_new[-1, :] = u_new[-2, :]
    v_new[-1, :] = v_new[-2, :]
    
    self.u = u_new
    self.v = v_new
```

---

## 📊 Numerical Experiments & Findings

We performed two main simulation experiments across the domain spanning from $\( -10^\circ \)$ to $\( +10^\circ \)$ latitude and $\( 0 \)$ to $\( 2000\text{ m} \)$ altitude:

### 1. Experiment 1: Meridional Pressure Gradient Only
- Configured with only meridional forcing ($\( dp/dy \neq 0, dp/dx = 0 \)$).
- Results show strong cross-equatorial advection carrying southern-hemispheric momentum into the Northern Hemisphere, which delays the adaptation of the wind vector to the Northern Hemisphere Coriolis force.

### 2. Experiment 2: Joint Meridional and Zonal Pressure Gradients
- Configured with both meridional and zonal forcing to model a realistic Somali Jet scenario.
- The zonal pressure gradient drives strong zonal wind acceleration, creating a pronounced low-level wind maximum (jet core) within the boundary layer near the equator.

### 3. Sensitivity Analysis: Eddy Viscosity Profiles
- **Constant $\( K_z \)$:** Results in classical Ekman-like spiral profiles that show uniform friction depth.
- **Height-Dependent $\( K_z(z) \)$:** Simulates realistic boundary layers where turbulence decreases near the top of the boundary layer, leading to sharper shear zones and a more realistic jet core height.

---

## ⚙️ Tech Stack

```
Python | NumPy | xarray | Intake | Matplotlib | Jupyter Notebooks
```

*This project was developed as part of the ICTS Monsoon School (Moist Convective Dynamics of Monsoons - II) in Bengaluru, India.*
