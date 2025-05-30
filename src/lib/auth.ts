import { useUser } from '@clerk/clerk-react'
import { supabase } from './supabase'

export const syncUserWithSupabase = async (clerkUser: ReturnType<typeof useUser>['user']) => {
  if (!clerkUser) {
    console.log('syncUserWithSupabase: No Clerk user provided');
    return null;
  }

  console.log('syncUserWithSupabase: Starting sync for user:', clerkUser.id);
  console.log('User email:', clerkUser.primaryEmailAddress?.emailAddress);

  try {
    console.log('Checking if user exists in Supabase...');
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('id', clerkUser.id)
      .single()

    console.log('Select result:', { existingUser, selectError });

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new users
      console.error('Error checking existing user:', selectError);
      return null;
    }

    if (existingUser) {
      console.log('User exists, updating...');
      // User exists, update their info if needed
      const { data, error } = await supabase
        .from('users')
        .update({
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
          updated_at: new Date().toISOString()
        })
        .eq('id', clerkUser.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user:', error);
        return null;
      }
      console.log('User updated successfully:', data);
      return data;
    } else {
      console.log('Creating new user...');
      // New user, create record
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || ''
        })
        .select()
        .single()

      console.log('Insert result:', { data, error });

      if (error) {
        console.error('Error creating user:', error);
        return null;
      }

      console.log('User created successfully:', data);

      // Also create default user settings
      console.log('Creating default user settings...');
      const settingsResult = await createDefaultUserSettings(clerkUser.id);
      console.log('Settings creation result:', settingsResult);
      
      return data;
    }
  } catch (error) {
    console.error('Error syncing user with Supabase:', error);
    return null;
  }
}

// Create default user settings for new users
export const createDefaultUserSettings = async (userId: string) => {
  console.log('createDefaultUserSettings for user:', userId);
  
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .insert({
        user_id: userId,
        income: 5000, // Default income from your current Dashboard
        total_savings: 1000 // Default savings from your current Dashboard
      })
      .select()
      .single()

    console.log('Settings insert result:', { data, error });

    if (error) {
      console.error('Error creating default user settings:', error);
      return null;
    }
    console.log('Default settings created:', data);
    return data;
  } catch (error) {
    console.error('Error creating default user settings:', error);
    return null;
  }
}

// Hook to get current user and ensure they're synced with Supabase
export const useSupabaseUser = () => {
  const { user: clerkUser, isLoaded } = useUser()
  
  return {
    user: clerkUser,
    isLoaded,
    syncUser: () => syncUserWithSupabase(clerkUser)
  }
} 