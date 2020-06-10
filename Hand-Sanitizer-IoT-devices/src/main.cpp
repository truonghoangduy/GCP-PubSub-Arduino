#include <Arduino.h>
#include "esp32-mqtt.h"
#include <OneButton.h>
#define INPUT_PINS 35
#define OUTPUT_PINS 27
OneButton onebutton(INPUT_PINS, 0);

void longPressStopCallBack()
{
  Serial.println("Stopped");

  digitalWrite(OUTPUT_PINS, HIGH);
  delay(1000);
  digitalWrite(OUTPUT_PINS, LOW);
  if (publishTelemetry("/test01","1"))
  {
    Serial.println("OK Sended");
  }else{
    Serial.println("Fail");
  }
   
}

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(INPUT_PINS, INPUT);
  pinMode(OUTPUT_PINS, OUTPUT);
  setupCloudIoT();

  onebutton.attachLongPressStop(longPressStopCallBack);
}

unsigned long lastMillis = 0;
void loop()
{
  onebutton.tick();
  // Serial.println("Hello");
  // 0

  // Serial.println(digitalRead(4));
  mqtt->loop();
  delay(10); // <- fixes some issues with WiFi stability

  if (!mqttClient->connected())
  {
    connect();
  }

  // // TODO: replace with your code
  // // publish a message roughly every second.
  // if (millis() - lastMillis > 60000) {
  //   lastMillis = millis();
  //   //publishTelemetry(mqttClient, "/sensors", getDefaultSensor());
  //   publishTelemetry(getDefaultSensor());
  // }
}
