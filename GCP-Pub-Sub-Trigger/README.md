## Installation
GCP SDK : https://cloud.google.com/sdk

## Helpfull function
**Deploy: pubsub trigger ----- to cloud Function**

MY_TOPIC : MQTT Topic

RUNTIME  : nodejs runtime

gcloud functions deploy subscribe --trigger-topic MY_TOPIC --runtime RUNTIME --region asia-east2 --memory 128

<<<<<<< HEAD:GCP-Pub-Sub-Trigger/README.MD
gcloud functions deploy subscribe --trigger-topic test01 --runtime nodejs10 --region asia-east2 --memory 128
=======
gcloud functions deploy subscribe --trigger-topic test01 --runtime nodejs8
>>>>>>> aaa6cd9582b8b718efd3df55e86a619d59f282ee:GCP-Pub-Sub-Trigger/README.md
