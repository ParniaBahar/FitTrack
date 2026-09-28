import { HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { CiForkAndKnife } from "react-icons/ci";
import { LuPersonStanding } from "react-icons/lu";


const Sidebar = () => {
  const links = [
    {
      name: "Home",
      icon: <HiOutlineHome size={24} />,
    },
    {
      name: "Food",
      icon: <CiForkAndKnife size={24} />,
    },
    {
      name: "Activity",
      icon: <TbActivityHeartbeat size={24} />,
    },
    {
      name: "Profile",
      icon: <HiOutlineUser size={24} />,
    },
  ];

  return (
    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      z-50

      flex
      justify-around
      items-center

      h-20
      bg-white
      border-t
      border-t-gray-200
      shadow-lg

      lg:top-0
      lg:left-0
      lg:bottom-0
      lg:right-auto
      lg:h-screen
      lg:w-64
      lg:border-r
      lg: border-r-gray-100
      lg:border-t-0
      lg:flex-col
      lg:justify-start
      lg:items-stretch
      lg:py-8
    "
    >
       <div className="flex p-5 gap-3 items-center">
                  <LuPersonStanding className="text-5xl text-white bg-green-500 py-1 px-2 rounded-xl" />
      
                  <h1 className="text-3xl font-semibold">FitTrack</h1>
                </div>

      <div className="flex w-full justify-around lg:flex-col lg:gap-2 lg:px-4">
        {links.map((item) => (
          <button
            key={item.name}
            className="
            flex
            flex-col
            items-center
            gap-1
            rounded-xl
            p-3
            text-gray-600
            hover:bg-green-100
            hover:text-green-600
            transition

            lg:flex-row
            lg:gap-4
            lg:w-full
          "
          >
            {item.icon}
            <span className="text-xs lg:text-base">{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
