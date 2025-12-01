// EventSphere
// Basic CRUD Operations for Events Collection
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== CREATE OPERATIONS =====

db.events.insertOne({
    title: "Vancouver Food Festival 2025",
    description: "Celebrate the diverse culinary landscape of Vancouver with local chefs and restaurants.",
    category: "Food & Drink",
    eventType: "inPerson",
    schemaVersion: "1.0",
    location: {
        type: "Point",
        coordinates: [-123.1207, 49.2827]
    },
    venueId: ObjectId("68ddb640c00b1dff057fb3b4"),
    venueReference: {
        name: "Queen Elizabeth Park",
        city: "Vancouver",
        capacity: 5000,
        venueType: "park"
    },
    startDate: new Date("2025-07-15T11:00:00Z"),
    endDate: new Date("2025-07-15T20:00:00Z"),
    organizer: "Vancouver Culinary Society",
    maxAttendees: 2000,
    currentAttendees: 0,
    price: 45,
    currency: "CAD",
    isFree: false,
    status: "published",
    tags: ["food", "festival", "outdoor", "family-friendly", "local"],
    metadata: {
        ageRestriction: "All Ages",
        dressCode: "Casual",
        accessibilityFeatures: ["Wheelchair Accessible", "Family Restrooms"]
    },
    tickets: [
        {
            tier: "Early Bird",
            price: 35,
            available: 500,
            sold: 0
        },
        {
            tier: "General Admission",
            price: 45,
            available: 1500,
            sold: 0
        }
    ],
    computedStats: {
        totalTicketsSold: 0,
        totalRevenue: 0,
        attendanceRate: 0,
        reviewCount: 0,
        averageRating: 0,
        lastUpdated: new Date()
    },
    createdAt: new Date(),
    updatedAt: new Date()
});

db.events.insertMany([
    {
        title: "AI Workshop Series - Session 1",
        description: "Introduction to Machine Learning fundamentals for beginners.",
        category: "Technology",
        eventType: "virtual",
        schemaVersion: "1.0",
        location: {
            type: "Point",
            coordinates: [-123.1207, 49.2827]
        },
        startDate: new Date("2025-11-20T19:00:00Z"),
        endDate: new Date("2025-11-20T21:00:00Z"),
        organizer: "Vancouver AI Society",
        maxAttendees: 100,
        currentAttendees: 0,
        price: 0,
        currency: "CAD",
        isFree: true,
        status: "published",
        tags: ["technology", "AI", "workshop", "beginner", "free"],
        virtualDetails: {
            platform: "Zoom",
            meetingUrl: "https://zoom.us/j/987654321",
            recordingAvailable: true,
            timezone: "PST"
        },
        tickets: [{
            tier: "Free Registration",
            price: 0,
            available: 100,
            sold: 0
        }],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Monthly Book Club Meeting",
        description: "Discussing 'The Seven Husbands of Evelyn Hugo' this month.",
        category: "Arts & Culture",
        eventType: "recurring",
        schemaVersion: "1.0",
        location: {
            type: "Point",
            coordinates: [-123.9351, 49.0831]
        },
        startDate: new Date("2025-11-05T18:30:00Z"),
        endDate: new Date("2025-11-05T20:30:00Z"),
        organizer: "Nanaimo Public Library",
        maxAttendees: 25,
        currentAttendees: 0,
        price: 0,
        currency: "CAD",
        isFree: true,
        status: "published",
        tags: ["books", "discussion", "monthly", "community", "free"],
        recurringDetails: {
            frequency: "monthly",
            endRecurrence: new Date("2025-12-31T23:59:59Z"),
            exceptions: []
        },
        tickets: [{
            tier: "Free Attendance",
            price: 0,
            available: 25,
            sold: 0
        }],
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

// ===== READ OPERATIONS =====

db.events.find().limit(3);

db.events.find({ category: "Technology" });

db.events.find({ eventType: "virtual" });

db.events.find({ isFree: true });

db.events.find({
    startDate: {
        $gte: new Date("2025-11-01T00:00:00Z"),
        $lte: new Date("2025-11-30T23:59:59Z")
    }
});

db.events.find({ tags: "workshop" });

db.events.find({ "venueReference.venueType": "park" });

db.events.find({
    status: "published",
    price: { $lt: 50 },
    "location.coordinates.0": { $gte: -123.5, $lte: -123.0 },
    "location.coordinates.1": { $gte: 49.0, $lte: 49.5 }
});

// ===== UPDATE OPERATIONS =====

db.events.updateOne(
    { title: "Vancouver Food Festival 2025" },
    { 
        $set: { 
            currentAttendees: 150,
            "computedStats.totalTicketsSold": 150,
            "computedStats.totalRevenue": 6750,
            "computedStats.attendanceRate": 7.5,
            updatedAt: new Date()
        }
    }
);

db.events.updateMany(
    { eventType: "virtual" },
    { 
        $set: { 
            "virtualDetails.recordingNotice": "This session will be recorded for educational purposes",
            updatedAt: new Date()
        }
    }
);

db.events.updateMany(
    { category: "Technology" },
    { 
        $addToSet: { tags: "innovation" },
        $set: { updatedAt: new Date() }
    }
);

db.events.updateOne(
    { title: "Vancouver Food Festival 2025" },
    {
        $set: {
            "tickets.0.sold": 250,
            "tickets.0.available": 250,
            "tickets.1.sold": 100,
            "tickets.1.available": 1400,
            updatedAt: new Date()
        }
    }
);

db.events.updateOne(
    { title: "Community Yoga in the Park" },
    {
        $set: {
            title: "Community Yoga in the Park",
            description: "Free outdoor yoga session for all skill levels.",
            category: "Health & Wellness",
            eventType: "inPerson",
            schemaVersion: "1.0",
            location: {
                type: "Point",
                coordinates: [-123.1139, 49.2404]
            },
            startDate: new Date("2025-12-01T08:00:00Z"),
            endDate: new Date("2025-12-01T09:30:00Z"),
            organizer: "Vancouver Wellness Community",
            price: 0,
            isFree: true,
            status: "published",
            tags: ["yoga", "wellness", "outdoor", "free", "community"],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    },
    { upsert: true }
);

// ===== DELETE OPERATIONS =====

db.events.deleteOne({
    title: "Community Yoga in the Park"
});

db.events.deleteMany({
    status: "draft"
});

const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

db.events.deleteMany({
    status: "completed",
    endDate: { $lt: sixMonthsAgo }
});