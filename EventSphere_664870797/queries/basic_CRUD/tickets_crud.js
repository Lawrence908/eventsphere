// EventSphere
// Basic CRUD Operations for Tickets Collection
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== CREATE OPERATIONS =====

// Purchase a single ticket
db.tickets.insertOne({
    eventId: ObjectId("68df1000c00b1dff057fb001"),
    userId: ObjectId("68df3000c00b1dff057fb301"),
    pricePaid: 45.00,
    status: "active",
    ticketTier: "General Admission",
    purchasedAt: new Date(),
    schemaVersion: "1.0",
    createdAt: new Date()
});

// ===== READ OPERATIONS =====

// Find all tickets for a specific event
db.tickets.find({ eventId: ObjectId("68df1000c00b1dff057fb001") });

// Find all tickets for a specific user (a future feature for a "My Tickets" page)
db.tickets.find({ userId: ObjectId("68df3000c00b1dff057fb301") });

// Find active tickets for a user
db.tickets.find({ 
    userId: ObjectId("68df3000c00b1dff057fb301"),
    status: "active"
});

// Find tickets by tier for an event
db.tickets.find({ 
    eventId: ObjectId("68df1000c00b1dff057fb001"),
    ticketTier: "VIP"
});

// Find recent ticket purchases (last 7 days)
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

db.tickets.find({
    purchasedAt: { $gte: sevenDaysAgo }
}).sort({ purchasedAt: -1 });

// Count tickets sold by tier for an event
db.tickets.aggregate([
    { $match: { eventId: ObjectId("68df1000c00b1dff057fb001") } },
    { $group: { _id: "$ticketTier", count: { $sum: 1 }, revenue: { $sum: "$pricePaid" } } },
    { $sort: { count: -1 } }
]);

// ===== UPDATE OPERATIONS =====

// Mark ticket as used (after check-in)
db.tickets.updateOne(
    { _id: ObjectId("691989d3327c1c1015c44888") },
    { 
        $set: { 
            status: "used"
        }
    }
);

// Cancel a ticket
db.tickets.updateOne(
    { 
        userId: ObjectId("68df3000c00b1dff057fb301"),
        eventId: ObjectId("68df1000c00b1dff057fb001"),
        status: "active"
    },
    { 
        $set: { status: "cancelled" }
    }
);

// Process refund for a ticket
db.tickets.updateOne(
    { _id: ObjectId("691989d3327c1c1015c4488a") },
    { 
        $set: { status: "refunded" }
    }
);

// Bulk cancel tickets for a cancelled event
db.tickets.updateMany(
    { 
        eventId: ObjectId("68df1000c00b1dff057fb001"),
        status: "active"
    },
    { 
        $set: { status: "cancelled" }
    }
);

// ===== DELETE OPERATIONS =====

// Delete old refunded tickets (cleanup - older than 1 year)
const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

db.tickets.deleteMany({
    status: "refunded",
    purchasedAt: { $lt: oneYearAgo }
});

