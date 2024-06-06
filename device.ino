#include <Wire.h>

#include <Adafruit_Sensor.h> 

#include <Adafruit_ADXL345_U.h>

Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified();



#define trigPin1 12
#define echoPin1 13

int Fire=27;

long duration1;
int distance1;

void setup() 
{

   pinMode(Fire,INPUT);
   
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
 
   
    Serial.begin(9600);
    Serial.println("Blindstick");    
    delay(2000);
    
   if(!accel.begin())

   {

      Serial.println("No valid sensor found");

      while(1);

   }
}

void loop() 
{
  
  Front_UV();
  Gas_Check(); 
  Fire_Check();
  Fall_Check();
}
void Fire_Check()
{
  if(digitalRead(Fire)==HIGH)
  {
    Serial.println("Fire Detected");
    delay(1000);
  }
  
}

void Fall_Check()
{
    sensors_event_t event; 

   accel.getEvent(&event);

  float X_val=event.acceleration.x;

  float Y_val=event.acceleration.y;
//
//   lcd.clear();
//    lcd.print("X:");
//    lcd.print(X_val);
//    lcd.setCursor(0,1);
//       lcd.print("Y:");
//    lcd.print(Y_val);
    //delay(1000);

//   Serial.print("X: "); Serial.print(event.acceleration.x); Serial.print("  ");
//
//   Serial.print("Y: "); Serial.print(event.acceleration.y); Serial.print("  ");
//
//   Serial.print("Z: "); Serial.print(event.acceleration.z); Serial.print("  ");
//
//   Serial.println("m/s^2 ");

  delay(500);

   if((X_val<-7.50)||(X_val>7.5))
   {
    Serial.println("Fall Detected");
  
   
    delay(1000);
    
   }
    if((Y_val<-7.50)||(Y_val>7.5))
   {
    Serial.println("Fall Detected");
    delay(1000);

   
   }

} 



void Front_UV()
{
    digitalWrite(trigPin1, LOW);
    delayMicroseconds(5);
  
    // Trigger the sensor by setting the trigPin high for 10 microseconds:
    digitalWrite(trigPin1, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin1, LOW);
  
    // Read the echoPin, pulseIn() returns the duration (length of the pulse) in microseconds:
    duration1 = pulseIn(echoPin1, HIGH);
    // Calculate the distance:
    distance1 = duration1 * 0.034 / 2;
  
    // Print the distance on the Serial Monitor (Ctrl+Shift+M):
//    Serial.print("Front = ");
//    Serial.print(distance1);
//    Serial.println(" cm");
    delay(1000);
    if(distance1<50)
    {
      Serial.println("Front Object Detected");
//      digitalWrite(Buzzer,HIGH);
//      digitalWrite(Vib,HIGH);
      delay(1000);
//     digitalWrite(Buzzer,LOW);
//      digitalWrite(Vib,LOW);
        
    }   
  // Emergency();
}


void Gas_Check()
{
  int Gas_val=analogRead(36);
 // Wet_val=1024-Wet_val;
 // Serial.println("Gas:"+String(Gas_val));
 // lcd.clear();
  delay(1000);
  if(Gas_val>100)
  {
    Serial.println("Gas Detected");
//    digitalWrite(Buzzer,HIGH);
//    digitalWrite(Vib,HIGH);
    delay(1000);
//    digitalWrite(Buzzer,LOW);
//    digitalWrite(Vib,LOW);
    
  }
// Emergency();
}
