<br>

# Description

This project implements a Retrieval-Augmented Generation (RAG) pipeline for mixed code and documentation datasets.
It ingests a corpus, segments it into chunks, builds lexical and optional semantic indices, retrieves the most relevant chunks for a query, and optionally generates concise answers using a local LLM server.



<br>

# System Architecture

1. **Chunking**: Reads files from the knowledge folder, splits them into overlapping chunks, and stores chunk metadata (file path and character offsets).
2. **Indexing**: Builds a BM25 index over enriched chunk text. For documentation-only datasets, it also builds a Chroma vector collection.
3. **Retrieval**: Uses BM25 for lexical retrieval. Optional flag add hybrid retrieval with Chroma semantic results and a query expansion with spacy, then fuses rankings with a weighted reciprocal-rank scheme.
4. **Answering**: Formats retrieved chunks as context and queries a Qwen3-0.6B via DSPy.
5. **Evaluation**: Computes recall@k against labeled questions/answers.



<br>

# Tech Stack

|   |   |
|---|---|
| **Language** | Python 3.10+ |
| **Chunking** | LangChain `RecursiveCharacterTextSplitter` |
| **Lexical retrieval** | BM25 |
| **Semantic retrieval** | ChromaDB |
| **Query expansion** | spaCy (`en_core_web_lg`) |
| **LLM orchestration**| DSPy |
| **Model** | Qwen3-0.6B |
| **Tooling** | uv and Makefile |



<br>

# Key Technical Choices

<br>

### Type-aware chunking
Python, Markdown and plain-text files are split with dedicated splitters, with a **20% overlap**. This keeps functions, headings and paragraphs intact instead of cutting them at arbitrary positions. Every chunk keeps its file path and character offsets, so each result can be traced back to its exact location in the source.

### BM25 first, semantic search as an option
BM25 is fast, deterministic and reproducible, and it works very well on code, where exact identifiers matter. Semantic search (Chroma) is only enabled for documentation, where meaning matters more than exact keywords.

### Hybrid retrieval with rank fusion


|||
|---|---|
| BM25 | 1.15 |
| Chroma (semantic) | 0.85 |
| Expanded query BM25 | 1.10 |

### Modular answering layer
DSPy separates the prompt logic from the model, so the LLM can be swapped without rewriting the pipeline.

### Incremental outputs
Dataset-level searches write their results progressively to JSON, which reduces memory usage and makes long runs safe to interrupt and resume.



<br>

# Results

Evaluated with **recall@k** on the `public` dataset, with a chunk size of 1400.


| Configuration | R@1 | R@3 | R@5 | R@10 |
|---|---|---|---|---|
| BM25 | 0.70 | 0.87 | 0.94 | 0.96 |
|  `--expand` | 0.72 | 0.89 | 0.94 | 0.96 |
|  `--hybrid` | 0.66 | 0.87 | 0.93 | 0.96 |
|  `--expand --hybrid` | 0.74 | 0.88 | 0.94 | 0.96 |

### What I learned from the numbers
- Query expansion consistently improves recall, on both docs and code (up to +6 points at R@10 on code).
- Hybrid search alone slightly lowers R@1 on docs, but combined with query expansion it gives the best top-1 score. Combining retrievers is not automatically better: it needs tuning.
- Recall depends heavily on the **indexing mode**: an index built only on docs performs much better on docs questions (R@5 of 0.94) than a mixed index (0.80). A smaller, more focused corpus reduces noise.



<br>

# Skills Developed


<br>

### Information Retrieval & NLP
- Designing a full retrieval pipeline: chunking, indexing, ranking, fusion
- Understanding the strengths and limits of lexical (BM25) vs semantic (embeddings) search
- Query expansion and its impact on recall
- Evaluating a retrieval system with recall@k and interpreting the results

### LLM Engineering
- Building a Retrieval-Augmented Generation flow from scratch
- Structuring LLM calls with DSPy instead of hand-written prompts
- Deploying and querying a local LLM server (vLLM, Ollama-compatible API)
- Working within the constraints of small models and CPU-only inference

### Software Engineering
- Clean, modular architecture with a CLI (`index`, `search`, `answer`, `search_dataset`, `answer_dataset`, `evaluate`)
- Modern Python tooling with `uv` and a Makefile
- Performance work: caching, incremental I/O, memory management

### Methodology
- Iterating from measurements rather than intuition (benchmark, change one thing, compare)
- Making and documenting trade-offs between speed, quality and simplicity
- Reading documentation and research articles to make technical decisions


<br>

# Links

- [**Repository**](https://github.com/Arcanovax/RAG)

