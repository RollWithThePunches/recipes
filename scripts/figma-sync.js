#!/usr/bin/env node

/**
 * Figma Sync Script for Recipe Browser App
 * Syncs assets, tokens, and design specifications from Figma
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const FIGMA_CONFIG = {
  fileKey: process.env.FIGMA_FILE_KEY || 'your-figma-file-key',
  accessToken: process.env.FIGMA_ACCESS_TOKEN || 'your-access-token',
  apiUrl: 'https://api.figma.com/v1',
};

// Asset export settings
const EXPORT_SETTINGS = {
  format: 'png',
  scale: 2,
  outputDir: './public/assets',
  iconDir: './public/icons',
};

/**
 * Fetch Figma file data
 */
async function fetchFigmaFile() {
  const url = `${FIGMA_CONFIG.apiUrl}/files/${FIGMA_CONFIG.fileKey}`;
  
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'X-Figma-Token': FIGMA_CONFIG.accessToken,
      },
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Extract design tokens from Figma styles
 */
function extractDesignTokens(figmaData) {
  const tokens = {
    colors: {},
    typography: {},
    spacing: {},
  };

  // Extract color styles
  if (figmaData.styles) {
    Object.values(figmaData.styles).forEach(style => {
      if (style.styleType === 'FILL') {
        const colorName = style.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        // Extract color values from style
        tokens.colors[colorName] = '#000000'; // Placeholder - would extract actual color
      }
    });
  }

  return tokens;
}

/**
 * Export assets from Figma
 */
async function exportAssets(nodeIds) {
  const url = `${FIGMA_CONFIG.apiUrl}/images/${FIGMA_CONFIG.fileKey}`;
  const params = new URLSearchParams({
    ids: nodeIds.join(','),
    format: EXPORT_SETTINGS.format,
    scale: EXPORT_SETTINGS.scale,
  });

  const fullUrl = `${url}?${params}`;
  
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'X-Figma-Token': FIGMA_CONFIG.accessToken,
      },
    };

    https.get(fullUrl, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Download and save image
 */
async function downloadImage(url, filename, directory) {
  const filePath = path.join(directory, filename);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve(filePath);
      });
    }).on('error', (error) => {
      fs.unlink(filePath, () => {}); // Clean up failed download
      reject(error);
    });
  });
}

/**
 * Update design tokens file
 */
function updateTokensFile(tokens) {
  const tokenPath = './src/lib/figma-tokens.ts';
  
  const content = `/**
 * Design tokens extracted from Figma
 * Auto-generated - do not edit manually
 * Last updated: ${new Date().toISOString()}
 */

export const figmaTokens = ${JSON.stringify(tokens, null, 2)};

export default figmaTokens;
`;

  fs.writeFileSync(tokenPath, content);
  console.log('✅ Updated Figma tokens file');
}

/**
 * Generate component mapping
 */
function generateComponentMapping(figmaData) {
  const components = [];
  
  // Extract component information from Figma data
  if (figmaData.document && figmaData.document.children) {
    figmaData.document.children.forEach(page => {
      if (page.children) {
        page.children.forEach(frame => {
          if (frame.type === 'FRAME' || frame.type === 'COMPONENT') {
            components.push({
              name: frame.name,
              id: frame.id,
              type: frame.type,
              figmaUrl: `https://www.figma.com/file/${FIGMA_CONFIG.fileKey}?node-id=${frame.id}`,
            });
          }
        });
      }
    });
  }

  return components;
}

/**
 * Update component reference file
 */
function updateComponentReference(components) {
  const referencePath = './docs/figma-components.json';
  
  const content = {
    lastUpdated: new Date().toISOString(),
    fileKey: FIGMA_CONFIG.fileKey,
    components: components,
  };

  fs.writeFileSync(referencePath, JSON.stringify(content, null, 2));
  console.log('✅ Updated component reference file');
}

/**
 * Main sync function
 */
async function syncFigma() {
  try {
    console.log('🔄 Starting Figma sync...');
    
    // Fetch Figma file data
    console.log('📥 Fetching Figma file data...');
    const figmaData = await fetchFigmaFile();
    
    // Extract design tokens
    console.log('🎨 Extracting design tokens...');
    const tokens = extractDesignTokens(figmaData);
    updateTokensFile(tokens);
    
    // Generate component mapping
    console.log('📋 Generating component mapping...');
    const components = generateComponentMapping(figmaData);
    updateComponentReference(components);
    
    // Export and download assets (uncomment and configure node IDs as needed)
    // const nodeIds = ['node-id-1', 'node-id-2']; // Specify your asset node IDs
    // const assetUrls = await exportAssets(nodeIds);
    // if (assetUrls && assetUrls.images) {
    //   for (const [nodeId, imageUrl] of Object.entries(assetUrls.images)) {
    //     await downloadImage(imageUrl, `${nodeId}.png`, EXPORT_SETTINGS.outputDir);
    //   }
    // }
    
    // Prevent unused function warning - remove this line when implementing asset sync
    void downloadImage;
    
    console.log('✅ Figma sync completed successfully!');
    
  } catch (error) {
    console.error('❌ Figma sync failed:', error.message);
    process.exit(1);
  }
}

// CLI argument handling
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'sync':
      syncFigma();
      break;
    case 'tokens':
      console.log('🎨 Syncing design tokens only...');
      // Sync tokens only
      break;
    case 'assets':
      console.log('📸 Syncing assets only...');
      // Sync assets only
      break;
    default:
      console.log(`
📐 Figma Sync Tool

Usage:
  node scripts/figma-sync.js sync    # Full sync
  node scripts/figma-sync.js tokens  # Tokens only
  node scripts/figma-sync.js assets  # Assets only

Environment Variables:
  FIGMA_FILE_KEY      # Your Figma file key
  FIGMA_ACCESS_TOKEN  # Your Figma personal access token
      `);
  }
}

module.exports = {
  syncFigma,
  fetchFigmaFile,
  exportAssets,
  extractDesignTokens,
}; 