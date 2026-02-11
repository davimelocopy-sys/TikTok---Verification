/**
 * Orchestrator Service
 * Implements the central routing logic per orchestrator/SKILL.md
 */

import { GuidelineFile, searchKnowledge } from './knowledgeBaseLoader';

export interface OrchestrationRequest {
    userQuery: string;
    contentType?: 'video' | 'script' | 'product' | 'question';
    contentData?: {
        videoUrl?: string;
        scriptText?: string;
        productId?: string;
    };
}

export interface OrchestrationResponse {
    assignedAgents: Array<'guardian' | 'merchant' | 'support' | 'creative'>;
    consolidatedResponse: string;
    citations: Array<{
        filename: string;
        section: string;
        relevance: number;
    }>;
    confidence: number;
}

type AgentType = 'guardian' | 'merchant' | 'support' | 'creative';

/**
 * Detect which agents should handle the request
 * Per orchestrator/SKILL.md intent detection rules
 */
export function detectIntent(query: string): AgentType[] {
    const queryLower = query.toLowerCase();
    const agents: Set<AgentType> = new Set();

    // Guardian triggers
    const guardianKeywords = ['violação', 'proibido', 'banimento', 'diretriz', 'compliance', 'regra', 'permitido', 'pode', 'posso', 'política'];
    if (guardianKeywords.some(kw => queryLower.includes(kw))) {
        agents.add('guardian');
    }

    // Merchant triggers
    const merchantKeywords = ['venda', 'comissão', 'gmv', 'shop', 'produto', 'afiliado', 'logística', 'pagar', 'ganho'];
    if (merchantKeywords.some(kw => queryLower.includes(kw))) {
        agents.add('merchant');
    }

    // Support triggers
    const supportKeywords = ['conta bloqueada', 'recurso', 'appeal', 'suspensão', 'erro', 'bug', 'recuperar', 'ajuda'];
    if (supportKeywords.some(kw => queryLower.includes(kw))) {
        agents.add('support');
    }

    // Creative triggers
    const creativeKeywords = ['roteiro', 'ideia', 'script', 'estratégia', 'engajamento', 'viral', 'conteúdo', 'melhorar'];
    if (creativeKeywords.some(kw => queryLower.includes(kw))) {
        agents.add('creative');
    }

    // Default to Guardian if no match (safety first per orchestrator/SKILL.md)
    if (agents.size === 0) {
        agents.add('guardian');
    }

    return Array.from(agents);
}

/**
 * Route request to appropriate agents and consolidate responses
 */
export async function orchestrateRequest(
    request: OrchestrationRequest,
    knowledgeBase: GuidelineFile[]
): Promise<OrchestrationResponse> {
    const agents = detectIntent(request.userQuery);

    // Search knowledge base for relevant content
    const relevantDocs = searchKnowledge(knowledgeBase, request.userQuery, 3);

    // Build consolidated response
    let response = '';
    const citations: Array<{ filename: string; section: string; relevance: number }> = [];

    for (const agent of agents) {
        const agentResponse = await invokeAgent(agent, request, relevantDocs);
        response += agentResponse.text + '\n\n';
        citations.push(...agentResponse.citations);
    }

    return {
        assignedAgents: agents,
        consolidatedResponse: response.trim(),
        citations,
        confidence: calculateConfidence(relevantDocs)
    };
}

/**
 * Invoke specific agent
 */
async function invokeAgent(
    agent: AgentType,
    request: OrchestrationRequest,
    relevantDocs: Array<{ file: GuidelineFile; relevance: number; excerpt: string }>
): Promise<{ text: string; citations: Array<{ filename: string; section: string; relevance: number }> }> {

    // Build context from relevant documents
    const context = relevantDocs.map(doc => `
[From: ${doc.file.filename}]
${doc.excerpt}
  `).join('\n\n');

    // Prepare citations
    const citations = relevantDocs.map(doc => ({
        filename: doc.file.filename,
        section: doc.excerpt.substring(0, 50) + '...',
        relevance: doc.relevance
    }));

    // TODO: Call Gemini API with agent-specific prompt
    // For now, return placeholder
    const agentPrompts = {
        guardian: `You are the Guardian Agent. Analyze for compliance violations using this context:\n${context}\n\nQuery: ${request.userQuery}`,
        merchant: `You are the Merchant Agent. Analyze for shop/sales issues using this context:\n${context}\n\nQuery: ${request.userQuery}`,
        support: `You are the Support Agent. Help with account issues using this context:\n${context}\n\nQuery: ${request.userQuery}`,
        creative: `You are the Creative Agent. Provide content strategy using this context:\n${context}\n\nQuery: ${request.userQuery}`
    };

    // Log prompts for debugging (silences unused var warning)
    console.debug('Agent Prompts:', agentPrompts);

    return {
        text: `[${agent.toUpperCase()} Agent Response - Implementation pending]`,
        citations
    };
}

function calculateConfidence(docs: Array<{ relevance: number }>): number {
    if (docs.length === 0) return 0;
    const avgRelevance = docs.reduce((sum, d) => sum + d.relevance, 0) / docs.length;
    return Math.min(100, avgRelevance / 10); // Normalize to 0-100
}
