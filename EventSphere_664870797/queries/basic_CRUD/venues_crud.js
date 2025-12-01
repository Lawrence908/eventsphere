// EventSphere
// Basic CRUD Operations for Venues Collection
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== CREATE OPERATIONS =====

db.venues.insertOne({
    name: "Pacific Conference Centre - Richmond",
    venueType: "conferenceCenter",
    schemaVersion: "1.0",
    type: "Conference Center",
    description: "Modern conference facility near Vancouver International Airport with state-of-the-art technology.",
    location: {
        type: "Point",
        coordinates: [-123.1836, 49.1666]
    },
    address: {
        street: "8788 McKim Way",
        city: "Richmond",
        state: "BC",
        zipCode: "V6X 4E2",
        country: "Canada"
    },
    capacity: 800,
    amenities: [
        "WiFi", "Parking", "Audio/Visual Equipment", "Catering",
        "Air Conditioning", "Accessibility", "Security", "Reception Area",
        "Business Center", "Translation Services"
    ],
    contact: {
        phone: "(604) 278-9611",
        email: "info@pacificconference.com",
        website: "https://www.pacificconference.com"
    },
    pricing: {
        hourlyRate: 350,
        dailyRate: 2500,
        currency: "CAD"
    },
    availability: {
        monday: { open: "07:00", close: "23:00" },
        tuesday: { open: "07:00", close: "23:00" },
        wednesday: { open: "07:00", close: "23:00" },
        thursday: { open: "07:00", close: "23:00" },
        friday: { open: "07:00", close: "24:00" },
        saturday: { open: "08:00", close: "24:00" },
        sunday: { open: "08:00", close: "22:00" }
    },
    rating: 0,
    reviewCount: 0,
    conferenceCenterDetails: {
        breakoutRooms: 15,
        avEquipment: ["4K Projectors", "Wireless Microphones", "Video Conferencing", "Live Streaming"],
        cateringAvailable: true
    },
    computedStats: {
        totalEventsHosted: 0,
        averageAttendance: 0,
        revenueGenerated: 0,
        lastEventDate: null,
        lastUpdated: new Date()
    },
    createdAt: new Date(),
    updatedAt: new Date()
});

db.venues.insertMany([
    {
        name: "The Orpheum Theatre",
        venueType: "theater",
        schemaVersion: "1.0",
        type: "Theater",
        description: "Historic performing arts venue in downtown Vancouver, home to the Vancouver Symphony Orchestra.",
        location: {
            type: "Point",
            coordinates: [-123.1207, 49.2827]
        },
        address: {
            street: "601 Smithe St",
            city: "Vancouver",
            state: "BC",
            zipCode: "V6B 5G1",
            country: "Canada"
        },
        capacity: 2780,
        amenities: [
            "Historic Architecture", "Professional Lighting", "Sound System",
            "Dressing Rooms", "Orchestra Pit", "Balcony Seating", "Accessibility"
        ],
        contact: {
            phone: "(604) 665-3050",
            email: "info@orpheum.ca",
            website: "https://www.orpheum.ca"
        },
        pricing: {
            hourlyRate: 1200,
            dailyRate: 8000,
            currency: "CAD"
        },
        rating: 4.8,
        reviewCount: 156,
        theaterDetails: {
            stageType: "Proscenium",
            orchestraPit: true,
            dressingRooms: 12,
            technicalCapabilities: ["Full Fly System", "Professional Lighting Grid", "Digital Sound"]
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Virtual Event Platform Pro",
        venueType: "virtualSpace",
        schemaVersion: "1.0",
        type: "Virtual Space",
        description: "Premium virtual event platform with advanced networking and interaction features.",
        location: {
            type: "Point",
            coordinates: [-123.1207, 49.2827] // Virtual location reference
        },
        address: {
            street: "Cloud Infrastructure",
            city: "Vancouver",
            state: "BC",
            zipCode: "V0V 0V0",
            country: "Canada"
        },
        capacity: 10000,
        amenities: [
            "HD Video Streaming", "Interactive Chat", "Breakout Rooms",
            "Screen Sharing", "Recording", "Live Polling", "Networking Lounges"
        ],
        contact: {
            phone: "(604) 555-VIRTUAL",
            email: "support@virtualeventpro.com",
            website: "https://www.virtualeventpro.com"
        },
        pricing: {
            hourlyRate: 200,
            dailyRate: 1500,
            currency: "CAD"
        },
        rating: 4.2,
        reviewCount: 89,
        virtualSpaceDetails: {
            platform: "Custom Platform",
            maxConcurrentUsers: 10000,
            recordingCapability: true,
            interactiveFeatures: ["Virtual Networking", "3D Environments", "Gamification"]
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

// ===== READ OPERATIONS =====

db.venues.find().limit(3);

db.venues.find({ venueType: "conferenceCenter" });

db.venues.find({ capacity: { $gt: 1000 } });

db.venues.find({ "address.city": "Vancouver" });

db.venues.find({ 
    amenities: { $all: ["WiFi", "Parking"] }
});

db.venues.find({ rating: { $gte: 4.5 } });

db.venues.find({ 
    $or: [
        { "conferenceCenterDetails.cateringAvailable": true },
        { amenities: "Catering" }
    ]
});

db.venues.find({
    "location.coordinates.0": { $gte: -123.3, $lte: -123.0 },
    "location.coordinates.1": { $gte: 49.2, $lte: 49.3 },
    capacity: { $gte: 500, $lte: 3000 }
});

// ===== UPDATE OPERATIONS =====

db.venues.updateOne(
    { name: "Pacific Conference Centre - Richmond" },
    {
        $set: {
            rating: 4.3,
            reviewCount: 25,
            "computedStats.totalEventsHosted": 12,
            "computedStats.averageAttendance": 450,
            "computedStats.revenueGenerated": 30000,
            "computedStats.lastEventDate": new Date("2025-10-15T00:00:00Z"),
            "computedStats.lastUpdated": new Date(),
            updatedAt: new Date()
        }
    }
);

db.venues.updateMany(
    { venueType: "conferenceCenter" },
    {
        $mul: { 
            "pricing.hourlyRate": 1.05,
            "pricing.dailyRate": 1.05 
        },
        $set: { updatedAt: new Date() }
    }
);

db.venues.updateMany(
    {},
    {
        $addToSet: { amenities: "High-Speed Internet" },
        $set: { updatedAt: new Date() }
    }
);

db.venues.updateMany(
    { venueType: "theater" },
    {
        $set: {
            "availability.saturday.open": "10:00",
            "availability.saturday.close": "24:00",
            "availability.sunday.open": "12:00",
            "availability.sunday.close": "22:00",
            updatedAt: new Date()
        }
    }
);

db.venues.updateMany(
    { amenities: "WiFi" },
    {
        $set: { "amenities.$": "High-Speed WiFi", updatedAt: new Date() }
    }
);

// ===== DELETE OPERATIONS =====

db.venues.insertOne({
    name: "Test Venue for Deletion",
    venueType: "park",
    schemaVersion: "1.0",
    address: {
        street: "123 Test St",
        city: "Test City",
        state: "BC",
        zipCode: "T0T 0T0",
        country: "Canada"
    },
    location: {
        type: "Point",
        coordinates: [-123.0, 49.0]
    },
    capacity: 100,
    createdAt: new Date(),
    updatedAt: new Date()
});

db.venues.deleteOne({
    name: "Test Venue for Deletion"
});

db.venues.deleteMany({
    "computedStats.totalEventsHosted": 0,
    name: { $regex: /^Test/ }
});

// ===== ADVANCED CRUD OPERATIONS =====

db.venues.findOneAndUpdate(
    { capacity: { $gt: 0 } },
    {
        $inc: { "computedStats.totalEventsHosted": 1 },
        $set: { 
            "computedStats.lastUpdated": new Date(),
            updatedAt: new Date()
        }
    },
    { 
        sort: { capacity: -1 },
        returnDocument: "after"
    }
);

const bulkOps = [
    {
        updateOne: {
            filter: { venueType: "virtualSpace" },
            update: { 
                $set: { 
                    "virtualSpaceDetails.securityFeatures": ["End-to-End Encryption", "Waiting Room", "Password Protection"]
                }
            }
        }
    },
    {
        updateMany: {
            filter: { rating: { $gte: 4.0 } },
            update: { $addToSet: { amenities: "Premium Service" } }
        }
    },
    {
        insertOne: {
            document: {
                name: "Bulk Insert Test Venue",
                venueType: "restaurant",
                schemaVersion: "1.0",
                address: {
                    street: "456 Bulk St",
                    city: "Vancouver",
                    state: "BC",
                    zipCode: "V6B 1A1",
                    country: "Canada"
                },
                location: { type: "Point", coordinates: [-123.1207, 49.2827] },
                capacity: 50,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }
    }
];

db.venues.bulkWrite(bulkOps);

db.venues.deleteOne({ name: "Bulk Insert Test Venue" });

db.venues.updateMany(
    { capacity: { $gte: 1000 } },
    {
        $set: { 
            category: "Large Venue",
            updatedAt: new Date()
        }
    }
);

db.venues.updateMany(
    { capacity: { $gte: 100, $lt: 1000 } },
    {
        $set: { 
            category: "Medium Venue",
            updatedAt: new Date()
        }
    }
);

db.venues.updateMany(
    { capacity: { $lt: 100 } },
    {
        $set: { 
            category: "Small Venue",
            updatedAt: new Date()
        }
    }
);
