// import Sidebar from "../sidebar/Sidebar";
import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="navbar flex items-center justify-center">
      {/* Sidebar */}
      <Sidebar/>
      <div className="wrapper text-white text-3xl" >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          KrishiSeva
        </motion.span>

      </div>
    </div>
  );
};

export default Navbar;