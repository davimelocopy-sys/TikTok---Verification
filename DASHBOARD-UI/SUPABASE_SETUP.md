# Instruções para Executar o Schema no Supabase

## Opção 1: Via Supabase Dashboard (Recomendado)
1. Acesse: https://app.supabase.com/project/rxtznuudunzqsoyfllzl
2. Vá em **SQL Editor**
3. Cole o conteúdo completo de `supabase_schema.sql`
4. Clique em **RUN**

## Opção 2: Via Supabase CLI (Se instalada)
```bash
npx supabase db push --db-url "postgresql://postgres:NTHpa5d3vdhAohS1@db.rxtznuudunzqsoyfllzl.supabase.co:5432/postgres" --file supabase_schema.sql
```

## Opção 3: Via Script Node.js (Incluído)
```bash
node execute-supabase-schema.js
```

## Verificação
Após executar, verifique se as seguintes tabelas foram criadas:
- ✅ users
- ✅ audits
- ✅ violations
- ✅ alerts
- ✅ financial_metrics

**⚠️ User Dummy:** O UUID do usuário dummy é `550e8400-e29b-41d4-a716-446655440000`. Você precisará substituí-lo pelo UUID real do Supabase Auth após criar um usuário real.
