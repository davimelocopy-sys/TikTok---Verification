-- ====================================================================
-- TikTok Intelligence Dashboard - Supabase Schema
-- Created: 2026-02-10
-- Description: Complete database schema with RLS for multitenancy
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- TABLE: users
-- ====================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('creator', 'seller', 'agency_admin')),
    tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- TABLE: audits
-- ====================================================================
CREATE TABLE IF NOT EXISTS audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('video', 'script', 'product')),
    health_score INTEGER NOT NULL CHECK (health_score >= 0 AND health_score <= 100),
    risk_level TEXT NOT NULL CHECK (risk_level IN ('safe', 'warning', 'critical')),
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- TABLE: violations
-- ====================================================================
CREATE TABLE IF NOT EXISTS violations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_id UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
    guideline_ref TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    description TEXT NOT NULL,
    timestamp TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- TABLE: alerts
-- ====================================================================
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('violation', 'policy_change', 'account_warning')),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    action_label TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- TABLE: financial_metrics
-- ====================================================================
CREATE TABLE IF NOT EXISTS financial_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    trend_value NUMERIC NOT NULL,
    trend_direction TEXT NOT NULL CHECK (trend_direction IN ('up', 'down')),
    metric_type TEXT NOT NULL CHECK (metric_type IN ('currency', 'percent', 'number')),
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_metrics ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Audits policies
CREATE POLICY "Users can view own audits" ON audits
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own audits" ON audits
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own audits" ON audits
    FOR DELETE USING (auth.uid() = user_id);

-- Violations policies (cascade from audits)
CREATE POLICY "Users can view violations of own audits" ON violations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM audits
            WHERE audits.id = violations.audit_id
            AND audits.user_id = auth.uid()
        )
    );

-- Alerts policies
CREATE POLICY "Users can view own alerts" ON alerts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts" ON alerts
    FOR UPDATE USING (auth.uid() = user_id);

-- Financial Metrics policies
CREATE POLICY "Users can view own metrics" ON financial_metrics
    FOR SELECT USING (auth.uid() = user_id);

-- ====================================================================
-- DUMMY DATA FOR TESTING
-- ====================================================================

-- Insert dummy user (Replace UUID with actual Supabase Auth UUID in production)
INSERT INTO users (id, email, name, avatar_url, role, tier, onboarding_completed) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'demo@tiktok-verifica.com', 'Maria Silva', 'https://i.pravatar.cc/150?img=47', 'creator', 'pro', true);

-- Insert dummy audits
INSERT INTO audits (id, user_id, title, content_type, health_score, risk_level, thumbnail_url, created_at) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Review de Produto - Suplemento Emagrecedor', 'video', 45, 'critical', 'https://picsum.photos/seed/vid1/400/300', NOW() - INTERVAL '2 hours'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Tutorial de Maquiagem', 'video', 92, 'safe', 'https://picsum.photos/seed/vid2/400/300', NOW() - INTERVAL '1 day'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Script de Desafio Fitness', 'script', 68, 'warning', NULL, NOW() - INTERVAL '3 days');

-- Insert dummy violations
INSERT INTO violations (audit_id, guideline_ref, severity, description, timestamp) VALUES
('650e8400-e29b-41d4-a716-446655440001', '08_Produtos_Regulamentados.md', 'critical', 'Alegação médica enganosa: produto promete "queimar gordura em 7 dias" sem evidência científica.', '00:00:23'),
('650e8400-e29b-41d4-a716-446655440001', '07_Integridade_Autenticidade.md', 'high', 'Desinformação sobre eficácia de produto regulamentado.', '00:01:15'),
('650e8400-e29b-41d4-a716-446655440003', '04_Seguranca_Civilidade.md', 'medium', 'Desafio envolve acrobacia sem equipamento de proteção visível.', NULL);

-- Insert dummy alerts
INSERT INTO alerts (user_id, type, severity, title, description, action_label, is_read) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'violation', 'critical', 'Violação Crítica Detectada', 'Seu vídeo "Review de Produto" viola políticas de produtos regulamentados. Ação necessária.', 'Revisar Agora', false),
('550e8400-e29b-41d4-a716-446655440000', 'policy_change', 'medium', 'Atualização de Política', 'TikTok atualizou as regras de Logística 4PL. Revise produtos afetados.', 'Ver Detalhes', false),
('550e8400-e29b-41d4-a716-446655440000', 'account_warning', 'high', 'Alerta de Conta', 'Sua conta recebeu 2 strikes este mês. Mais violações podem resultar em suspensão.', 'Entender', true);

-- Insert dummy financial metrics (Last 30 days)
INSERT INTO financial_metrics (user_id, label, value, trend_value, trend_direction, metric_type, period_start, period_end) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'GMV (30d)', 'R$ 12.450', 18.5, 'up', 'currency', NOW() - INTERVAL '30 days', NOW()),
('550e8400-e29b-41d4-a716-446655440000', 'Comissões', 'R$ 1.867', 12.3, 'up', 'currency', NOW() - INTERVAL '30 days', NOW()),
('550e8400-e29b-41d4-a716-446655440000', 'Taxa de Conversão', '4.2%', -0.8, 'down', 'percent', NOW() - INTERVAL '30 days', NOW()),
('550e8400-e29b-41d4-a716-446655440000', 'Visualizações', '186.4K', 22.1, 'up', 'number', NOW() - INTERVAL '30 days', NOW());

-- ====================================================================
-- INDEXES FOR PERFORMANCE
-- ====================================================================

CREATE INDEX idx_audits_user_id ON audits(user_id);
CREATE INDEX idx_audits_created_at ON audits(created_at DESC);
CREATE INDEX idx_violations_audit_id ON violations(audit_id);
CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_alerts_is_read ON alerts(is_read);
CREATE INDEX idx_financial_metrics_user_id ON financial_metrics(user_id);

-- ====================================================================
-- FUNCTIONS & TRIGGERS
-- ====================================================================

-- Function to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- END OF SCHEMA
-- ====================================================================
