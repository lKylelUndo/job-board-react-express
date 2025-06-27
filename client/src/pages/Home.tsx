import React from "react";
import Banner from "../components/Banner";
import About from "../components/About";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <Testimonials />
      <footer className="bg-[#0A0F22] text-center">
        <code className="text-white text-center">
          &copy; 2025 KareraMo Ph. All rights reserved.
        </code>
      </footer>
    </>
  );
};

export default Home;
