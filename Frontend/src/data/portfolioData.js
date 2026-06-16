import BasicIcon from "../assets/Basic_Icon.png";  
import AdvanceIcon from "../assets/Advance_Icon.png";
import ProgLang from "../assets/Programming_language.png";
import databaseimg from "../assets/database.png";
import ControlImg from "../assets/control.png";
import backendimg from "../assets/backend.png";



export const NAV_LINKS = ["Home", "Tools & Technologies", "About me", "Portfolio", "Contact me"];

export const SERVICES = [
  { icon: BasicIcon , title: "Basic FrontEnd ",  desc: "Strong foundation in semantic HTML, modern CSS, and interactive JavaScript fundamentals." },
  { icon: AdvanceIcon, title: "Advance FrontEnd", width: "290px", offsetX: "-30px",desc: "Building scalable component-based interfaces using modern frameworks and utility-first styling." },
  { icon: ProgLang, title: "Programming Languages", desc: "Applying core programming principles across multiple languages for efficient problem-solving." },
  { icon: backendimg, title: "Backend Development", desc: "Designing secure APIs and server-side logic for scalable web applications." },
  { icon: databaseimg, title: "Databases", width: "290px", desc: "Structuring and managing relational data with performance and reliability in mind." },
  { icon: ControlImg, title: "Tools", width: "290px", offsetX: "-30px",desc: "Leveraging modern development tools to streamline workflow and collaboration." },
];

export const SKILLS = [
  { name: "FrontEnd", level: 70 },
  { name: "BackEnd", level: 70 },
  { name: "UI/UX Design", level: 30 },
  { name: "Quality Assurance", level: 70 },
  { name: "Project Manager", level: 50 },
];

export const PORTFOLIO_TABS = ["All", "Website Design", "App Mobile Design", "App On Atlas", "Branding"];

export const PORTFOLIO_ITEMS = [
  { id: 1, title: "Inventory App", category: "Website Design", color: "#1a1a2e", link: "/inventory" },
  { id: 2, title: "Works", category: "App Mobile Design", color: "#16213e", link: "/works" },
  { id: 3, title: "Name Project", category: "Website Design", color: "#0f3460", link: "/name-project" },
  { id: 4, title: "Branding One", category: "Branding", color: "#1a1a2e", link: "/branding-one" },
  { id: 5, title: "Mobile System", category: "App Mobile Design", color: "#16213e", link: "/mobile-system" },
  { id: 6, title: "Atlas UI", category: "App On Atlas", color: "#0f3460", link: "/atlas-ui" },
  { id: 7, title: "Dark Studio", category: "Website Design", color: "#1a1a2e", link: "/dark-studio" },
  { id: 8, title: "Mobile X", category: "App Mobile Design", color: "#16213e", link: "/mobile-x" },
  { id: 9, title: "Brand Kit", category: "Branding", color: "#0f3460", link: "/brand-kit" },
];
export const STATS = [
  { value: "3+", label: "Years Learning Code" },
  { value: "15+", label: "Academic Projects" },
  { value: "10+", label: "Technologies Explored" },
];
