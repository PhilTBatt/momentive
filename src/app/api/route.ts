import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({
            "GET /api": {
                description: "Serves a JSON representation of all the available endpoints of the API",
            },

            "GET /api/events": {
                description: "Returns a list of events",
                queries: ["sortBy", "order", "topic", "userId", "limit", "page"],
                exampleResponse: {
                    events: [
                        {
                            id: "1",
                            title: "Event Title",
                            description: "Event Description",
                            date: "2025-04-30",
                            location: "Leeds",
                            topic: "Programming",
                            createdBy: "1",
                            attendees: 10,
                        }
                    ]
                }
            },

            "POST /api/events": {
                description: "Adds a new event",
                queries: [],
                requestBody: {
                    id: 2,
                    title: "Event Title",
                    description: "Event Description",
                    date: "2025-04-30",
                    location: "Leeds",
                    topic: "Programming",
                },
                exampleResponse: {
                    event: {
                        id: "1",
                        title: "New Event",
                        description: "Some details here",
                        date: "2025-04-30",
                        location: "Leeds",
                        topic: "Programming",
                        createdBy: '2'
                    }
                }
            },

            "GET /api/events/:id": {
                description: "Returns a single event by ID",
                queries: [],
                exampleResponse: {
                    event: {
                        id: "1",
                        title: "JavaScript Meetup",
                        description: "Let's code!",
                        date: "2025-04-30",
                        location: "Leeds",
                        topic: "Programming",
                        createdBy: '2'
                    }
                }
            },

            "PATCH /api/events/:id": {
                description: "Updates an event by ID",
                queries: [],
                requestBody: {
                    id: '1',
                    title: "Updated title",
                    description: "Updated description",
                    date: "2025-05-01",
                    location: "Manchester",
                    topic: "Web Development"
                },
                exampleResponse: {
                    event: {
                        id: "1",
                        title: "Updated title",
                        description: "Updated desc",
                        date: "2025-05-01",
                        location: "Manchester",
                        topic: "Web Development",
                        createdBy: '2'
                    }
                }
            },

            "DELETE /api/events/:id": {
                description: "Deletes an event by ID",
                queries: [],
                exampleResponse: {
                    msg: 'Event deleted successfully'
                }
            },

            "POST /api/events/:id/attendees": {
                description: "Adds an attendee to an event",
                queries: [],
                requestBody: {
                    name: "Attendee Name",
                    email: "attendee@example.com",
                },
                exampleResponse: {
                    event: {
                        id: "1",
                        title: "JavaScript Meetup",
                        description: "Let's code!",
                        date: "2025-04-30",
                        location: "Leeds",
                        attendees: [
                            { name: "John Doe", email: "john@example.com" },
                            { name: "Jane Smith", email: "jane@example.com" }
                        ]
                    }
                }
            },

            "GET /api/users": {
                description: "Returns a list of users",
                queries: ["order", "limit", "page"],
                exampleResponse: {
                    users: [
                        {
                            id: "1",
                            name: "Alice",
                            email: "alice@example.com",
                        }
                    ]
                }
            },
            
            "POST /api/users": {
                description: "Creates a new user",
                queries: [],
                requestBody: {
                    name: "Bob",
                    email: "bob@example.com",
                    password: "password123",
                },
                exampleResponse: {
                    user: {
                        id: "1",
                        name: "Bob",
                        email: "bob@example.com",
                    }
                }
            },

            "GET /api/users/:id": {
                description: "Returns a single user by ID",
                queries: [],
                exampleResponse: {
                    user: {
                        id: "1",
                        name: "Alice",
                        email: "alice@example.com",
                    },
                },
            },

            "DELETE /api/users/:id": {
                description: "Deletes a user by ID",
                queries: [],
                exampleResponse: {
                    msg: 'User deleted successfully'
                }
            },

            "PATCH /api/users/:id": {
                description: "Updates a user by ID",
                queries: [],
                requestBody: {
                    name: "Alice Updated",
                    email: "alice.updated@example.com",
                },
                exampleResponse: {
                    user: {
                        id: "1",
                        name: "Alice Updated",
                        email: "alice.updated@example.com",
                    }
                }
            },

            "GET /api/users/email": {
                description: "Fetches a user by email",
                queries: [],
                requestBody: {
                    email: "alice@example.com",
                },
                exampleResponse: {
                    user: {
                        id: "1",
                        name: "Alice",
                        email: "alice@example.com",
                    }
                }
            },

            "POST /api/users/signin": {
                description: "Checks a user's credentials and signs them in",
                queries: [],
                requestBody: {
                    id: "1",
                    email: "alice@example.com",
                    password: "encryptredpassword",
                },
                exampleResponse: true
            }
        }, { status: 200 })
    } catch {
        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}