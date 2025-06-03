```python
import numpy as np
from scipy.sparse import csr_matrix
from scipy.sparse.linalg import lsqr

# Define 3 sparse vectors (dim = 6)
v1 = csr_matrix([1, 0, 0, 2, 0, 0])
v2 = csr_matrix([0, 3, 0, 0, 4, 0])
v3 = csr_matrix([0, 0, 5, 0, 0, 6])

# Stack them as columns in a sparse matrix V (shape = 6 x 3)
V = csr_matrix(np.vstack([v1.toarray(), v2.toarray(), v3.toarray()])).T

# Define target vector (e.g., a sparse combo of v1, v2, v3)
target_vector = np.array([1, 3, 5, 2, 4, 6])  # This is 1*v1 + 1*v2 + 1*v3

# Solve least squares: find weights w such that V @ w ≈ target_vector
# Use sparse solver (LSQR is good for large sparse problems)
result = lsqr(V, target_vector)
weights = result[0]

print("Weights:", weights)
print("Reconstructed:", V @ weights)
```

    Weights: [1. 1. 1.]
    Reconstructed: [1. 3. 5. 2. 4. 6.]

