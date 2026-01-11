// Re-export the Supabase client from utils
// This maintains backward compatibility while using the modern publishable key setup
export { supabase } from '@/utils/supabase';
export { supabase as default } from '@/utils/supabase';
