const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((_req, res) => {
    var db = admin.firestore();
    return db
        .collection('preferences')
        .get()
        .then((snapshot) => {
            res.send(snapshot.docs.map((v) => v.id));
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching preferences');
        });
});

exports.assignSeats = functions.https.onRequest(async (req, res) => {
    const db = admin.firestore();

    let seatAssignment = {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {}
    };

    // Helper function to get an unassigned seat
    const getRandomUnassignedSeat = (day) => {
        for (let i = 1; i <= 100; i++) { // Assuming a maximum of 100 seats for example
            if (!seatAssignment[day][i]) {
                return i;
            }
        }
    };

    // Fetch all preferences
    const preferencesSnapshot = await db.collection('preferences').get();

    // Iterate over user preferences to assign seats
    preferencesSnapshot.forEach((doc) => {
        const userId = doc.id;
        const userPrefs = doc.data();

        for (let day in userPrefs) {
            for (let choice of userPrefs[day]) {
                if (!choice) continue; // Skip null choices
                if (!seatAssignment[day][choice]) {
                    seatAssignment[day][choice] = userId;
                    break; // Move to the next day once a seat is assigned
                }
            }
            if (!seatAssignment[day].hasOwnProperty(userId)) {
                // All user choices were taken, assign a random seat
                const randomSeat = getRandomUnassignedSeat(day);
                if (randomSeat) {
                    seatAssignment[day][randomSeat] = userId;
                }
            }
        }
    });

    // Save seat assignment to Firestore
    await db.collection('seatAssignments').doc('current').set(seatAssignment);

    res.status(200).send(seatAssignment);
});