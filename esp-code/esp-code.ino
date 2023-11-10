#include <SimpleDHT.h>
#include <Servo.h>

#define PINMINIBOMBA 2
#define PINRELAY 4
#define PINSERVO 12
#define PINDHT11 16

SimpleDHT11 dht11;
Servo servo;

unsigned long previousMillis = 0;
const long interval = 5000; // intervalo de 5 segundos entre as leituras
const long maxTemp = 25;
const long minTemp = maxTemp - 1;
const long maxHumid = 65;

void setup()
{
    Serial.begin(9600);

    pinMode(PINRELAY, OUTPUT);
    pinMode(PINMINIBOMBA, HIGH);

    servo.attach(PINSERVO);
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
        int err = dht11.read(PINDHT11, &temperature, &humid, NULL);

        if (err == 1)
        {
            Serial.println(F("Falha na leitura do sensor."));
            return;
        }

        Serial.print(temperature);
        Serial.print(F(" *C, "));
        Serial.print(humid);
        Serial.println(F(" %"));

        if (temperature >= maxTemp)
        {
            digitalWrite(PINRELAY, LOW);
            servo.write(0);
        }
        else if (temperature <= minTemp)
        {
            digitalWrite(PINRELAY, HIGH);
            servo.write(90);
        }

        if (humid <= maxHumid)
        {
            pinMode(PINMINIBOMBA, HIGH);
        }
        else
        {
            pinMode(PINMINIBOMBA, LOW);
        }
    }
}