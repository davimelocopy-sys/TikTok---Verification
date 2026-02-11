/**
 * Test Supabase Connection
 * Validates connection to Supabase and checks if schema is ready
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxtznuudunzqsoyfllzl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4dHpudXVkdW56cXNveWZsbHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NTg5NDAsImV4cCI6MjA4NjMzNDk0MH0.lDyB5mSyckGtva704Mi36LeOKCHEe4JRKq2h-ztGYoM';

console.log('🔌 Testing Supabase Connection...\n');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    try {
        console.log('📡 Connecting to Supabase...');

        // Test 1: Check if we can connect
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .limit(1);

        if (error) {
            if (error.message.includes('relation "public.users" does not exist')) {
                console.log('⚠️  Connection OK, but schema NOT executed yet');
                console.log('❌ Tables do not exist. Please run supabase_schema.sql');
                console.log('\n📋 Instructions:');
                console.log('1. Go to: https://app.supabase.com/project/rxtznuudunzqsoyfllzl');
                console.log('2. Click on "SQL Editor"');
                console.log('3. Paste the contents of supabase_schema.sql');
                console.log('4. Click "RUN"');
                return false;
            }
            throw error;
        }

        console.log('✅ Supabase connection successful!');

        // Test 2: Check all tables exist
        console.log('\n🔍 Checking tables...');
        const tables = ['users', 'audits', 'violations', 'alerts', 'financial_metrics'];

        for (const table of tables) {
            const { error: tableError } = await supabase
                .from(table)
                .select('count')
                .limit(1);

            if (tableError) {
                console.log(`  ❌ Table "${table}" - NOT FOUND`);
                return false;
            }
            console.log(`  ✅ Table "${table}" - OK`);
        }

        // Test 3: Check dummy data
        console.log('\n📊 Checking dummy data...');
        const { data: users, error: usersError } = await supabase
            .from('users')
            .select('*')
            .limit(5);

        if (usersError) throw usersError;

        console.log(`  ✅ Found ${users.length} user(s)`);

        if (users.length > 0) {
            console.log(`  👤 Sample user: ${users[0].name} (${users[0].email})`);
        }

        console.log('\n✅ Supabase is fully configured and ready!');
        return true;

    } catch (error) {
        console.error('❌ Supabase test failed:', error.message);
        return false;
    }
}

testConnection().then(success => {
    if (success) {
        console.log('\n' + '='.repeat(60));
        console.log('✅ ALL SUPABASE TESTS PASSED');
        process.exit(0);
    } else {
        console.log('\n' + '='.repeat(60));
        console.log('⚠️  SUPABASE NEEDS CONFIGURATION');
        process.exit(1);
    }
});
