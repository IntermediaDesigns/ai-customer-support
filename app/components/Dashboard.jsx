import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Dashboard() {
  const session = useSession()
  const supabase = useSupabaseClient()


  return (
    <div>
      <h1>Welcome, {session.user.email}!</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      {/* Your chatbot interface goes here */}
    </div>
  )
}