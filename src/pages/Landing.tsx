
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Ask April</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/auth/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/auth/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
        <motion.div 
          className="lg:w-1/2 mb-12 lg:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Ultimate Learning Management Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Create, manage and deliver engaging online courses with our intuitive platform. Designed for educators and course creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/courses/overview">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Courses
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <div className="bg-gradient-to-r from-accent to-primary p-1 rounded-2xl">
              <div className="bg-card rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Learning Platform" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-3">Course Creation</h3>
              <p className="text-muted-foreground">
                Easily create and manage comprehensive courses with our intuitive tools.
              </p>
            </motion.div>
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-3">Student Management</h3>
              <p className="text-muted-foreground">
                Track student progress and engagement with detailed analytics.
              </p>
            </motion.div>
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-3">Community Building</h3>
              <p className="text-muted-foreground">
                Foster student interaction and engagement with robust community features.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to transform your teaching?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of educators already using our platform to create engaging learning experiences.
        </p>
        <Link to="/auth/signup">
          <Button size="lg">
            Start Your Journey Today
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold">Ask April</span>
              <p className="text-muted-foreground mt-2">Your LMS Partner</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/courses/overview" className="text-muted-foreground hover:text-foreground">
                Courses
              </Link>
              <Link to="/auth/signin" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Link>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Ask April. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
