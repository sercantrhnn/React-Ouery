import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://lxtizwiwgxycbdzhvxqp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dGl6d2l3Z3h5Y2Jkemh2eHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4Mzc5NDEsImV4cCI6MjA0MjQxMzk0MX0.a1dYfPCPhORSUfuuseyc55igfjFq4Va9Isv6RmR7Xqs"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;