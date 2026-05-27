-- ====================================================================
-- WealthPilot AI Core Relational Schema (PostgreSQL)
-- ====================================================================

-- Enable modern UUID generator
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgvector for semantic search (if running locally or cloud)
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- --------------------------------------------------------------------
-- 1. Users (Relationship Managers, Investment Advisors, Admins)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ROLE_RELATIONSHIP_MANAGER', 'ROLE_INVESTMENT_COMMITTEE', 'ROLE_ADMIN')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 2. Clients Table (Wealth clients mapped to specific RMs)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rm_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    risk_profile VARCHAR(50) NOT NULL CHECK (risk_profile IN ('CONSERVATIVE', 'BALANCED', 'GROWTH', 'AGGRESSIVE')),
    onboarding_status VARCHAR(50) NOT NULL DEFAULT 'ONBOARDING' CHECK (onboarding_status IN ('ONBOARDING', 'ACTIVE', 'INACTIVE')),
    net_worth NUMERIC(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for rapid query execution
CREATE INDEX IF NOT EXISTS idx_clients_rm ON clients(rm_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(onboarding_status);

-- --------------------------------------------------------------------
-- 3. Assets Catalog (Stocks, ETFs, Mutual Funds, Fixed Income)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticker VARCHAR(50) UNIQUE NOT NULL,
    asset_name VARCHAR(255) NOT NULL,
    asset_class VARCHAR(100) NOT NULL CHECK (asset_class IN ('EQUITY', 'FIXED_INCOME', 'COMMODITY', 'REAL_ESTATE', 'CASH_EQUIVALENT')),
    sector VARCHAR(100) NOT NULL,
    geography VARCHAR(100) NOT NULL,
    current_price NUMERIC(15, 4) NOT NULL DEFAULT 0.0000,
    last_price_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_assets_class ON assets(asset_class);

-- --------------------------------------------------------------------
-- 4. Target Model Portfolios (Pre-designed reference allocations)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS target_model_portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(100) NOT NULL UNIQUE,
    target_allocation JSONB NOT NULL, -- Format: {"EQUITY": 0.60, "FIXED_INCOME": 0.30, "CASH_EQUIVALENT": 0.10}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 5. Portfolios (Main accounts owned by clients)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL UNIQUE REFERENCES clients(id) ON DELETE CASCADE,
    portfolio_name VARCHAR(255) NOT NULL,
    target_model_id UUID REFERENCES target_model_portfolios(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 6. Portfolio Holdings (Active securities held in portfolios)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE RESTRICT,
    quantity NUMERIC(15, 6) NOT NULL CHECK (quantity >= 0),
    average_buy_price NUMERIC(15, 4) NOT NULL CHECK (average_buy_price >= 0),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_portfolio_asset UNIQUE(portfolio_id, asset_id)
);

CREATE INDEX IF NOT EXISTS idx_holdings_portfolio ON portfolio_holdings(portfolio_id);

-- --------------------------------------------------------------------
-- 7. Daily Portfolio Valuation History (For performance charting)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_valuation_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    valuation_date DATE NOT NULL,
    total_value NUMERIC(15, 2) NOT NULL,
    cash_value NUMERIC(15, 2) NOT NULL,
    equity_value NUMERIC(15, 2) NOT NULL,
    fixed_income_value NUMERIC(15, 2) NOT NULL,
    other_value NUMERIC(15, 2) NOT NULL,
    CONSTRAINT unique_portfolio_date UNIQUE(portfolio_id, valuation_date)
);

CREATE INDEX IF NOT EXISTS idx_valuation_history ON portfolio_valuation_history(portfolio_id, valuation_date);

-- --------------------------------------------------------------------
-- 8. Meetings Directory (Advisor-Client touchpoints)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    rm_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
    raw_transcript TEXT,
    audio_s3_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_meetings_client ON meetings(client_id);

-- --------------------------------------------------------------------
-- 9. Meeting Summaries (AI-generated structural insights)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS meeting_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID NOT NULL UNIQUE REFERENCES meetings(id) ON DELETE CASCADE,
    executive_summary TEXT NOT NULL,
    key_financial_goals JSONB NOT NULL, -- Format: [{"goal": "Buy vacation home", "timeframe": "5 years"}]
    action_items JSONB NOT NULL, -- Format: [{"owner": "RM", "task": "Send model comparisons", "due_date": "2026-06-01"}]
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 10. Investment Insights (AI-proposed allocation recommendations)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS investment_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    rm_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    insight_type VARCHAR(100) NOT NULL CHECK (insight_type IN ('DRIFT_CORRECTION', 'TAX_LOSS_HARVESTING', 'LIQUIDITY_DEPLOYMENT')),
    summary TEXT NOT NULL,
    rationale TEXT NOT NULL,
    proposed_trades JSONB NOT NULL, -- Format: [{"asset_ticker": "AAPL", "action": "BUY", "percentage": 5.0}]
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_RM_REVIEW' CHECK (status IN ('PENDING_RM_REVIEW', 'APPROVED_BY_RM', 'REJECTED_BY_RM', 'SENT_TO_CLIENT', 'EXECUTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_insights_portfolio ON investment_insights(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_insights_status ON investment_insights(status);

-- --------------------------------------------------------------------
-- 11. AI Knowledge Store Vector Table (Compliance & advisor RAG)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vector_knowledge_store (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    embedding VECTOR(1536) NOT NULL, -- Dimension match for standardized embedding models
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- HNSW Cosine indexing for sub-10ms semantic searches
CREATE INDEX IF NOT EXISTS idx_vector_store_hnsw ON vector_knowledge_store USING hnsw (embedding vector_cosine_ops);
