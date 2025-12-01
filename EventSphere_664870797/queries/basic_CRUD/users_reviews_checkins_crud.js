// EventSphere
// Basic CRUD Operations for Users, Reviews, and Checkins Collections
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== USERS COLLECTION CRUD =====

db.users.insertMany([
    {
        email: "alex.thompson@gmail.com",
        schemaVersion: "1.0",
        profile: {
            firstName: "Alex",
            lastName: "Thompson",
            preferences: {
                categories: ["Technology", "Business", "Networking"],
                location: {
                    type: "Point",
                    coordinates: [-123.1207, 49.2827]
                },
                radiusKm: 30
            }
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: new Date()
    },
    {
        email: "maria.garcia@outlook.com",
        schemaVersion: "1.0",
        profile: {
            firstName: "Maria",
            lastName: "Garcia",
            preferences: {
                categories: ["Arts & Culture", "Music", "Food & Drink"],
                location: {
                    type: "Point",
                    coordinates: [-123.9351, 49.0831]
                },
                radiusKm: 50
            }
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: null
    }
]);

// Find users by category preference
db.users.find({ "profile.preferences.categories": "Technology" }).forEach(user => {
    print(`${user.profile.firstName} ${user.profile.lastName} - ${user.email}`);
});

// Update user preferences
db.users.updateOne(
    { email: "alex.thompson@gmail.com" },
    {
        $addToSet: { "profile.preferences.categories": "Health & Wellness" },
        $set: { 
            lastLogin: new Date(),
            updatedAt: new Date()
        }
    }
);

// Update user location
db.users.updateOne(
    { email: "maria.garcia@outlook.com" },
    {
        $set: {
            "profile.preferences.location": {
                type: "Point",
                coordinates: [-123.1207, 49.2827]
            },
            "profile.preferences.radiusKm": 25,
            updatedAt: new Date()
        }
    }
);

// ===== REVIEWS COLLECTION CRUD =====

const sampleEvent = db.events.findOne({ title: { $regex: /Tech/ } });
const sampleVenue = db.venues.findOne({ venueType: "conferenceCenter" });
const sampleUser = db.users.findOne({ email: "alex.thompson@gmail.com" });

if (sampleEvent && sampleUser) {
    db.reviews.insertMany([
        {
            eventId: sampleEvent._id,
            userId: sampleUser._id,
            rating: 5,
            comment: "Excellent tech summit! Great speakers and valuable networking opportunities.",
            schemaVersion: "1.0",
            createdAt: new Date(),
            updatedAt: null
        },
        {
            eventId: sampleEvent._id,
            userId: ObjectId(),
            rating: 4,
            comment: "Good content and organization. The virtual component could use some improvement.",
            schemaVersion: "1.0",
            createdAt: new Date(),
            updatedAt: null
        }
    ]);
}

if (sampleVenue && sampleUser) {
    db.reviews.insertOne({
        venueId: sampleVenue._id,
        userId: sampleUser._id,
        rating: 4,
        comment: "Professional venue with excellent facilities. Great location and helpful staff.",
        schemaVersion: "1.0",
        createdAt: new Date(),
        updatedAt: null
    });
}

// Find reviews by rating
db.reviews.find({ rating: 5 }).forEach(review => {
    const type = review.eventId ? "Event" : "Venue";
    print(`${type} Review: ${review.rating} stars`);
});

// Find reviews by user
if (sampleUser) {
    db.reviews.find({ userId: sampleUser._id }).forEach(review => {
        print(`Rating: ${review.rating} - ${review.createdAt.toISOString().split('T')[0]}`);
    });
}

// Update review
db.reviews.updateOne(
    { rating: 4, comment: { $regex: /Good content/ } },
    {
        $set: {
            comment: "Good content and organization. The virtual component has improved since my last feedback. Recommended!",
            updatedAt: new Date()
        }
    }
);

// Review rating distribution
db.reviews.aggregate([
    { $group: { _id: "$rating", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
]).forEach(result => {
    print(`${result._id} stars: ${result.count} reviews`);
});

// ===== CHECKINS COLLECTION CRUD =====

const sampleEvent2 = db.events.findOne({ eventType: "hybrid" });
const sampleVenue2 = db.venues.findOne({ venueType: "park" });
const sampleUser2 = db.users.findOne({ email: "maria.garcia@outlook.com" });

if (sampleEvent2 && sampleVenue2 && sampleUser2) {
    db.checkins.insertMany([
        {
            eventId: sampleEvent2._id,
            userId: sampleUser2._id,
            venueId: sampleVenue2._id,
            checkInTime: new Date("2025-10-09T18:30:00Z"),
            qrCode: "QR-HYBRID-001",
            schemaVersion: "1.0",
            ticketTier: "General Admission",
            checkInMethod: "qrCode",
            location: {
                type: "Point",
                coordinates: [-123.1139, 49.2404]
            },
            metadata: {
                deviceInfo: "iPhone 15",
                ipAddress: "192.168.1.105",
                staffVerified: true
            },
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            eventId: sampleEvent2._id,
            userId: sampleUser._id,
            venueId: sampleVenue2._id,
            checkInTime: new Date("2025-10-09T18:45:00Z"),
            qrCode: "QR-HYBRID-002",
            schemaVersion: "1.0",
            ticketTier: "Early Bird",
            checkInMethod: "mobileApp",
            location: {
                type: "Point",
                coordinates: [-123.1139, 49.2404]
            },
            metadata: {
                deviceInfo: "Android Samsung S24",
                ipAddress: "192.168.1.106",
                staffVerified: false
            },
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
}

// Find checkins by event
if (sampleEvent2) {
    db.checkins.find({ eventId: sampleEvent2._id }).forEach(checkin => {
        print(`Check-in: ${checkin.checkInTime.toISOString()} - ${checkin.checkInMethod}`);
    });
}

// Find checkins by method
db.checkins.find({ checkInMethod: "qrCode" }).forEach(checkin => {
    print(`QR Code: ${checkin.qrCode} - ${checkin.checkInTime.toISOString()}`);
});

// Update checkin metadata
db.checkins.updateMany(
    { checkInMethod: "mobileApp" },
    {
        $set: {
            "metadata.staffVerified": true,
            "metadata.verificationTime": new Date(),
            updatedAt: new Date()
        }
    }
);

// Check-in method distribution
db.checkins.aggregate([
    { $group: { _id: "$checkInMethod", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
]).forEach(result => {
    print(`${result._id}: ${result.count} check-ins`);
});

// ===== CROSS-COLLECTION OPERATIONS =====

// User attendance history with lookups
db.checkins.aggregate([
    {
        $match: { userId: sampleUser ? sampleUser._id : ObjectId() }
    },
    {
        $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "_id",
            as: "event"
        }
    },
    {
        $lookup: {
            from: "venues",
            localField: "venueId",
            foreignField: "_id",
            as: "venue"
        }
    },
    { $unwind: "$event" },
    { $unwind: "$venue" },
    { $sort: { checkInTime: -1 } },
    { $limit: 10 },
    {
        $project: {
            _id: 1,
            eventTitle: "$event.title",
            venueName: "$venue.name",
            checkInTime: 1,
            checkInMethod: 1,
            ticketTier: 1
        }
    }
]).forEach(result => {
    print(`${result.eventTitle} at ${result.venueName} - ${result.checkInTime.toISOString()}`);
});

// Users who have written reviews
db.reviews.aggregate([
    { $group: { _id: "$userId", reviewCount: { $sum: 1 } } },
    { $lookup: { 
        from: "users", 
        localField: "_id", 
        foreignField: "_id", 
        as: "user" 
    }},
    { $unwind: "$user" },
    { $project: {
        name: { $concat: ["$user.profile.firstName", " ", "$user.profile.lastName"] },
        email: "$user.email",
        reviewCount: 1
    }}
]).forEach(result => {
    print(`${result.name} (${result.email}): ${result.reviewCount} reviews`);
});

// Events with check-in statistics
db.checkins.aggregate([
    { $group: { 
        _id: "$eventId", 
        totalCheckins: { $sum: 1 },
        uniqueMethods: { $addToSet: "$checkInMethod" }
    }},
    { $lookup: { 
        from: "events", 
        localField: "_id", 
        foreignField: "_id", 
        as: "event" 
    }},
    { $unwind: "$event" },
    { $project: {
        eventTitle: "$event.title",
        totalCheckins: 1,
        methodCount: { $size: "$uniqueMethods" }
    }}
]).forEach(result => {
    print(`${result.eventTitle}: ${result.totalCheckins} check-ins, ${result.methodCount} methods`);
});

// ===== DELETE OPERATIONS =====

// Delete old reviews
const twoYearsAgo = new Date();
twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

const oldReviewsResult = db.reviews.deleteMany({
    createdAt: { $lt: twoYearsAgo }
});
print(`Deleted ${oldReviewsResult.deletedCount} old reviews`);

// Delete checkins for cancelled events
const cancelledEvents = db.events.find({ status: "cancelled" }, { _id: 1 }).toArray();
const cancelledEventIds = cancelledEvents.map(event => event._id);

if (cancelledEventIds.length > 0) {
    const cancelledCheckinsResult = db.checkins.deleteMany({
        eventId: { $in: cancelledEventIds }
    });
    print(`Deleted ${cancelledCheckinsResult.deletedCount} check-ins for cancelled events`);
}

// Delete inactive test users
const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

const activeUserIds = [
    ...db.reviews.distinct("userId"),
    ...db.checkins.distinct("userId")
];

const inactiveUsersResult = db.users.deleteMany({
    $and: [
        { 
            $or: [
                { lastLogin: { $lt: oneYearAgo } },
                { lastLogin: null }
            ]
        },
        { _id: { $nin: activeUserIds } },
        { email: { $regex: /test|demo/i } }
    ]
});
print(`Deleted ${inactiveUsersResult.deletedCount} inactive test users`);

// ===== ADVANCED OPERATIONS =====

// Update user activity based on recent checkins
const recentCheckins = db.checkins.aggregate([
    { $match: { checkInTime: { $gte: new Date(Date.now() - 30*24*60*60*1000) } } },
    { $group: { _id: "$userId", recentActivity: { $sum: 1 } } }
]).toArray();

recentCheckins.forEach(activity => {
    db.users.updateOne(
        { _id: activity._id },
        { 
            $set: { 
                "profile.activityLevel": activity.recentActivity > 5 ? "high" : "moderate",
                updatedAt: new Date()
            }
        }
    );
});

// User engagement summary
db.users.aggregate([
    { $lookup: { 
        from: "reviews", 
        localField: "_id", 
        foreignField: "userId", 
        as: "reviews" 
    }},
    { $lookup: { 
        from: "checkins", 
        localField: "_id", 
        foreignField: "userId", 
        as: "checkins" 
    }},
    { $project: {
        name: { $concat: ["$profile.firstName", " ", "$profile.lastName"] },
        email: 1,
        reviewCount: { $size: "$reviews" },
        checkinCount: { $size: "$checkins" },
        engagementScore: { $add: [{ $size: "$reviews" }, { $size: "$checkins" }] }
    }},
    { $sort: { engagementScore: -1 } }
]).forEach(user => {
    print(`${user.name}: ${user.reviewCount} reviews, ${user.checkinCount} check-ins`);
});