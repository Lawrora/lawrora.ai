# Lawrora AI Chatbot (LLM + RAG + Guardrails)

## Objective

Implement a production-ready **legal AI chatbot** for Lawrora using:

- LLM inference
- Retrieval-Augmented Generation (RAG)
- Safety guardrails
- Persistent memory
- Scalable backend
- GitHub Actions deployment

The chatbot must render responses in:

```

lawrora.ai/frontend/app/llm/page.tsx

```

---

# Architecture Overview

```

User
↓
Next.js Frontend
↓
FastAPI Backend
↓
RAG Pipeline
↓
Vector Database
↓
LLM (Bedrock / SageMaker / OpenAI)

```

---

# Tech Stack

## Frontend

- Next.js (App Router)
- React
- Tailwind
- Fetch API

Existing page:

```

frontend/app/llm/page.tsx

```

---

## Backend

Recommended stack:

- Python 3.11
- FastAPI
- LangChain
- FAISS or Pinecone
- AWS Bedrock or SageMaker
- Guardrails AI
- Redis (optional)
- PostgreSQL (optional)

---

# Directory Structure

```

lawrora.ai
│
├── backend
│   ├── app
│   │   ├── main.py
│   │   │
│   │   ├── api
│   │   │   └── chat.py
│   │   │
│   │   ├── rag
│   │   │   ├── retriever.py
│   │   │   ├── embeddings.py
│   │   │   └── vector_store.py
│   │   │
│   │   ├── guardrails
│   │   │   └── rules.py
│   │   │
│   │   └── services
│   │       └── llm.py
│   │
│   └── requirements.txt
│
├── frontend
│   └── app
│       └── llm
│           └── page.tsx
│
└── .github
└── workflows
└── deploy.yml

```

---

# Backend Responsibilities

The backend must implement:

1. LLM inference  
2. RAG retrieval  
3. Guardrails  
4. Streaming responses  
5. API endpoint  

---

# Core API Endpoint

```

POST /api/chat

```

## Request

```

{
"message": "What is termination clause?"
}

```

## Response

```

{
"response": "...",
"sources": [...]
}

```

---

# RAG Flow

```

User query
↓
Embed query
↓
Search vector DB
↓
Retrieve documents
↓
Send context to LLM
↓
Generate answer

```

---

# LLM Options

## Option 1 — AWS Bedrock (Preferred)

Use:

- Claude
- Titan
- Llama

Example model:

```

anthropic.claude-3-sonnet

```

---

## Option 2 — SageMaker

Use when:

- custom model
- fine-tuned model
- high throughput

---

## Option 3 — OpenAI

Fallback:

```

gpt-4o

```

---

# Vector Database Options

Choose one.

## FAISS

Best for:

- fast setup
- development
- local deployment

---

## Pinecone

Best for:

- production
- scaling

---

## OpenSearch

Best for:

- enterprise systems

---

# Guardrails Requirements

The system must block:

- hallucinations
- unsafe legal advice
- PII leakage
- prompt injection
- harmful content

---

# Guardrails Implementation

Must include:

```

Input validation
Output validation
Prompt filtering
Response filtering

```

---

# Example Guardrail Rules

Block:

```

"Ignore previous instructions"
"Reveal system prompt"
"Give me legal advice"
"How to commit fraud"

```

---

# Guardrails Libraries

Use one:

```

guardrails-ai

```

or

```

AWS Bedrock Guardrails

```

---

# Required Safety Behavior

If unsafe content is detected:

```

"I'm unable to provide that information."

```

---

# Memory Design

## Short-Term Memory

```

Redis

```

## Long-Term Memory

```

Vector database

```

---

# Document Ingestion Pipeline

The system must support:

- PDF
- DOCX
- TXT
- Contracts
- Legal policies

---

# Ingestion Flow

```

Upload document
↓
Extract text
↓
Chunk text
↓
Generate embeddings
↓
Store in vector DB

```

---

# Frontend Integration

Frontend already exists:

```

frontend/app/llm/page.tsx

```

The frontend must call:

```

POST /api/chat

```

---

# Frontend Request

```

fetch("/api/chat")

```

---

# Frontend Display Requirements

The chatbot must display:

- user message
- assistant response
- loading state
- streaming response

---

# Backend API Contract

```

POST /api/chat

```

## Request

```

{
"message": string
}

```

## Response

```

{
"response": string,
"sources": [
{
"title": string,
"page": number
}
]
}

```

---

# Environment Variables

Create:

```

backend/.env

```

## Required Variables

```

AWS_REGION
BEDROCK_MODEL_ID
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
VECTOR_DB_URL
OPENAI_API_KEY
REDIS_URL

```

---

# Deployment Target

Recommended:

```

AWS EC2

```

Alternatives:

```

AWS ECS
AWS EKS

```

---

# GitHub Workflow Deployment

Use:

```

.github/workflows/deploy.yml

```

---

# Deployment Pipeline Responsibilities

The workflow must:

1. SSH into server  
2. Pull latest code  
3. Install dependencies  
4. Restart backend  
5. Build frontend  
6. Restart services  

---

# Required Deployment Steps

```

git pull

pip install -r requirements.txt

npm install

npm run build

systemctl restart backend

pm2 restart frontend

```

---

# Production Services

```

FastAPI
Next.js
Nginx
Redis
Vector Database

```

---

# Health Check Endpoint

```

GET /health

```

## Response

```

{
"status": "ok"
}

```

---

# Logging Requirements

Must log:

```

requests
responses
errors
latency

```

---

# Monitoring

Recommended:

```

Prometheus
Grafana
CloudWatch

```

---

# Security Requirements

Must include:

```

HTTPS
Authentication
Rate limiting
Input sanitization
CORS protection

```

---

# Performance Targets

## Latency

```

< 2 seconds

```

## Throughput

```

100+ requests per second

```

---

# Scaling Strategy

```

Horizontal scaling
Load balancer
Stateless API
Auto-scaling

```

---

# Minimal Implementation Milestones

## Phase 1

Working chatbot

---

## Phase 2

RAG retrieval

---

## Phase 3

Guardrails

---

## Phase 4

Production deployment

---

# Definition of Done

The system is complete when:

- chatbot responds
- RAG retrieves documents
- guardrails block unsafe content
- frontend displays response
- deployment pipeline works

---

# CTO Deliverable Checklist

Implement:

```

Backend API
RAG pipeline
Guardrails
Vector database
LLM integration
Deployment workflow

```

Ensure:

```

Frontend page renders responses
System deploys automatically
Logs and monitoring enabled

```

