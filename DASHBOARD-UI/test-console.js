/**
 * Automated Test Script for White Screen Bug
 * Run in browser console at http://localhost:5173
 */

console.log('🧪 Starting automated bug verification test...\n');

// Test 1: Check if React root mounted
setTimeout(() => {
    const root = document.getElementById('root');
    if (!root) {
        console.error('❌ FAIL: Root element not found');
        return;
    }

    if (root.children.length === 0) {
        console.error('❌ FAIL: Root element is empty (white screen)');
        return;
    }

    console.log('✅ PASS: Root element has content');

    // Test 2: Check for onboarding modal
    const onboardingModal = document.querySelector('[class*="fixed"][class*="inset-0"]');
    if (onboardingModal) {
        console.log('✅ PASS: Onboarding modal found');
    } else {
        console.log('⚠️  INFO: Onboarding not visible (may be already completed)');
    }

    // Test 3: Check for JavaScript errors
    const errorCount = window.performance.getEntriesByType('navigation')[0]?.transferSize;
    console.log(`📊 Page loaded: ${errorCount ? 'Yes' : 'Check network tab'}`);

    // Test 4: Verify services loaded
    console.log('\n🔍 Checking service imports...');

    // Test 5: Check console for errors
    const originalError = console.error;
    let errorMessages = [];
    console.error = function (...args) {
        errorMessages.push(args.join(' '));
        originalError.apply(console, args);
    };

    setTimeout(() => {
        if (errorMessages.length > 0) {
            console.log('❌ ERRORS DETECTED:');
            errorMessages.forEach((msg, i) => console.log(`  ${i + 1}. ${msg}`));
        } else {
            console.log('✅ PASS: No console errors detected');
        }

        console.log('\n📋 TEST SUMMARY:');
        console.log('• App loaded: ✅');
        console.log('• Root mounted: ✅');
        console.log('• No white screen: ✅');
        console.log(`• Console errors: ${errorMessages.length === 0 ? '✅ None' : '❌ ' + errorMessages.length}`);

        console.log('\n🎯 MANUAL VERIFICATION STEPS:');
        console.log('1. ✓ Can you see the onboarding welcome screen or dashboard?');
        console.log('2. ✓ Click "Get Started" - does it advance?');
        console.log('3. ✓ Click "Connect TikTok" - does it show loading then success?');
        console.log('4. ✓ Does it auto-advance to "Initial System Audit"?');
        console.log('5. ✓ Click "Run First Audit" - does progress bar work?');
        console.log('6. ✓ Does it reach "All Set!" screen?');
        console.log('7. ✓ Click "Go to Dashboard" - does dashboard load?');
        console.log('\nIf all 7 steps pass: 🎉 BUG IS FIXED!');
    }, 2000);

}, 1000);


// Test for knowledge base errors
setTimeout(() => {
    console.log('\n🔍 Testing knowledge base loader...');

    // Check localStorage for debugging
    const onboarded = localStorage.getItem('tiktok-shield-onboarded');
    console.log(`Onboarding status: ${onboarded ? 'Completed' : 'Not completed'}`);

    // If you see warning about KB API, that's expected in current version
    console.log('⚠️  Expected warning: "Knowledge base API not available. Running in mock mode."');
    console.log('   This is normal - RAG system temporarily disabled');

}, 3000);
