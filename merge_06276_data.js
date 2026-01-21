const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src/components/College Predictor/Data for College Predictor');

// Map new files to existing formatted files
const fileMappings = [
    { source: 'CAP1_2025_06276.json', target: 'cap1_2025_formatted.json' },
    { source: 'CAP2_2025_06276.json', target: 'cap2_2025_formatted.json' },
    { source: 'CAP3_2025_06276.json', target: 'cap3_2025_formatted.json' },
    { source: 'CAP4_2025_06276.json', target: 'cap4_2025_formatted.json' },
];

fileMappings.forEach(({ source, target }) => {
    const sourcePath = path.join(dataDir, source);
    const targetPath = path.join(dataDir, target);

    console.log(`\nProcessing: ${source} -> ${target}`);

    try {
        // Read source file (new 06276 data)
        const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));

        // Read target file (existing formatted data)
        const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));

        // Get the college key from source (should be "06276 - MKSSS's Cummins College...")
        const collegeKeys = Object.keys(sourceData);

        let addedCount = 0;
        collegeKeys.forEach(collegeKey => {
            if (targetData[collegeKey]) {
                console.log(`  - Skipping "${collegeKey}" (already exists)`);
            } else {
                targetData[collegeKey] = sourceData[collegeKey];
                console.log(`  + Added "${collegeKey}"`);
                addedCount++;
            }
        });

        if (addedCount > 0) {
            // Write back to target file
            fs.writeFileSync(targetPath, JSON.stringify(targetData, null, 2), 'utf-8');
            console.log(`  ✓ Saved ${target} with ${addedCount} new college(s)`);
        } else {
            console.log(`  - No new colleges to add`);
        }

    } catch (error) {
        console.error(`  ✗ Error: ${error.message}`);
    }
});

console.log('\n✓ Merge complete!');
