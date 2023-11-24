#include <SimpleDHT.h>
#include <Servo.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define PINFAN 4
#define PINSERVO 12
#define PINDHT11 16

SimpleDHT11 dht11;
Servo myservo;

unsigned long previousMillis = 0;
unsigned long previousMillisRequest = 0;

const long interval = 120000;         // intervalo de 2 minutos entre as leituras
const long intervalRequest = 3600000; // intervalo de 1 hora entre as requests

const long maxTemp = 25;
int pos = 0;

const char *ssid = "wifi_2";
const char *password = "1a2b3c4d5e6f";
bool isWifiConnected = false;

const char *http_site = "temperature-monitor-gamma.vercel.app";
const int http_port = 443;
const char *http_path = "/cadastrar";

void setup()
{
    Serial.begin(9600);

    pinMode(PINFAN, OUTPUT);

    myservo.attach(PINSERVO);
    myservo.write(180);
    pos = 180;

    WiFi.begin(ssid, password);
    Serial.println("Iniciando conexão wifi - tempo limite de conexão: 60 segundos.");
    delayMicroseconds(60000);

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("\nWi-Fi conectado com sucesso: " + WiFi.localIP().toString());
    }
    else
    {
        const long howManySeconds = interval / 1000;
        Serial.println("Falha ao conectar-se com wifi, próxima verificação de conexão wifi será feita em:");
        Serial.print(howManySeconds);
    }
}

void loop()
{
    unsigned long currentMillis = millis();
    bool servoOpen = false;
    byte temperature = 0;
    byte humid = 0;

    if (currentMillis - previousMillis >= interval)
    {
        previousMillis = currentMillis;

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
            digitalWrite(PINFAN, LOW); // low ativa o relé (favor nao perguntar o motivo)
        }
        else
        {
            digitalWrite(PINFAN, HIGH);
        }

        servoOpen = toggleServo(maxTemp);

        if (WiFi.status() == WL_CONNECTED)
        {
            isWifiConnected = true;
            Serial.println("Conectado ao wifi.");
        }
        else
        {
            isWifiConnected = false;
            Serial.println("Falha ao conectar-se ao wifi.");
        }
    }

    if ((currentMillis - previousMillis >= intervalRequest) && (isWifiConnected == true))
    {
        previousMillisRequest = currentMillis;
        if (!sendDataToServer(temperature, humid, servoOpen))
        {
            Serial.println("Falha na requisição.");
        }
    }
    else
    {
        Serial.println("Wifi not connected.");
    }
}

bool sendDataToServer(int temperature, int humid, bool servoOpen)
{
    WiFiClientSecure client;
    client.setInsecure();

    String url = "https://" + String(http_site) + http_path + "?humid=" + String(humid) + "&temperature=" + String(temperature) + "&servoOpen=" + servoOpen + "&bombActive=false";

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

bool toggleServo(int t)
{
    if (t >= 25)
    {
        for (pos = 180; pos >= 0; pos -= 1)
        {
            myservo.write(pos);
            delay(15);
        }
        return true;
    }
    for (pos = 0; pos >= 180; pos += 1)
    {
        myservo.write(pos);
        delay(15);
    }
    return false;
}