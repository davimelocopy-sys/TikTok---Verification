<SKILL_FIRST_POLICY>
ESTRITAMENTE PROIBIDO iniciar qualquer implementação de Auditoria ou Orquestração sem antes carregar a Skill correspondente.

Protocolo Obrigatório para o Ecossistema TikTok:
1. **Auditoria Multimodal:** Toda Skill de análise de vídeo ou texto DEVE obrigatoriamente realizar RAG (Retrieval Augmented Generation) nos 32 arquivos de `C:\Diretrizes_TikTok`.
2. **Separação de Papéis:** Lógica de conformidade (Guardião) não deve se misturar com lógica de vendas (Mercador) no mesmo script. Use Skills separadas.
3. **Ingestão de Dados:** Antes de processar qualquer vídeo, a Skill deve verificar se o payload de áudio e visual foi extraído corretamente no diretório `.tmp/`.
4. **Criação de Novas Skills:** Se um novo desafio do TikTok surgir (fora dos 32 arquivos), uma nova Skill de pesquisa deve ser criada primeiro para atualizar o `gemini.md`.
</SKILL_FIRST_POLICY>