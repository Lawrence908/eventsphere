// EventSphere
// Analytics Aggregation Pipelines
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== 1. EVENT PERFORMANCE BY CATEGORY =====

db.events.aggregate([
    {
        $match: {
            status: { $in: ["published", "completed"] }
        }
    },
    {
        $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "eventId",
            as: "reviews"
        }
    },
    {
        $lookup: {
            from: "checkins",
            localField: "_id",
            foreignField: "eventId",
            as: "checkins"
        }
    },
    {
        $addFields: {
            reviewCount: { $size: "$reviews" },
            attendeeCount: { $size: "$checkins" },
            avgRating: { $avg: "$reviews.rating" }
        }
    },
    {
        $group: {
            _id: "$category",
            eventCount: { $sum: 1 },
            avgAttendance: { $avg: "$attendeeCount" },
            avgRating: { $avg: "$avgRating" },
            totalRevenue: { $sum: "$computedStats.totalRevenue" }
        }
    },
    {
        $sort: { totalRevenue: -1 }
    }
]).forEach(category => {
    print(`${category._id}: ${category.eventCount} events, $${category.totalRevenue.toFixed(2)} revenue`);
});

// ===== 2. TEMPORAL PATTERNS =====

db.events.aggregate([
    {
        $addFields: {
            dayOfWeek: { $dayOfWeek: "$startDate" },
            hour: { $hour: "$startDate" }
        }
    },
    {
        $group: {
            _id: {
                day: "$dayOfWeek",
                hour: "$hour"
            },
            eventCount: { $sum: 1 },
            avgPrice: { $avg: "$price" }
        }
    },
    {
        $sort: { eventCount: -1 }
    },
    {
        $limit: 10
    }
]).forEach(pattern => {
    print(`Day ${pattern._id.day}, Hour ${pattern._id.hour}: ${pattern.eventCount} events`);
});

db.events.aggregate([
    {
        $group: {
            _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" }
            },
            eventsCreated: { $sum: 1 },
            freeEvents: { $sum: { $cond: [{ $eq: ["$isFree", true] }, 1, 0] } }
        }
    },
    {
        $sort: { "_id.year": 1, "_id.month": 1 }
    }
]).forEach(month => {
    print(`${month._id.year}-${month._id.month}: ${month.eventsCreated} events`);
});

// ===== 3. VENUE UTILIZATION =====

db.venues.aggregate([
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
            totalEvents: { $size: "$hostedEvents" }
        }
    },
    {
        $match: { totalEvents: { $gt: 0 } }
    },
    {
        $group: {
            _id: "$venueType",
            venueCount: { $sum: 1 },
            avgEventsPerVenue: { $avg: "$totalEvents" }
        }
    },
    {
        $sort: { avgEventsPerVenue: -1 }
    }
]).forEach(venueType => {
    print(`${venueType._id}: ${venueType.venueCount} venues, avg ${venueType.avgEventsPerVenue.toFixed(1)} events`);
});

// ===== 4. USER ENGAGEMENT =====

db.users.aggregate([
    {
        $lookup: {
            from: "checkins",
            localField: "_id",
            foreignField: "userId",
            as: "checkins"
        }
    },
    {
        $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "userId",
            as: "reviews"
        }
    },
    {
        $addFields: {
            totalCheckins: { $size: "$checkins" },
            totalReviews: { $size: "$reviews" }
        }
    },
    {
        $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            avgCheckins: { $avg: "$totalCheckins" },
            avgReviews: { $avg: "$totalReviews" },
            totalCheckins: { $sum: "$totalCheckins" },
            totalReviews: { $sum: "$totalReviews" }
        }
    }
]).forEach(stats => {
    print(`Users: ${stats.totalUsers}, Avg check-ins: ${stats.avgCheckins.toFixed(1)}, Avg reviews: ${stats.avgReviews.toFixed(1)}`);
});

// ===== 5. REVENUE BY CATEGORY AND TYPE =====

db.events.aggregate([
    {
        $match: {
            "computedStats.totalRevenue": { $gt: 0 }
        }
    },
    {
        $group: {
            _id: {
                category: "$category",
                eventType: "$eventType"
            },
            eventCount: { $sum: 1 },
            totalRevenue: { $sum: "$computedStats.totalRevenue" },
            avgRevenue: { $avg: "$computedStats.totalRevenue" }
        }
    },
    {
        $sort: { totalRevenue: -1 }
    },
    {
        $limit: 10
    }
]).forEach(segment => {
    print(`${segment._id.category} (${segment._id.eventType}): $${segment.totalRevenue.toFixed(2)} total`);
});
