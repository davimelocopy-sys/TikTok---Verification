/**
 * Test Orchestrator Intent Detection (Standalone)
 * Validates intent detection logic without TypeScript dependencies
 */

console.log('🧠 Testing Orchestrator Intent Detection...\n');

// Copy of detectIntent logic from orchestratorService.ts
function detectIntent(query) {
    const queryLower = query.toLowerCase();
    const agents = new Set();

    // Guardian triggers
    const guardianKeywords = ['violação', 'proibido', 'banimento', 'diretriz', 'compliance', 'regra', 'permitido', 'pode', 'política'];
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

    // Default to Guardian if no match (safety first)
    if (agents.size === 0) {
        agents.add('guardian');
    }

    return Array.from(agents);
}

const testCases = [
    {
        query: 'Posso mostrar um produto de suplemento no meu vídeo?',
        expected: ['guardian', 'merchant']
    },
    {
        query: 'Como aumentar minhas vendas no TikTok Shop?',
        expected: ['merchant']
    },
    {
        query: 'Minha conta foi bloqueada, como recuperar?',
        expected: ['support']
    },
    {
        query: 'Como melhorar meu roteiro para ter mais engajamento?',
        expected: ['creative']
    },
    {
        query: 'Esse desafio pode violar as diretrizes?',
        expected: ['guardian']
    },
    {
        query: 'Quanto vou ganhar de comissão nessa venda?',
        expected: ['merchant']
    },
    {
        query: 'Preciso de ajuda com um erro no app',
        expected: ['support']
    },
    {
        query: 'Quero criar conteúdo viral mas dentro das regras',
        expected: ['creative', 'guardian']
    }
];

let passCount = 0;
let failCount = 0;

testCases.forEach(({ query, expected }, index) => {
    console.log(`\n📝 Test ${index + 1}: "${query}"`);

    const detected = detectIntent(query);
    const detectedSet = new Set(detected);
    const expectedSet = new Set(expected);

    // Check if all expected agents are detected
    const allExpectedDetected = expected.every(agent => detectedSet.has(agent));

    if (allExpectedDetected) {
        console.log(`  ✅ PASS - Detected: [${detected.join(', ')}]`);
        passCount++;
    } else {
        console.log(`  ❌ FAIL - Expected: [${expected.join(', ')}], Got: [${detected.join(', ')}]`);
        failCount++;
    }
});

console.log('\n' + '='.repeat(60));
console.log(`📊 ORCHESTRATOR TEST SUMMARY:`);
console.log(`  ✅ Passed: ${passCount}/${testCases.length}`);
console.log(`  ❌ Failed: ${failCount}/${testCases.length}`);

if (failCount === 0) {
    console.log('\n✅ Orchestrator Intent Detection is working correctly!');
    process.exit(0);
} else {
    console.log('\n⚠️ Some tests failed. Review intent detection logic.');
    process.exit(1);
}
