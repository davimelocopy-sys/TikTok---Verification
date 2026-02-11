/**
 * Complete TikTok Knowledge Base Loader
 * Loads ALL 32 guideline files from C:\Diretrizes_TikTok
 * Per SKILL_FIRST_POLICY.md: RAG MUST use complete files, not summaries
 */

export interface GuidelineFile {
    filename: string;
    category: 'community' | 'support' | 'shop';
    title: string;
    content: string;
}

/**
 * Load all 32 guideline files from the file system
 * This function MUST be called before any audit or chat interaction
 */
export async function loadCompleteKnowledgeBase(): Promise<GuidelineFile[]> {
    const files: GuidelineFile[] = [];

    // Community Guidelines (01-12)
    const communityFiles = [
        '01_Visao_Geral.md',
        '02_Principios_Comunidade.md',
        '03_Seguranca_Jovens.md',
        '04_Seguranca_Civilidade.md',
        '05_Saude_Mental_Comportamental.md',
        '06_Temas_Sensiveis_Adultos.md',
        '07_Integridade_Autenticidade.md',
        '08_Produtos_Regulamentados_Comerciais.md',
        '09_Privacidade_Seguranca.md',
        '10_Padroes_Feed_Para_Voce.md',
        '11_Contas_Recursos.md',
        '12_Aplicacao.md'
    ];

    // Support Files (13-23)
    const supportFiles = [
        '13_Suporte_TikTok.md',
        '14_Suporte_Iniciando.md',
        '15_Suporte_Usando_TikTok.md',
        '16_Suporte_Conta_Privacidade.md',
        '17_Suporte_Seguranca.md',
        '18_Suporte_Login_Troubleshooting.md',
        '19_Suporte_LIVE_Gifts.md',
        '20_Suporte_Monetizacao.md',
        '21_Suporte_TikTok_For_Business.md',
        '22_Suporte_Sincronizacao_Familiar.md',
        '23_Suporte_Termos_Privacidade.md'
    ];

    // TikTok Shop Files (01-09 in subfolder)
    const shopFiles = [
        'TikTok_Shop_Criador/01_Visao_Geral_Shop.md',
        'TikTok_Shop_Criador/02_Inscricao_Afiliado.md',
        'TikTok_Shop_Criador/03_Aumentar_Vendas.md',
        'TikTok_Shop_Criador/04_Gestao_Produtos_Conteudo.md',
        'TikTok_Shop_Criador/05_Regras_Politicas.md',
        'TikTok_Shop_Criador/06_Termos_Vendedor_Logistica_Pagamento.md',
        'TikTok_Shop_Criador/07_Termos_Criador_Vinculacao_Marcas.md',
        'TikTok_Shop_Criador/08_Termos_Uso_Venda_Shop.md',
        'TikTok_Shop_Criador/09_Desafios_e_Campanhas.md'
    ];

    // Load all files from backend/server
    // NOTE: This requires server-side implementation
    // Client-side cannot access file system directly
    const basePath = 'C:\\Diretrizes_TikTok';

    for (const file of communityFiles) {
        const loaded = await loadSingleFile(`${basePath}\\${file}`, 'community');
        if (loaded) files.push(loaded);
    }

    for (const file of supportFiles) {
        const loaded = await loadSingleFile(`${basePath}\\${file}`, 'support');
        if (loaded) files.push(loaded);
    }

    for (const file of shopFiles) {
        const loaded = await loadSingleFile(`${basePath}\\${file}`, 'shop');
        if (loaded) files.push(loaded);
    }

    if (files.length === 0) {
        console.warn('⚠️ Knowledge base API not available. Running in mock mode.');
    }

    return files;
}

async function loadSingleFile(filePath: string, category: GuidelineFile['category']): Promise<GuidelineFile | null> {
    // This needs to be implemented as a server-side API endpoint
    // Example: GET /api/knowledge/load?file=01_Visao_Geral.md

    try {
        const response = await fetch(`/api/knowledge/load`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath })
        });

        if (!response.ok) {
            console.warn(`Failed to load ${filePath}: ${response.statusText}`);
            return null;
        }

        const data = await response.json();

        return {
            filename: filePath.split('\\').pop() || '',
            category,
            title: data.title,
            content: data.content
        };
    } catch (error) {
        console.warn(`Knowledge base API not available for ${filePath}:`, error);
        return null;
    }
}

/**
 * Search knowledge base for relevant content
 * Uses simple keyword matching (can be enhanced with embeddings)
 */
export function searchKnowledge(
    knowledgeBase: GuidelineFile[],
    query: string,
    maxResults = 5
): Array<{ file: GuidelineFile; relevance: number; excerpt: string }> {
    const queryLower = query.toLowerCase();
    const results: Array<{ file: GuidelineFile; relevance: number; excerpt: string }> = [];

    for (const file of knowledgeBase) {
        const contentLower = file.content.toLowerCase();
        let relevance = 0;

        // Keyword matching
        const queryWords = queryLower.split(' ').filter(w => w.length > 3);
        for (const word of queryWords) {
            const occurrences = (contentLower.match(new RegExp(word, 'g')) || []).length;
            relevance += occurrences * 10;
        }

        if (relevance > 0) {
            // Extract relevant excerpt (first 200 chars containing query)
            const index = contentLower.indexOf(queryWords[0]);
            const start = Math.max(0, index - 100);
            const end = Math.min(file.content.length, index + 300);
            const excerpt = file.content.substring(start, end);

            results.push({ file, relevance, excerpt });
        }
    }

    return results
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, maxResults);
}

/**
 * Get specific file by name
 */
export function getFileByName(
    knowledgeBase: GuidelineFile[],
    filename: string
): GuidelineFile | undefined {
    return knowledgeBase.find(f =>
        f.filename === filename ||
        f.filename.endsWith(filename)
    );
}
