import React from "react";
import Slider from "../components/ui/Slider";
import CourseCard from "../components/ui/CourseCard";
import courses from "../data/courses";
import ProductGrid from "../components/ui/ProductGrid";
import News from "../components/ui/News";


const Home = () => {
  return (
    <section className="">
      <News />
      <Slider />
      <ProductGrid />
      <div className="courses-grid">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </section>
  );
};

export default Home;
