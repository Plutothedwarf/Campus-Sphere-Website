const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/assets/raw');
const outputDir = path.join(__dirname, '../public/assets');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const outputPath = path.join(outputDir, filename.replace('.jpg', '.webp'));

  try {
    const { data, info } = await sharp(inputPath)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    // Chroma key #FF00FF (Magenta)
    // Despill: reduce magenta in edge pixels
    const width = info.width;
    const height = info.height;
    const channels = info.channels;

    let minX = width, minY = height, maxX = 0, maxY = 0;

    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Distance to magenta (255, 0, 255)
      const isMagenta = (r > 200 && g < 50 && b > 200);
      
      if (isMagenta) {
        data[i + 3] = 0; // Fully transparent
      } else {
        // Despill: if it's somewhat magenta-ish, reduce the r and b channels
        if (r > g && b > g) {
          const over = Math.max(0, ((r + b) / 2) - g);
          if (over > 10) {
             data[i] = Math.max(0, data[i] - over * 0.5);
             data[i+2] = Math.max(0, data[i+2] - over * 0.5);
             data[i+3] = Math.max(0, data[i+3] - over); // make partially transparent
          }
        }
        
        // Track bounds for trimming
        if (data[i + 3] > 10) {
          const x = (i / channels) % width;
          const y = Math.floor((i / channels) / width);
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (minX <= maxX && minY <= maxY) {
        // Trim padding
        const pad = 10;
        minX = Math.max(0, minX - pad);
        minY = Math.max(0, minY - pad);
        maxX = Math.min(width - 1, maxX + pad);
        maxY = Math.min(height - 1, maxY + pad);
        
        const extractWidth = maxX - minX;
        const extractHeight = maxY - minY;

        await sharp(data, {
          raw: { width, height, channels }
        })
        .extract({ left: minX, top: minY, width: extractWidth, height: extractHeight })
        .webp({ quality: 90 })
        .toFile(outputPath);
        
        console.log(`Processed ${filename}`);
    } else {
       console.log(`Skipped ${filename} (empty after keying)`);
    }

  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
  }
}

async function run() {
  if (!fs.existsSync(inputDir)) {
      console.log('No raw directory found');
      return;
  }
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));
  for (const file of files) {
    await processImage(file);
  }
}

run();
