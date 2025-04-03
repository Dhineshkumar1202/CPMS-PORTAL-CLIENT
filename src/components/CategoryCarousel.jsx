import React, { useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Fullstack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = useCallback((query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }, [dispatch, navigate]);

  return (
    <div className="my-10 px-4">
      {/* Mobile view: horizontal scrollable category buttons */}
      <div className="flex gap-3 overflow-x-auto md:hidden pb-3 no-scrollbar">
        {category.map((cat, index) => (
          <Button
            key={index}
            onClick={() => searchJobHandler(cat)}
            variant="outline"
            className="whitespace-nowrap flex-shrink-0 rounded-full border-gray-300"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Desktop view: carousel */}
      <div className="hidden md:block">
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {category.map((cat, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full w-full"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
