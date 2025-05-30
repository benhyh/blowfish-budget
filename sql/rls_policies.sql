-- Re-enable RLS (in case it was disabled)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create new policies that work with anon key + application-level security
-- These policies allow all operations with the anon key since we handle user filtering in the application

-- Users table policies
CREATE POLICY "Allow all operations on users" ON users
  FOR ALL USING (true)
  WITH CHECK (true);

-- User settings table policies  
CREATE POLICY "Allow all operations on user_settings" ON user_settings
  FOR ALL USING (true)
  WITH CHECK (true);

-- Expenses table policies
CREATE POLICY "Allow all operations on expenses" ON expenses
  FOR ALL USING (true)
  WITH CHECK (true);
`