import React from "react";
import f1 from "../assets/f1.svg";
import f2 from "../assets/f2.svg";
import f3 from "../assets/f3.svg";
import AboutDescription from "../components/AboutDescription";

const About = () => {
  return (
    <>
    <AboutDescription />
      <div className="max-w-screen-xl mx-auto px-4">
        {/* First Div */}
        <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
          {/* Left Content */}
          <div className="md:w-1/2 md:order-1">
            <img src={f3} alt="f3" className="w-1/4  mx-auto md:mx-0" />
            <h1 className="text-center md:text-left text-2xl font-semibold my-4">
              Get Ready to Satisfy your cravings in just a few taps
            </h1>
          </div>

          {/* Empty Right Side */}
          <div className="md:w-1/2 md:order-2"></div>
        </div>

        {/* Second Div */}
        <div className="flex flex-col md:flex-row-reverse items-start md:items-center mb-8">
          {/* Left Content */}
          <div className="md:w-1/2 md:order-3">
            <img src={f2} alt="f2" className="w-1/4 mx-auto md:mx-0" />
            <h1 className="text-center md:text-left text-2xl font-semibold my-4">
              Enjoy hassle-free ordering and quick pickups
            </h1>
          </div>

          {/* Empty Right Side */}
          <div className="md:w-1/2 md:order-4"></div>
        </div>

        {/* Third Div */}
        <div className="flex flex-col md:flex-row items-start md:items-center">
          {/* Left Content */}
          <div className="md:w-1/2 md:order-5">
            <img src={f1} alt="f1" className="w-1/4 mx-auto md:mx-0" />
            <h1 className="text-center md:text-left text-2xl font-semibold my-4">
              Say goodbye to long queues and waiting time
            </h1>
          </div>

          {/* Empty Right Side */}
          <div className="md:w-1/2 md:order-6"></div>
        </div>
      </div>
    </>
  );
};

export default About;
