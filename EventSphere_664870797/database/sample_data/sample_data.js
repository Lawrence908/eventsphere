// EventSphere
// Sample Data
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== SUMMARY =====
// 2 events, 2 venues, 2 users, 2 reviews, 2 checkins, 2 tickets

// ===== EVENTS SAMPLE DATA =====

db.events.insertMany([
    {
        _id: ObjectId("68df1000c00b1dff057fb001"),
        title: "Nanaimo Maker Mixer 2025",
        description: "Hands-on demos, micro-talks, and networking time for the mid-Island tech community.",
        category: "Technology",
        eventType: "inPerson",
        schemaVersion: "1.0",
        location: {
            type: "Point",
            coordinates: [-123.9351, 49.0831],
        },
        venueId: ObjectId("68df2000c00b1dff057fb101"),
        venueReference: {
            name: "Makerspace Nanaimo",
            city: "Nanaimo",
            capacity: 180,
            venueType: "conferenceCenter",
        },
        startDate: ISODate("2025-11-08T18:00:00.000Z"),
        endDate: ISODate("2025-11-08T22:00:00.000Z"),
        organizer: "Makerspace Nanaimo Association",
        maxAttendees: 120,
        currentAttendees: 72,
        price: 35,
        currency: "CAD",
        isFree: false,
        status: "published",
        tags: ["technology", "networking", "hardware", "nanaimo"],
        metadata: {
            ageRestriction: "All Ages",
            accessibilityFeatures: ["Wheelchair Accessible"],
        },
        computedStats: {
            totalTicketsSold: 72,
            totalRevenue: 3240,
            attendanceRate: 40.0,
            reviewCount: 1,
            averageRating: 4.5,
            lastUpdated: ISODate("2025-10-20T12:00:00.000Z"),
        },
        tickets: [
            { tier: "General Admission", price: 35, available: 80, sold: 60 },
            { tier: "Student", price: 15, available: 40, sold: 12 }
        ],
        createdAt: ISODate("2025-09-10T16:00:00.000Z"),
        updatedAt: ISODate("2025-10-05T10:30:00.000Z")
    },
    {
        _id: ObjectId("68df1000c00b1dff057fb002"),
        title: "Gastown Product Camp",
        description: "Community-led unconference focused on product discovery and experimentation.",
        category: "Business",
        eventType: "hybrid",
        schemaVersion: "1.0",
        location: {
            type: "Point",
            coordinates: [-123.1171, 49.2845],
        },
        venueId: ObjectId("68df2000c00b1dff057fb102"),
        venueReference: {
            name: "Gastown Loft Studio",
            city: "Vancouver",
            capacity: 120,
            venueType: "conferenceCenter",
        },
        startDate: ISODate("2025-12-02T17:00:00.000Z"),
        endDate: ISODate("2025-12-02T21:30:00.000Z"),
        organizer: "Pacific Product Collective",
        maxAttendees: 270,
        currentAttendees: 95,
        price: 0,
        currency: "CAD",
        isFree: true,
        status: "published",
        tags: ["product", "community", "hybrid"],
        hybridDetails: {
            virtualCapacity: 150,
            inPersonCapacity: 120,
            virtualMeetingUrl: "https://meet.goto.com/pacific-product",
        },
        metadata: {
            ageRestriction: "18+",
        },
        computedStats: {
            totalTicketsSold: 95,
            totalRevenue: 0,
            attendanceRate: 43.0,
            reviewCount: 2,
            averageRating: 4.7,
            lastUpdated: ISODate("2025-10-25T09:00:00.000Z"),
        },
        tickets: [
            { tier: "Virtual Pass", price: 0, available: 150, sold: 40 },
            { tier: "Loft Seat", price: 0, available: 120, sold: 55 }
        ],
        createdAt: ISODate("2025-09-18T08:15:00.000Z"),
        updatedAt: ISODate("2025-10-18T08:15:00.000Z")
    }
]);

// ===== VENUES SAMPLE DATA =====

db.venues.insertMany([
    {
        _id: ObjectId('691989d3327c1c1015c41914'),
        name: 'Maffeo Sutton Park - Nanaimo',
        venueType: 'park',
        schemaVersion: '1.0',
        type: 'Park',
        description: 'A park located in Nanaimo, perfect for various events and gatherings.',
        location: {
            type: 'Point',
            coordinates: [-123.95471208657362, 49.08673107149183]
        },
        address: {
            street: '100 Comox Rd',
            city: 'Nanaimo',
            state: 'BC',
            zipCode: 'V9R 3H7',
            country: 'Canada'
        },
        capacity: 1039,
        amenities: [
            'Audio/Visual Equipment',
            'Storage',
            'Restrooms',
            'Stage'
        ],
        contact: {
            phone: '(250) 756-5200',
            email: 'info@maffeosuttonpark.com',
            website: 'https://www.nanaimo.ca'
        },
        pricing: { hourlyRate: 143, dailyRate: 784, currency: 'CAD' },
        availability: {
            monday: { open: '09:00', close: '22:00' },
            tuesday: { open: '09:00', close: '22:00' },
            wednesday: { open: '09:00', close: '22:00' },
            thursday: { open: '09:00', close: '22:00' },
            friday: { open: '09:00', close: '23:00' },
            saturday: { open: '10:00', close: '23:00' },
            sunday: { open: '10:00', close: '20:00' }
        },
        rating: 4.4,
        reviewCount: 78,
        createdAt: ISODate('2024-12-29T08:22:43.143Z'),
        updatedAt: ISODate('2025-11-02T08:22:43.143Z'),
        parkDetails: {
            outdoorSpace: true,
            parkingSpaces: 311,
            restroomFacilities: true
        },
        computedStats: {
            totalEventsHosted: 64,
            averageAttendance: 163,
            revenueGenerated: 129679,
            lastEventDate: ISODate('2025-10-15T08:22:43.143Z'),
            lastUpdated: ISODate('2025-11-16T08:22:43.143Z')
        }
    },
    {
        _id: ObjectId('691989d3327c1c1015c41945'),
        name: 'Port Theatre - Nanaimo',
        venueType: 'theater',
        schemaVersion: '1.0',
        type: 'Theater',
        description: 'Modern 800-seat theatre for live performances, including comedy, plays, rock shows & the symphony.',
        location: {
            type: 'Point',
            coordinates: [-123.96078524689024, 49.1290915950075]
        },
        address: {
            street: '125 Front St',
            city: 'Nanaimo',
            state: 'BC',
            zipCode: 'V9R 6Z4',
            country: 'Canada'
        },
        capacity: 242,
        amenities: ['Air Conditioning', 'Green Room', 'Wheelchair Accessible', "Restrooms"],
        contact: {
            phone: '(250) 754-8550',
            email: 'info@porttheatre.com',
            website: 'http://www.porttheatre.com/'
        },
        pricing: { hourlyRate: 252, dailyRate: 1873, currency: 'CAD' },
        availability: {
            monday: { open: '09:00', close: '22:00' },
            tuesday: { open: '09:00', close: '22:00' },
            wednesday: { open: '09:00', close: '22:00' },
            thursday: { open: '09:00', close: '22:00' },
            friday: { open: '09:00', close: '23:00' },
            saturday: { open: '10:00', close: '23:00' },
            sunday: { open: '10:00', close: '20:00' }
        },
        rating: 4.7,
        reviewCount: 111,
        createdAt: ISODate('2025-09-23T08:22:43.145Z'),
        updatedAt: ISODate('2025-10-25T08:22:43.145Z'),
        computedStats: {
            totalEventsHosted: 155,
            averageAttendance: 178,
            revenueGenerated: 1130131,
            lastEventDate: ISODate('2025-09-04T08:22:43.145Z'),
            lastUpdated: ISODate('2025-11-16T08:22:43.145Z')
        }
    }
]);

// ===== USERS SAMPLE DATA =====

db.users.insertMany([
    {
        _id: ObjectId("68df3000c00b1dff057fb301"),
        email: "sarah.johnson@gmail.com",
        schemaVersion: "1.0",
        profile: {
            firstName: "Sarah",
            lastName: "Johnson",
            preferences: {
                categories: ["Technology", "Business"],
                location: {
                    type: "Point",
                    coordinates: [-123.1171, 49.2845], // Vancouver
                },
                radiusKm: 100
            }
        },
        createdAt: ISODate("2024-03-15T10:30:00.000Z"),
        updatedAt: ISODate("2025-10-12T14:22:00.000Z"),
        lastLogin: ISODate("2025-10-20T09:15:00.000Z")
    },
    {
        _id: ObjectId("68df3000c00b1dff057fb302"),
        email: "mike.chen@outlook.com",
        schemaVersion: "1.0",
        profile: {
            firstName: "Mike",
            lastName: "Chen",
            preferences: {
                categories: ["Music", "Technology"],
                location: {
                    type: "Point",
                    coordinates: [-123.968299, 49.159598], // Nanaimo
                },
                radiusKm: 10
            }
        },
        createdAt: ISODate("2024-07-22T16:45:00.000Z"),
        updatedAt: ISODate("2025-09-01T11:30:00.000Z"),
        lastLogin: ISODate("2025-10-18T20:45:00.000Z")
    }
]);

// ===== REVIEWS SAMPLE DATA =====

db.reviews.insertMany([
    {
        _id: ObjectId("68df4000c00b1dff057fb401"),
        eventId: ObjectId("68df1000c00b1dff057fb001"),
        userId: ObjectId("68df3000c00b1dff057fb302"),
        rating: 5,
        comment: "Loved the soldering lab and short talks; perfect size for Nanaimo.",
        schemaVersion: "1.0",
        createdAt: ISODate("2025-11-09T05:30:00.000Z"),
        updatedAt: null
    },
    {
        _id: ObjectId("68df4000c00b1dff057fb402"),
        venueId: ObjectId("68df2000c00b1dff057fb102"),
        userId: ObjectId("68df3000c00b1dff057fb301"),
        rating: 4,
        comment: "Gastown Loft has great acoustics; elevators can get busy.",
        schemaVersion: "1.0",
        createdAt: ISODate("2025-10-22T18:00:00.000Z"),
        updatedAt: null
    }
]);

// ===== CHECKINS SAMPLE DATA =====

db.checkins.insertMany([
    {
        _id: ObjectId('691989d4327c1c1015c4f7f8'),
        eventId: ObjectId('691989d3327c1c1015c42a75'),
        userId: ObjectId('691989d3327c1c1015c41977'),
        venueId: ObjectId('691989d4327c1c1015c4f7f7'),
        ticketId: null,
        checkInTime: ISODate('2025-12-20T04:53:05.305Z'),
        qrCode: null,
        schemaVersion: '1.0',
        ticketTier: 'Early Bird',
        checkInMethod: 'manual',
        location: {
            type: 'Point',
            coordinates: [-123.954654, 49.155701] 
        },
        metadata: { deviceInfo: 'iPhone', ipAddress: null, staffVerified: false },
        createdAt: ISODate('2025-12-20T04:53:05.305Z'),
        updatedAt: ISODate('2025-12-20T04:53:05.305Z')
    },
    {
        _id: ObjectId('691989d4327c1c1015c4f7fe'),
        eventId: ObjectId('691989d3327c1c1015c4339e'),
        userId: ObjectId('691989d3327c1c1015c41978'),
        venueId: ObjectId('691989d4327c1c1015c4f7fd'),
        ticketId: null,
        checkInTime: ISODate('2026-03-01T00:16:31.412Z'),
        qrCode: 'QR-289636',
        schemaVersion: '1.0',
        ticketTier: 'VIP',
        checkInMethod: 'qrCode',
        location: {
            type: 'Point',
            coordinates: [-75.717198, 45.431345] // Ottawa
        },
        metadata: {
            deviceInfo: null,
            ipAddress: '64.235.229.20',
            staffVerified: true
        },
        createdAt: ISODate('2026-03-01T00:16:31.412Z'),
        updatedAt: ISODate('2026-03-01T00:16:31.412Z')
    }
]);

// ===== TICKETS SAMPLE DATA =====

db.tickets.insertMany([
    {
        _id: ObjectId('691989d3327c1c1015c44888'),
        eventId: ObjectId('691989d3327c1c1015c422b4'),
        userId: ObjectId('691989d3327c1c1015c41e15'),
        pricePaid: 45.00,
        status: "used",
        ticketTier: "General Admission",
        purchasedAt: ISODate("2025-10-12T13:00:00.000Z"),
        schemaVersion: "1.0",
        createdAt: ISODate("2025-10-12T13:00:00.000Z")
    },
    {
        _id: ObjectId('691989d3327c1c1015c4488a'),
        eventId: ObjectId('691989d3327c1c1015c42874'),
        userId: ObjectId('691989d3327c1c1015c41ae1'),
        pricePaid: 120.00,
        status: "active",
        ticketTier: "VIP",
        purchasedAt: ISODate("2025-10-20T08:30:00.000Z"),
        schemaVersion: "1.0",
        createdAt: ISODate("2025-10-20T08:30:00.000Z")
    }
]);
