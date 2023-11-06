// aqui eu tentei tirar o delay entre as ativações das fans, e ter um controle maior sobre de quanto em quanto tempo o codigo será executado.

#include <SimpleDHT.h>

#define RELE 4
#define pinDHT11 16

SimpleDHT11 dht11;
unsigned long previousMillis = 0;
const long interval = 10000;

void setup()
{
    pinMode(RELE, OUTPUT);
    Serial.begin(9600);
}

void loop()
{
    unsigned long currentMillis = millis();

    // aqui comparamos se o ms atual é maior que o que coletamos acima, se for isso vai triggerar a ativação das fans
    if (currentMillis - previousMillis >= interval)
    {
        previousMillis = currentMillis;

        byte temp = 0;
        byte humid = 0;
        int err = dht11.read(pinDHT11, &temp, &humid, NULL);

        if (err == 0)
        {
            Serial.print((int)temp + " *C, " + (int)humid + " %");

            if ((int)temp >= 20)
            {
                digitalWrite(RELE, HIGH);
            }
            else
            {
                digitalWrite(RELE, LOW);
            }
        }
        else
        {
            Serial.println("Falha na leitura do sensor.");
        }
    }
}
