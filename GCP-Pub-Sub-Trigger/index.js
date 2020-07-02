const { PubSub } = require('@google-cloud/pubsub');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const { Firestore, DocumentReference } = require('@google-cloud/firestore')

const pubsub = new PubSub()

const firestore = new Firestore()
const blankTemplet = {
    "maintence": 0,
    "numberoffushing": 0,
    "numberofrefill": 0,
    "watermaintence": 0
}
const switchCaseMap = {
    '0': "maintence",
    '1': "numberoffushing",
    "2": "numberofrefill",
    "3": "watermaintence"
}

exports.subscribe = async (pubsubMessage) => {
    // Print out the data from Pub/Sub, to prove that it worked
    // {
    //     "data": string,
    //     "attributes": {
    //       string: string,
    //       ...
    //     },
    //     "messageId": string,
    //     "publishTime": string
    //   }

    let message = Buffer.from(pubsubMessage.data, 'base64').toString(); // DECODE message
    let documentRef = await firestore.collection("Device").doc(pubsubMessage.attributes.deviceId).get();
    if (documentRef.exists) {
        let data = {};
        data[switchCaseMap[message]] = documentRef.get(switchCaseMap[message]) + 1
        await firestore.collection("Device").doc(pubsubMessage.attributes.deviceId)
        .update(data)
    } else {
        await firestore.collection("Device").doc(pubsubMessage.attributes.deviceId)
        .set(Object.assign(blankTemplet, pubsubMessage.attributes));
    }
    console.log(pubsubMessage)
};

exports.httpCallPubSub = functions.https.onRequest(async (req,resp)=>{
    if (req.method == "POST") {
        const messagesAsBuffer = Buffer.from(req.body['messages'],'utf8')
        let mqttRespone = await pubsub.topic(req.body['topic']).publish(messagesAsBuffer);
        resp.status(200).send({bodyCall:req.body,mqttCall:mqttRespone})
    }
})



