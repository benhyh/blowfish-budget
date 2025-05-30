import { supabase } from './supabase'

export interface Expense {
  id: string
  type: string
  savingOrExpense: string
  amount: number
  description: string
  created_at?: string
  updated_at?: string
}

// fetching all expenses of the user from supabase
export const fetchUserExpenses = async (userId: string): Promise<Expense[]> => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching expenses:', error)
      return []
    }

    // transform Supabase data to match Dashboard interface
    return data.map(expense => ({
      id: expense.id,
      type: expense.type,
      savingOrExpense: expense.saving_or_expense,
      amount: expense.amount,
      description: expense.description,
      created_at: expense.created_at,
      updated_at: expense.updated_at
    }))
  } catch (error) {
    console.error('Error fetching expenses:', error)
    return []
  }
}

export const createExpense = async (userId: string, expense: Omit<Expense, 'id'>): Promise<Expense | null> => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert({
        user_id: userId,
        type: expense.type,
        saving_or_expense: expense.savingOrExpense,
        amount: expense.amount,
        description: expense.description
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating expense:', error)
      return null
    }

    // transform back to Dashboard interface
    return {
      id: data.id,
      type: data.type,
      savingOrExpense: data.saving_or_expense,
      amount: data.amount,
      description: data.description,
      created_at: data.created_at,
      updated_at: data.updated_at
    }
  } catch (error) {
    console.error('Error creating expense:', error)
    return null
  }
}

export const updateExpense = async (expenseId: string, updates: Partial<Omit<Expense, 'id'>>): Promise<Expense | null> => {
  try {
    const updateData: {
      type?: string
      saving_or_expense?: string
      amount?: number
      description?: string
    } = {}
    
    if (updates.type) updateData.type = updates.type
    if (updates.savingOrExpense) updateData.saving_or_expense = updates.savingOrExpense
    if (updates.amount !== undefined) updateData.amount = updates.amount
    if (updates.description) updateData.description = updates.description

    const { data, error } = await supabase
      .from('expenses')
      .update(updateData)
      .eq('id', expenseId)
      .select()
      .single()

    if (error) {
      console.error('Error updating expense:', error)
      return null
    }

    // transform back to Dashboard interface
    return {
      id: data.id,
      type: data.type,
      savingOrExpense: data.saving_or_expense,
      amount: data.amount,
      description: data.description,
      created_at: data.created_at,
      updated_at: data.updated_at
    }
  } catch (error) {
    console.error('Error updating expense:', error)
    return null
  }
}

export const deleteExpense = async (expenseId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', expenseId)

    if (error) {
      console.error('Error deleting expense:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting expense:', error)
    return false
  }
} 