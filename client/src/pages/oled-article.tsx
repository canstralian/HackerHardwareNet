import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Import SVG assets
import oledDisplayImage from '../assets/oled_display.svg';
import oledWiringDiagramImage from '../assets/oled_wiring_diagram.svg';
import i2cDetectionImage from '../assets/i2c_detection.svg';
import oledCodeSampleImage from '../assets/oled_code_sample.svg';

const OLEDArticlePage: React.FC = () => {
  // Mock article data
  const article = {
    title: "Running a 0.96\" OLED Display on Your Orange Pi Zero 2W and Raspberry Pi Zero 2W",
    publishedAt: "April 14, 2025",
    readTime: "10 min read",
    tags: ["OLED", "Raspberry Pi", "Orange Pi", "I2C", "IoT", "Cybersecurity", "Hardware Tutorial"],
    authorId: 1,
    author: "Admin",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link href="/resources">
          <Button variant="ghost" size="sm" className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Resources
          </Button>
        </Link>
        
        <Card className="mb-8 border-none shadow-none">
          <CardHeader className="pb-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-secondary text-secondary-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-4xl font-bold tracking-tight mb-3">{article.title}</CardTitle>
            <CardDescription className="flex items-center text-muted-foreground">
              <span>{article.publishedAt}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime}</span>
              <span className="mx-2">•</span>
              <span>By {article.author}</span>
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-8">
            <img 
              src={oledDisplayImage} 
              alt="OLED Display with Orange Pi and Raspberry Pi" 
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Overview</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">What You'll Learn:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li>How to wire the 4-pin OLED display to the SBC (Single Board Computer)</li>
            <li>How to enable and test I²C communication on both boards</li>
            <li>Installing Python libraries and running sample code that displays text and graphics</li>
            <li>Tips for troubleshooting common issues</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Who This is For:</h3>
          <p className="mb-6">
            Hackers, makers, and tinkerers working with low-cost SBCs who want to add a compact OLED interface to 
            monitor system status or display messages.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Required Components & Tools</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Hardware:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li>0.96" OLED display (4-pin; VCC, GND, SDA, SCL) based on the SSD1306 (or compatible SH1106) driver</li>
            <li>Orange Pi Zero 2W board</li>
            <li>Raspberry Pi Zero 2W board</li>
            <li>Female-to-male jumper wires or DuPont cables (four per board)</li>
            <li>Breadboard (optional)</li>
            <li>Micro USB power supply</li>
            <li>(Optional) Case</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Software:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li>Linux-based development system</li>
            <li>Terminal access via SSH or serial</li>
            <li>Python 3</li>
            <li>Required Python libraries:
              <ul className="list-disc pl-6 mt-2">
                <li>luma.oled or Adafruit CircuitPython SSD1306</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Tools:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li>Computer</li>
            <li>Terminal/SSH client</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Wiring the OLED Display</h2>
          
          <p className="mb-4">
            Both boards use the I²C interface. The 4-pin OLED connector maps as follows:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>VCC: 3.3V</li>
            <li>GND: Ground</li>
            <li>SDA: I²C data</li>
            <li>SCL: I²C clock</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Wiring Diagram</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>OLED VCC → 3.3V pin on the board</li>
            <li>OLED GND → Ground (GND)</li>
            <li>OLED SDA → I²C SDA pin</li>
            <li>OLED SCL → I²C SCL pin</li>
          </ul>

          <div className="my-8">
            <img 
              src={oledWiringDiagramImage} 
              alt="OLED Wiring Diagram" 
              className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-lg mb-4"
            />
          </div>

          <p className="mb-6">
            Check your board's pinout diagram for exact pin numbers.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Enabling I²C on Your Board</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Raspberry Pi Zero 2W:</h3>
          
          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                sudo raspi-config
              </code>
            </pre>
          </div>

          <p className="mb-4">
            Enable I²C under Interfacing Options. Reboot:
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                sudo reboot
              </code>
            </pre>
          </div>

          <p className="mb-4">
            Install tools:
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                sudo apt-get install i2c-tools
                sudo i2cdetect -y 1
              </code>
            </pre>
          </div>

          <p className="mb-4">
            Look for address (commonly 0x3C).
          </p>

          <div className="my-8">
            <img 
              src={i2cDetectionImage} 
              alt="I2C Detection Output" 
              className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-lg mb-4"
            />
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Orange Pi Zero 2W:</h3>
          
          <p className="mb-4">
            Install tools:
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                sudo apt-get update
                sudo apt-get install i2c-tools python3-smbus
              </code>
            </pre>
          </div>

          <p className="mb-4">
            Check devices:
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                sudo i2cdetect -y 0
              </code>
            </pre>
          </div>

          <p className="mb-6">
            Adjust bus number if needed.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Installing and Testing the Software</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Option A: luma.oled Library</h3>
          
          <p className="mb-4">
            Install:
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                sudo apt-get install python3-pip python3-dev python3-pil
                sudo pip3 install luma.oled
              </code>
            </pre>
          </div>

          <p className="mb-4">
            Create oled_test.py:
          </p>

          <div className="my-8">
            <img 
              src={oledCodeSampleImage} 
              alt="OLED Code Sample" 
              className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-lg mb-4"
            />
          </div>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code className="language-python">
{`from luma.core.interface.serial import i2c
from luma.oled.device import ssd1306
from luma.core.render import canvas
from PIL import ImageFont
import time

WIDTH = 128
HEIGHT = 64

serial = i2c(port=1, address=0x3C)
device = ssd1306(serial)

while True:
    with canvas(device) as draw:
        font = ImageFont.load_default()
        text = "Hello World!"
        text_width, text_height = font.getsize(text)
        draw.text(((WIDTH - text_width) // 2, (HEIGHT - text_height) // 2), text, font=font, fill=255)
    time.sleep(1)`}
              </code>
            </pre>
          </div>

          <p className="mb-4">
            Run:
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                python3 oled_test.py
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Option B: Adafruit CircuitPython SSD1306</h3>
          
          <p className="mb-4">
            Install:
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                sudo pip3 install adafruit-blinka adafruit-circuitpython-ssd1306
              </code>
            </pre>
          </div>

          <p className="mb-4">
            Create oled_circuitpython.py:
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code className="language-python">
{`import board
import time
from PIL import Image, ImageDraw, ImageFont
import adafruit_ssd1306

WIDTH = 128
HEIGHT = 64

i2c = board.I2C()
oled = adafruit_ssd1306.SSD1306_I2C(WIDTH, HEIGHT, i2c, addr=0x3C)

oled.fill(0)
oled.show()

image = Image.new("1", (WIDTH, HEIGHT))
draw = ImageDraw.Draw(image)

draw.rectangle((0, 0, WIDTH, HEIGHT), outline=255, fill=255)
BORDER = 5
draw.rectangle((BORDER, BORDER, WIDTH - BORDER - 1, HEIGHT - BORDER - 1), outline=0, fill=0)

font = ImageFont.load_default()
text = "Hello World!"
text_width, text_height = draw.textsize(text, font=font)
draw.text(((WIDTH - text_width) // 2, (HEIGHT - text_height) // 2), text, font=font, fill=255)

oled.image(image)
oled.show()

while True:
    time.sleep(1)`}
              </code>
            </pre>
          </div>

          <p className="mb-4">
            Run:
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                python3 oled_circuitpython.py
              </code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Testing and Troubleshooting</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Check I²C Communication:</h3>
          
          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                i2cdetect -y 1
              </code>
            </pre>
          </div>

          <p className="mb-4">
            or
          </p>

          <div className="mb-6 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                i2cdetect -y 0
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Issues:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li>Blank screen: verify wiring</li>
            <li>No I²C address: confirm bus number</li>
            <li>Import errors: check Python version and libraries</li>
            <li>Display timeout: keep a loop or delay active</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Final Thoughts</h2>
          
          <p className="mb-4">
            You now have your OLED showing "Hello World!" on both boards. Possible next steps:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Displaying graphics and sensor data</li>
            <li>Status monitoring applications</li>
            <li>Custom IoT dashboard displays</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OLEDArticlePage;