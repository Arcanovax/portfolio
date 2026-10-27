# Description

VibeScan is a command-line tool that analyzes source code to estimate whether it was written by a human or generated with the help of AI.
It scans a project, evaluates each file, and produces an interactive HTML report that displays an AI-likelihood score for every file in the project tree.

<img src="/assets/VibeScan/demo.png" style="display: block; width: 100%; height: 100%;" />

<br>

# System Architecture

1. **Scanning**: Walks through the target directory and collects Python (`.py`), C (`.c`) and Rust (`.rs`) files.
2. **Questioning**: For each file, the Jev model (by TypeSafe) answers a list of questions about syntactic structure, naming conventions, comments and code patterns.
3. **Scoring**: A second pass grades each file from those answers and produces an AI-likelihood score.
4. **Reporting**: Generates a standalone HTML report showing the scores for every file in the file tree.



<br>

# Tech Stack

|   |   |
|---|---|
| **Language** | Python 3.10+ |
| **Analysis engine** | Jev (TypeSafe API) |
| **Output** | Static HTML report |
| **Languages analyzed** | Python, C, Rust |
| **Tooling** | uv, `.env` configuration |



<br>

# Key Technical Choices

### Two-step analysis: questions first, grade second
Rather than asking a model for a single "AI or human?" verdict, the analysis is split in two. Jev first answers a list of precise questions per file, then grades the file from those answers. This makes the score more explainable and less dependent on a single prompt. [add: how many questions, which categories]

### Multi-language support
The same pipeline handles Python, C and Rust, so a mixed-language repository can be scanned in one run. [add: any language-specific handling]

### A readable, shareable report
Scores are shown directly in the file tree of an HTML report, so a reviewer can spot suspicious files at a glance. A live demo is available on a sample project containing AI-generated code.

### Honest about its limits
VibeScan is explicitly presented as an estimator, not proof of authorship: false positives and false negatives are possible, and the disclaimer is part of the README.


<br>

# Skills Developed

### Applied AI
- Integrating an external AI API into a real tool
- Designing a multi-step analysis pipeline instead of a single prompt
- Interpreting and communicating uncertain model outputs responsibly
- Discover the Jev model, which was released recently

### Software Engineering
- CLI design with a configurable target directory (`--code`)
- Modern Python tooling with `uv`
- Secure configuration of API keys with a `.env` file
- Generating a clean, self-contained HTML report

### Methodology
- Documenting limitations and ethical considerations upfront
- Testing with a sample project that mixes human and AI-generated code


<br>

# Links

- [**Repository**](https://github.com/Arcanovax/VibeScan)
- [**Live demo**](https://matisse-dev.me/VibeScanDemo)
