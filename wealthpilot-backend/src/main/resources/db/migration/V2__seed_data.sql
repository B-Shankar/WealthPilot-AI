-- 1. Insert Roles
INSERT INTO roles (id, name) VALUES 
('c5369c0d-c0ad-4d10-a24c-5353c8ea4a51', 'ROLE_ADMIN'),
('c5369c0d-c0ad-4d10-a24c-5353c8ea4a52', 'ROLE_RELATIONSHIP_MANAGER'),
('c5369c0d-c0ad-4d10-a24c-5353c8ea4a53', 'ROLE_ANALYST');

-- 2. Insert Users (BCrypt hash for 'password123': $2a$10$8.gKVn59V1N8Z.V9Qc.mS.t1F8d1vX4WjF5P67y8s5p/Xyv9.8t9W)
INSERT INTO users (id, full_name, email, password, phone, active) VALUES 
('a123bc45-e678-4901-b234-567890abcdef', 'WealthPilot Admin', 'admin@wealthpilot.ai', '$2a$10$8.gKVn59V1N8Z.V9Qc.mS.t1F8d1vX4WjF5P67y8s5p/Xyv9.8t9W', '+14155552671', true),
('a123bc45-e678-4901-b234-567890abcde2', 'Shankar B.', 'advisor@wealthpilot.ai', '$2a$10$8.gKVn59V1N8Z.V9Qc.mS.t1F8d1vX4WjF5P67y8s5p/Xyv9.8t9W', '+14155552672', true);

-- Insert User Roles
INSERT INTO user_roles (user_id, role_id) VALUES 
('a123bc45-e678-4901-b234-567890abcdef', 'c5369c0d-c0ad-4d10-a24c-5353c8ea4a51'),
('a123bc45-e678-4901-b234-567890abcde2', 'c5369c0d-c0ad-4d10-a24c-5353c8ea4a52');

-- 3. Insert Clients (HNW clients under advisor@wealthpilot.ai)
INSERT INTO clients (id, full_name, email, phone, date_of_birth, occupation, status, risk_profile, total_net_worth, relationship_manager_id) VALUES 
('b123cd45-f678-4901-c234-567890abcde1', 'Vikram Aditya', 'vikram.aditya@hnw-wealthpilot.com', '+919876543210', '1975-04-12', 'Tech Entrepreneur', 'ACTIVE', 'GROWTH', 8500000.0000, 'a123bc45-e678-4901-b234-567890abcde2'),
('b123cd45-f678-4901-c234-567890abcde2', 'Ananya Sen', 'ananya.sen@hnw-wealthpilot.com', '+919876543211', '1982-11-23', 'Corporate Executive', 'ACTIVE', 'BALANCED', 4200000.0000, 'a123bc45-e678-4901-b234-567890abcde2'),
('b123cd45-f678-4901-c234-567890abcde3', 'Kabir Mehta', 'kabir.mehta@hnw-wealthpilot.com', '+919876543212', '1961-08-30', 'Retired Surgeon', 'ACTIVE', 'CONSERVATIVE', 12500000.0000, 'a123bc45-e678-4901-b234-567890abcde2');

-- 4. Insert Assets Catalog
INSERT INTO assets (id, name, symbol, asset_class, exchange, currency, current_price) VALUES 
('d123de45-a678-4901-d234-567890abcde1', 'Apple Inc. Common Stock', 'AAPL', 'EQUITY', 'NASDAQ', 'USD', 182.5000),
('d123de45-a678-4901-d234-567890abcde2', 'Microsoft Corp. Common Stock', 'MSFT', 'EQUITY', 'NASDAQ', 'USD', 415.6000),
('d123de45-a678-4901-d234-567890abcde3', 'NVIDIA Corporation Stock', 'NVDA', 'EQUITY', 'NASDAQ', 'USD', 920.0000),
('d123de45-a678-4901-d234-567890abcde4', 'Vanguard Total Bond Market ETF', 'BND', 'FIXED_INCOME', 'NASDAQ', 'USD', 72.8000),
('d123de45-a678-4901-d234-567890abcde5', 'iShares Core U.S. Aggregate Bond ETF', 'AGG', 'FIXED_INCOME', 'NYSE', 'USD', 96.5000),
('d123de45-a678-4901-d234-567890abcde6', 'SPDR Gold Shares ETF', 'GLD', 'COMMODITY', 'NYSE', 'USD', 218.4000),
('d123de45-a678-4901-d234-567890abcde7', 'iShares Silver Trust ETF', 'SLV', 'COMMODITY', 'NYSE', 'USD', 24.2000),
('d123de45-a678-4901-d234-567890abcde8', 'Bitcoin USD Security', 'BTC', 'CRYPTO', 'COINBASE', 'USD', 67500.0000),
('d123de45-a678-4901-d234-567890abcde9', 'US Dollar Liquidity Fund', 'USD_CASH', 'CASH', 'TREASURY', 'USD', 1.0000);

-- 5. Insert Portfolios
INSERT INTO portfolios (id, name, description, total_value, currency, client_id) VALUES 
('e123ef45-b678-4901-e234-567890abcde1', 'Aditya Family Primary Growth Account', 'Mandated HNW Growth allocation holding strategic tech equities, bond anchors and defensive gold hedges.', 4550000.0000, 'USD', 'b123cd45-f678-4901-c234-567890abcde1'),
('e123ef45-b678-4901-e234-567890abcde2', 'Sen Diversified Core Balanced Account', 'Core balanced wealth management account keeping equal weights in broad stocks and active bond index ETFs.', 2200000.0000, 'USD', 'b123cd45-f678-4901-c234-567890abcde2'),
('e123ef45-b678-4901-e234-567890abcde3', 'Dr. Kabir Retirement Preservation Trust', 'Conservative asset preservation trust focused on liquid treasuries, AAA corporate bonds and high-dividend yield stocks.', 7800000.0000, 'USD', 'b123cd45-f678-4901-c234-567890abcde3');

-- 6. Insert Portfolio Holdings
-- Vikram Aditya Portfolio: Total $4,550,000.00 (Equities=72.5%, Bond=14.3%, Gold=8.6%, Crypto=4.4%)
INSERT INTO portfolio_holdings (portfolio_id, asset_id, quantity, average_buy_price, current_value) VALUES 
('e123ef45-b678-4901-e234-567890abcde1', 'd123de45-a678-4901-d234-567890abcde1', 5000.000000, 165.4000, 912500.0000), -- AAPL: $912,500.00
('e123ef45-b678-4901-e234-567890abcde1', 'd123de45-a678-4901-d234-567890abcde2', 3500.000000, 380.2000, 1454600.0000), -- MSFT: $1,454,600.00
('e123ef45-b678-4901-e234-567890abcde1', 'd123de45-a678-4901-d234-567890abcde3', 1000.000000, 750.0000, 920000.0000), -- NVDA: $920,000.00
('e123ef45-b678-4901-e234-567890abcde1', 'd123de45-a678-4901-d234-567890abcde4', 9000.000000, 75.1000, 655200.0000), -- BND: $655,200.00
('e123ef45-b678-4901-e234-567890abcde1', 'd123de45-a678-4901-d234-567890abcde6', 1800.000000, 195.0000, 393120.0000), -- GLD: $393,120.00
('e123ef45-b678-4901-e234-567890abcde1', 'd123de45-a678-4901-d234-567890abcde8', 3.000000, 52000.0000, 202500.0000), -- BTC: $202,500.00
('e123ef45-b678-4901-e234-567890abcde1', 'd123de45-a678-4901-d234-567890abcde9', 12080.000000, 1.0000, 12080.0000);   -- CASH: $12,080.00

-- Ananya Sen Portfolio: Total $2,200,000.00
INSERT INTO portfolio_holdings (portfolio_id, asset_id, quantity, average_buy_price, current_value) VALUES 
('e123ef45-b678-4901-e234-567890abcde2', 'd123de45-a678-4901-d234-567890abcde1', 3000.000000, 172.5000, 547500.0000), -- AAPL: $547,500
('e123ef45-b678-4901-e234-567890abcde2', 'd123de45-a678-4901-d234-567890abcde2', 1200.000000, 400.1000, 498720.0000), -- MSFT: $498,720
('e123ef45-b678-4901-e234-567890abcde2', 'd123de45-a678-4901-d234-567890abcde4', 10000.000000, 74.0000, 728000.0000), -- BND: $728,000
('e123ef45-b678-4901-e234-567890abcde2', 'd123de45-a678-4901-d234-567890abcde6', 1500.000000, 205.0000, 327600.0000), -- GLD: $327,600
('e123ef45-b678-4901-e234-567890abcde2', 'd123de45-a678-4901-d234-567890abcde9', 98180.000000, 1.0000, 98180.0000);   -- CASH: $98,180

-- Kabir Retirement Trust Portfolio: Total $7,800,000.00
INSERT INTO portfolio_holdings (portfolio_id, asset_id, quantity, average_buy_price, current_value) VALUES 
('e123ef45-b678-4901-e234-567890abcde3', 'd123de45-a678-4901-d234-567890abcde2', 3000.000000, 390.4000, 1246800.0000), -- MSFT: $1,246,800
('e123ef45-b678-4901-e234-567890abcde3', 'd123de45-a678-4901-d234-567890abcde4', 45000.000000, 73.5000, 3276000.0000), -- BND: $3,276,000
('e123ef45-b678-4901-e234-567890abcde3', 'd123de45-a678-4901-d234-567890abcde5', 25000.000000, 97.2000, 2412500.0000), -- AGG: $2,412,500
('e123ef45-b678-4901-e234-567890abcde3', 'd123de45-a678-4901-d234-567890abcde6', 3000.000000, 210.0000, 655200.0000),  -- GLD: $655,200
('e123ef45-b678-4901-e234-567890abcde3', 'd123de45-a678-4901-d234-567890abcde9', 209500.000000, 1.0000, 209500.0000);  -- CASH: $209,500

-- 7. Insert Meetings
INSERT INTO meetings (id, title, agenda, scheduled_at, location, status, client_id, user_id) VALUES 
('f123fg45-c678-4901-f234-567890abcde1', 'Annual Asset Allocation Strategic Review', 'Review drift in Vikram Aditya portfolio, discuss alternative commodity hedges and equity lock-in gains.', '2026-05-15 10:00:00', 'Mumbai Private Banking Suite 4', 'COMPLETED', 'b123cd45-f678-4901-c234-567890abcde1', 'a123bc45-e678-4901-b234-567890abcde2'),
('f123fg45-c678-4901-f234-567890abcde2', 'Sen Trust Rebalance Advisory Consultation', 'Execute rebalancing on Ananya Sen core account, move funds from technology to index bond trackers.', '2026-05-20 14:00:00', 'Virtual Teams Video Call', 'COMPLETED', 'b123cd45-f678-4901-c234-567890abcde2', 'a123bc45-e678-4901-b234-567890abcde2'),
('f123fg45-c678-4901-f234-567890abcde3', 'Trust Capital Preservation Touchpoint', 'Quarterly review of municipal tax yields, cash preservation triggers and treasury maturities review.', '2026-06-05 11:30:00', 'New Delhi Taj Palace Lounge', 'SCHEDULED', 'b123cd45-f678-4901-c234-567890abcde3', 'a123bc45-e678-4901-b234-567890abcde2');

-- 8. Insert Meeting Summaries
INSERT INTO meeting_summaries (id, summary_text, key_decisions, action_items, client_sentiment, meeting_id) VALUES 
('g123gh45-d678-4901-g234-567890abcde1', 
 'The client expressed a strong desire to lock in substantial equity returns following the technology market rally. They aligned with the advisor to initiate a drift correction. The advisor highlighted over-exposure risks in tech, which the client acknowledged.',
 '- Approved selling Microsoft and NVIDIA portions to reduce equity weight from 72.5% back to the target bounds of 65%.\n- Reallocate proceeds to BND (Fixed Income) and GLD (Gold) to restore defensive cushions.',
 '- RM to generate the simulated trades and present transaction sheets by Monday.\n- RM to investigate liquidity requirements for Q3 entrepreneur tax liabilities.',
 'HIGHLY CONSTRUCTIVE / SECURE',
 'f123fg45-c678-4901-f234-567890abcde1'),

('g123gh45-d678-4901-g234-567890abcde2', 
 'Discussed rebalancing Sen core account. Client was conservative about tech valuations but wanted to maintain basic index equity exposure. Advisor executed direct allocation alignment.',
 '- Target balanced ratio of 50/50 stocks/bonds re-approved.\n- Relocated $150k cash proceeds into broad US aggregate fixed income funds.',
 '- RM to execute the cash allocation trades in the custodian desk.\n- RM to upload transaction confirmations to the client wealth vault.',
 'STABLE / CALANCED',
 'f123fg45-c678-4901-f234-567890abcde2');

-- 9. Insert Investment Insights
INSERT INTO investment_insights (id, title, content, insight_type, severity, acknowledged, client_id) VALUES 
('h123hi45-e678-4901-h234-567890abcde1', 'Drift Alert: Portfolio Equity Violations', 'Aditya Family primary portfolio equity holdings stand at 72.5%, breaching the 65% Growth Mandate maximum. A drift correction is highly recommended to sell $125k tech and deploy into Aggregate Fixed Income and physical Gold ETFs.', 'RECOMMENDATION', 'HIGH', false, 'b123cd45-f678-4901-c234-567890abcde1'),
('h123hi45-e678-4901-h234-567890abcde2', 'Tactical Insight: Tax-Loss Harvesting', 'Sen core balanced account holds $18,400 in unrealized capital losses in long-duration fixed income ETFs. Propose strategic harvesting to offset capital gains realized from equity sales, improving net family tax efficiency.', 'RECOMMENDATION', 'MEDIUM', false, 'b123cd45-f678-4901-c234-567890abcde2');

-- 10. Insert Notifications
INSERT INTO notifications (id, title, message, type, is_read, user_id) VALUES 
('i123ij45-f678-4901-i234-567890abcde1', 'Drift Violation: Vikram Aditya Portfolio', 'The primary portfolio for Vikram Aditya has breached its 65% maximum equity weight. Current: 72.5%. Review drift trades in AI Copilot.', 'PORTFOLIO_ALERT', false, 'a123bc45-e678-4901-b234-567890abcde2'),
('i123ij45-f678-4901-i234-567890abcde2', 'Tactical Recommendation Generated', 'Tax-loss harvesting opportunity detected for Ananya Sen. Expected tax savings: $6,400. Review proposed trades.', 'AI_RECOMMENDATION', false, 'a123bc45-e678-4901-b234-567890abcde2'),
('i123ij45-f678-4901-i234-567890abcde3', 'Upcoming Client Meeting Reminder', 'Scheduled meeting in 1 hour with Vikram Aditya in private banking suite 4. Prepare draft rebalancing papers.', 'MEETING_REMINDER', false, 'a123bc45-e678-4901-b234-567890abcde2');
