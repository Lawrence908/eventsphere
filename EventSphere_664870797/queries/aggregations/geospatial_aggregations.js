// EventSphere
// Geospatial Aggregation Pipelines
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== 1. NEARBY EVENTS DISCOVERY =====

db.events.aggregate([
    {
        $geoNear: {
            near: { type: "Point", coordinates: [-123.9351, 49.0831] },
            distanceField: "distance",
            maxDistance: 50000
        }
    },
    {
        $project: {
            title: 1,
            category: 1,
            startDate: 1,
            price: 1,
            distance: { $round: [{ $divide: ["$distance", 1000] }, 2] }
        }
    },
    {
        $sort: { distance: 1 }
    },
    {
        $limit: 10
    }
]).forEach(event => {
    print(`${event.title} - ${event.distance}km`);
});

// ===== 2. EVENTS BY DISTANCE RANGES =====

db.events.aggregate([
    {
        $geoNear: {
            near: { type: "Point", coordinates: [-123.1207, 49.2827] },
            distanceField: "distance",
            spherical: true,
            query: { status: "published" }
        }
    },
    {
        $addFields: {
            distanceKm: { $divide: ["$distance", 1000] },
            distanceRange: {
                $cond: [
                    { $lte: [{ $divide: ["$distance", 1000] }, 10] }, "0-10km",
                    { $cond: [
                        { $lte: [{ $divide: ["$distance", 1000] }, 25] }, "10-25km",
                        { $cond: [
                            { $lte: [{ $divide: ["$distance", 1000] }, 50] }, "25-50km",
                            "50km+"
                        ]}
                    ]}
                ]
            }
        }
    },
    {
        $group: {
            _id: "$distanceRange",
            eventCount: { $sum: 1 },
            avgPrice: { $avg: "$price" }
        }
    },
    {
        $sort: { _id: 1 }
    }
]).forEach(range => {
    print(`${range._id}: ${range.eventCount} events`);
});

// ===== 3. VENUE PROXIMITY ANALYSIS =====

db.venues.aggregate([
    {
        $geoNear: {
            near: { type: "Point", coordinates: [-123.1207, 49.2827] },
            distanceField: "distanceFromCenter",
            spherical: true,
            maxDistance: 25000
        }
    },
    {
        $lookup: {
            from: "events",
            localField: "_id",
            foreignField: "venueId",
            as: "hostedEvents"
        }
    },
    {
        $addFields: {
            totalEvents: { $size: "$hostedEvents" },
            distanceKm: { $round: [{ $divide: ["$distanceFromCenter", 1000] }, 2] }
        }
    },
    {
        $match: { totalEvents: { $gt: 0 } }
    },
    {
        $sort: { totalEvents: -1 }
    },
    {
        $limit: 10
    }
]).forEach(venue => {
    print(`${venue.name} - ${venue.distanceKm}km - ${venue.totalEvents} events`);
});

// ===== 4. USER LOCATION PREFERENCES =====

db.users.aggregate([
    {
        $match: {
            "profile.preferences.location": { $exists: true }
        }
    },
    {
        $group: {
            _id: "$profile.preferences.location",
            userCount: { $sum: 1 },
            avgRadius: { $avg: "$profile.preferences.radiusKm" }
        }
    },
    {
        $limit: 5
    }
]).forEach(location => {
    print(`Location: ${location.userCount} users, avg radius ${location.avgRadius.toFixed(1)}km`);
});

// ===== 5. GEOSPATIAL EVENT DENSITY =====

db.events.aggregate([
    {
        $match: {
            status: "published",
            location: { $exists: true }
        }
    },
    {
        $addFields: {
            gridLat: { $floor: { $multiply: ["$location.coordinates.1", 10] } },
            gridLng: { $floor: { $multiply: ["$location.coordinates.0", 10] } }
        }
    },
    {
        $group: {
            _id: {
                lat: "$gridLat",
                lng: "$gridLng"
            },
            eventCount: { $sum: 1 }
        }
    },
    {
        $match: { eventCount: { $gte: 2 } }
    },
    {
        $sort: { eventCount: -1 }
    },
    {
        $limit: 5
    }
]).forEach(grid => {
    const centerLat = grid._id.lat / 10;
    const centerLng = grid._id.lng / 10;
    print(`Grid (${centerLat.toFixed(2)}, ${centerLng.toFixed(2)}): ${grid.eventCount} events`);
});

// ===== 6. TRAVEL DISTANCE ANALYSIS =====

db.users.aggregate([
    {
        $match: {
            "profile.preferences.location": { $exists: true }
        }
    },
    {
        $lookup: {
            from: "checkins",
            localField: "_id",
            foreignField: "userId",
            as: "checkins"
        }
    },
    {
        $unwind: "$checkins"
    },
    {
        $lookup: {
            from: "events",
            localField: "checkins.eventId",
            foreignField: "_id",
            as: "attendedEvent"
        }
    },
    {
        $unwind: "$attendedEvent"
    },
    {
        $group: {
            _id: "$attendedEvent.category",
            attendeeCount: { $sum: 1 },
            avgPreferredRadius: { $avg: "$profile.preferences.radiusKm" }
        }
    },
    {
        $sort: { attendeeCount: -1 }
    }
]).forEach(category => {
    print(`${category._id}: ${category.attendeeCount} attendees`);
});
