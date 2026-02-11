/**
 * Test script to validate Knowledge Base API locally
 * Run with: node test-knowledge-api.js
 */

import fs from 'fs';
import path from 'path';

const KNOWLEDGE_BASE_PATH = 'C:\\Diretrizes_TikTok';

// List of all 32 files
const FILES = {
    community: [
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
    ],
    support: [
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
    ],
    shop: [
        'TikTok_Shop_Criador/01_Visao_Geral_Shop.md',
        'TikTok_Shop_Criador/02_Inscricao_Afiliado.md',
        'TikTok_Shop_Criador/03_Aumentar_Vendas.md',
        'TikTok_Shop_Criador/04_Gestao_Produtos_Conteudo.md',
        'TikTok_Shop_Criador/05_Regras_Politicas.md',
        'TikTok_Shop_Criador/06_Termos_Vendedor_Logistica_Pagamento.md',
        'TikTok_Shop_Criador/07_Termos_Criador_Vinculacao_Marcas.md',
        'TikTok_Shop_Criador/08_Termos_Uso_Venda_Shop.md',
        'TikTok_Shop_Criador/09_Desafios_e_Campanhas.md'
    ]
};

console.log('🔍 Testing Knowledge Base File Access...\n');

let successCount = 0;
let failCount = 0;
const errors = [];

// Test all files
Object.entries(FILES).forEach(([category, files]) => {
    console.log(`\n📁 Category: ${category.toUpperCase()}`);

    files.forEach(file => {
        const filePath = path.join(KNOWLEDGE_BASE_PATH, file);

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const titleMatch = content.match(/^#\s+(.+)/m);
            const title = titleMatch ? titleMatch[1].trim() : file;
            const sizeKB = (content.length / 1024).toFixed(2);

            console.log(`  ✅ ${file} (${sizeKB} KB) - "${title}"`);
            successCount++;
        } catch (error) {
            console.log(`  ❌ ${file} - ERROR: ${error.message}`);
            failCount++;
            errors.push({ file, error: error.message });
        }
    });
});

// Summary
console.log('\n' + '='.repeat(60));
console.log(`📊 SUMMARY:`);
console.log(`  ✅ Success: ${successCount}/32 files`);
console.log(`  ❌ Failed: ${failCount}/32 files`);

if (failCount > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(({ file, error }) => {
        console.log(`  - ${file}: ${error}`);
    });
    process.exit(1);
} else {
    console.log('\n✅ All 32 knowledge base files are accessible!');
    console.log('✅ Knowledge Base API is ready for integration.');
    process.exit(0);
}
