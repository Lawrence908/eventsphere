# EventSphere Database Design Documentation

**Student ID:** 664 870 797  
**Student Name:** Chris Lawrence  
**Course:** CSCI 485 - Topics in Computer Science (MongoDB/NoSQL)  
**Semester:** Fall 2025  

## Summary

EventSphere is a MongoDB-based event management system that demonstrates advanced NoSQL database concepts through real-world application design. The system enables users to discover, review, and attend in-person, virtual, and hybrid events with geospatial discovery, full-text search, and index-optimized analytics capabilities.

This document outlines the complete database design, including collection schemas, advanced design patterns, indexing strategies, and performance optimizations that showcase MongoDB's capabilities for event management applications.

## Database Architecture Overview

### Core Design Principles

1. **Schema Flexibility**: Dynamic event attributes and polymorphic design patterns
2. **Performance Optimization**: Strategic indexing for sub-100ms query response times
3. **Scalability**: Horizontal scaling readiness with proper sharding strategies
4. **Real-world Applicability**: Production-ready patterns used by industry leaders

### Collection Architecture

The database consists of 6 primary collections designed to handle complex relationships and high-performance queries:

- **`events`** - Core event catalog with polymorphic event types and embedded ticket types
- **`venues`** - Venue information with geospatial data and polymorphic types  
- **`users`** - User profiles with location-based preferences
- **`tickets`** - Individual user ticket purchases (separate collection for scalability)
- **`checkins`** - Bridge collection for attendance tracking and analytics
- **`reviews`** - Event and venue review system with rating aggregation

## Advanced Design Patterns

### 1. Polymorphic Design Pattern

The database implements polymorphic design for both events and venues, allowing different entity types to have specialized attributes while maintaining a common base structure.

#### Event Polymorphism
Events support four distinct types with type-specific attributes:

- **`inPerson`**: Traditional physical events at venues
- **`virtual`**: Online-only events with virtual meeting details  
- **`hybrid`**: Events with both physical and virtual components
- **`recurring`**: Events that repeat on a schedule

**Implementation:**
```javascript
{
  "eventType": "hybrid", // Discriminator field
  "hybridDetails": {     // Type-specific attributes
    "virtualCapacity": 300,
    "inPersonCapacity": 200,
    "virtualMeetingUrl": "https://teams.microsoft.com/j/321999401"
  }
}
```

#### Venue Polymorphism
Venues support six distinct types with specialized attributes:

- **`conferenceCenter`**: Meeting rooms, exhibition space, AV equipment
- **`park`**: Outdoor spaces with activities and permit requirements
- **`restaurant`**: Dining venues with menu and reservation details
- **`virtualSpace`**: Online platforms with participant limits
- **`stadium`**: Large venues with seating and event facilities
- **`theater`**: Performance venues with stage and seating details

### 2. Extended Reference Pattern

The Extended Reference Pattern is implemented to improve query performance by denormalizing frequently accessed venue data directly into event documents.

**Implementation:**
```javascript
{
  "venueId": ObjectId("..."),
  "venueReference": {          // Extended reference data
    "name": "Convention Center",
    "city": "San Francisco", 
    "capacity": 5000,
    "venueType": "conferenceCenter"
  }
}
```

**Benefits:**
- Eliminates joins for event listings with venue information
- Enables venue-based filtering without additional database calls
- Supports complex queries like "events at conference centers in Vancouver"

### 3. Computed Pattern

Pre-calculated statistics are stored to improve dashboard and analytics performance.

#### Event Computed Statistics
```javascript
"computedStats": {
  "totalTicketsSold": 125,
  "totalRevenue": 16875,
  "attendanceRate": 25.0,
  "reviewCount": 8,
  "averageRating": 4.3,
  "lastUpdated": ISODate("2025-10-01T23:16:16.047Z")
}
```

#### Venue Computed Statistics
```javascript
"computedStats": {
  "totalEventsHosted": 156,
  "averageAttendance": 850,
  "revenueGenerated": 2450000,
  "lastEventDate": ISODate("2025-09-28T23:16:15.999Z"),
  "lastUpdated": ISODate("2025-10-01T23:16:15.999Z")
}
```

### 4. Schema Versioning

All collections include a `schemaVersion` field to support future schema evolution:

- **Current Version**: "1.0" for all collections
- **Migration Support**: Version field enables gradual schema updates
- **Backward Compatibility**: Legacy data remains accessible during transitions

### 5. Bridge Collection Pattern

The `checkins` collection serves as a bridge table creating a many-to-many relationship between users and events, optimized for analytics:

**Benefits:**
- Analytics flexibility for attendance patterns and user behavior
- Optimized indexes for common analytics queries
- Scalability without document size bloat
- Centralized check-in logic with consistent validation
- Optional link to Tickets collection via `ticketId` (for purchased tickets)

### 6. Checkin-Ticket Relationship Pattern

Checkins optionally reference tickets to avoid data duplication while supporting both paid and free events:

**Pattern:**
- **With Ticket**: `ticketId` links to Tickets collection (70% of checkins)
- **Without Ticket**: `ticketId` is null (30% - free events, walk-ins, staff)
- **Denormalization**: `ticketTier` kept in checkin for quick display (performance optimization)

**Benefits:**
- Eliminates duplication of ticket data (tier, price)
- Maintains referential integrity
- Supports ticket status updates ("active" → "used")
- Enables queries: "All checkins for ticket X" or "Ticket used for checkin Y"

## Collection Schemas

### Events Collection

**Purpose**: Core event catalog with polymorphic design for different event types.

**Key Features**:
- GeoJSON location data for geospatial queries
- Polymorphic event types (inPerson, virtual, hybrid, recurring)
- Extended reference pattern for venue data
- Computed statistics for performance
- Embedded ticket tiers and attendee snippets

**Schema Validation**: Comprehensive JSON Schema with coordinate bounds validation, required fields enforcement, and polymorphic field validation.

**Sample Document**:
```javascript
{
  "_id": ObjectId("68ddb640c00b1dff057fbefc"),
  "title": "Tech Innovation Summit 2025",
  "description": "Experience cutting-edge technology and network with industry leaders.",
  "category": "Technology",
  "eventType": "hybrid",
  "schemaVersion": "1.0",
  "location": {
    "type": "Point",
    "coordinates": [-123.93446771957665, 49.10036536726016]
  },
  "venueReference": {
    "name": "Vancouver Convention Centre",
    "city": "Vancouver",
    "capacity": 2500,
    "venueType": "conferenceCenter"
  },
  "startDate": ISODate("2025-10-09T18:37:26.047Z"),
  "endDate": ISODate("2025-10-09T22:37:26.047Z"),
  "hybridDetails": {
    "virtualCapacity": 300,
    "inPersonCapacity": 200,
    "virtualMeetingUrl": "https://teams.microsoft.com/j/321999401"
  },
  "computedStats": {
    "totalTicketsSold": 125,
    "totalRevenue": 16875,
    "attendanceRate": 25.0,
    "reviewCount": 8,
    "averageRating": 4.3
  }
}
```

### Tickets Collection

**Purpose**: Individual user ticket purchases - separate collection for scalability.

**Key Features**:
- Separate collection from embedded EventTickets (ticket types)
- Scales to millions of purchases for large events (NFL, concerts, online events)
- Enables independent queries (user tickets, event sales analytics)
- References both events and users collections

**Architecture Decision - Dual Ticket Pattern**:

EventSphere implements a **dual ticket architecture** following MongoDB best practices:

1. **Embedded EventTickets** (in `events` collection):
   - Ticket types/tiers available for purchase (e.g., "Early Bird", "General Admission", "VIP")
   - Small, bounded set (typically 1-5 ticket types per event)
   - Always displayed with event details
   - Contains pricing, availability, and sold counts
   - **Why embedded?** Small size, always accessed with events, improves query performance

2. **Separate Tickets Collection** (user purchases):
   - Individual ticket purchases by users
   - Can grow to millions of documents (e.g., 100,000+ tickets for NFL events)
   - Enables independent queries:
     - "All tickets purchased by user X"
     - "All tickets sold for event Y"
     - "Revenue analytics by event/venue/category"
   - **Why separate?** Prevents document bloat, enables efficient queries, supports scalability

**Sample Document**:
```javascript
{
  "_id": ObjectId("68ddb640c00b1dff057fbf00"),
  "eventId": ObjectId("68ddb640c00b1dff057fbefc"),
  "userId": ObjectId("68ddb640c00b1dff057fbe00"),
  "pricePaid": 75.00,
  "status": "active",
  "ticketTier": "VIP",
  "purchasedAt": ISODate("2025-10-01T14:30:00.000Z"),
  "schemaVersion": "1.0",
  "createdAt": ISODate("2025-10-01T14:30:00.000Z")
}
```

**Benefits of This Architecture**:
- **Performance**: Event listings load quickly (embedded ticket types)
- **Scalability**: Handles millions of purchases without bloating event documents
- **Query Flexibility**: Independent queries for user tickets and sales analytics
- **Industry Standard**: Matches patterns used by major ticketing platforms

### Venues Collection

**Purpose**: Venue catalog with polymorphic types and geospatial data.

**Key Features**:
- Polymorphic venue types with type-specific details
- Complete address and contact information
- Availability scheduling and pricing data
- Computed performance statistics

### Users Collection

**Purpose**: User profiles with location-based preferences for event discovery.

**Key Features**:
- Geospatial preference location for nearby event discovery
- Category preferences for personalized recommendations
- Search radius configuration

### Reviews Collection

**Purpose**: Event and venue review system with rating aggregation.

**Key Features**:
- Supports both event and venue reviews
- 1-5 star rating system
- Comment system for detailed feedback

### Checkins Collection

**Purpose**: Bridge collection for user-event attendance with analytics support.

**Key Features**:
- Many-to-many relationship between users and events
- Optional link to Tickets collection via `ticketId` (for purchased tickets)
- QR code support for mobile check-ins
- Location tracking for check-in verification
- Device and method tracking for analytics

**Checkin-Ticket Relationship**:

Checkins can optionally reference tickets via `ticketId` field:

```javascript
{
  "eventId": ObjectId("..."),
  "userId": ObjectId("..."),
  "ticketId": ObjectId("..."),  // Optional - links to purchased ticket
  "ticketTier": "VIP",          // Denormalized for performance
  "checkInTime": ISODate("..."),
  "qrCode": "QR-554361"
}
```

**Use Cases**:
- **With Ticket**: Paid event check-ins link to ticket purchase (70% of checkins created in DB)
- **Without Ticket**: Free events, walk-ins, staff, volunteers (30% of checkins created in DB)

**Benefits**:
- Avoids data duplication (ticketTier, pricePaid from ticket)
- Maintains referential integrity
- Enables queries: "Which ticket was used for this checkin?"
- Supports ticket status updates: Mark ticket as "used" when checked in for analytics and possible future fraud prevention or refunds
- `ticketTier` kept as denormalized field for performance (quick display) for performance optimization

## Indexing Strategy

The full command for creating every index lives in `database/indexes/create_indexes.js`. This section captures the reasoning behind each group of indexes.

### Events Collection
- **Geospatial (`location: "2dsphere"`):** guarantees $geoNear and proximity searches stay within 2dsphere requirements, which is fundamental for querying events around Nanaimo or any other location.
- **Text compound index:** merges title, description, category, and tags so keyword searches sort by relevance without requiring application logic.
- **Category + startDate:** mirrors the most likely common filter combo (“what’s happening in category X this weekend”), enabling efficient querying and pagination.
- **eventType + startDate:** keeps polymorphic views fast (virtual vs. in-person vs. hybrid) since all templates filter by type plus an upcoming date window.

### Venues Collection
- **Geospatial:** supports “find venues near this coordinates” workflows used during event creation.
- **venueType + capacity:** quickly returns suitable spaces when organizers filter by format (“conference center, ≥500 seats”).
- **venueType + rating:** powers specific lists like “highest-rated parks” by combining quality and type without extra sorting.
- **Single-field venueType:** serves as a fallback when only the type filter is set, ensuring predictable performance when capacity/rating filters are absent.

### Reviews Collection
- **eventId:** main access path for displaying reviews inside event detail pages.
- **venueId:** ensures venue display shows aggregated feedback without querying unrelated reviews.
- **eventId + rating:** feeds rating statistics while maintaining the eventId path for quick access.
- **userId:** supports user profile history (“what has this attendee reviewed?”).

### Checkins Collection
- **eventId + userId (unique):** enforces one check-in per attendee per event.
- **eventId:** backs computed pattern attendance counters and.
- **userId:** allows user-level attendance history.
- **ticketId:** links a check-in back to the exact ticket purchase.

### Users Collection
- **email (unique):** primary authentication key.
- **createdAt:** enables inexpensive querying of app users over time.
- **lastLogin:** highlighting active vs. inactive users.
- **profile.preferences.location (2dsphere):** enables recommendations for users near based on their location.

### Tickets Collection
- **eventId + userId:** fastest path to answer “does this user already hold a ticket for this event”.
- **userId:** backs “My Tickets” views for potential future profile pages.
- **eventId:** feeds organizer-facing sales counts via computed pattern.
- **status + purchasedAt:** allows chronological status dashboards for tickets.

Refer to the scripts in `database/indexes/create_indexes.js` whenever the actual index definitions change; update this narrative only when the intent behind an index evolves.

## Query Patterns & Use Cases

Executable examples live under `queries/` (basic CRUD, aggregations, and analysis). This document explains the rationale behind the queries and their use cases.

## Data Validation & Quality

### JSON Schema Validation

All collections enforce comprehensive validation:

- **Coordinate Bounds**: Longitude (-180 to 180), Latitude (-90 to 90)
- **Required Fields**: Critical fields enforced at database level
- **Data Types**: Strict type checking for all fields
- **Range Validation**: Ratings (1-5), prices (≥0), capacities (≥0)
- **Enum Validation**: Event types, venue types, status values

- **Duplicate Prevention**: Unique indexes on critical fields

## Future Enhancements

### Phase 1: Advanced Features
- Machine learning recommendation engine
- Advanced analytics dashboard
- Regular index usage monitoring

### Phase 2: Enterprise Features
- Multi-tenant architecture
- Advanced reporting and BI! (maybe using Power BI)
- API rate limiting and monitoring
- Automated scaling and load balancing

### Phase 3: AI Integration
- Natural language event search
- Automated event categorization (maybe using NLP)
- Chatbot for event discovery

## Conclusion

The EventSphere database design demonstrates MongoDB expertise through:

- **Advanced Design Patterns**: Polymorphic design, extended references, computed patterns
- **Performance Optimization**: Strategic indexing for fast query responses and scalability
- **Real-world Applicability**: Production-ready patterns used by industry leaders
- **Scalability**: Horizontal scaling readiness with proper sharding strategies
- **Features**: Geospatial queries, text search

This design showcases understanding of NoSQL principles, MongoDB capabilities, and production-ready database architecture suitable for modern event management applications at scale.
