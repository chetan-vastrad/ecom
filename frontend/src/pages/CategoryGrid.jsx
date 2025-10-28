import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import all from "../assets/images/all.png";
import toys from "../assets/images/toys.png";
import furniture from "../assets/images/furniture.png";
import smartphone from "../assets/images/smartphone.png";
import bag from "../assets/images/bag.png";
import makeup from "../assets/images/makeup.png";
import shirt from "../assets/images/shirt.png";
import shoes from "../assets/images/shoes.png";
import device from "../assets/images/device.png";

const categories = [
  { id: 1, name: "All", image: all },
  { id: 2, name: "Electronics", image: device },
  { id: 3, name: "Furniture", image: furniture },
  { id: 4, name: "Mobiles", image: smartphone },
  { id: 5, name: "Clothing", image: shirt },
  { id: 6, name: "Shoes", image: shoes },
  { id: 7, name: "Beauty", image: makeup },
  { id: 8, name: "Toys", image: toys },
  { id: 9, name: "Groceries", image: bag },
];

const CategoryGrid = () => {
  return (
    <div className="bg-gray-100 p-4 my-4 rounded-xl">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 2500, // 2.5 seconds between slides
          disableOnInteraction: false, // keeps autoplay after manual navigation
        }}
        spaceBetween={20}
        slidesPerView={8}
        breakpoints={{
          320: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 8 },
        }}
        className=""
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <Link to={cat.name === "All" ? "/" : `/category/${cat.name.toLowerCase()}`}>
              <div className="flex flex-col items-center bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-16 h-16 object-contain mb-3"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryGrid;
