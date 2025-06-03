# QIIME 2 Kraken2 Classification Analysis

This notebook demonstrates how to use the q2-annotate plugin's `classify_kraken2` action to taxonomically classify metagenomic reads. The notebook will cover:

1. Setting up the QIIME 2 environment
2. Downloading sample data and the Kraken2 database
3. Importing the sequence data into QIIME 2 artifacts
4. Running the Kraken2 classification
5. Analyzing and visualizing the results

## Prerequisites

- QIIME 2 (version 2023.9 or later)
- q2-annotate plugin
- Sufficient storage space for Kraken2 databases (~10-50GB depending on the database)

## 1. Environment Setup

First, we'll ensure that QIIME 2 and the q2-annotate plugin are properly installed and activated. If you haven't installed these yet, follow the [official QIIME 2 installation guide](https://docs.qiime2.org/2023.9/install/) and then install the q2-annotate plugin.


```python
# Check that QIIME 2 is installed and accessible
!qiime --version
```

    zsh:1: command not found: qiime



```python
# Verify that q2-annotate plugin is installed
!qiime annotate --help
```


```python
!conda install -c conda-forge -c bioconda -c qiime2 -c defaults q2-annotate
!conda activate qiime2_annotate
!python -m ipykernel install --user --name qiime2_annotate --display-name
```


      Cell In[3], line 2
        python -m ipykernel install --user --name qiime2_annotate --display-name
                  ^
    SyntaxError: invalid syntax



If you don't have q2-annotate installed, you can install it using conda or pip:

```bash
# Using conda (if you're using the QIIME 2 conda environment)
conda install -c conda-forge -c bioconda -c qiime2 -c defaults q2-annotate

# Or using pip
pip install q2-annotate
```

Make sure to restart your kernel after installation.

## 2. Download Sample Data and Kraken2 Database

### 2.1 Download Sample Reads

For this demo, we'll download some sample metagenomic reads. These are paired-end reads from a microbial community sample.


```python
# Create a directory for our data
!mkdir -p sample_data
```


```python
# Download sample data - using a small metagenomic dataset from the Human Microbiome Project
# NOTE: This is a small sample for demonstration purposes
!wget -O sample_data/SRS015890.fastq.gz https://downloads.hmpdacc.org/dacc/hmp/demo_data/demo_data_files/otu_table_analysis/SRS015890.fastq.gz
```

### 2.2 Download Kraken2 Database

Kraken2 requires a reference database for taxonomic classification. There are several pre-built databases available, varying in size and scope. We'll download the MiniKraken2 database, which is a smaller, pre-built database that's suitable for demonstrations.

> **Note**: The full Kraken2 databases can be very large (10-100+ GB). For this demonstration, we're using the MiniKraken2 database which is much smaller (~4-5 GB) but still useful.


```python
# Create a directory for the Kraken2 database
!mkdir -p kraken2_db
```


```python
# Download the MiniKraken2 database (smaller version for demo purposes)
!wget -O minikraken2.tgz https://genome-idx.s3.amazonaws.com/kraken/minikraken2_v2_8GB_201904.tgz
```


```python
# Extract the database
!tar -xzf minikraken2.tgz -C kraken2_db --strip-components=1
```

Alternative Kraken2 databases:

- Standard Kraken2 database: Contains RefSeq complete bacterial, archaeal, and viral genomes (~30GB)
  ```
  wget https://genome-idx.s3.amazonaws.com/kraken/k2_standard_20230605.tar.gz
  ```

- PlusPF database: Contains RefSeq complete bacterial, archaeal, and viral genomes + protozoa & fungi (~40GB)
  ```
  wget https://genome-idx.s3.amazonaws.com/kraken/k2_pluspf_20230605.tar.gz
  ```

- PlusPFP database: Contains PlusPF + UniRef90 proteins (~100GB)
  ```
  wget https://genome-idx.s3.amazonaws.com/kraken/k2_pluspfp_20230605.tar.gz
  ```

Choose the appropriate database based on your specific needs and available storage/memory. For production analyses, using one of the larger databases is recommended for better classification accuracy.

## 3. Import Sequence Data into QIIME 2

Now, we'll import the downloaded sequence data into QIIME 2 artifacts. For Kraken2 classification, we need to import the data as `SampleData[Sequences]` or `SampleData[PairedEndSequences]`.


```python
# Create a manifest file for importing (for a single sample)
with open('sample_manifest.tsv', 'w') as f:
    f.write('sample-id\tfile-path\n')
    f.write('SRS015890\t$PWD/sample_data/SRS015890.fastq.gz\n')
```


```python
# Import the data as SampleData[Sequences]
!qiime tools import \
  --type 'SampleData[Sequences]' \
  --input-path sample_manifest.tsv \
  --output-path demux-single-end.qza \
  --input-format SingleEndFastqManifestPhred33V2
```

### Optional: Visualize the imported sequences


```python
!qiime demux summarize \
  --i-data demux-single-end.qza \
  --o-visualization demux-single-end.qzv
```


```python
# Display the visualization (if you're running this in Jupyter)
from qiime2 import Visualization
Visualization.load('demux-single-end.qzv')
```

## 4. Run Kraken2 Classification using q2-annotate

Now we'll use the `classify_kraken2` action from the q2-annotate plugin to taxonomically classify our sequences.

Let's check the available parameters for the `classify_kraken2` action:


```python
!qiime annotate classify-kraken2 --help
```


```python
# Run Kraken2 classification
!qiime annotate classify-kraken2 \
  --i-sequences demux-single-end.qza \
  --p-database-dir kraken2_db \
  --p-confidence 0.5 \
  --p-num-threads 4 \
  --o-classification kraken2-classification.qza \
  --o-classification-report kraken2-report.qza
```

### Key Parameters Explained:

- `--i-sequences`: The QIIME 2 artifact containing the sequences to classify
- `--p-database-dir`: Path to the Kraken2 database directory
- `--p-confidence`: Confidence threshold for classification (0-1, higher values are more specific but classify fewer reads)
- `--p-num-threads`: Number of threads to use for the classification
- `--o-classification`: Output artifact for the classification results
- `--o-classification-report`: Output artifact for the Kraken2 report

## 5. Analyze and Visualize the Results

Now that we have the classification results, we can analyze and visualize them.


```python
# Create a visualization of the Kraken2 report
!qiime metadata tabulate \
  --m-input-file kraken2-report.qza \
  --o-visualization kraken2-report.qzv
```


```python
# View the report
from qiime2 import Visualization
Visualization.load('kraken2-report.qzv')
```

### Convert Kraken2 reports to taxonomic bar plots

We can convert the Kraken2 reports to a QIIME 2 feature table and taxonomy, which can then be used to create taxonomic bar plots.


```python
# Convert Kraken2 report to feature table and taxonomy
!qiime annotate kraken2-to-features \
  --i-report kraken2-report.qza \
  --o-feature-table kraken2-feature-table.qza \
  --o-taxonomy kraken2-taxonomy.qza
```


```python
# Create taxonomic bar plots
!qiime taxa barplot \
  --i-table kraken2-feature-table.qza \
  --i-taxonomy kraken2-taxonomy.qza \
  --o-visualization kraken2-taxa-bar-plots.qzv
```


```python
# View the taxonomic bar plots
Visualization.load('kraken2-taxa-bar-plots.qzv')
```

## Additional Analysis: Export Results for Further Processing

You can export the QIIME 2 artifacts to work with the data outside of QIIME 2.


```python
# Export the feature table
!qiime tools export \
  --input-path kraken2-feature-table.qza \
  --output-path exported-feature-table
```


```python
# Export the taxonomy
!qiime tools export \
  --input-path kraken2-taxonomy.qza \
  --output-path exported-taxonomy
```


```python
# View the exported files
!ls -la exported-feature-table
!ls -la exported-taxonomy
```

## Summary

In this notebook, we have:
1. Set up the QIIME 2 environment with the q2-annotate plugin
2. Downloaded sample sequencing data and a Kraken2 database
3. Imported the sequence data into QIIME 2
4. Run the `classify_kraken2` action to taxonomically classify our sequences
5. Analyzed and visualized the classification results
6. Exported the results for further processing

## Next Steps

To improve your analysis, consider:
- Using a larger and more comprehensive Kraken2 database
- Adjusting the confidence threshold based on your specific needs
- Combining this analysis with other QIIME 2 plugins for more comprehensive metagenomic analysis
- Comparing results with other taxonomic classifiers like q2-feature-classifier with BLAST or sklearn
