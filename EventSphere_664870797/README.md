# EventSphere - MongoDB Event Management System

**Student ID:** 664 870 797  
**Student Name:** Chris Lawrence  
**Course:** CSCI 485 - Topics in Computer Science (MongoDB/NoSQL)  
**Semester:** Fall 2025  

## Project Overview

EventSphere is a MongoDB-based event management system that demonstrates advanced NoSQL database concepts through real-world application design. The system enables users to discover, review, and attend in-person, virtual, and hybrid events with sophisticated geospatial discovery, full-text search, and advanced analytics capabilities.

## Key Features Demonstrated

### Advanced MongoDB Concepts
- **Geospatial Queries**: 2dsphere indexes with $geoNear aggregation for location-based event discovery
- **Text Search**: Multi-field text indexes with relevance scoring across event titles, descriptions, and tags
- **Aggregation Pipelines**: Complex analytics including revenue tracking, attendance patterns, and venue performance metrics
- **Schema Validation**: Comprehensive JSON Schema validation with polymorphic design patterns
- **Transactions**: Multi-document ACID transactions for critical operations like ticket booking
- **Change Streams**: Real-time updates via WebSocket integration

### Design Patterns
- **Polymorphic Design**: Events and venues support multiple types with type-specific attributes
- **Extended Reference Pattern**: Denormalized venue data in events for query performance
- **Computed Pattern**: Pre-calculated statistics for dashboard performance
- **Schema Versioning**: Future-proof design with version-aware document structure

### Performance Optimization
- **Strategic Indexing**: 15+ indexes optimized for real-world query patterns
- **Compound Indexes**: Multi-field indexes for complex filtering scenarios
- **Cursor-based Pagination**: Efficient pagination for large result sets
- **Query Performance**: Sub-100ms response times for most operations

## Project Structure

```
EventSphere_664870797/
├── README.md                    # This file - project overview and setup
├── database/                    # Database implementation files
│   ├── schemas/                 # Collection schemas and validation rules
│   ├── sample_data/            # Sample data for testing and demonstration
│   └── indexes/                # Index creation scripts
├── queries/                     # Query examples and demonstrations
│   ├── basic_CRUD/             # Create, Read, Update, Delete operations
│   ├── aggregations/           # Complex aggregation pipelines
│   └── analysis/               # Analytics and reporting queries
├── documentation/              # Project documentation
│   ├── project_report.pdf      # Comprehensive project report
│   └── database_design.pdf     # Database design documentation
├── presentation/               # Presentation materials
│   └── slides.pdf              # Project presentation slides
└── reflection/                 # Learning reflection
    └── learning_reflection.pdf # Personal learning outcomes
```

## Database Collections

### Core Collections
1. **events** - Event catalog with polymorphic design (inPerson, virtual, hybrid, recurring)
2. **venues** - Venue information with geospatial data and polymorphic types
3. **users** - User profiles with preferences and location data
4. **checkins** - Bridge collection for user-event attendance tracking
5. **reviews** - Event and venue reviews with rating system

### Key Statistics
- **1000+ realistic sample records** across all collections
- **4+ relationship types** demonstrated (1:1, 1:many, many:many)
- **25+ different queries** documented with performance analysis
- **5+ strategic indexes** with geospatial and text search capabilities
- **3+ complex aggregation pipelines** for analytics

## Technology Stack

### Backend
- **Python** - Primary application language
- **Flask** - Web framework for API and web interface
- **PyMongo** - MongoDB driver for Python
- **MongoDB Atlas** - Primary database

### Frontend
- **HTML5/CSS3** - Modern responsive web interface
- **JavaScript (ES6+)** - Interactive features with dynamic UI behaviors
- **Socket.IO** - Real-time WebSocket communication
- **Leaflet.js** - Interactive maps for geospatial features

### Development Tools
- **MongoDB Compass** - Database visualization and query testing
- **Postman** - API testing and documentation
- **Git** - Version control

## Quick Start

### Prerequisites
- mongosh installed

### Connect to MongoDB Atlas and initialize database
   
   Replace `<your-connection-string>` with your MongoDB Atlas connection string:
   ```bash
   # Connect to MongoDB Atlas
   mongosh "<your-connection-string>"
   
   # Create collections with validation
   mongosh "<your-connection-string>" < database/schemas/create_collections.js
   
   # Create indexes
   mongosh "<your-connection-string>" < database/indexes/create_indexes.js
   ```

## Key Query Examples

### Geospatial Discovery
```javascript
// Find events within 50km of Vancouver
db.events.aggregate([
  {
    $geoNear: {
      near: { type: "Point", coordinates: [-123.1207, 49.2827] },
      distanceField: "distance",
      maxDistance: 50000,
      spherical: true
    }
  }
])
```

### Text Search with Relevance
```javascript
// Search events by keywords with relevance scoring
db.events.find(
  { $text: { $search: "technology conference" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

### Complex Aggregation - Venue Performance
```javascript
// Analyze venue performance metrics
db.checkins.aggregate([
  { $group: { 
    _id: "$venueId", 
    totalEvents: { $sum: 1 },
    avgAttendance: { $avg: "$attendeeCount" }
  }},
  { $lookup: { 
    from: "venues", 
    localField: "_id", 
    foreignField: "_id", 
    as: "venue" 
  }},
  { $sort: { totalEvents: -1 } }
])
```

## Advanced Features

### Analytics Dashboard
- Computed statistics for events and venues.
- Event popularity trends
- Venue utilization metrics
- User engagement analytics
- Revenue tracking and reporting

### Geospatial Features
- Interactive map interface
- Radius-based event discovery
- Location-aware recommendations
- Venue proximity analysis
