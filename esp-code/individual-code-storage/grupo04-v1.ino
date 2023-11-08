#include <SimpleDHT.h>

#define RELE 4
#define pinDHT11 16

SimpleDHT11 dht11;

void setup()
{
    pinMode(RELE, OUTPUT);
    Serial.begin(9600);
}

void loop()
{
    byte temp = 0;
    byte humid = 0;
    if (dht11.read(pinDHT11, &temp, &humid, NULL))
    {
        Serial.println("Falha na leitura do sensor.");
        return;
    }

    Serial.print((int)temp);
    Serial.print(" *C, ");
    Serial.print((int)humid);
    Serial.println(" %");

    if ((int)temp >= 20)
    {
        digitalWrite(RELE, HIGH);
        delay(60000);
    }
    else
    {
        digitalWrite(RELE, LOW);
        delay(500);
    }
}