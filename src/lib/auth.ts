import { useUser } from '@clerk/clerk-react'
import { supabase } from './supabase'

// Create or update user in Supabase when they sign in with Clerk
export const syncUserWithSupabase = async (clerkUser: ReturnType<typeof useUser>['user']) => {
  if (!clerkUser) return null

  try {
    // check if user already exists in Supabase
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('id', clerkUser.id)
      .single()
    
    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 is "not found" error => expected for new users
      console.error('Error checking existing user:', selectError)
      return null
    }

    if (existingUser) {
      // user exists, update their info if needed
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
        console.error('Error updating user:', error)
        return null
      }
      return data
    } else {
      //  new user so we create new record
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || ''
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating user:', error)
        return null
      }

      // Also create default user settings
      await createDefaultUserSettings(clerkUser.id)
      
      return data
    }
  } catch (error) {
    console.error('Error syncing user with Supabase:', error)
    return null
  }
}

// create default user settings for new users
export const createDefaultUserSettings = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .insert({
        user_id: userId,
        income: 0, // default income
        total_savings: 0 // default savings
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating default user settings:', error)
      return null
    }
    return data
  } catch (error) {
    console.error('Error creating default user settings:', error)
    return null
  }
}

// hook to get current user and ensure they're synced with Supabase
export const useSupabaseUser = () => {
  const { user: clerkUser, isLoaded } = useUser()
  
  return {
    user: clerkUser,
    isLoaded,
    syncUser: () => syncUserWithSupabase(clerkUser)
  }
} 