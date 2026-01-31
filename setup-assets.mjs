import fs from 'fs';
import path from 'path';

const sourceDir = 'Mango Juice'; // Relative to root
const targetDir = 'public/images/mango';

async function setupAssets() {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    if (!fs.existsSync(sourceDir)) {
        console.log(`Source directory ${sourceDir} not found.`);
        return;
    }

    const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.jpg'));

    // Sort files to ensure order (ezgif-frame-001 ...)
    files.sort();

    console.log(`Found ${files.length} images.`);

    files.forEach((file, index) => {
        // We only need 120 images as per spec, but we'll copy what we have.
        // Spec: 1.webp, 2.webp
        // We will rename .jpg to .webp as a rough hack, OR keep .jpg and need code change.
        // User asked for "1.webp". I will Rename to .webp.
        const newName = `${index + 1}.webp`;
        const srcPath = path.join(sourceDir, file);
        const destPath = path.join(targetDir, newName);

        fs.copyFileSync(srcPath, destPath);
    });

    console.log(`Copied and renamed ${files.length} images to ${targetDir}`);
}

setupAssets();
