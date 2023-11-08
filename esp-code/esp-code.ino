#include <SimpleDHT.h>
#include <Servo.h>

#define SERVO 12
#define RELE 4
#define pinDHT11 16

SimpleDHT11 dht11;

Servo servo;
int pos;

unsigned long previousMillis = 0;

const long interval = 5000; // intervalo de 5 segundos entre as leituras

const long maxTemp = 25;
const long minTemp = maxTemp - 1;

void setup()
{
    Serial.begin(9600);
    pinMode(RELE, OUTPUT);
    servo.attach(SERVO);
    servo.write(0);
}

void loop()
{
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval)
    {
        previousMillis = currentMillis;

        byte temperature = 0;
        byte humid = 0;
        int err = dht11.read(pinDHT11, &temperature, &humid, NULL);

        if (err == 1)
        {
            Serial.println("Falha na leitura do sensor.");
            return;
        }

        Serial.print((int)temperature);
        Serial.print(" *C, ");
        Serial.print((int)humid);
        Serial.println(" %");

        if ((int)temperature >= maxTemp)
        {
            digitalWrite(RELE, LOW);
            servo.write(0);
        }
        else if ((int)temperature <= minTemp)
        {
            digitalWrite(RELE, HIGH);
            servo.write(90);
        }
    }
}