# Figma Integration Setup Guide

This guide explains how to integrate your Figma designs with the Recipe Browser App development workflow.

## Quick Start

### 1. **For Simple Reference** (Recommended)
Just update the `docs/figma-reference.md` file with your Figma URLs and track implementation progress manually.

### 2. **For Asset Export**
Use Figma's built-in export features:
- Select elements in Figma
- Click "Export" in the Design panel
- Choose PNG/SVG format
- Download and place in `/public/assets/`

### 3. **For Advanced Automation**
Set up the automated sync script (see below).

## Automated Figma Sync Setup

### Prerequisites
1. **Figma Personal Access Token**
   - Go to [Figma Account Settings](https://www.figma.com/settings)
   - Scroll to "Personal access tokens"
   - Generate a new token
   - Copy and save it securely

2. **Figma File Key**
   - Open your Figma file
   - Copy the file key from the URL
   - Example: `https://www.figma.com/file/ABC123DEF456/Recipe-App`
   - File key is: `ABC123DEF456`

### Environment Setup

Create a `.env.local` file in your project root:

```bash
# Figma Integration
FIGMA_ACCESS_TOKEN=your-figma-personal-access-token-here
FIGMA_FILE_KEY=your-figma-file-key-here
```

### Available Commands

```bash
# Full sync (tokens + components + assets)
npm run figma:sync

# Sync design tokens only
npm run figma:tokens

# Sync assets only
npm run figma:assets
```

### What Gets Synced

1. **Design Tokens** → `src/lib/figma-tokens.ts`
   - Colors from Figma styles
   - Typography tokens
   - Spacing values

2. **Component References** → `docs/figma-components.json`
   - List of all Figma components
   - Direct links to Figma frames
   - Component metadata

3. **Assets** (when configured)
   - Images exported to `/public/assets/`
   - Icons exported to `/public/icons/`

## Recommended Figma Workflow

### 1. **Design System Setup**
Organize your Figma file with:
- **📐 Design System Page**: Color styles, typography, components
- **🏠 Homepage**: Main landing page design
- **🍳 Recipe Pages**: Recipe detail and listing pages
- **🔍 Search**: Search and filter interfaces
- **📱 Mobile**: Mobile-specific designs

### 2. **Component Naming**
Use consistent naming in Figma:
- `Recipe Card`
- `Search Bar`
- `Filter Panel`
- `Recipe Detail`

### 3. **Asset Organization**
Create frames for assets:
- `Icons/Search`
- `Icons/Filter`
- `Images/Recipe Placeholder`
- `Images/Category Cards`

### 4. **Design Tokens**
Create Figma styles for:
- **Colors**: Primary, Secondary, Text, Background
- **Typography**: Heading styles, body text
- **Effects**: Shadows, borders

## Manual Integration Methods

### 1. **Figma to React Plugins**
Try these Figma plugins:
- **Figma to React**: Generates React components
- **Figma to Code**: Creates HTML/CSS
- **Locofy**: AI-powered code generation

### 2. **Asset Export Workflow**
1. Select component/frame in Figma
2. Set export settings (2x for retina)
3. Export as PNG/SVG
4. Optimize images (use tinypng.com)
5. Place in appropriate directories

### 3. **Design Token Export**
1. Install "Figma Tokens" plugin
2. Export tokens as JSON
3. Convert to our token format
4. Update `src/styles/tokens.css`

## Best Practices

### Design System Alignment
- Match Figma colors exactly with our design tokens
- Use the same spacing scale (4px, 8px, 12px, etc.)
- Ensure typography matches (Lexend for body, Madimi One for headings)

### Component Development
1. Reference Figma design while coding
2. Use design tokens instead of hardcoded values
3. Test responsive behavior on mobile
4. Ensure accessibility compliance

### Asset Optimization
- Export at 2x resolution for retina displays
- Use SVG for icons when possible
- Optimize file sizes before committing
- Use descriptive filenames

### Version Control
- Keep Figma and code in sync
- Update component reference when designs change
- Communicate design changes to team
- Test thoroughly after design updates

## Troubleshooting

### Common Issues

**"Figma API Error"**
- Check your access token is valid
- Verify file permissions (file must be accessible)
- Ensure file key is correct

**"Assets Not Downloading"**
- Check node IDs are correct in script
- Verify export permissions
- Ensure output directories exist

**"Design Tokens Not Matching"**
- Manually verify Figma style names
- Check for typos in color values
- Ensure styles are published in Figma

### Getting Help

1. Check the [Figma API Documentation](https://www.figma.com/developers/api)
2. Review our design tokens in `src/styles/tokens.css`
3. Test with a simple Figma file first
4. Reach out to the team for assistance

## Example Workflow

1. **Designer updates Figma** with new recipe card design
2. **Run sync**: `npm run figma:sync`
3. **Review changes** in `docs/figma-components.json`
4. **Update component** using new design reference
5. **Test implementation** matches Figma design
6. **Commit changes** with reference to Figma frame

This workflow ensures your implementation stays true to the design while maintaining a efficient development process. 