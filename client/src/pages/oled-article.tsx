import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

// Import SVG assets
import oledDisplaySvg from "@assets/oled_display.svg";
import oledWiringDiagramSvg from "@assets/oled_wiring_diagram.svg";
import i2cDetectionSvg from "@assets/i2c_detection.svg";
import oledCodeSampleSvg from "@assets/oled_code_sample.svg";

const OledArticlePage: React.FC = () => {
  return (
    <div className="container max-w-4xl py-8">
      {/* Back button */}
      <Link href="/articles" className="inline-block mb-6">
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Back to Articles</span>
        </Button>
      </Link>

      {/* Article header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">
          Running a 0.96" OLED Display on Your Orange Pi Zero 2W and Raspberry Pi Zero 2W
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>April 14, 2025</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>15 min read</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>By HackerBoard Team</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            Orange Pi
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            Raspberry Pi
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            OLED
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            I2C
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            Python
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg max-w-none mb-10">
        <p>
          Small OLED displays are fantastic add-ons for your single-board computer projects. They're
          perfect for showing system status, sensor readings, or custom graphics without needing a
          full monitor. In this tutorial, we'll walk through connecting and programming a 0.96" OLED
          display with the SSD1306 driver chip on both the Orange Pi Zero 2W and Raspberry Pi Zero 2W
          boards.
        </p>
      </div>

      {/* Display image */}
      <Card className="mb-10">
        <CardContent className="p-0 overflow-hidden">
          <img 
            src={oledDisplaySvg} 
            alt="0.96-inch OLED Display" 
            className="w-full h-auto" 
          />
        </CardContent>
      </Card>

      {/* What You'll Need section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">What You'll Need</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Orange Pi Zero 2W or Raspberry Pi Zero 2W</li>
          <li>0.96" OLED display with SSD1306 controller (I2C interface)</li>
          <li>4x female-to-female jumper wires</li>
          <li>Breadboard (optional, for easier connections)</li>
          <li>Power supply for your board</li>
        </ul>
      </div>

      <Separator className="my-8" />

      {/* OLED Display Basics */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">OLED Display Basics</h2>
        <p className="mb-4">
          The 0.96" OLED display we'll be using has the following specifications:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Resolution: 128x64 pixels</li>
          <li>Controller: SSD1306</li>
          <li>Interface: I2C (usually at address 0x3C)</li>
          <li>Operating voltage: 3.3V to 5V</li>
          <li>Size: 0.96 inches (diagonal)</li>
        </ul>
        <p>
          These monochrome displays are energy-efficient and offer excellent contrast, making them
          readable in various lighting conditions. The I2C interface means we only need 4 pins to 
          connect to our board: VCC (power), GND (ground), SCL (clock), and SDA (data).
        </p>
      </div>

      {/* Wiring Diagram */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Wiring Connections</h2>
        <p className="mb-6">
          Connect your OLED display to either board using the following pin connections. Both the 
          Orange Pi Zero 2W and Raspberry Pi Zero 2W support the I2C protocol, but they use 
          different GPIO pins for the connections.
        </p>
        <Card className="mb-6">
          <CardContent className="p-0 overflow-hidden">
            <img 
              src={oledWiringDiagramSvg} 
              alt="OLED Display Wiring Diagram for Orange Pi and Raspberry Pi" 
              className="w-full h-auto" 
            />
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Orange Pi Zero 2W Connections:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>VCC → 3.3V (Pin 1)</li>
              <li>GND → Ground (Pin 6)</li>
              <li>SCL → I2C-2 SCL (Pin 5)</li>
              <li>SDA → I2C-2 SDA (Pin 3)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Raspberry Pi Zero 2W Connections:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>VCC → 3.3V (Pin 1)</li>
              <li>GND → Ground (Pin 6)</li>
              <li>SCL → GPIO 3 / SCL (Pin 5)</li>
              <li>SDA → GPIO 2 / SDA (Pin 3)</li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Software Setup */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Software Setup</h2>
        
        <h3 className="text-xl font-semibold mb-3">1. Enable I2C Interface</h3>
        <div className="mb-6">
          <h4 className="font-medium mb-2">For Raspberry Pi Zero 2W:</h4>
          <div className="bg-slate-100 p-4 rounded-md mb-4 font-mono text-sm">
            <p>sudo raspi-config</p>
            <p># Navigate to Interface Options {'>'}  I2C {'>'}  Enable</p>
          </div>
          
          <h4 className="font-medium mb-2">For Orange Pi Zero 2W:</h4>
          <div className="bg-slate-100 p-4 rounded-md font-mono text-sm">
            <p>sudo apt update</p>
            <p>sudo apt install -y i2c-tools</p>
            <p># I2C should be enabled by default on most Orange Pi images</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3">2. Install Required Libraries</h3>
        <div className="bg-slate-100 p-4 rounded-md mb-6 font-mono text-sm">
          <p>sudo apt update</p>
          <p>sudo apt install -y python3-pip python3-pil i2c-tools</p>
          <p>sudo pip3 install adafruit-circuitpython-ssd1306</p>
        </div>
        
        <h3 className="text-xl font-semibold mb-3">3. Verify I2C Device Detection</h3>
        <p className="mb-4">
          Before programming, let's make sure our display is detected on the I2C bus. Run the 
          following command (I2C bus 1 for Raspberry Pi, bus 0 for Orange Pi):
        </p>
        <Card className="mb-6">
          <CardContent className="p-0 overflow-hidden">
            <img 
              src={i2cDetectionSvg} 
              alt="I2C Device Detection Output" 
              className="w-full h-auto" 
            />
          </CardContent>
        </Card>
        <p>
          Look for device address <strong>0x3C</strong> (or sometimes 0x3D) in the output. If you 
          see it, your OLED display is properly connected and ready to be programmed.
        </p>
      </div>

      <Separator className="my-8" />

      {/* Python Code */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Python Code for OLED Display</h2>
        <p className="mb-6">
          Now let's create a simple Python script to display text on the OLED. Create a file named 
          <code className="bg-slate-100 px-2 py-1 rounded">oled_display.py</code> with the following code:
        </p>
        <Card className="mb-6">
          <CardContent className="p-0 overflow-hidden">
            <img 
              src={oledCodeSampleSvg} 
              alt="Python Code Sample for OLED Display" 
              className="w-full h-auto" 
            />
          </CardContent>
        </Card>
        <p className="mb-4">
          Run the script with:
        </p>
        <div className="bg-slate-100 p-4 rounded-md mb-6 font-mono text-sm">
          <p>python3 oled_display.py</p>
        </div>
        <p>
          Your OLED display should now show "Hello Pi Zero!" and "OLED Display" text. This basic 
          example uses the built-in text rendering functions, but you can also draw shapes, lines, 
          and even display images using the PIL (Python Imaging Library) module.
        </p>
      </div>

      {/* Advanced Usage */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Advanced Usage</h2>
        <p className="mb-4">
          Once you have the basic display working, you can explore more advanced features:
        </p>
        <ul className="list-disc pl-6 space-y-3 mb-6">
          <li>
            <strong>Display Images:</strong> Convert small PNG or JPG images to monochrome and 
            display them using the PIL library.
          </li>
          <li>
            <strong>Custom Fonts:</strong> Load TrueType fonts for nicer text rendering.
          </li>
          <li>
            <strong>Dynamic Updates:</strong> Show real-time data like temperature, CPU usage, 
            network status, etc.
          </li>
          <li>
            <strong>Animations:</strong> Create simple animations by updating the display in a loop.
          </li>
          <li>
            <strong>Multiple Pages:</strong> Implement a paging system to show different screens of 
            information.
          </li>
        </ul>
        <p>
          The Adafruit CircuitPython SSD1306 library provides excellent documentation and examples 
          for these more advanced features.
        </p>
      </div>

      {/* Troubleshooting */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Display Not Detected:</h3>
            <ul className="list-disc pl-6">
              <li>Double-check all wiring connections</li>
              <li>Verify that I2C is enabled on your board</li>
              <li>Try a different I2C address (0x3D is sometimes used instead of 0x3C)</li>
              <li>Make sure your display is not damaged by testing with another device if possible</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Garbled Display:</h3>
            <ul className="list-disc pl-6">
              <li>Check if you're using the correct display dimensions in your code</li>
              <li>Make sure the display is receiving enough power</li>
              <li>Try a slower I2C clock rate if your jumper cables are long</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Library Installation Issues:</h3>
            <ul className="list-disc pl-6">
              <li>Make sure you're using Python 3</li>
              <li>Try installing libraries with pip3 without sudo first</li>
              <li>Check for any error messages during installation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <p className="mb-4">
          Congratulations! You've successfully connected and programmed a 0.96" OLED display with 
          your Orange Pi Zero 2W or Raspberry Pi Zero 2W. This simple addition can make your 
          projects much more interactive and informative.
        </p>
        <p>
          Try integrating the display with your other projects - whether it's showing sensor data, 
          system status, or custom animations. The small OLED display is versatile enough for many 
          applications while being energy-efficient and easy to program.
        </p>
      </div>

      {/* Related Articles */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/articles/sensors">
            <Card className="cursor-pointer hover:bg-slate-50 transition-colors">
              <CardContent className="p-4">
                <h3 className="font-semibold">Connecting Sensors to Your Single-Board Computer</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Learn how to connect various sensors to your Pi for environmental monitoring and more.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/articles/gpio-programming">
            <Card className="cursor-pointer hover:bg-slate-50 transition-colors">
              <CardContent className="p-4">
                <h3 className="font-semibold">GPIO Programming on Orange Pi vs Raspberry Pi</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Understanding the differences between Orange Pi and Raspberry Pi GPIO programming.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Author info */}
      <Card className="bg-slate-50">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-2">About the Author</h3>
          <p className="text-sm">
            The HackerBoard Team consists of hardware enthusiasts, cybersecurity experts, and 
            developers passionate about single-board computers and their applications in security 
            research and education.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OledArticlePage;