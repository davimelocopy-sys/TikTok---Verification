---
name: TikTok Orchestrator
description: Central orchestrator that routes user queries to specialist agents and consolidates responses with RAG citations
---

# TikTok Intelligence Orchestrator

## Purpose
This skill implements the central orchestration logic that manages the 4 specialist agents (Guardian, Merchant, Support, Creative) and provides intelligent routing based on user intent.

## Architecture (per gemini.md)

### Agent Roster
1. **Guardian Agent**: Compliance/Community Guidelines violations
2. **Merchant Agent**: TikTok Shop sales, commissions, product policies
3. **Support Agent**: Account issues, appeals, bans, recovery
4. **Creative Agent**: Content strategy, optimization, creative feedback

### Orchestration Logic

#### 1. Intent Detection
Analyze user input to determine which agent(s) should respond:

**Guardian** triggers:
- Keywords: "violação", "proibido", "banimento", "diretriz", "compliance", "regra"
- Questions about what's allowed/forbidden
- Content audits (video/script analysis)

**Merchant** triggers:
- Keywords: "venda", "comissão", "GMV", "shop", "produto", "afiliado", "logística"
- Questions about sales performance, shipping, payments

**Support** triggers:
- Keywords: "conta bloqueada", "recurso", "appeal", "suspensão", "erro", "bug"
- Technical issues, account recovery

**Creative** triggers:
- Keywords: "roteiro", "ideia", "script", "estratégia", "engajamento", "viral"
- Content optimization requests

#### 2. RAG Protocol (MANDATORY per SKILL_FIRST_POLICY)
Every response MUST:
1. Load ALL 32 files from `C:\Diretrizes_TikTok`
2. Perform semantic search on relevant files
3. Extract exact text passages
4. Cite source files in format: `[Ref: 04_Seguranca_Civilidade.md]`

#### 3. Response Consolidation
- Single agent: Return agent response directly
- Multiple agents: Merge responses with clear section headers
- Always include citations from the knowledge base

## Implementation Requirements

### Input Schema
```typescript
interface OrchestrationRequest {
  userQuery: string;
  contentType?: 'video' | 'script' | 'product' | 'question';
  contentData?: {
    videoUrl?: string;
    scriptText?: string;
    productId?: string;
  };
}
```

### Output Schema
```typescript
interface OrchestrationResponse {
  assignedAgents: Array<'guardian' | 'merchant' | 'support' | 'creative'>;
  consolidatedResponse: string;
  citations: Array<{
    filename: string;
    section: string;
    relevance: number;
  }>;
  confidence: number;
}
```

## Knowledge Base Access
The orchestrator MUST have access to the complete knowledge base:
- All 23 main guideline files (01-23)
- All 9 TikTok Shop files
- Full text search capability
- Vector embeddings for semantic search (future)

## Error Handling
- If no agent matches: Default to Guardian for safety
- If knowledge base unavailable: Return error, do NOT hallucinate
- If multiple interpretations: Ask clarifying question

## Testing Criteria
1. ✅ Correctly routes 95%+ of test queries to appropriate agents
2. ✅ All responses include at least one valid citation
3. ✅ Zero hallucinations (verifiable against source files)
4. ✅ Response time < 3s for text queries, < 10s for video analysis
