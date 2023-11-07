#define minibomba 2
#define sensor 0

int umidade;

void setup() {
  Serial.begin(9600);
  pinMode(minibomba, HIGH);
}

void loop() {  

  umidade = ( 100 - ( (analogRead(sensor)/1023.00) * 100 ) );
  Serial.println(umidade);
  if(umidade <= 65) {
    pinMode(minibomba, HIGH);
  } else {
    pinMode(minibomba, LOW);
  }
  delay(500);
}
