// EventSphere - Index Performance Comparison
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// Geospatial query with 2dsphere index
// 1. Find events within 50km of Nanaimo, BC
// Drop index to compare
db.events.dropIndex("location_2dsphere");

// Will return error:
db.events.find({
    location: {
        $near: {
            $geometry: { type: "Point", coordinates: [-123.9351, 49.0831] },
            $maxDistance: 50000
        }
    }
}).limit(50).explain("executionStats");

// Recreate index
db.events.createIndex({
    location: "2dsphere"
});

// Find events within 50km of Nanaimo, BC with compound index 
db.events.aggregate([
    {
        $geoNear: {
            near: { type: "Point", coordinates: [-123.9351, 49.0831] },
            distanceField: "distance",
            maxDistance: 50000
        }
    }
]).explain("executionStats");



// 2. Get explain stats for compound index query
// Drop index to compare
db.events.dropIndex("category_1_startDate_1");

// Find Technology events sorted by start date
db.events.find(
    { category: "Technology" }
).sort({ startDate: 1 }).limit(50).explain("executionStats");

// Recreate index
db.events.createIndex({
    category: 1,
    startDate: 1
});

// Find Technology events sorted by start date with compound index
db.events.find(
    { category: "Technology" }
).sort({ startDate: 1 }).limit(50).explain("executionStats");



// 3. Single-field index query - Venues by type
// Drop index to compare
db.venues.dropIndex("venueType_1");

// Find venues by type
db.venues.find({ venueType: "conferenceCenter" }).limit(50).explain("executionStats");

// Recreate index
db.venues.createIndex({ venueType: 1 });

// Find venues by type with index
db.venues.find({ venueType: "conferenceCenter" }).limit(50).explain("executionStats");