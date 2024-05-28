import { Link, NavLink } from "react-router-dom";
import Classes from "./navigation.module.css";
import { FcTodoList } from "react-icons/fc";
export default function Navigation() {
  return (
    <div className={Classes.menuWrapper}>
      <ul className={Classes.menu}>
        <li className={Classes.menuItem}>
          <FcTodoList className={Classes.menuLogo} />
        </li>
        <li className={Classes.menuItem}>
          <Link to={"/"} className={Classes.menuLink}>
            TODO-APP
          </Link>
        </li>
      </ul>
      <ul className={Classes.menu}>
        <li className={Classes.menuItem}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? Classes.menuLinkActive : Classes.menuLink
            }
          >
            ToDos
          </NavLink>
        </li>
        <li className={Classes.menuItem}>
          <NavLink
            to={"inProgress"}
            className={({ isActive }) =>
              isActive ? Classes.menuLinkActive : Classes.menuLink
            }
          >
            InProgress
          </NavLink>
        </li>
        <li className={Classes.menuItem}>
          <NavLink
            to={"done"}
            className={({ isActive }) =>
              isActive ? Classes.menuLinkActive : Classes.menuLink
            }
          >
            Done
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
