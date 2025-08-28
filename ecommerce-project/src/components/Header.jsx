import { NavLink } from "react-router-dom";
import "./Header.css";

export function Header({ cart = [] }) {              // 👈 Default: leeres Array
  const totalQuantity = (cart ?? []).reduce(         // 👈 nie auf undefined iterieren
    (sum, item) => sum + (item?.quantity ?? 0),
    0
  );

  return (
    <header className="header">
      <div className="left-section">
        {/* end sorgt dafür, dass der Root-Link nur bei exakt "/" aktiv ist */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `header-NavLink logo-link${isActive ? " active" : ""}`}
        >
          <img className="logo" src="/images/logo-white.png" alt="Logo" />
          <img className="mobile-logo" src="/images/mobile-logo-white.png" alt="Logo mobil" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />
        <button className="search-button">
          <img className="search-icon" src="/images/icons/search-icon.png" alt="Search" />
        </button>
      </div>

      <div className="right-section">
        <NavLink
          to="/orders"
          className={({ isActive }) => `orders-NavLink header-NavLink${isActive ? " active" : ""}`}
        >
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink
          to="/checkout"
          className={({ isActive }) => `cart-NavLink header-NavLink${isActive ? " active" : ""}`}
        >
          <img className="cart-icon" src="/images/icons/cart-icon.png" alt="Cart" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </header>
  );
}