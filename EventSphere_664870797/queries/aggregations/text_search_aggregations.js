// EventSphere
// Text Search Aggregation Pipelines
// Student ID: 664 870 797 - Chris Lawrence
// CSCI 485 - Fall 2025

// ===== 1. BASIC TEXT SEARCH WITH RELEVANCE =====

db.events.aggregate([
    {
        $match: {
            $text: { $search: "technology conference" }
        }
    },
    {
        $addFields: {
            relevanceScore: { $meta: "textScore" }
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
    {
        $project: {
            title: 1,
            description: 1,
            category: 1,
            eventType: 1,
            startDate: 1,
            price: 1,
            relevanceScore: 1,
            venueName: { $arrayElemAt: ["$venue.name", 0] },
            tags: 1
        }
    },
    {
        $sort: { relevanceScore: { $meta: "textScore" }, startDate: 1 }
    },
    {
        $limit: 5
    }
]).forEach(event => {
    print(event.title);
});

// ===== 2. ADVANCED TEXT SEARCH WITH FILTERS =====

db.events.aggregate([
    {
        $match: {
            $and: [
                { $text: { $search: "music jazz" } },
                { price: { $lte: 50 } },
                { startDate: { $gte: new Date("2025-10-01") } },
                { status: "published" }
            ]
        }
    },
    {
        $addFields: {
            relevanceScore: { $meta: "textScore" },
            matchedTerms: {
                $size: {
                    $setIntersection: [
                        { $split: [{ $toLower: "$title" }, " "] },
                        ["music", "jazz", "concert", "performance"]
                    ]
                }
            }
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
        $addFields: {
            avgRating: { $avg: "$reviews.rating" },
            reviewCount: { $size: "$reviews" }
        }
    },
    {
        $project: {
            title: 1,
            category: 1,
            eventType: 1,
            startDate: 1,
            price: 1,
            isFree: 1,
            relevanceScore: 1,
            matchedTerms: 1,
            avgRating: 1,
            reviewCount: 1,
            tags: 1,
            "venueReference.name": 1,
            "venueReference.city": 1
        }
    },
    {
        $sort: { 
            relevanceScore: { $meta: "textScore" },
            matchedTerms: -1,
            avgRating: -1
        }
    }
]).forEach(event => {
    print(event.title);
});

// ===== 3. CATEGORY-BASED TEXT SEARCH =====

db.events.aggregate([
    {
        $facet: {
            technologyEvents: [
                { $match: { 
                    category: "Technology",
                    $text: { $search: "AI machine learning workshop conference" }
                }},
                { $addFields: { relevanceScore: { $meta: "textScore" } }},
                { $sort: { relevanceScore: { $meta: "textScore" } }},
                { $limit: 3 }
            ],
            musicEvents: [
                { $match: { 
                    category: "Music",
                    $text: { $search: "jazz classical concert performance" }
                }},
                { $addFields: { relevanceScore: { $meta: "textScore" } }},
                { $sort: { relevanceScore: { $meta: "textScore" } }},
                { $limit: 3 }
            ],
            businessEvents: [
                { $match: { 
                    category: "Business",
                    $text: { $search: "networking startup entrepreneur conference" }
                }},
                { $addFields: { relevanceScore: { $meta: "textScore" } }},
                { $sort: { relevanceScore: { $meta: "textScore" } }},
                { $limit: 3 }
            ]
        }
    }
]).forEach(results => {
    results.technologyEvents.forEach(event => {
        print(event.title);
    });
    results.musicEvents.forEach(event => {
        print(event.title);
    });
    results.businessEvents.forEach(event => {
        print(event.title);
    });
});
