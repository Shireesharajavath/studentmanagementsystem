const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://erdffyacslmaxvqlkinh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZGZmeWFjc2xtYXh2cWxraW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg2NjEsImV4cCI6MjA2NzAxNDY2MX0.MglRIYGRarKAjM27B23Cryj5NHXOJcGMTV-WdrpERgI'; 

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
