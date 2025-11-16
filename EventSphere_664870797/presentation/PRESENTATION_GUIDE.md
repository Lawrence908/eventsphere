# EventSphere Presentation Guide
## Converting slides.md to Google Slides

**Last Updated:** November 2025  
**Target:** Class Presentation for CSCI 485

---

## Quick Start Checklist

- [ ] Create new Google Slides presentation
- [ ] Apply MongoDB green theme (#00ED64)
- [ ] Import slides from slides.md (50+ slides created)
- [ ] Add screenshots from chrislawrence.ca/events
- [ ] Add code snippets and diagrams
- [ ] Practice demo flow (10-15 minutes)
- [ ] Export to PDF for submission

---

## Theme and Design Guidelines

### Color Palette (Match Your Website)

**Primary Colors:**
- MongoDB Green: `#00ED64` (Spring Green)
- Forest Green: `#00684A`
- Evergreen: `#023430`
- Slate Blue: `#001E2B` (dark background)

**Usage:**
- Slide backgrounds: Dark slate (#001E2B)
- Accent elements: MongoDB green (#00ED64)
- Text: White (#FFFFFF) or light gray (#e2e8f0)
- Code blocks: Dark background with green highlights

### Typography

**Fonts:**
- Headings: Bold sans-serif (Montserrat, Roboto, or Inter)
- Body text: Sans-serif (Open Sans or Roboto)
- Code: Monospace (Fira Code or Consolas)

### Layout Principles

1. **Consistency:** Use the same layout for similar content types
2. **White Space:** Don't overcrowd slides
3. **Visual Hierarchy:** Clear heading → content → action flow
4. **Readable:** Large fonts (minimum 18pt for body text)
5. **Professional:** Clean, modern, minimal design

---

## Slide-by-Slide Conversion Guide

### Title Slide (Slide 1)

**Content:**
```
EventSphere
MongoDB Event Management System

Student: Chris Lawrence
Student ID: 664 870 797
Course: CSCI 485 - Fall 2025
```

**Visual Elements:**
- Large title with MongoDB green accent
- EventSphere logo (if available)
- Dark slate background
- Minimal and professional

**Screenshot Needed:** None

---

### Agenda Slide (Slide 2)

**Content:**
- 8 agenda items listed in slides.md

**Visual Elements:**
- Numbered list with icons
- Consider using a two-column layout
- Use MongoDB green for numbers/bullets

**Screenshot Needed:** None

---

### Project Overview Slide (Slide 3)

**Content:**
- What is EventSphere?
- 5 core features with emoji icons

**Visual Elements:**
- Feature cards with icons
- MongoDB green accents on icons
- Clean layout with proper spacing

**Screenshot Needed:**
✅ **Landing page screenshot** - Full hero section from index.html

---

### Why EventSphere? (Slide 4)

**Content:**
- Domain selection rationale
- 5 reasons for MongoDB

**Visual Elements:**
- Bullet points with checkmarks (✅)
- Comparison note at bottom
- Clean, professional layout

**Screenshot Needed:** None

---

### Technical Stack (Slide 5)

**Content:**
- Backend technologies
- Frontend technologies
- Deployment info

**Visual Elements:**
- 3-column grid layout
- Technology icons (Flask, MongoDB, Leaflet logos)
- Color-coded sections

**Screenshot Needed:** None

---

### Database Architecture (Slide 6)

**Content:**
- Collection overview table (6 collections including tickets)
- Total documents count
- Note about dual ticket architecture

**Visual Elements:**
- Clean table with MongoDB green headers
- Bold numbers for document counts
- Icons for each collection type
- Highlight tickets collection as separate from embedded EventTickets

**Screenshot Needed:**
✅ **MongoDB Compass screenshot** - Database collections view showing all 6 collections

---

### Polymorphic Pattern Slides (Slides 7-8)

**Content:**
- Events polymorphism (4 types)
- Venues polymorphism (6 types)
- Code example

**Visual Elements:**
- Code block with syntax highlighting
- Type badges with different colors
- Clear hierarchy

**Screenshot Needed:**
✅ **Sample document** - MongoDB Compass document view showing polymorphic fields

---

### Dual Ticket Architecture (New Slide 9)

**Content:**
- Embedded EventTickets (ticket types in events)
- Separate Tickets collection (user purchases)
- Code examples for both
- Benefits of dual architecture

**Visual Elements:**
- Side-by-side code blocks
- Comparison diagram
- Benefits with checkmarks

**Screenshot Needed:**
✅ **MongoDB Compass** - Show both embedded tickets in event document and separate tickets collection

---

### Extended Reference Pattern (Slide 10)

**Content:**
- Code example
- 3 benefits listed

**Visual Elements:**
- Code block with highlighting
- Checkmark bullets (✅)
- Before/after comparison diagram (optional)

**Screenshot Needed:** None

---

### Computed Pattern (Slide 11)

**Content:**
- Code example with computedStats
- 3 benefits with icons

**Visual Elements:**
- Code block
- Benefit cards with ⚡📊🔄 icons
- MongoDB green accents

**Screenshot Needed:**
✅ **Dashboard view** - If you have analytics/stats display

---

### Bridge Collection (Slide 12)

**Content:**
- Checkins collection example
- 3 benefits

**Visual Elements:**
- Code block
- Relationship diagram (users ↔ checkins ↔ events)
- Icon-based benefits

**Screenshot Needed:** None

---

### Indexing Strategy (Slide 13)

**Content:**
- 24 strategic indexes overview (4 per collection, 6 collections)
- Performance results
- Tickets collection indexes

**Visual Elements:**
- Key metrics with large numbers
- Index type badges
- Performance dashboard style
- Collection breakdown

**Screenshot Needed:**
✅ **MongoDB Compass** - Indexes view showing 2dsphere, text, and compound indexes for all 6 collections

---

### Geospatial Queries (Slide 14)

**Content:**
- Code example with $geoNear
- Performance metrics

**Visual Elements:**
- Code block with MongoDB query
- Performance metrics cards
- Map icon or visual

**Screenshot Needed:**
✅ **Map page screenshot** - Interactive Leaflet.js map with markers and radius

---

### Text Search (Slide 15)

**Content:**
- Text index code
- Weights explanation
- Performance metrics

**Visual Elements:**
- Code block
- Weight visualization (bar chart or similar)
- Performance stats

**Screenshot Needed:**
✅ **Search results** - Events list page with search functionality

---

### Aggregation Pipelines (Slide 16)

**Content:**
- Pipeline stages
- Performance metrics

**Visual Elements:**
- Flowchart of pipeline stages
- Code example
- Metrics dashboard

**Screenshot Needed:**
✅ **MongoDB Compass** - Aggregation pipeline builder view (if available)

---

### Transactions (Slide 17)

**Content:**
- Atomic ticket booking flow
- Code example

**Visual Elements:**
- Flowchart: Check → Deduct → Create → Commit
- Code block
- ACID compliance badge

**Screenshot Needed:** None

---

### Change Streams (Slide 18)

**Content:**
- Real-time updates architecture
- Use cases

**Visual Elements:**
- Architecture diagram
- WebSocket flow visualization
- Use case bullets

**Screenshot Needed:** None

---

### Performance Results (Slide 19)

**Content:**
- Performance benchmarks table

**Visual Elements:**
- Large table with color-coded results
- Green checkmarks (✅) for good performance
- Bold numbers for achieved times

**Screenshot Needed:**
✅ **Network tab** - Browser DevTools showing fast API response times

---

### Application Features (Slide 20)

**Content:**
- Interactive geospatial discovery
- 6 features listed

**Visual Elements:**
- Feature grid with icons
- App screenshot as background (blurred)
- MongoDB green accents

**Screenshot Needed:**
✅ **Full map page** - Complete map interface with controls

---

### Code Quality & Testing (Slide 21)

**Content:**
- Test coverage statistics
- Code standards

**Visual Elements:**
- Coverage percentage (95%) in large text
- Quality badges
- Test pyramid diagram

**Screenshot Needed:**
✅ **Test results** - If you have pytest output or coverage report

---

### Live Demo Slide (Slide 22)

**Content:**
- 5-step demo flow

**Visual Elements:**
- Numbered steps with timing
- Demo URL prominently displayed
- Call-to-action style

**Screenshot Needed:**
✅ **All key pages** - Landing, Map, Events List, Create Event

---

### Achievements Slides (Slides 23-24)

**Content:**
- Technical excellence checklist
- Requirements comparison table

**Visual Elements:**
- Green checkmarks everywhere (✅)
- Large "Exceeded" badges
- Bonus points callout

**Screenshot Needed:** None

---

### Learning Outcomes (Slide 25)

**Content:**
- MongoDB expertise gained
- Full-stack development skills

**Visual Elements:**
- Two-column layout
- Skill badges
- Progress indicators

**Screenshot Needed:** None

---

### Challenges & Solutions (Slide 26)

**Content:**
- 3 technical challenges
- Solutions and results

**Visual Elements:**
- Challenge cards with problem → solution → result flow
- Color-coded sections
- Performance numbers highlighted

**Screenshot Needed:** None

---

### Industry Relevance (Slide 27)

**Content:**
- Similar companies
- Career applications

**Visual Elements:**
- Company logos (Airbnb, Eventbrite, Uber, etc.)
- Application domain list
- "Production-ready" badge

**Screenshot Needed:** None

---

### Future Enhancements (Slide 28)

**Content:**
- 3-phase roadmap

**Visual Elements:**
- Timeline visualization
- Phase cards
- Feature lists

**Screenshot Needed:** None

---

### Project Statistics (Slide 29)

**Content:**
- 8 key metrics

**Visual Elements:**
- Large numbers with icons
- Dashboard-style layout
- MongoDB green accents on numbers

**Screenshot Needed:** None

---

### Architecture Diagram (Slide 30)

**Content:**
- System flow diagram

**Visual Elements:**
- Clear architecture diagram
- Browser → Flask → MongoDB flow
- Component boxes with icons

**Screenshot Needed:** None

---

### Key Design Decisions (Slide 31)

**Content:**
- Why polymorphic, extended reference, bridge

**Visual Elements:**
- Decision cards
- Checkmark benefits
- Before/after comparisons

**Screenshot Needed:** None

---

### Anti-Patterns Avoided (Slide 32)

**Content:**
- 5 anti-patterns
- Professional best practices

**Visual Elements:**
- Red X marks (❌) for anti-patterns
- "Result" callout at bottom
- Clean bullet list

**Screenshot Needed:** None

---

### Documentation Quality (Slide 33)

**Content:**
- Documents created list
- Standards checklist

**Visual Elements:**
- Document stack visualization
- Page count highlights
- Quality badges

**Screenshot Needed:** None

---

### Demo Preparation (Slide 34)

**Content:**
- 5-step demo plan with timing

**Visual Elements:**
- Numbered timeline
- Timing in parentheses
- Visual demo flow

**Screenshot Needed:**
✅ **Demo sequence** - Screenshots of each demo step

---

### Q&A Preparation (Slide 35)

**Content:**
- Anticipated questions
- Prepared answers

**Visual Elements:**
- Q&A format
- Toggle/accordion style
- Color-coded sections

**Screenshot Needed:** None

---

### Submission Components (Slide 36)

**Content:**
- Complete package checklist

**Visual Elements:**
- Green checkmarks (✅)
- Package icon
- Clean checklist

**Screenshot Needed:** None

---

### Success Metrics (Slide 36)

**Content:**
- 3 categories with 5-star ratings

**Visual Elements:**
- Star ratings (⭐⭐⭐⭐⭐)
- Metric cards
- Achievement badges

**Screenshot Needed:** None

---

### Conclusion (Slide 37)

**Content:**
- Summary of demonstrations
- Key results

**Visual Elements:**
- Portfolio-worthy badge
- Checkmark list
- MongoDB green highlight on "Result"

**Screenshot Needed:** None

---

### Thank You (Slide 38)

**Content:**
- Contact information
- Demo URL
- Q&A prompt

**Visual Elements:**
- Large "Thank You!"
- Contact details formatted nicely
- EventSphere logo

**Screenshot Needed:** None

---

## Required Screenshots Checklist

### Priority 1 (Must Have)

- [ ] **Landing Page** - Full hero section with phone mockup
- [ ] **Interactive Map** - Map page with markers, radius, and controls
- [ ] **Events List** - List view with filters and pagination
- [ ] **Event Details** - Single event view
- [ ] **Create Event Form** - Event creation interface
- [ ] **MongoDB Compass - Collections** - Database collections overview (all 6 collections)
- [ ] **MongoDB Compass - Indexes** - Index strategy view (24 indexes, 4 per collection)
- [ ] **MongoDB Compass - Document** - Sample event document showing embedded EventTickets
- [ ] **MongoDB Compass - Tickets Collection** - Sample ticket purchase document

### Priority 2 (Should Have)

- [ ] **Search Results** - Text search in action
- [ ] **Category Filtering** - Category buttons active state
- [ ] **Mobile View** - Responsive design on phone
- [ ] **Performance Metrics** - Browser DevTools network tab
- [ ] **Code Editor** - VS Code with your Flask code
- [ ] **Docker Running** - Terminal showing app running

### Priority 3 (Nice to Have)

- [ ] **Aggregation Pipeline** - MongoDB Compass aggregation builder
- [ ] **Test Results** - pytest output with coverage
- [ ] **Analytics Dashboard** - If implemented
- [ ] **Real-time Updates** - WebSocket in action

---

## Demo Script (10-15 minutes)

### Section 1: Introduction (2 min)
**Slides:** 1-4
**Action:** Introduce yourself, project, and motivation

### Section 2: Technical Overview (3 min)
**Slides:** 5-13
**Action:** Highlight architecture and advanced patterns (including dual ticket architecture)
**Show:** MongoDB Compass with collections and indexes (all 6 collections)

### Section 3: MongoDB Features (4 min)
**Slides:** 14-18
**Action:** Demonstrate key MongoDB features
**Show:** Code examples and explain each feature

### Section 4: Live Demo (4 min)
**Slides:** 22
**Action:** Navigate to chrislawrence.ca/events and demonstrate:
1. Landing page (15 sec)
2. Map interaction - click, adjust radius (60 sec)
3. Category filtering (30 sec)
4. Event list and details (45 sec)
5. Create event form (45 sec)

### Section 5: Results & Wrap-up (2 min)
**Slides:** 23-38
**Action:** Show achievements, performance, and conclude
**Emphasize:** Exceeded all requirements, production-ready

### Q&A (Variable)
**Slides:** 35, 39+
**Action:** Answer questions confidently
**Backup slides:** Technical details ready

---

## Pro Tips for Presentation

### Before the Presentation

1. **Test Demo URL** - Ensure chrislawrence.ca/events is accessible
2. **Prepare Backup** - Local version running if internet fails
3. **MongoDB Compass** - Have it open with your database
4. **Browser DevTools** - Ready to show network performance
5. **Code Editor** - Key files open (models.py, services.py)

### During the Presentation

1. **Speak Clearly** - Technical terms should be explained
2. **Eye Contact** - Look at audience, not just slides
3. **Pace Yourself** - Don't rush the demo
4. **Enthusiasm** - Show excitement about your work
5. **Be Ready** - Have answers for technical questions

### Handling Questions

**Technical Questions:**
- "Why MongoDB?" → Schema flexibility, geospatial, real-time
- "Performance concerns?" → Show benchmarks, explain indexing
- "Scalability?" → Discuss sharding strategy, replica sets
- "Security?" → Input validation, sanitization, authentication

**Implementation Questions:**
- "How long did it take?" → Be honest, mention iterations
- "Challenges faced?" → Refer to slide 25
- "What's next?" → Refer to future enhancements slide

---

## Google Slides Tips

### Design Consistency

1. **Master Slides** - Set up master slide templates
2. **Colors** - Use MongoDB green consistently
3. **Fonts** - Stick to 2 fonts maximum
4. **Alignment** - Use guides and snap-to-grid
5. **Spacing** - Consistent margins throughout

### Visual Elements

1. **Icons** - Use consistent icon style (line or solid)
2. **Screenshots** - Crop to relevant parts, add borders
3. **Code Blocks** - Use dark background, syntax highlighting
4. **Diagrams** - Keep simple, use arrows and labels
5. **Animations** - Minimal, only for emphasis

### Export Settings

1. **PDF Export** - File → Download → PDF
2. **High Quality** - Ensure images are crisp
3. **Filename** - `EventSphere_664870797_Presentation.pdf`
4. **Page Numbers** - Consider adding in footer

---

## Time Management

### Slide Conversion (Estimated 4-6 hours)

- **Hour 1-2:** Set up theme, convert first 20 slides
- **Hour 2-3:** Take and add screenshots
- **Hour 3-4:** Complete remaining slides
- **Hour 4-5:** Polish, review, add animations
- **Hour 5-6:** Practice, refine, finalize

### Break It Down

1. **Session 1:** Title + Agenda + Overview (10 slides)
2. **Session 2:** Technical Architecture (10 slides)
3. **Session 3:** MongoDB Features (10 slides)
4. **Session 4:** Results + Demo + Conclusion (20 slides)
5. **Session 5:** Screenshots + Polish + Practice

---

## Backup Slides (Slides 39+)

Keep these at the end for detailed Q&A:

- **Schema Examples** - Full JSON documents
- **Index Strategy Details** - Complete indexing approach
- **Performance Details** - Query execution plans
- **Real-time Architecture** - WebSocket flow diagram
- **Code Samples** - Key functions from services.py

---

## Final Checklist

Before submission:

- [ ] All 50+ slides converted to Google Slides
- [ ] MongoDB green theme applied throughout
- [ ] All priority screenshots added
- [ ] Code blocks have syntax highlighting
- [ ] Demo script practiced (10-15 min)
- [ ] Backup slides ready
- [ ] PDF exported for submission
- [ ] Tested on presentation computer/projector
- [ ] Timer practiced for each section
- [ ] Q&A answers rehearsed

---

## Resources

**Design Inspiration:**
- MongoDB official presentations
- Modern tech company slide decks
- Academic conference presentations

**Tools:**
- Google Slides (primary)
- Canva (for graphics)
- Carbon (for code screenshots)
- Figma (for diagrams)

**Color Palette:**
```
MongoDB Green: #00ED64
Forest Green: #00684A
Evergreen: #023430
Slate Blue: #001E2B
White: #FFFFFF
Light Gray: #e2e8f0
```

---

**Good luck with your presentation!**

You have an exceptional project that exceeds all requirements. Present with confidence, demonstrate your MongoDB expertise, and be ready to discuss technical details. Your work is production-ready and portfolio-worthy.

