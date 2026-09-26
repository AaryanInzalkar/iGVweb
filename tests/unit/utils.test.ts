import { getDerivedProjectStatus, slugify, isValidHttpsUrl } from '../../lib/utils';

// Helper assertion function for simple runner
function assertEqual(actual: any, expected: any, testName: string) {
  if (actual === expected) {
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName} - Expected "${expected}", got "${actual}"`);
    throw new Error(`Test failed: ${testName}`);
  }
}

export function runAllUnitTests() {
  console.log('--- RUNNING RIGOROUS UNIT TESTS FOR AIESEC BHOPAL iGV ---');

  // 1. Slugify tests
  assertEqual(slugify('Global Classroom 2026'), 'global-classroom-2026', 'Slugify standard title');
  assertEqual(slugify('  Green Bhopal & Climate!  '), 'green-bhopal-climate', 'Slugify special characters');

  // 2. HTTPS URL validation tests
  assertEqual(isValidHttpsUrl('https://aiesec.org/opportunity/12345'), true, 'Valid HTTPS URL');
  assertEqual(isValidHttpsUrl('http://aiesec.org/opportunity/12345'), false, 'HTTP URL rejected');
  assertEqual(isValidHttpsUrl('invalid-url'), false, 'Malformed URL rejected');

  // 3. Derived Project Status tests
  const pastDate = '2020-01-01'; // Expired date
  assertEqual(
    getDerivedProjectStatus('published', pastDate),
    'closed',
    'Expired registration deadline automatically sets status to closed'
  );

  const futureFarDate = '2099-12-31'; // Far future
  assertEqual(
    getDerivedProjectStatus('published', futureFarDate),
    'published',
    'Future deadline keeps status as published'
  );

  console.log('--- ALL UNIT TESTS PASSED CLEANLY! ---');
}

// Execute tests if invoked directly
if (require.main === module) {
  runAllUnitTests();
}
