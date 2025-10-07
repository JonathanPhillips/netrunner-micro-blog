# Netrunner Cyberpunk Theme for Micro.blog

A cyberpunk-themed Hugo theme for Micro.blog that brings the NEURAL_NODE aesthetic to your microblog. Features a three-panel terminal interface with neon accents, glitch effects, and retro-futuristic design.

## Features

- **Three-panel cyberpunk layout** with responsive design
- **Terminal-style interface** with scanline effects and glow animations
- **Political solidarity badges** and indie web 88x31 buttons
- **Interactive music player** with your vinyl collection
- **Activity monitor canvas** visualization
- **Glitch text effects** on key elements
- **Full Micro.blog integration** with photos, conversations, and archives

## Installation

### Option 1: Git Repository (Recommended)

1. **Fork or clone this theme to your own Git repository**
2. **In your Micro.blog settings**, go to Design → Edit Custom Themes
3. **Add the Git repository URL** for your fork
4. **Micro.blog will automatically pull updates** when you push changes

### Option 2: Direct Upload

1. **Zip the entire `microblog-theme` folder**
2. **In Micro.blog settings**, go to Design → Edit Custom Themes
3. **Upload the zip file**

## Configuration

### Basic Setup

Edit `config.yaml` to customize your site:

```yaml
baseURL: "https://yourusername.micro.blog"
title: "YOUR_HANDLE"
author:
  name: "Your Name"
  username: "yourusername"
  email: "your@email.com"
params:
  subtitle: "your_custom_tagline_v1.0"
```

### Cool Sites Sidebar

Add your favorite sites to the left panel:

```yaml
params:
  cool_sites:
    - name: "Site Name"
      url: "https://example.com"
```

### About Page

Edit `content/about.md` to customize your bio. The about page uses a special terminal-style layout with stats display.

## Customization

### Colors and Styling

The theme uses CSS variables defined in `static/css/style.css`. Main color scheme:

- `--primary-cyan: #00ffff` - Primary accent color
- `--primary-magenta: #ff00ff` - Secondary accent
- `--primary-green: #00ff00` - Success/active states
- `--bg-black: #0a0a0a` - Main background

### Music Player

Update the albums in `static/js/main.js`:

```javascript
const albums = [
    { artist: "Artist Name", title: "Album Title" },
    // Add your albums here
];
```

### Political Badges

The political solidarity badges are defined in the sidebar partial. Edit `layouts/partials/sidebar-left.html` to customize.

### 88x31 Buttons

Add your web badges in `layouts/partials/sidebar-right.html`. Standard 88x31 pixel format.

## Content Structure

### Blog Posts

Regular Micro.blog posts work automatically. The theme supports:

- **Text posts** with full markdown
- **Photo posts** with captions
- **Conversation threading**
- **Categories and tags**

### Special Pages

Create content files for additional pages:

- `content/about.md` - About page with terminal layout
- `content/contact.md` - Contact information
- `content/archive.md` - Custom archive page

## Development

### Local Testing

To test the theme locally with Hugo:

```bash
cd microblog-theme
hugo server -D
```

Visit `http://localhost:1313` to preview your site.

### File Structure

```
microblog-theme/
├── config.yaml              # Site configuration
├── layouts/
│   ├── _default/
│   │   ├── baseof.html      # Base template
│   │   ├── home.html        # Homepage with blog posts
│   │   ├── list.html        # Archive/category pages
│   │   └── single.html      # Individual post pages
│   ├── about/
│   │   └── single.html      # Custom about page layout
│   └── partials/
│       ├── head.html        # HTML head section
│       ├── sidebar-left.html   # Left panel content
│       └── sidebar-right.html  # Right panel content
├── static/
│   ├── css/style.css        # Complete cyberpunk styling
│   ├── js/main.js          # Interactive functionality
│   └── images/             # Theme images and badges
└── content/
    └── about.md            # About page content
```

## Micro.blog Specific Features

### Photo Integration

The theme automatically displays photos from your Micro.blog photo posts in the main feed.

### Conversation Threading

Replies and conversations are styled to match the terminal aesthetic.

### JSON Feed

Includes JSON feed output for API access and integrations.

### Privacy Settings

All tracking and external analytics are disabled by default in the config.

## Browser Support

- **Modern browsers** with CSS Grid and ES6 support
- **Canvas API** required for activity monitor
- **localStorage** used for guestbook functionality

## Performance

- **Lightweight** - minimal external dependencies
- **Static assets** - CSS/JS served directly
- **Optimized animations** using CSS transforms
- **Mobile responsive** with efficient media queries

## Contributing

1. Fork the repository
2. Make your changes
3. Test locally with Hugo
4. Submit a pull request

## License

MIT License - feel free to modify and distribute.

## Credits

- Design inspired by 90s cyberpunk terminals
- 88x31 badges from the indie web community
- Terminal fonts: Orbitron and Roboto Mono
- Built for the Micro.blog platform

---

**Ready to jack into cyberspace? Deploy this theme and start blogging from the matrix.**