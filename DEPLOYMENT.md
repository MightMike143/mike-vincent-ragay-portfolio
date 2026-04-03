# Deployment & Production Guide

This guide covers best practices for taking your portfolio from development to production.

## 🔧 Pre-Deployment Checklist

### Code Quality
- [ ] Validate HTML using [W3C Validator](https://validator.w3.org/)
- [ ] Test CSS across browsers (Chrome, Firefox, Safari, Edge)
- [ ] Check JavaScript console for errors
- [ ] Lint JavaScript with ESLint (optional)
- [ ] Test on mobile devices and tablets

### Performance
- [ ] Optimize images (compress PNG/JPG)
- [ ] Minify CSS and JavaScript
- [ ] Check page load speed with [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Test with slow 3G network conditions
- [ ] Verify lazy loading works

### Accessibility
- [ ] Test with screen readers (NVDA, JAWS)
- [ ] Keyboard navigation works throughout
- [ ] Color contrast meets WCAG AA standards
- [ ] All images have alt text
- [ ] Form inputs have proper labels

### SEO
- [ ] Update meta descriptions
- [ ] Verify robots.txt exists (if needed)
- [ ] Create sitemap.xml
- [ ] Check structured data with [Schema.org](https://schema.org/)
- [ ] Verify Open Graph tags

### Security
- [ ] Remove console.log() debugging statements
- [ ] Validate all form inputs server-side
- [ ] Use HTTPS everywhere
- [ ] Set up CSP headers
- [ ] No credentials in code or config

## 📦 Build & Optimization

### CSS Minification
If using a build tool (Webpack, Parcel, Vite):

```bash
# Example using cssnano
npm install --save-dev postcss cssnano
npm run build
```

### JavaScript Minification
```bash
# Using Terser
npm install --save-dev terser
npx terser js/main.js -o js/main.min.js
npx terser js/chatbot.js -o js/chatbot.min.js
```

Then update `index.html`:
```html
<script src="js/main.min.js" defer></script>
<script src="js/chatbot.min.js" defer></script>
```

### Image Optimization
```bash
# Using ImageMagick
convert image.jpg -quality 85% -strip image.optimized.jpg

# Or use online tools:
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
```

## 🚀 Deployment Platforms

### Option 1: Netlify (Recommended)

**Advantages:**
- Free SSL/TLS certificate
- Automatic HTTPS
- Serverless functions for chatbot
- CDN included
- Simple git deployment

**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Configure build settings (if using build tools)
4. Deploy!

**netlify.toml** (if using build tools):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Option 2: Vercel

**Steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure settings
4. Deploy with one click

**vercel.json**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

### Option 3: GitHub Pages

**Free hosting directly from GitHub:**

1. Push code to `main` branch
2. Go to Settings → Pages
3. Select `main` branch as source
4. Site available at `username.github.io/portfolio`

**For custom domain:**
1. Add CNAME file with your domain
2. Configure DNS settings at your registrar

### Option 4: Traditional Web Hosting

**For cPanel hosting (GoDaddy, Bluehost, etc.):**

1. Purchase hosting plan
2. Upload files via FTP/SFTP:
   ```bash
   sftp user@example.com
   put -r portfolio/* /public_html/
   ```

3. Set permissions:
   ```bash
   chmod 755 portfolio/
   chmod 644 portfolio/*.html
   chmod 644 portfolio/css/*
   chmod 644 portfolio/js/*
   ```

## 🔐 Security Headers

Add these headers to your web server configuration:

```
# Netlify: via netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' cdn.tailwindcss.com cdnjs.cloudflare.com; style-src 'self' cdnjs.cloudflare.com fonts.googleapis.com 'unsafe-inline'; font-src fonts.gstatic.com; img-src 'self' https: data:"
```

## 🌍 DNS Configuration

### For custom domain:

**Using Netlify DNS:**
```
Update your domain registrar nameservers to Netlify's:
ns1.netlify.com
ns2.netlify.com
ns3.netlify.com
ns4.netlify.com
```

**Using CNAME (pointing to existing host):**
```
CNAME: portfolio.example.com → your-site.netlify.app
A Record: example.com → [Netlify IP address]
```

## 📊 Analytics

### Add Google Analytics:

```html
<!-- In <head> section of index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Add Meta Pixel (Facebook):

```html
<img height="1" width="1" style="display:none" 
  src="https://www.facebook.com/tr?id=PIXEL_ID&ev=PageView&noscript=1" />
```

## 🤖 Chatbot Production Setup

### Environment Variables (Netlify):

1. Go to Settings → Build & Deploy → Environment
2. Add variables:
   ```
   GROQ_API_KEY = your_api_key_here
   ```

### Netlify Function for Chatbot:

```javascript
// netlify/functions/chat.js
const Groq = require('groq-sdk');

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message required' })
      };
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const reply = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant answering questions about Mike Vincent Ragay, a Data Engineering Analyst and Splunk Consultant at Accenture.'
        },
        { role: 'user', content: message }
      ],
      max_tokens: 500
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: reply.choices[0].message.content
      })
    };
  } catch (error) {
    console.error('Chat error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
```

## 🧪 Testing

### E2E Testing with Playwright:

```bash
npm install -D @playwright/test
```

```javascript
// tests/portfolio.spec.js
import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await expect(page).toHaveTitle(/Mike Vincent Ragay/);
});

test('navigation works', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await page.click('a[href="#projects"]');
  await page.waitForURL(/#projects/);
});
```

## 📈 Performance Monitoring

- **Uptime monitoring**: [UptimeRobot](https://uptimerobot.com/)
- **Performance**: [New Relic](https://newrelic.com/), [DataDog](https://www.datadoghq.com/)
- **Analytics**: Google Analytics, Mixpanel
- **Log aggregation**: Loggly, Papertrail

## 🔄 CI/CD Pipeline

### GitHub Actions Example:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: '.'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🎯 Final Verification

- [ ] Test all links (internal and external)
- [ ] Verify form submission works
- [ ] Test chatbot functionality
- [ ] Check responsive design on multiple devices
- [ ] Verify theme toggle persists
- [ ] Test keyboard navigation
- [ ] Check page speed metrics
- [ ] Verify HTTPS working
- [ ] Test on real 4G/5G connection
- [ ] Accessibility audit complete

---

**Ready to deploy! 🚀**
