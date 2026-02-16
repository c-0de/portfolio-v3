import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pngPath = path.join(__dirname, 'public', 'curosr2.png');
const svgPath = path.join(__dirname, 'public', 'cursor.svg');

try {
    if (fs.existsSync(pngPath)) {
        const b64 = fs.readFileSync(pngPath, 'base64');
        const svgContent = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <filter id="remove-white" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0
                                                  0 1 0 0 0
                                                  0 0 1 0 0
                                                  -0.2 -0.2 -0.2 1.5 0" result="white-to-alpha"/>
        </filter>
    </defs>
    <image href="data:image/png;base64,${b64}" x="0" y="0" height="64" width="64" filter="url(#remove-white)" style="image-rendering: pixelated;"/>
</svg>`;
        fs.writeFileSync(svgPath, svgContent);
        console.log('Successfully created cursor.svg with embedded PNG.');
    } else {
        console.error('Error: public/pixel_cursor.png not found.');
    }
} catch (err) {
    console.error('Error generating cursor:', err);
}
