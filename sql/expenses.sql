CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('Necessities', 'Wants', 'Savings')),
  saving_or_expense TEXT NOT NULL CHECK (saving_or_expense IN ('Saving', 'Expense')),
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_type ON expenses(type);
CREATE INDEX idx_expenses_saving_or_expense ON expenses(saving_or_expense);
CREATE INDEX idx_expenses_created_at ON expenses(created_at);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create policy: users can only see their own expenses
CREATE POLICY "Users can view own expenses" ON expenses
  FOR SELECT USING (auth.uid()::text = user_id);

-- Create policy: users can insert their own expenses
CREATE POLICY "Users can insert own expenses" ON expenses
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Create policy: users can update their own expenses
CREATE POLICY "Users can update own expenses" ON expenses
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Create policy: users can delete their own expenses-- Drop existing table if it exists (to avoid conflicts)
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS settings CASCADE;

-- Create user_settings table (consistent naming)
CREATE TABLE user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  income DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_savings DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id) -- Each user can only have one settings record
);

-- Enable Row Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own settings" ON user_settings
  FOR DELETE USING (auth.uid()::text = user_id);

-- Create trigger for automatic timestamps
CREATE TRIGGER update_user_settings_updated_at 
  BEFORE UPDATE ON user_settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 
CREATE POLICY "Users can delete own expenses" ON expenses
  FOR DELETE USING (auth.uid()::text = user_id);

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_expenses_updated_at 
  BEFORE UPDATE ON expenses 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 