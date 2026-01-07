import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tbtrqswrpuuqiztuwuem.supabase.co';
const supabaseKey = 'sb_publishable_dIqRblmqRUu0SovHi3tZWA_8InDRvSr';

export const supabase = createClient(supabaseUrl, supabaseKey);