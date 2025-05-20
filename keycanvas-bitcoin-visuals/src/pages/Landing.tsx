
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ChartBar } from 'lucide-react';
import Logo from '@/components/Logo';
import VisualMnemonic from '@/components/VisualMnemonic';

const Landing = () => {
  const features = [
    {
      title: "Visual Address Verification",
      description: "Unique visual patterns make Bitcoin addresses easier to recognize and verify at a glance."
    },
    {
      title: "Simple Address Sharing",
      description: "Copy, share, or display QR codes for your Bitcoin addresses with confidence."
    },
    {
      title: "Address Comparison",
      description: "Easily compare addresses side-by-side to verify they match before sending funds."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <Logo />
          <div className="flex gap-3">
            <Link to="/dashboard">
              <Button 
                variant="outline" 
                className="hidden sm:flex gap-2"
              >
                <ChartBar size={16} />
                Dashboard
              </Button>
            </Link>
            <Link to="/app">
              <Button 
                variant="outline" 
                className="hidden sm:flex"
              >
                Open App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-keycanvas-blue-dark to-keycanvas-blue">
              Make Bitcoin Addresses Human-Friendly
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              KeyCanvas gives every Bitcoin address a unique visual fingerprint,
              making verification easier and sharing more confident.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/app">
                <Button size="lg" className="bg-keycanvas-blue hover:bg-keycanvas-blue/90 w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <ChartBar size={16} />
                  View Dashboard
                </Button>
              </Link>
            </div>

            {/* Visual Demo */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <p className="text-sm text-gray-500 mb-2">Sample Bitcoin Address</p>
                  <div className="flex items-center gap-3">
                    <VisualMnemonic address="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" size="md" />
                    <div className="text-sm font-mono">bc1qar...zmdq</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <VisualMnemonic address="1BoatSLRHtKNngkdXEeobR76b53LETtpyT" size="md" />
                    <div className="text-sm font-mono">1BoatS...pyT</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <VisualMnemonic address="3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy" size="md" />
                    <div className="text-sm font-mono">3J98t1...NLy</div>
                  </div>
                </div>
                <div className="hidden md:block h-32 w-[1px] bg-gray-200"></div>
                <div className="md:flex-1 text-left">
                  <h3 className="font-medium mb-2">Visual Patterns</h3>
                  <p className="text-gray-600 text-sm">
                    Each Bitcoin address has a unique visual pattern.
                    Remember the pattern, not just the text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="py-16 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why KeyCanvas?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:shadow-md transition-all"
              >
                <CheckCircle className="h-10 w-10 text-keycanvas-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button size="lg" className="bg-keycanvas-blue hover:bg-keycanvas-blue/90 w-full sm:w-auto">
                Start Using KeyCanvas Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                <ChartBar size={16} />
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-gray-50 border-t">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo size="sm" />
            </div>
            <div className="text-sm text-gray-500">
              <p>KeyCanvas — Making Bitcoin addresses more human-friendly</p>
              <p className="text-xs mt-1">
                Inspired by <a href="https://bitcoin.design" className="text-keycanvas-blue hover:underline" target="_blank" rel="noopener noreferrer">
                  Bitcoin Design Community
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
