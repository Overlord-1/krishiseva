// import Sidebar from "../sidebar/Sidebar";
import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";
import { motion } from "framer-motion";

const Navbar = ({text}) => {
  return (
    <div className="navbar flex items-center justify-center">
      {/* Sidebar */}
      <Sidebar/>
      <div className="wrapper text-[#e1e289] max-h-10 lg:text-3xl text-xl fixed" >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[#e1e289] font-bold text-2xl lg:text-5xl"
        >
          {text}
        </motion.span>

      </div>
    </div>
  );
};

export default Navbar;