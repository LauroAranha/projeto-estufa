#include <SimpleDHT.h>
#include <Servo.h>

#define SERVO D12 // Porta Digital 6 PWM

Servo s; // Variável Servo
int pos; // Posição Servo

int pinDHT11 = D0;
SimpleDHT11 dht11;

void setup() {
  Serial.begin(115200);
  s.attach(SERVO);
  s.write(0); // Inicia motor posição zero
}

void loop() {
  byte temp = 0;
  byte humid = 0;
  if (dht11.read(pinDHT11, &temp, &humid, NULL)) {
    Serial.println("Falha na leitura do sensor.");
    return;
  }

  Serial.println("Sucesso na leitura do leitor, gravandao dados no banco de dados!");
  Serial.print((int)temp);
  Serial.print(" *C, ");
  Serial.print((int)humid);
  Serial.println(" %");

  toggleServo((int)temp);

}

void toggleServo(int t)
{
    if (t >= 35 && pos == 0) {
        for(pos = 0; pos < 90; pos++)
        {
            s.write(pos);
            delay(15);
        }
    } else if (t < 35 && pos == 90) {
        for(pos = 90; pos >= 0; pos--)
        {
            s.write(pos);
            delay(15);
        }
    }
}
