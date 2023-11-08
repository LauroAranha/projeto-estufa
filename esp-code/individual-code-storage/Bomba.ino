#include <DHTesp.h>
#include <ESP8266WiFi.h>

#define minibomba 2
#define sensor 0
#define ssid[] = "Fatec111";
#define password[] = "123456789";
#define http_site = "iot-phi.vercel.app";
#define http_port = 443;
#define http_path = "/cadastrar"; 

DHTesp dht;
int umidade;
static bool b = false;
int wifiCounter = 0;

void setup() {
  Serial.begin(9600);

  pinMode(minibomba, HIGH);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED && wifiCounter < 20) {
    delay(1000);
    Serial.println("Conectando no WiFi...");
    wifiCounter++;
  }

  if(wifiCounter >= 20) {
    Serial.println("Falha ao conectar o Wifi...");
    b = true;
  } else {
    Serial.println("WiFi conectado!");
    dht.setup(3, DHTesp::DHT11);
  }
}

void loop() {
  if (b) {
    return;
  }

  client.setInsecure();  

  umidade = ( 100 - ( (analogRead(sensor)/1023.00) * 100 ) );

  String url_bomba = "https://" + String(http_site) + http_path + "/" + String(temperatura) + "/" + String(umidade);

  Serial.println(umidade);

  if(umidade <= 65) {
    pinMode(minibomba, HIGH);
  } else {
    pinMode(minibomba, LOW);
  }
  delay(500);
}

bool connectToServer () {
  if (!client.connect(http_site, http_port)) {
      Serial.println("Falha na conexão com o servidor");
      delay(5000);
      return false;
    }

    client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + http_site + "\r\n" + "Connection: close\r\n\r\n");
 
    client.stop();
    return true;
}
