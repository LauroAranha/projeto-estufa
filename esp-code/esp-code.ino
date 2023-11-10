#include <SimpleDHT.h>
#include <Servo.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define PINMINIBOMBA 2
#define PINRELAY 4
#define PINSERVO 12
#define PINDHT11 16

SimpleDHT11 dht11;
Servo servo;

unsigned long previousMillis = 0;
const long interval = 120000; // intervalo de 5 segundos entre as leituras
const long maxTemp = 25;
const long minTemp = maxTemp - 1;
const long maxHumid = 65;

const char *ssid = "wifi_2";
const char *password = "1a2b3c4d5e6f";

const char *http_site = "temperature-monitor-gamma.vercel.app";
const int http_port = 443;
const char *http_path = "/cadastrar";

void setup()
{
    Serial.begin(9600);

    pinMode(PINRELAY, OUTPUT);
    pinMode(PINMINIBOMBA, HIGH);

    servo.attach(PINSERVO);
    servo.write(0);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1500);
        Serial.print(".");
    }

    Serial.println("\nWi-Fi conectado com sucesso: " + WiFi.localIP().toString());
}

void loop()
{
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval)
    {
        previousMillis = currentMillis;

        byte temperature = 0;
        byte humid = 0;
        bool servoOpen = false;
        bool bombActive = false;

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
            servoOpen = true;
        }
        else
        {
            digitalWrite(PINRELAY, HIGH);
            servo.write(90);
        }

        // aqui vamos ter que adicionar alguma lógica pra paramos a bomba antes de esgotar a água (colocar pra ela ficar ativa por
        // 20 segundos no maximo a cada execução do codigo ou algo do tipo)
        if (humid <= maxHumid)
        {
            pinMode(PINMINIBOMBA, HIGH);
            bombActive = true;
        }
        else
        {
            pinMode(PINMINIBOMBA, LOW);
        }

        if (!sendDataToServer(temperature, humid, servoOpen, bombActive))
        {
            Serial.println("Falha na requisição.");
        }
    }
}

bool sendDataToServer(int temperature, int humid, bool servoOpen, bool bombActive)
{
    WiFiClientSecure client;
    client.setInsecure();

    String url = "https://" + String(http_site) + http_path + "?humid=" + String(humid) + "&temperature=" + String(temperature) + "&servoOpen=" + servoOpen + "&bombActive=" + bombActive;

    Serial.println("Fazendo request: ");
    Serial.println(url);

    if (client.connect(http_site, http_port))
    {
        Serial.println("Conectado ao cliente:");
        client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + http_site + "\r\n" + "Connection: close\r\n\r\n");

        while (client.connected())
        {
            Serial.println("Esperando por resposta do servidor");
            String line = client.readStringUntil('\n');
            if (line == "\r")
            {
                break;
            }
            delay(500);
        }

        Serial.println("Concluído");

        client.stop();
        return true;
    }

    Serial.println("Falha na conexão com o servidor");
    return false;
}