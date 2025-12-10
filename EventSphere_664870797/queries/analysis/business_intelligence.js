// EventSphere
// Business Intelligence Analysis Queries
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== 1. REVENUE ANALYSIS =====

db.events.aggregate([
    {
        $match: {
            "computedStats.totalRevenue": { $gt: 0 },
            status: { $in: ["published", "completed"] }
        }
    },
    {
        $group: {
            _id: "$category",
            totalRevenue: { $sum: "$computedStats.totalRevenue" },
            eventCount: { $sum: 1 }
        }
    },
    {
        $sort: { totalRevenue: -1 }
    }
]).forEach(cat => {
    print(`${cat._id}: $${cat.totalRevenue.toFixed(2)} revenue, ${cat.eventCount} events`);
});

// ===== 2. CUSTOMER SEGMENTATION =====

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
        $addFields: {
            totalCheckins: { $size: "$checkins" },
            engagementLevel: {
                $cond: {
                    if: { $eq: ["$totalCheckins", 0] },
                    then: "Inactive",
                    else: {
                        $cond: {
                            if: { $lte: ["$totalCheckins", 2] },
                            then: "Casual",
                            else: {
                                $cond: {
                                    if: { $lte: ["$totalCheckins", 5] },
                                    then: "Regular",
                                    else: "Active"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        $group: {
            _id: "$engagementLevel",
            userCount: { $sum: 1 },
            avgCheckins: { $avg: "$totalCheckins" }
        }
    },
    {
        $sort: { userCount: -1 }
    }
]).forEach(segment => {
    print(`${segment._id}: ${segment.userCount} users, ${segment.avgCheckins.toFixed(1)} avg check-ins`);
});

// ===== 3. COMPETITIVE ANALYSIS =====

db.events.aggregate([
    {
        $match: {
            organizer: { $ne: null },
            status: { $in: ["published", "completed"] }
        }
    },
    {
        $group: {
            _id: "$organizer",
            eventCount: { $sum: 1 },
            totalRevenue: { $sum: "$computedStats.totalRevenue" }
        }
    },
    {
        $match: { eventCount: { $gte: 2 } }
    },
    {
        $sort: { totalRevenue: -1 }
    },
    {
        $limit: 10
    }
]).forEach(organizer => {
    print(`${organizer._id}: ${organizer.eventCount} events, $${organizer.totalRevenue.toFixed(2)} revenue`);
});
