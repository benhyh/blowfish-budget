# 🐡 Blowfish Budget

> *"Don't blow it!!!"* - Smart budgeting with the 50/30/20 rule

## Features

- **50/30/20 Budget Tracking**: Automatically categorizes expenses into Necessities (50%), Wants (30%), and Savings (20%)
- **Real-time Expense Management**: Add, edit, and delete expenses with instant database sync
- **Visual Budget Overview**: Interactive dashboard with color-coded expense categories
- **Secure Authentication**: Powered by Clerk for secure user management
- **Persistent Data Storage**: All data stored securely in Supabase with row-level security

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: ShadCN/ui, Radix UI, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)

## How It Works

1. **Set Your Income**: Configure your monthly income in the dashboard
2. **Budget Allocation**: The app automatically calculates your 50/30/20 budget
3. **Track Expenses**: Add expenses and categorize them as Necessities, Wants, or Savings
4. **Monitor Progress**: Visual indicators show if you're on track or over budget
5. **Manage Data**: Edit or delete expenses with beautiful modal dialogs

## Security

- Row Level Security (RLS) policies on all database tables
- User data isolation through Clerk authentication
- Environment variables for sensitive credentials
- Secure API endpoints with user validation

---

Built with ❤️ using React, TypeScript, and modern web technologies.
