#include <SoftwareSerial.h>
#define RxD 6
#define TxD 7
#define LED 12

SoftwareSerial blueToothSerial(RxD, TxD);
String recvString;

void setup()
{
    Serial.begin(9600);
    pinMode(RxD, INPUT);
    pinMode(TxD, OUTPUT);
    pinMode(LED, OUTPUT);
    
    setupBlueToothConnection();
}

void loop()
{
    // Incoming data from bluetooth
    if (blueToothSerial.available())
    {
        // Lukee tulevan datan, poistaa rivinvaihdon ja muuttaa pieniksi kirjaimiksi
        recvString = blueToothSerial.readStringUntil('\n');
        recvString.trim();
        recvString.toLowerCase();

        // Ottaa datan ensimmäisen sanan
        String cmd = getValue(recvString, ' ', 0);
        
        if (cmd.equals("pin"))
        {
            String pin = getValue(recvString, ' ', 1);     // Ottaa datan toisen sanan
            String action = getValue(recvString, ' ', 2);  // Ottaa datan kolmannen sanan
            
            if (action.equals("on"))
            {
                blueToothSerial.println("Turned pin " + pin + " on.");
                return digitalWrite(pin.toInt(), HIGH);
            }

            if (action.equals("off"))
            {
                blueToothSerial.println("Turned pin " + pin + " off.");
                return digitalWrite(pin.toInt(), LOW);
            }

            if (action.equals("toggle"))
            {
                char newState = digitalRead(LED) ? LOW : HIGH;
                blueToothSerial.println("Toggled pin " + pin + '.');
                return digitalWrite(pin.toInt(), newState);
            }
        }

        blueToothSerial.println("Unknown command: " + recvString);
    }
}

void setupBlueToothConnection()
{
    blueToothSerial.begin(38400);                     // Aseta BT serialportin baudinopeuksen
    blueToothSerial.print("\r\n+STWMOD=0\r\n");       // Aseta BT toimimaan "serveri" tilassa
    blueToothSerial.print("\r\n+STNA=BTTesti\r\n");   // Aseta BT-yhteyspisteen nimi
    blueToothSerial.print("\r\n+STPIN=1234\r\n");     // Aseta BT-yhteyspisteen PIN-koodi
    blueToothSerial.print("\r\n+STOAUT=1\r\n");       // Anna paritetulle laittelle lupa yhdistää
    blueToothSerial.print("\r\n+STAUTO=0\r\n");       // Automaattinen yhdistäminen pois käytöstä
    
    delay(2000);                                      // Tauko (pakollinen)

    blueToothSerial.print("\r\n+INQ=1\r\n");          // Salli yhdistäminen BT:hen
    blueToothSerial.println("Bluetooth started.");
        
    delay(2000);                                      // Tauko (pakollinen)

    blueToothSerial.flush();
    digitalWrite(LED, HIGH);
}

String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = {0, -1};
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++)
    {
        if (data.charAt(i) == separator || i == maxIndex)
        {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i + 1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
