/*
 * EDIT YOUR PORTFOLIO HERE
 * ========================
 * Change the words between quotes, save this file, then refresh index.html.
 * Keep commas between fields/items. Copy or remove a whole {...} item to
 * add or remove a visible entry. Simple <em>, <strong>, and <a> HTML is okay
 * in longer text fields.
 */
window.PORTFOLIO_CONTENT = {
  basics: {
    fullName: "Archana Balasubramanian",
    firstName: "Archana",
    lastName: "Balasubramanian",
    email: "archanab2400@gmail.com",
    linkedin: "https://www.linkedin.com/in/archanab2400/",
    github: "https://github.com/archana-b24",
    scholar: "https://scholar.google.com/citations?user=X4-CQkYAAAAJ&hl=en",
    orcid: "https://orcid.org/0000-0003-0036-0922"
  },

  about: {
    tagline: "Turning biological data into clear visuals and reliable systems.",
    paragraphs: [
      "Hi, I’m Archana, a bioinformatician who loves working on both sides of the stack! On the frontend, I believe biological data deserves to be seen, not buried in an abstract, paper or codebase. This portfolio is where I bring my projects to life and ask a simple question: can a thoughtful visualization tell the story first?",
      "On the backend, I build the architecture that makes those insights secure, reliable and ready to scale. I love figuring out which systems fit the data, automating the journey from wet lab output through quality control and catching weak points before they become bottlenecks. I do my best work where science, software and delivery meet, translating stakeholder needs into clear priorities, coordinating projects across teams and building systems that let people view, validate and trust their data before it informs scientific, operational and public health decisions."
    ],
    photo: "assets/photo.jpg",
    photoAlt: "Portrait of Archana Balasubramanian"
  },

  work: {
    note: "",
    roles: [
      {
        title: "Bioinformatics Associate I", company: "Zymo Research Corporation", location: "Irvine, CA",
        type: "Full-time", dates: "Oct 2024-present",
        logo: "assets/logos/zymo.svg", monogram: "ZYMO",
        scope: "At Zymo, I own bioinformatics projects and carry data from raw assays through validated analysis, secure deployment and stakeholder delivery.",
        bullets: [
          "<strong>Wastewater surveillance.</strong> Own the analysis and delivery path for the Los Angeles County Department of Public Health across targeted viral sequencing, metagenomics and multiplex PCR data for pathogen surveillance. I build decision-ready dashboards that help public-health officials make data-informed decisions about pathogens. I implement dataset-grounded chatbot interfaces in these dashboards so users can explore results while calculations remain tied to validated analysis functions.",
          "<strong><a href=\"https://pangealab.com/bladder-care/\" target=\"_blank\" rel=\"noopener\">Bladder CARE</a>.</strong> Developed and released the latest version of the software behind a non-invasive urine test for the early detection of bladder cancer and upper tract urothelial carcinoma, now in clinical use and recognized with FDA Breakthrough Device Designation.",
          "<strong>Methylation platform.</strong> Rebuilt a legacy production methylation workflow as a modular, containerized Nextflow pipeline validated for WGBS, RRBS and cfWGBS, establishing it as the default workflow while reducing technical debt.",
          "<strong>Bioinformatics AI adoption.</strong> Led a company-wide demo of Claude Code, Codex and reusable skills through real bioinformatics use cases, practical failure modes and deliberately good and bad examples.",
          "<strong>Multi-omics analysis.</strong> I integrate proteomic, transcriptomic and methylation data to evaluate whether biological signals converge across molecular layers or remain assay-specific. I turn those comparisons into an interpretable view of pathways and disease mechanisms that guides focused follow-up analysis.",
          "<strong>Sequencing platform breadth.</strong> I work with data generated across Element AVITI, Illumina, PacBio and Oxford Nanopore platforms. That range has taught me to adapt quality control and downstream analysis to the assay and biological question instead of forcing every dataset through the same template."
        ]
      },
      {
        title: "Graduate Student Researcher, Palsson Lab", company: "Systems Biology Research Group, UC San Diego", location: "San Diego, CA",
        type: "Research", dates: "Sep 2022-May 2024",
        logo: "assets/logos/ucsd.svg", monogram: "SBRG",
        scope: "Two projects shaped my research in the Palsson Lab: mapping pathogen diversity across thousands of genomes and resolving the regulatory programs that drive bacterial adaptation across changing environments.",
        bullets: [
          "<strong><a href=\"#kp-thesis\"><em>Klebsiella pneumoniae</em> pangenomics.</a></strong> Built a quality-controlled map of 7,100 genomes that connected population structure to resistance, virulence and strain-specific metabolic capabilities. Click the title to explore the thesis and visualization.",
          "<strong><a href=\"#lreuteri-ica\"><em>L. reuteri</em> transcriptional regulation.</a></strong> Used independent component analysis to resolve 117 RNA-seq datasets into 35 independently regulated gene programs, revealing how this probiotic bacterium adapts its metabolism and stress responses across 50 experimental conditions and providing a framework for experimental validation and strain design. Click the title to explore the peer-reviewed study and visualization."
        ]
      },
      {
        title: "Toxicology Data Scientist Intern", company: "Janssen, Pharmaceutical Companies of Johnson & Johnson", location: "San Diego, CA",
        type: "Internship", dates: "Jul-Sep 2023",
        logo: "assets/logos/janssen.png", monogram: "J&J",
        scope: "Investigated why schizophrenia therapeutics can produce metabolic side effects and how transcriptomic data could help the safety team detect those signals earlier.",
        bullets: [
          "Analyzed bulk RNA-seq data from treated preclinical models to identify obesity-related expression changes and prioritize candidate biomarkers for safety assessment.",
          "Connected differential-expression results to affected pathways and translated the findings into focused biological questions for wet-lab follow-up."
        ]
      },
      {
        title: "Computational Biology Research Intern", company: "Indian Institute of Technology Bombay", location: "Mumbai, India",
        type: "Research", dates: "May-Dec 2021",
        logo: "assets/logos/iitb.png", monogram: "IITB",
        scope: "Examined patient-tissue proteomics to understand how glioma changes with increasing aggressiveness and identify therapeutically relevant signals.",
        bullets: [
          "Applied pathway enrichment to turn altered proteins into a focused set of biological processes and candidate targets linked to tumor progression.",
          "Evaluated candidates through molecular docking, simulation and drug-likeness testing, narrowing the list to biologically relevant targets with practical potential for further investigation."
        ]
      }
    ]
  },

  education: [
    {
      degree: "M.S. Bioengineering",
      school: "University of California San Diego", location: "La Jolla, CA",
      dates: "2022-2024", logo: "assets/logos/ucsd.svg", monogram: "UCSD",
      honors: ["GPA: 3.87/4.00"],
      summary: "<span class=\"entry__summary-line\">Specialization in Computational Biology and Bioinformatics.</span><span class=\"entry__summary-line\">Thesis: <em>A pangenomics-enriched analysis of Klebsiella pneumoniae</em> (<a href=\"https://systemsbiology.ucsd.edu/\" target=\"_blank\" rel=\"noopener\">Systems Biology Research Group</a>, Palsson Lab).</span>",
      cta: { label: "Click here to explore the thesis", href: "#kp-thesis" },
      bullets: ["Served as a Graduate Teaching Assistant where I hosted weekly discussion sections, conducted lab sessions and graded final projects."],
      bulletsPlain: true,
      tags: ["BENG 1 · Introduction to Bioengineering", "BENG 120 · Organic Chemistry", "BENG 123 · Dynamic Simulations", "BENG 160 · Molecular Bioengineering Techniques"]
    },
    {
      degree: "B.Tech Biotechnology",
      school: "PES University", location: "Bengaluru, India",
      dates: "2018-2022", logo: "assets/logos/pes.png", monogram: "PES",
      honors: ["GPA: 9.58/10.00", "Silver Medalist"],
      summary: "Specialization in Process Engineering and Computational Biology.",
      bullets: [
        "Served as Secretary of Jeeva Srujana, PES University’s biotechnology club, from 2020 to 2022.",
        "Served as the Subject Matter Expert at PESU I/O, a peer-to-peer learning initiative, for <em>From Prognosis to Diagnosis Using Photoacoustic Imaging</em> in 2020 and returned as a Technical Consultant in 2021."
      ],
      bulletsPlain: true,
      tags: []
    }
  ],

  projects: {
    items: [
      {
        title: "Mapping squamous lung cancer progression across cells and tissue",
        year: "2024",
        description: "I led a team investigating how immune, epithelial and stromal populations change and interact across squamous cell lung carcinoma progression. We combined single-cell resolution with spatial context to move beyond cataloging cell types and map their organization within tumor tissue.\n\nThe resulting analysis connected cell-state transitions, inflammatory pathways and candidate signaling relationships to their spatial context, providing a more complete view of the tumor ecosystem across disease progression.",
        tags: ["scRNA-seq", "Spatial transcriptomics", "Scanorama"],
        visualization: "lung-spatial",
        codeUrl: "https://github.com/archana-b24/sc-spatial-analysis",
        liveUrl: ""
      }
    ]
  },

  publications: {
    groups: [
      {
        heading: "Master's thesis",
        items: [{
          anchor: "kp-thesis",
          title: "A pangenomics-enriched analysis of <em>Klebsiella pneumoniae</em>",
          url: "https://escholarship.org/uc/item/8gg807s6",
          authors: "<strong>Balasubramanian A</strong>",
          venue: "M.S. thesis · University of California San Diego",
          description: "<em>Klebsiella pneumoniae</em> (Kp) is a highly diverse opportunistic bacterium that causes serious respiratory, bloodstream, and urinary-tract infections, many of which are becoming increasingly difficult to treat as strains acquire and exchange antibiotic-resistance genes. Because no single reference genome captures this diversity, the pangenome provides a broader view of the species by revealing both the genes shared across strains and those associated with resistance, virulence, and adaptation.\n\nUsing more than 7,000 quality-controlled genomes, I mapped whole-genome similarity into 26 population groups and interpreted these groups alongside their resistance, virulence, capsule, and surface-antigen profiles. To uncover the genetic structure underlying these groups, the analysis represented each genome as a gene presence-or-absence profile and applied non-negative matrix factorization, a mathematical method that separates recurring sets of genes and measures how strongly each set is represented in an individual strain.\n\nThis model goes beyond the population level by giving each group an interpretable genetic signature, revealing which recurring genes define established lineages and which mobile-element-rich modules may contribute to their adaptability. Combined with strain-specific metabolic modeling, this framework moves beyond simply classifying Kp toward explaining the genes and biological capabilities that distinguish its lineages, providing focused hypotheses for resistance surveillance and future experimental validation of therapeutic vulnerabilities.",
          visualization: "kp-factorization",
          type: "Thesis", date: "2024",
          links: [{ label: "eScholarship", url: "https://escholarship.org/uc/item/8gg807s6" }]
        }]
      },
      {
        heading: "Peer-reviewed",
        items: [
          {
            anchor: "lreuteri-ica",
            title: "Reconstructing the transcriptional regulatory network of probiotic <em>L. reuteri</em> is enabled by transcriptomics and machine learning",
            url: "https://journals.asm.org/doi/10.1128/msystems.01257-23",
            authors: "Josephs-Spaulding J, Rajput A, Hefner Y, Szubin R, <strong>Balasubramanian A</strong>, Li G, Zielinski DC, Jahn L, Sommer M, Phaneuf P, Palsson BO",
            authorsSingleLine: true,
            venue: "mSystems 9, e01257-23",
            description: "<em>Limosilactobacillus reuteri</em> is a probiotic bacterium with important roles in human health and microbial food production, yet the regulatory logic that allows it to respond to different environments remained poorly resolved. Because a single growth condition captures only a narrow view of gene activity, a broader transcriptional compendium was needed to understand which genes respond together and how those responses change across environments.\n\nUsing 117 quality-controlled RNA-seq profiles spanning 50 conditions, the analysis measured transcript abundance across changes in nutrients, salts, human milk, fruit juice, microbial co-cultures and environmental stress. Independent component analysis separated these overlapping expression patterns into 35 independently regulated gene groups called iModulons, then measured the activity of each group in every condition. This turns thousands of individual expression measurements into a smaller set of coordinated biological signals that can be interpreted across experiments.\n\nThe resulting network revealed regulatory responses involving arginine metabolism, stress, riboflavin production, fatty-acid conversion and secondary-metabolite biosynthesis. Rather than describing gene expression one condition at a time, this framework explains how <em>L. reuteri</em> reorganizes its activity across environments and which regulatory programs are most closely tied to useful probiotic functions. It provides a practical foundation for experimental validation, strain design and the more predictable use of microbes in food production.",
            visualization: "lacto-workflow",
            type: "Article", date: "2024",
            links: [{ label: "DOI", url: "https://doi.org/10.1128/msystems.01257-23" }, { label: "Full text", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10949432/" }]
          },
          {
            title: "Landscape of epithelial-mesenchymal plasticity as an emergent property of coordinated teams in regulatory networks",
            url: "https://elifesciences.org/articles/76535",
            authors: "Hari K, Ullanat V, <strong>Balasubramanian A</strong>, Gopalan A, Jolly MK",
            venue: "eLife 11, e76535",
            description: "Cells can shift between epithelial and mesenchymal identities as they respond to developmental and environmental signals. This plasticity is essential for normal processes such as tissue repair, yet in cancer it can support invasion, metastasis and treatment resistance. The central question was why regulatory networks containing dozens of interacting genes repeatedly produce only a small number of stable cell states.\n\nAcross five epithelial-mesenchymal plasticity networks, the analysis represented genes and microRNAs as nodes connected by directed activating or inhibitory interactions. Boolean models identified the stable states permitted by each network, while Random Circuit Perturbation (RACIPE) simulations tested thousands of possible interaction strengths to determine which states consistently emerged. Repeating the analysis after rewiring the networks separated behavior encoded by their biological organization from behavior that could arise by chance.\n\nThe networks consistently organized into two coordinated teams: epithelial regulators supported one another, mesenchymal regulators did the same and each team opposed the other. This creates a molecular tug-of-war that draws cells toward stable epithelial or mesenchymal identities while allowing less stable hybrid states to emerge between them. The strength of this team structure predicted how stable each state would be, showing that network wiring already contains information about the cell behaviors it can produce. This framework provides an intuitive way to study cancer cell plasticity and prioritize regulatory relationships for experimental testing.",
            visualization: "emp-network",
            type: "Article", date: "2022",
            links: [{ label: "DOI", url: "https://doi.org/10.7554/eLife.76535" }, { label: "Full text", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9683792/" }]
          },
          {
            title: "Bioinformatics approach used in undergraduate research to predict siRNA as ZIKV therapeutics",
            url: "https://iubmb.onlinelibrary.wiley.com/doi/10.1002/bmb.21605",
            authors: "<strong>Balasubramanian A</strong>, Chatterjee J",
            venue: "Biochemistry and Molecular Biology Education 50(2), 237-245",
            description: "Zika virus (ZIKV) can cause severe neurological complications including congenital abnormalities, yet no ZIKV-specific antiviral treatment was available when this work was developed. Small interfering RNAs (siRNAs) offer a targeted strategy: a short RNA sequence can be designed to recognize a complementary region of the viral genome and direct its silencing. The central challenge is identifying viral regions that are conserved enough to remain useful across strains while producing candidates with strong predicted specificity and activity.\n\nUsing a workflow built entirely from open-source databases, servers and bioinformatics tools, the analysis compared ZIKV sequences, identified conserved regions and designed candidate siRNAs against those targets. Sequence-based screening then reduced these candidates according to their predicted effectiveness and specificity. The workflow was documented step by step so that an undergraduate with limited prior bioinformatics experience could reproduce or adapt the analysis on a standard computer.\n\nThis work produced computational candidates rather than a validated treatment, but its value extends beyond the predictions themselves. It demonstrates how an authentic antiviral-design problem can be investigated without proprietary software or specialized infrastructure including in remote learning settings. The result is both a starting point for laboratory validation and a reusable framework for teaching how sequence analysis can move from a viral genome toward a testable therapeutic hypothesis.",
            visualization: "zikv-sirna",
            type: "Article", flag: "First author", date: "2022",
            links: [{ label: "DOI", url: "https://doi.org/10.1002/bmb.21605" }]
          },
          {
            title: "Investigating drug-target interactions in frontotemporal dementia using a network pharmacology approach",
            url: "https://link.springer.com/article/10.1186/s43088-021-00145-4",
            authors: "<strong>Balasubramanian A</strong>, Sudarshan R, Chatterjee J",
            venue: "Beni-Suef University Journal of Basic and Applied Sciences",
            description: "Frontotemporal dementia (FTD) is the second most common dementia in people younger than 65 and currently has no cure. Treatment therefore relies on combinations of drugs that manage behavioral and cognitive symptoms, but the same drugs can act on multiple genes and tissues or interact adversely with one another. A network view was needed to understand these relationships together rather than evaluating each drug and target in isolation.\n\nUsing 55 FTD-related drugs, 87 drug targets and seven disease-susceptibility genes, the analysis constructed protein–protein, drug–gene and drug–drug interaction networks and interpreted them alongside enriched pathways and tissue-specific activity. Network centrality measured which genes or drugs connected otherwise separate parts of the system, while historeceptomics linked drug targets to the tissues in which they are expressed. This made it possible to distinguish influential biological hubs from drugs whose many connections may also indicate a greater potential for off-target or combination effects.\n\nThe protein network contained 404 observed interactions compared with 55 expected by chance and identified APP as its most connected bridge between FTD-susceptibility genes and neuroactive receptors. Memantine and quetiapine emerged as major drug–gene hubs, while the drug–drug network highlighted highly connected medications that warrant particular attention when used in combination. These findings do not prescribe a treatment; they provide a structured basis for medication management, experimental follow-up and future precision-therapy studies that account for both disease biology and polypharmacy.",
            visualization: "ftd-network",
            type: "Article", flag: "First author", date: "2021",
            links: [{ label: "DOI", url: "https://doi.org/10.1186/s43088-021-00145-4" }]
          }
        ]
      },
      {
        heading: "Conference presentations",
        items: [
          {
            title: "An end-to-end wastewater pathogen surveillance data dashboard platform",
            url: "https://www.wastewateramr.com/",
            authors: "<strong>Balasubramanian A</strong>, Bhasin J, Yancey R, Jin M, Damerum A, Ullmer W, Goldstein J, Chen E, Booher K, Jia L",
            venue: "Microbes in Wastewater Symposium · Newport Beach, CA",
            description: "Wastewater can show how pathogens are changing across a community, but sequencing results only matter if public health teams can actually use them. I helped build an end-to-end platform that connects sample processing, pathogen and variant analysis, quality control and dashboard delivery, with results organized by treatment plant and time. Teams can quickly see what is increasing, compare sites and trace every signal back to the underlying data.",
            type: "Poster", flag: "First author", date: "January 2026",
            links: [{ label: "Conference", url: "https://www.wastewateramr.com/" }],
            image: "assets/pubs/wastewater-surveillance-poster-thumb.jpg", imageUrl: "assets/pubs/wastewater-surveillance-poster.jpg", imageAlt: "Archana presenting a wastewater pathogen surveillance poster", imageCaption: "Microbes in Wastewater, 2026"
          },
          {
            title: "A pangenome-enriched analysis of <em>Klebsiella pneumoniae</em>",
            authors: "<strong>Balasubramanian A</strong>, Chauhan S, Monk J · PI: Palsson BO",
            venue: "Research Expo, Jacobs School of Engineering, UC San Diego · La Jolla, CA",
            description: "<em>Klebsiella pneumoniae</em> is far too diverse to understand through a single reference genome. I analyzed more than 7,000 quality-controlled genomes and organized them into 26 population groups, then compared their resistance, virulence, capsule and surface-antigen profiles. The result was a clearer view of what the species shares, what makes each lineage different and where surveillance or experimental follow-up should focus next.",
            type: "Poster", flag: "First author", date: "2024",
            image: "assets/pubs/klebsiella-pangenome-poster-thumb.jpg", imageUrl: "assets/pubs/klebsiella-pangenome-poster.jpg", imageAlt: "Archana beside the Klebsiella pangenome poster", imageCaption: "Research Expo, 2024"
          },
          {
            title: "Targeted gene therapy against Zika virus: a bioinformatics approach",
            url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3529345",
            authors: "<strong>Balasubramanian A</strong>, Chatterjee J",
            venue: "International Conference on Drug Discovery (ICDD 2020) · Hyderabad, India",
            description: "For this undergraduate project, I used open-source bioinformatics tools to find conserved regions in the Zika virus genome and design small interfering RNA candidates against them. Computational screening narrowed the designs by predicted activity and specificity, producing a focused set of candidates for laboratory validation rather than claiming a finished therapy. It was my first real look at how sequence analysis can turn a viral genome into a testable therapeutic idea, and the work later became the peer-reviewed study above.",
            type: "Poster", flag: "First author", date: "February 2020",
            links: [{ label: "Abstract (SSRN)", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3529345" }],
            image: "assets/pubs/zika-sirna-poster-thumb.jpg", imageUrl: "assets/pubs/zika-sirna-poster.jpg", imageAlt: "Archana discussing a Zika siRNA poster", imageCaption: "ICDD, 2020"
          }
        ]
      }
    ]
  },

  skills: [
    { heading: "Languages", items: ["Python", "R", "SQL", "Bash"] },
    { heading: "Omics & genomics", items: ["Bulk RNA-seq", "Single-cell RNA-seq", "Spatial transcriptomics", "DNA methylation · RRBS, WGBS, cfWGBS", "Proteomics", "Pangenomics & pathogen genomics"] },
    { heading: "Workflows & data products", items: ["Nextflow", "Shiny", "ShinyProxy", "Interactive visualization", "DuckDB", "SQLite"] },
    { heading: "Infrastructure", items: ["Docker", "AWS", "Ansible", "Linux", "Git"] }
  ],

  bestReads: {
    note: "Ideas shaping how I build, communicate and scale scientific data products",
    categories: [
      {
        name: "Product Thinking, BI & Communication",
        description: "How to turn analysis into a focused story, a useful dashboard and a decision people can act on.",
        items: [
          { title: "How to Give a Bad Talk", url: "https://www.nature.com/articles/s41568-026-00954-8" },
          { title: "Building Dashboards Like a Product", url: "https://medium.com/qonto-way/building-dashboards-like-a-product-lessons-from-design-growth-and-product-management-17b90113a39b" },
          { title: "Nobody Wants a Dashboard — They Want a Story", url: "https://medium.com/design-bootcamp/nobody-wants-a-dashboard-they-want-a-story-728be510f7c2" },
          { title: "Dashboards Aren’t Dead — They Aren’t Even Sick", url: "https://marktossell.com/2026/06/12/dashboards-arent-dead-they-arent-even-sick/" }
        ]
      },
      {
        name: "Data Engineering & Architecture",
        description: "Practical choices for structuring data, scaling analysis and building maintainable scientific applications.",
        items: [
          { title: "Why Data Architecture Is More Important Than the Data Itself", url: "https://www.forbes.com/councils/forbescommunicationscouncil/2022/04/13/why-your-companys-data-architecture-is-more-important-than-the-data-itself/" },
          { title: "Scaling bsseq with HDF5-Backed Data", url: "https://support.bioconductor.org/p/96658/" },
          { title: "Shiny for Python vs Streamlit", url: "https://shiny.posit.co/py/docs/comp-streamlit.html" }
        ]
      }
    ]
  },

  contact: {
    closingLine: "Building something in bio? Let’s talk!",
    lead: "If you are exploring a new idea in biology, data or health, or if something in my work made you curious, reach out. I would love to hear what you are working on, trade ideas and build something useful at the frontier together!"
  }
};
