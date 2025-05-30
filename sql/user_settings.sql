CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  income DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_savings DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id) -- Each user can only have one settings record
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- policy: users can only see their own settings
CREATE POLICY "Users can view own settings" ON settings
  FOR SELECT USING (auth.uid()::text = user_id);

-- policy: users can insert their own settings
CREATE POLICY "Users can insert own settings" ON settings
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- policy: users can update their own settings
CREATE POLICY "Users can update own settings" ON settings
  FOR UPDATE USING (auth.uid()::text = user_id);

-- policy: users can delete their own settings
CREATE POLICY "Users can delete own settings" ON settings
  FOR DELETE USING (auth.uid()::text = user_id);
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  income DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_savings DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id) -- Each user can only have one settings record
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- policy: users can only see their own settings
CREATE POLICY "Users can view own settings" ON settings
  FOR SELECT USING (auth.uid()::text = user_id);

-- policy: users can insert their own settings
CREATE POLICY "Users can insert own settings" ON settings
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- policy: users can update their own settings
CREATE POLICY "Users can update own settings" ON settings
  FOR UPDATE USING (auth.uid()::text = user_id);

-- policy: users can delete their own settings
CREATE POLICY "Users can delete own settings" ON settings
  FOR DELETE USING (auth.uid()::text = user_id);

-- trigger to automatically update the updated_at column
CREATE TRIGGER update_user_settings_updated_at 
  BEFORE UPDATE ON settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 
-- trigger to automatically update the updated_at column
CREATE TRIGGER update_user_settings_updated_at 
  BEFORE UPDATE ON settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 