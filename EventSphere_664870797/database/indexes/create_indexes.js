// EventSphere
// Indexes Creation
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== SUMMARY =====

// Summary: 24 indexes (4 per collection, 6 collections)
// Events: geospatial, text, category+date, eventType+date
// Venues: geospatial, type+capacity, type+rating, type
// Reviews: eventId, venueId, eventId+rating, userId
// Checkins: eventId+userId unique, eventId, userId, ticketId
// Users: email unique, createdAt, lastLogin, location
// Tickets: eventId+userId, userId, eventId, status+purchasedAt

// ===== EVENTS COLLECTION INDEXES (4 indexes) =====

// 1) Geospatial index for event discovery (HIGHEST PRIORITY)
db.events.createIndex({ location: "2dsphere" }); 
// Enables $geoNear and $near queries for location-based event discovery

// 2) Text search across key fields (HIGHEST PRIORITY)
db.events.createIndex({ 
    title: "text", 
    description: "text", 
    category: "text", 
    tags: "text" 
}, {
    weights: {
        title: 10,        // Highest priority - title matches are most relevant
        category: 5,      // Medium-high - category is important for filtering
        tags: 3,          // Medium - tags provide context but less specific
        description: 1    // Lower - descriptions are longer and less precise
    },
    name: "text_search_index"  // Give it a specific name for better readability
}); 
// Enables full-text search with relevance scoring

// 3) Category + Date compound index (HIGH PRIORITY)
db.events.createIndex({ category: 1, startDate: 1 }); 
// Most common filter combination - "Tech events this weekend"

// 4) Event Type + Date compound index (HIGH PRIORITY)
db.events.createIndex({ eventType: 1, startDate: 1 }); 
// Polymorphic filtering - "Virtual events this month"

// ===== VENUES COLLECTION INDEXES (4 indexes) =====

// 1) Geospatial index for venue discovery (HIGHEST PRIORITY)
db.venues.createIndex({ location: "2dsphere" }); 
// Venue location queries for event creation

// 2) Venue Type + Capacity compound index (HIGH PRIORITY)
db.venues.createIndex({ venueType: 1, capacity: 1 }); 
// "Conference centers with capacity > 500"

// 3) Venue Type + Rating compound index (MEDIUM PRIORITY)
db.venues.createIndex({ venueType: 1, rating: 1 }); 
// "High-rated conference centers"

// 4) Venue Type single field index (MEDIUM PRIORITY)
db.venues.createIndex({ venueType: 1 }); 
// Basic venue type filtering fallback

// ===== REVIEWS COLLECTION INDEXES (4 indexes) =====

// 1) Event ID index (HIGHEST PRIORITY)
db.reviews.createIndex({ eventId: 1 }); 
// Reviews by event - most common query

// 2) Venue ID index (HIGH PRIORITY)
db.reviews.createIndex({ venueId: 1 }); 
// Reviews by venue - essential for venue evaluation

// 3) Event ID + Rating compound index (HIGH PRIORITY)
db.reviews.createIndex({ eventId: 1, rating: 1 }); 
// Event rating aggregations and maybe future owner/venue statistics

// 4) User ID index (MEDIUM PRIORITY)
db.reviews.createIndex({ userId: 1 }); 
// User review history and posible future profile pages

// ===== CHECKINS COLLECTION INDEXES (4 indexes) =====

// 1) Event ID + User ID compound unique index (HIGHEST PRIORITY)
db.checkins.createIndex({ eventId: 1, userId: 1 }, { unique: true }); 
// Prevent duplicate check-ins per event/user - data integrity

// 2) Event ID index (HIGH PRIORITY)
db.checkins.createIndex({ eventId: 1 }); 
// Event attendance tracking - this would be amost common query

// 3) User ID index (HIGH PRIORITY)
db.checkins.createIndex({ userId: 1 }); 
// User attendance history and maybe future analytics

// 4) Ticket ID index (MEDIUM PRIORITY)
db.checkins.createIndex({ ticketId: 1 }); 
// Link checkins to tickets - "which ticket was used for this checkin?"

// ===== USERS COLLECTION INDEXES (4 indexes) =====

// 1) Email unique index (HIGHEST PRIORITY)
db.users.createIndex({ email: 1 }, { unique: true }); 
// User authentication - critical for login operations

// 2) Created At index (MEDIUM PRIORITY)
db.users.createIndex({ createdAt: 1 }); 
// User registration analytics and chronological sorting

// 3) Last Login index (MEDIUM PRIORITY)
db.users.createIndex({ lastLogin: 1 }); 
// Active user identification and engagement metrics

// 4) User preferences location geospatial index (LOW PRIORITY)
db.users.createIndex({ "profile.preferences.location": "2dsphere" }); 
// Location-based user discovery for possible future recommendations

// ===== TICKETS COLLECTION INDEXES (4 indexes) =====

// 1) Event ID + User ID compound index (HIGHEST PRIORITY)
db.tickets.createIndex({ eventId: 1, userId: 1 }); 
// User ticket purchases per event - most common query pattern

// 2) User ID index (HIGH PRIORITY)
db.tickets.createIndex({ userId: 1 }); 
// All tickets purchased by a user - could be used for a "My Tickets" page

// 3) Event ID index (HIGH PRIORITY)
db.tickets.createIndex({ eventId: 1 }); 
// All tickets sold for an event - could be used for analytics

// 4) Status + Purchased At compound index (MEDIUM PRIORITY)
db.tickets.createIndex({ status: 1, purchasedAt: 1 }); 
// Ticket status and purchased at sorting

