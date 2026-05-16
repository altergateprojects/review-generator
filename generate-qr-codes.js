// QR Code Generator for Business Review Pages
// Install: npm install qrcode
// Run: node generate-qr-codes.js

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Load business configuration
const config = require('./config');

// Base URL - UPDATE THIS AFTER DEPLOYMENT
const BASE_URL = 'https://review-generator-mauve.vercel.app'; // Production URL
// const BASE_URL = 'http://localhost:3000'; // Local testing

async function generateQRCodes() {
  console.log('🎨 Generating QR Codes for Business Review Pages...\n');
  
  // Create qr-codes directory if it doesn't exist
  const qrDir = path.join(__dirname, 'qr-codes');
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
  }
  
  if (!config.MULTI_BUSINESS_MODE || !config.BUSINESSES) {
    console.error('❌ Multi-business mode not enabled in config.js');
    return;
  }
  
  for (const business of config.BUSINESSES) {
    const url = `${BASE_URL}/${business.id}`;
    const filename = `${business.id}-qr-code.png`;
    const filepath = path.join(qrDir, filename);
    
    try {
      // Generate QR code with custom options
      await QRCode.toFile(filepath, url, {
        width: 500,
        margin: 2,
        color: {
          dark: business.brandColor || '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H' // High error correction (can add logo)
      });
      
      console.log(`✅ ${business.name}`);
      console.log(`   URL: ${url}`);
      console.log(`   QR Code: ${filepath}`);
      console.log(`   Color: ${business.brandColor}`);
      console.log('');
      
      // Also generate a text file with the URL
      const txtFilepath = path.join(qrDir, `${business.id}-url.txt`);
      fs.writeFileSync(txtFilepath, url);
      
    } catch (error) {
      console.error(`❌ Failed to generate QR code for ${business.name}:`, error.message);
    }
  }
  
  // Generate HTML page with all QR codes
  generateHTMLPage(config.BUSINESSES, BASE_URL, qrDir);
  
  console.log('✅ All QR codes generated successfully!');
  console.log(`📁 Location: ${qrDir}`);
  console.log('\n📝 Next steps:');
  console.log('   1. Open qr-codes/qr-codes.html in browser to view all QR codes');
  console.log('   2. Print QR codes for display at business locations');
  console.log('   3. Share URLs with business owners');
  console.log('   4. After deployment, update BASE_URL and regenerate');
}

function generateHTMLPage(businesses, baseUrl, qrDir) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Business Review QR Codes</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            color: white;
            text-align: center;
            margin-bottom: 40px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        
        .info {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .info h2 {
            color: #667eea;
            margin-bottom: 15px;
        }
        
        .info ul {
            list-style: none;
            padding-left: 0;
        }
        
        .info li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .info li:last-child {
            border-bottom: none;
        }
        
        .business-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .business-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .business-card:hover {
            transform: translateY(-5px);
        }
        
        .business-name {
            font-size: 1.8em;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }
        
        .business-type {
            color: #666;
            margin-bottom: 20px;
            font-size: 1.1em;
        }
        
        .qr-code {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .qr-code img {
            max-width: 100%;
            height: auto;
            border: 3px solid #ddd;
            border-radius: 8px;
        }
        
        .url {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            word-break: break-all;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            color: #333;
        }
        
        .buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: #667eea;
            color: white;
        }
        
        .btn-primary:hover {
            background: #5568d3;
        }
        
        .btn-secondary {
            background: #48bb78;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #38a169;
        }
        
        .btn-download {
            background: #ed8936;
            color: white;
        }
        
        .btn-download:hover {
            background: #dd6b20;
        }
        
        .print-section {
            page-break-after: always;
            padding: 40px;
            background: white;
            margin: 20px 0;
            border-radius: 15px;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .no-print {
                display: none;
            }
            
            .business-card {
                box-shadow: none;
                page-break-after: always;
            }
        }
        
        @media (max-width: 768px) {
            .business-grid {
                grid-template-columns: 1fr;
            }
            
            h1 {
                font-size: 1.8em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Business Review QR Codes</h1>
        
        <div class="info no-print">
            <h2>📋 Instructions</h2>
            <ul>
                <li>✅ Each business has a unique QR code and URL</li>
                <li>✅ Customers scan QR code to leave reviews</li>
                <li>✅ Each QR code opens only that business's review page</li>
                <li>✅ Print these QR codes and display at business locations</li>
                <li>✅ Share URLs via WhatsApp, email, or social media</li>
            </ul>
        </div>
        
        <div class="business-grid">
${businesses.map(business => `
            <div class="business-card">
                <div class="business-name" style="color: ${business.brandColor}">
                    ${business.name}
                </div>
                <div class="business-type">${business.type}</div>
                
                <div class="qr-code">
                    <img src="${business.id}-qr-code.png" alt="${business.name} QR Code">
                </div>
                
                <div class="url">
                    ${baseUrl}/${business.id}
                </div>
                
                <div class="buttons">
                    <a href="${baseUrl}/${business.id}" target="_blank" class="btn btn-primary">
                        🔗 Open Page
                    </a>
                    <a href="${business.id}-qr-code.png" download class="btn btn-download">
                        📥 Download QR
                    </a>
                    <button onclick="copyUrl('${baseUrl}/${business.id}')" class="btn btn-secondary">
                        📋 Copy URL
                    </button>
                </div>
            </div>
`).join('')}
        </div>
        
        <div class="info no-print">
            <h2>🖨️ Printing Tips</h2>
            <ul>
                <li>Click browser's Print button (Ctrl+P / Cmd+P)</li>
                <li>Each business will print on a separate page</li>
                <li>Use high-quality paper for best results</li>
                <li>Recommended size: A4 or Letter</li>
                <li>Test QR codes with your phone before printing</li>
            </ul>
        </div>
    </div>
    
    <script>
        function copyUrl(url) {
            navigator.clipboard.writeText(url).then(() => {
                alert('✅ URL copied to clipboard!\\n\\n' + url);
            }).catch(err => {
                alert('❌ Failed to copy URL. Please copy manually.');
            });
        }
    </script>
</body>
</html>`;
  
  const htmlPath = path.join(qrDir, 'qr-codes.html');
  fs.writeFileSync(htmlPath, html);
  console.log(`✅ HTML page generated: ${htmlPath}`);
}

// Run the generator
generateQRCodes().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
