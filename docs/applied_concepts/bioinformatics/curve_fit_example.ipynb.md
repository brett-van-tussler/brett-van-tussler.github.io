```python
import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt

# 4PL model function
def hill_equation(x, bottom, top, ec50, hill_slope):
    return bottom + (top - bottom) / (1 + (x / ec50)**hill_slope)

# Example data (log scale optional)
concentrations = np.array([1e-9, 1e-8, 1e-7, 1e-6, 1e-5])
responses = np.array([100, 90, 60, 20, 5])  # % viability or similar

# Fit the curve
popt, _ = curve_fit(hill_equation, concentrations, responses, 
                    bounds=([0, 50, 1e-10, 0.1], [10, 120, 1e-4, 10]))

bottom, top, ec50, hill_slope = popt
print(f"Hill slope: {hill_slope:.2f}")

# Plot
x_fit = np.logspace(-9, -5, 100)
y_fit = hill_equation(x_fit, *popt)
plt.semilogx(concentrations, responses, 'o', label='Data')
plt.semilogx(x_fit, y_fit, '-', label='Fit')
plt.xlabel("Concentration (M)")
plt.ylabel("Response")
plt.title(f"Hill Slope: {hill_slope:.2f}")
plt.legend()
plt.show()
```
