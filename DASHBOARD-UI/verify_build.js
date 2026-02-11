import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const REDIRECTS_FILE = path.join(DIST_DIR, '_redirects');
const INDEX_FILE = path.join(DIST_DIR, 'index.html');

console.log('🚀 Iniciando Verificação Pré-Deploy...\n');

// Passo 1: Executar Build
console.log('📦 Executando npm run build...');
exec('npm run build', { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Erro no Build: ${error.message}`);
        console.error(stderr);
        process.exit(1);
    }
    console.log('✅ Build concluído com sucesso!');

    // Passo 2: Verificar index.html
    if (fs.existsSync(INDEX_FILE)) {
        console.log('✅ dist/index.html encontrado.');
    } else {
        console.error('❌ ERRO CRÍTICO: dist/index.html não encontrado!');
        process.exit(1);
    }

    // Passo 3: Verificar _redirects
    if (fs.existsSync(REDIRECTS_FILE)) {
        console.log('✅ dist/_redirects encontrado.');

        const content = fs.readFileSync(REDIRECTS_FILE, 'utf-8');
        if (content.includes('/*  /index.html  200')) {
            console.log('✅ Conteúdo do _redirects está correto (SPA Routing).');
        } else {
            console.warn('⚠️ AVISO: Conteúdo do _redirects pode estar incorreto:');
            console.log(content);
        }

    } else {
        console.error('❌ ERRO CRÍTICO: dist/_redirects não encontrado! O deploy na Netlify vai falhar (Erro 404).');
        console.error('   Certifique-se de que public/_redirects existe no código fonte.');
        process.exit(1);
    }

    console.log('\n🎉 SUCESSO! O build parece pronto para deploy na Netlify.');
});
