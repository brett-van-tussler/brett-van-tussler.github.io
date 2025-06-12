import React from 'react';
import Layout from '@theme/Layout';

export default function RootWords() {
  // Define section styles using CSS custom properties for theme compatibility
  const sectionStyle = {
    padding: '2rem',
    marginBottom: '3rem',
    borderRadius: '8px',
    boxShadow: 'var(--ifm-global-shadow-lw)',
    border: '1px solid var(--ifm-color-emphasis-200)',
  };

  const sectionHeaderStyle = {
    padding: '1rem',
    marginBottom: '1.5rem',
    borderRadius: '4px',
    textAlign: 'center' as const,
    fontWeight: 'bold',
    fontSize: '1.8rem',
    color: 'var(--ifm-color-white)',
  };

  const entryStyle = {
    backgroundColor: 'var(--ifm-card-background-color)',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '6px',
    boxShadow: 'var(--ifm-global-shadow-tl)',
    border: '1px solid var(--ifm-color-emphasis-200)',
  };

  return (
    <Layout
      title="Root Words"
      description="Etymology and root words for scientific terminology"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>Root Words</h1>
            
            {/* Prefixes Section */}
            <div style={{ ...sectionStyle, backgroundColor: 'var(--ifm-color-emphasis-100)' }}>
              <h2 style={{ ...sectionHeaderStyle, backgroundColor: 'var(--ifm-color-primary)' }}>Prefixes</h2>
            
            <div style={entryStyle}>
              <h3>Iso- (Greek: ísos) = "equal" or "same"</h3>
            </div>
            
            <div style={entryStyle}>
              <h3>Bio- (Greek: bios) = "life"</h3>
            </div>
            
            <div style={entryStyle}>
              <h3>Cyto- (Greek: kytos) = "cell"</h3>
              <ul>
                <li><strong>Cytoplasm</strong> – Fluid inside a cell</li>
                <li><strong>Cytokine</strong> – Cell-signaling molecule</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Gen- (Greek: genos) = "birth," "origin," or "produce"</h3>
              <ul>
                <li><strong>Genotype</strong> – Genetic makeup of an organism</li>
                <li><strong>Oncogene</strong> – Gene that can cause cancer</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Homo- (Greek: homos) = "same"</h3>
              <ul>
                <li><strong>Homozygous</strong> – Two identical alleles</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Hetero- (Greek: heteros) = "different"</h3>
              <ul>
                <li><strong>Heterodimer</strong> – Two different molecules joined</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Neo- (Greek: neos) = "new"</h3>
              <ul>
                <li><strong>Neoplasm</strong> – New abnormal growth</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Onco- (Greek: onkos) = "tumor" or "mass"</h3>
              <ul>
                <li><strong>Oncogene</strong> – Gene that can cause cancer</li>
                <li><strong>Oncology</strong> – Study of cancer</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Pseudo- (Greek: pseudes) = "false"</h3>
              <ul>
                <li><strong>Pseudogene</strong> – Nonfunctional gene-like DNA sequence</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Trans- (Latin: trans) = "across" or "beyond"</h3>
              <ul>
                <li><strong>Transcription</strong> – Copying DNA into RNA</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Inter- (Latin: inter) = "between"</h3>
              <ul>
                <li><strong>Intergenic</strong> – Region between genes</li>
              </ul>
            </div>
            </div>
            
            {/* Suffixes Section */}
            <div style={{ ...sectionStyle, backgroundColor: 'var(--ifm-color-emphasis-100)' }}>
              <h2 style={{ ...sectionHeaderStyle, backgroundColor: 'var(--ifm-color-success)' }}>Suffixes</h2>
            
            <div style={entryStyle}>
              <h3>-tropy / -tropic (Greek: tropē, from trepein) = "turn" or "turning" or "influence"</h3>
              <ul>
                <li><strong>Pleiotropy</strong> – Multiple effects from a single gene (pleio = many, tropy = influence)</li>
                <li><strong>Phototropic</strong> – Turning or growing toward light</li>
                <li><strong>Geotropic</strong> – Turning or growing in response to gravity</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>-mer (Greek: méros) = "part" or "segment"</h3>
            </div>
            
            <div style={entryStyle}>
              <h3>-ase = "enzyme"</h3>
              <ul>
                <li><strong>ATPase</strong> – Enzyme that hydrolyzes ATP</li>
                <li><strong>Ligase</strong> – Enzyme that joins two molecules</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>-sis (Greek: sis) = denotes a process or state of being</h3>
              <ul>
                <li><strong>Homeostasis</strong> – Stable internal conditions</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>-tic (Greek: -tikos) = "characteristic" or "pertaining to"</h3>
              <h3>-astic (Greek: -astikos) = "pertaining to" or "characterized by"</h3>
              <ul>
                <li><strong>Stochastic</strong> – Characterized by randomness or probability</li>
                <li><strong>Elastic</strong> – Characterized by the ability to return to original shape</li>
                <li><strong>Plastic</strong> – Characterized by the ability to be molded or shaped</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>-some / -ome (Greek: -ōma) = "body or complex" or "mass, typically refers to a whole set or collection"</h3>
              <ul>
                <li><strong>Genome</strong> – Entire set of genes in an organism</li>
                <li><strong>Nucleosome</strong> – A discrete nuclear particle (DNA + proteins)</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>-omics (Greek: -ōmikos) = "study of a complete set"</h3>
              <ul>
                <li><strong>Genomics</strong> – Study of the genome</li>
                <li><strong>Transcriptomics</strong> – Study of all RNA transcripts</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>-in / -ine (Latin) = "substance" or "compound"</h3>
              <ul>
                <li><strong>Actin</strong> – Structural protein</li>
                <li><strong>Cytokine</strong> – Signaling protein</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>-phage (Greek: phagein) = "to eat"</h3>
              <ul>
                <li><strong>Bacteriophage</strong> – Virus that infects bacteria</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>-gen (Greek: genes) = "producing" or "origin"</h3>
              <ul>
                <li><strong>Oncogene</strong> – Gene that causes cancer</li>
                <li><strong>Mutagen</strong> – Substance that causes mutations</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>-logy (Greek: logia) = "study of"</h3>
              <ul>
                <li><strong>Biology</strong> – Study of life</li>
                <li><strong>Pathology</strong> – Study of disease</li>
              </ul>
            </div>
            </div>
            
            {/* Roots & Stems Section */}
            <div style={{ ...sectionStyle, backgroundColor: 'var(--ifm-color-emphasis-100)' }}>
              <h2 style={{ ...sectionHeaderStyle, backgroundColor: 'var(--ifm-color-danger)' }}>Roots & Stems</h2>
            
            <div style={entryStyle}>
              <h3>Kinesis (Greek: kinesis) = "movement" or "motion"</h3>
              <ul>
                <li><strong>Cytokinesis</strong> – The division of the cytoplasm during cell division, resulting in two separate daughter cells. (Cyto- = cell, kinesis = movement → movement of the cell's contents)</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Script / Scrib (Latin: scribere) = "to write"</h3>
              <ul>
                <li><strong>Transcript</strong> – Written RNA copy of DNA</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Stoch- / Stokh- (Greek: stokhos) = "target" or "aim"</h3>
              <ul>
                <li><strong>Stochastic</strong> – Involving randomness or probability (originally "able to guess" or "aiming at a target")</li>
                <li><strong>Stochastics</strong> – Mathematical study of random processes</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Strat- / Strati- (Latin: stratum) = "layer" or "spread out"</h3>
              <ul>
                <li><strong>Stratification</strong> – Arrangement in layers</li>
                <li><strong>Stratigraphy</strong> – Study of rock layers</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Poly- (Greek: polys) = "many"</h3>
              <ul>
                <li><strong>Polypeptide</strong> – Chain of many amino acids</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Mer (Greek: meros) = "part"</h3>
              <ul>
                <li><strong>Monomer</strong> – Single molecular unit</li>
                <li><strong>Polymer</strong> – Chain of repeating units</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Therm (Greek: thermos) = "heat"</h3>
              <ul>
                <li><strong>Thermocycler</strong> – Machine that cycles temperature for PCR</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Phob / Philic (Greek: phobos / philos) = "fear" / "love"</h3>
              <ul>
                <li><strong>Hydrophobic</strong> – Repelled by water</li>
                <li><strong>Hydrophilic</strong> – Attracted to water</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Pleio- (Greek: pleíōn) = "more" or "many"</h3>
              <ul>
                <li><strong>Pleiotropy</strong> – Phenomenon where a single gene influences multiple phenotypic traits</li>
                <li><strong>Pleiotropic</strong> – Having multiple effects from a single cause</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Lys- (Greek: lysis) = "to loosen or break"</h3>
              <ul>
                <li><strong>Lysosome</strong> – Organelle that breaks down waste</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Troph (Greek: trophē) = "nourishment"</h3>
              <ul>
                <li><strong>Autotroph</strong> – Organism that produces its own food</li>
                <li><strong>Heterotroph</strong> – Consumes other organisms for energy</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Plasm (Greek: plasma) = "molded or formed"</h3>
              <ul>
                <li><strong>Plasmid</strong> – Circular DNA molecule</li>
                <li><strong>Cytoplasm</strong> – Substance within a cell</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Nucleo- (Latin: nucleus) = "kernel" or "core"</h3>
              <ul>
                <li><strong>Nucleotide</strong> – Building block of DNA/RNA</li>
                <li><strong>Nucleosome</strong> – DNA wrapped around histone proteins</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Chrom- (Greek: chroma) = "color" (later: chromosome)</h3>
              <ul>
                <li><strong>Chromatin</strong> – Complex of DNA and protein</li>
                <li><strong>Chromosome</strong> – Carriers of genetic information - When chromosomes were first observed under a microscope, scientists noticed they stained strongly with certain dyes (colorful chemical stains). Because these structures readily took up color, they were named "chromosomes," literally meaning "colored bodies."</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Kin- (Greek: kinein) = "to move" or "set in motion"</h3>
              <ul>
                <li><strong>Kinase</strong> – Enzyme that transfers phosphate groups, causing molecular changes</li>
                <li><strong>Kinetic</strong> – Relating to or produced by motion</li>
                <li><strong>Kinesiology</strong> – Study of human movement and body mechanics</li>
                <li><strong>Telekinesis</strong> – Hypothetical ability to move objects using the mind</li>
              </ul>
            </div>
            
            <div style={entryStyle}>
              <h3>Pan- (Greek: pân) = "wide"</h3>
              <ul>
                <li><strong>Pancreas</strong> – Large organ for digestion</li>
                <li><strong>Panther</strong> – Large wild cat</li>
                <li><strong>Panthera</strong> – Family of cats</li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}