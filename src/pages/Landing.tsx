
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Star, Zap } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">Ask April</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-accent font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-accent font-medium">How it works</a>
            <a href="#pricing" className="text-gray-700 hover:text-accent font-medium">Pricing</a>
          </div>
          <div>
            <Link to="/dashboard">
              <Button variant="default" className="rounded-full">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 max-w-3xl">
              Your AI Legal Assistant for Immigration
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              Fast, accurate, and affordable legal assistance for your immigration needs.
              No complicated forms, no waiting for appointments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button className="rounded-full text-lg px-8 py-6 h-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full text-lg px-8 py-6 h-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How Ask April Helps You</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-accent/10 p-3 rounded-full w-fit mb-6">
                <MessageSquare className="text-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Legal Assistance</h3>
              <p className="text-gray-600">
                Get answers to your immigration questions anytime, anywhere. Our AI is always available to help.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-accent/10 p-3 rounded-full w-fit mb-6">
                <Zap className="text-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast & Accurate</h3>
              <p className="text-gray-600">
                Receive fast and accurate information about your immigration case and options.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-accent/10 p-3 rounded-full w-fit mb-6">
                <Star className="text-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Affordable</h3>
              <p className="text-gray-600">
                Pay a fraction of what you would for a traditional lawyer, with subscription plans to fit your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sign Up</h3>
              <p className="text-gray-600">
                Create an account and tell us about your immigration needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Ask Questions</h3>
              <p className="text-gray-600">
                Ask your immigration questions and get instant answers from our AI.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Guidance</h3>
              <p className="text-gray-600">
                Receive personalized guidance for your specific immigration situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Simple Pricing</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <p className="text-gray-600 mb-6">For simple immigration questions</p>
              <p className="text-3xl font-bold mb-6">$9.99<span className="text-lg text-gray-500 font-normal">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>20 questions per month</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Basic immigration guidance</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Email support</span>
                </li>
              </ul>
              <Link to="/dashboard">
                <Button variant="outline" className="w-full rounded-full">Get Started</Button>
              </Link>
            </div>
            
            <div className="bg-accent text-white p-8 rounded-lg shadow-md transform -translate-y-4 border-2 border-accent">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-white/80 mb-6">For most immigration needs</p>
              <p className="text-3xl font-bold mb-6">$19.99<span className="text-lg text-white/80 font-normal">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Unlimited questions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Document review assistance</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Priority email support</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Form filling guidance</span>
                </li>
              </ul>
              <Link to="/dashboard">
                <Button variant="secondary" className="w-full rounded-full bg-white text-accent hover:bg-white/90">Get Started</Button>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">For law firms and organizations</p>
              <p className="text-3xl font-bold mb-6">Custom</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Unlimited access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>API access</span>
                </li>
              </ul>
              <Link to="/dashboard">
                <Button variant="outline" className="w-full rounded-full">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-accent/10 p-12 rounded-2xl text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to simplify your immigration journey?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of people who are using Ask April to navigate their immigration process with confidence.
            </p>
            <Link to="/dashboard">
              <Button className="rounded-full text-lg px-8 py-6 h-auto">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Ask April</h3>
              <p className="text-gray-600">
                Your AI legal assistant for immigration.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-accent">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-600 hover:text-accent">How it works</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-accent">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-accent">About us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-accent">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-accent">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-accent">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-accent">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-accent">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">© {new Date().getFullYear()} Ask April. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
