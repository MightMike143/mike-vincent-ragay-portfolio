# Mike Vincent Ragay - Portfolio

A modern, responsive portfolio website showcasing data engineering expertise and Splunk implementations. Built with clean, semantic HTML, organized CSS, and vanilla JavaScript following web development best practices.

## 📁 Project Structure

```
portfolio/
├── index.html                 # Main HTML file (semantic markup)
├── css/
│   ├── styles.css            # Main stylesheet (colors, layouts, components)
│   └── chatbot.css           # Chatbot-specific styles
├── js/
│   ├── main.js               # Site functionality (typing animation, theme, etc.)
│   └── chatbot.js            # Chatbot logic and API integration
├── assets/                   # Images, icons, and media files
├── README.md                 # Project documentation (this file)
└── .gitignore               # Git ignore file
```

## 🎯 Features

- ✨ **Responsive Design** - Mobile-first approach, works on all devices
- 🌙 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 🎬 **Typing Animation** - Dynamic role display in hero section
- 💬 **AI Chatbot** - Groq-powered assistant with smooth UX
- ♿ **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- 🔒 **Security** - Content Security Policy ready, no inline scripts
- 📊 **Performance** - Optimized CSS, lazy-loaded images, minification-ready
- 📱 **SEO** - Proper meta tags, Open Graph, meaningful structure

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with proper structure
- **CSS3** - Modern layout (Grid, Flexbox), glass morphism design
- **JavaScript (Vanilla)** - No dependencies, modular code organization
- **Font Awesome 6.6** - Icon library
- **Google Fonts** - Inter & Space Grotesk typefaces
- **Netlify Functions** - Serverless chat API (optional)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic HTTP server (for local testing)
- Optional: Node.js (for build tools)

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Start a local server**
   
   Using Python 3:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js (http-server):
   ```bash
   npx http-server
   ```
   
   Using VS Code:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📝 Customization Guide

### Update Personal Information
Edit `index.html`:
- Replace "Mike Vincent Ragay" with your name
- Update hero description
- Modify contact form action URL
- Add your social media links

### Change Colors
Edit `css/styles.css` (`:root` variables):
```css
:root {
  --color-emerald: #10b981;        /* Primary color */
  --color-slate-950: #030712;      /* Background */
  /* Update other colors as needed */
}
```

### Modify Projects
In `index.html`, update the Projects section with your work:
```html
<article class="project-card glass">
  <div class="project-image">
    <i class="fas fa-icon-name"></i>  <!-- Change icon -->
  </div>
  <div class="project-content">
    <h3>Your Project Title</h3>
    <p>Your project description</p>
    <a href="#" class="project-link">View details</a>
  </div>
</article>
```

### Update Profile Image
In `index.html`, replace the image URL:
```html
<img src="your-image-url.jpg" alt="Your Name Portrait" loading="lazy">
```

## 🤖 Chatbot Setup

The chatbot requires a Netlify Function endpoint. To enable:

1. **Deploy to Netlify** or set up a backend service
2. **Update the endpoint** in `js/chatbot.js`:
   ```javascript
   const CHAT_CONFIG = {
     endpoint: 'your-api-endpoint',
     // ...
   };
   ```

3. **Backend example** (Node.js + Groq):
   ```javascript
   // netlify/functions/chat.js
   const Groq = require('groq-sdk');
   
   exports.handler = async (event) => {
     const { message } = JSON.parse(event.body);
     const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
     
     const reply = await groq.chat.completions.create({
       model: 'mixtral-8x7b-32768',
       messages: [{ role: 'user', content: message }]
     });
     
     return {
       statusCode: 200,
       body: JSON.stringify({ reply: reply.choices[0].message.content })
     };
   };
   ```

## 📱 Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- Mobile browsers: Optimized responsive design

## 🔐 Security Best Practices

- ✅ No inline JavaScript or CSS
- ✅ External scripts loaded with integrity hashes
- ✅ Semantic HTML prevents injection attacks
- ✅ ARIA labels for accessibility
- ✅ No sensitive data in client code

## 📊 Performance Optimization

- **CSS**: Organized and ready for minification
- **JavaScript**: Modular, deferred loading
- **Images**: Lazy loading enabled
- **Fonts**: Google Fonts with swap display strategy

### Future Optimizations:
- Minify CSS/JS for production
- Use a CDN for external libraries
- Implement Service Worker for offline support
- Add critical CSS inlining

## 🚢 Deployment Options

### Netlify (Recommended)
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel
```bash
vercel
```

### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Site deployed at `username.github.io/repository`

### Traditional Hosting
Upload the entire `portfolio/` folder to your web server.

## 📚 Code Organization Principles

### HTML (`index.html`)
- Semantic tags (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- Proper heading hierarchy (h1 → h6)
- ARIA labels for accessibility
- No styling in HTML

### CSS (`styles.css`)
- CSS Variables for theming
- Mobile-first responsive design
- BEM-like naming convention
- Organized sections with comments
- Ready for CSS-in-JS or preprocessing

### JavaScript (`main.js`, `chatbot.js`)
- Modular functions with clear purposes
- Event delegation where appropriate
- Error handling and logging
- Deferred script loading
- No global state pollution

## 🐛 Troubleshooting

### Theme not persisting?
- Check if localStorage is enabled
- Clear browser cache and try again

### Images not loading?
- Verify image URLs are correct
- Check CORS policy if using external images
- Use relative paths for local assets

### Chatbot not working?
- Verify API endpoint is correct
- Check browser console for errors
- Ensure CORS headers are set on backend

## 📈 Future Enhancements

- [ ] Blog section with markdown support
- [ ] Project filtering by technology
- [ ] Dark/Light mode transition animations
- [ ] Contact form with email notification
- [ ] Analytics integration
- [ ] Service Worker for offline support
- [ ] WebP image format support
- [ ] Dark/Light mode preference detection

## 📄 License

This portfolio template is available for personal use. Customize and deploy as needed!

## 📞 Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Contact Mike Vincent Ragay via LinkedIn
- Visit the portfolio website for contact details

---

**Built with ❤️ by Mike Vincent Ragay**
Data Engineering Analyst & Splunk Consultant
