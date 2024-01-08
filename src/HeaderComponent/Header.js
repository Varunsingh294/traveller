import React, { useState, useEffect ,useContext} from 'react';
import { NavLink, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {addToCartContext} from '../contexts/AddToCartProvider';
import Modal from "../LoginSignupComponent/SignInSignUpModal/Modal";
import './Header.css';


const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { state, dispatch } = useContext(addToCartContext);
  const cartItems = state.cartItems; 
  const isEmptyCart = !cartItems || cartItems.length === 0;

  const [notificationCount, setNotificationCount] = useState(cartItems.length);
  // console.log(notificationCount);
  // console.log(cartItems.length);

    // const addedItem = cartItems.find(item => item.isAdded);
    // if (addedItem) {
    //   setNotificationCount(notificationCount + 1);
    // }

    // const notificationCount = cartItems.length;

  const handleRemoveItem = (item) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: item,
    });

    if (cartItems.length === 1) {
      toggleCartDropdown();
    }

    // setNotificationCount(notificationCount - 1);

  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    // document.body.classList.add('sidebar-open');
  };

  const closeMenu = () => {
    setMenuOpen(false);
    // document.body.classList.remove('sidebar-open');
  };

// header right dropdown-menu start

const [isCurrencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const toggleCurrencyDropdown = () => {
    setCurrencyDropdownOpen(!isCurrencyDropdownOpen);
    setCartDropdownOpen(false);
  };

  const closeCurrencyDropdown = () => {
    setCurrencyDropdownOpen(false);
  };

//header right dropdown-menu end


//header right dropdown-menu cart start

const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);

const toggleCartDropdown = () => {
  setCartDropdownOpen(!isCartDropdownOpen);
  setCurrencyDropdownOpen(false);

    if (notificationCount) {
      setNotificationCount(0);
    }
 

};


//header right dropdown-menu cart end


/* Start Modal*/

const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalShow, setIsModalShow] = useState(false);
// const handleLoginSignupModalClose = (isOpen) => {
//     setIsModalOpen(isOpen);
//   };
/* End Modal*/

// Dropdown
// const [isDropdownVisible, setDropdownVisible] = useState(false);

//   const handleMouseEnter = () => {
//     setDropdownVisible(true);
//   };

//   const handleMouseLeave = () => {
//     setDropdownVisible(false);
//   };

/* Start toggleDropdown*/
const [openSubMenu, setOpenSubMenu] = useState(null);
const handleSubMenuToggle = (index) => {

    console.log(openSubMenu);
    setOpenSubMenu(openSubMenu === index ? null : index);

  };

// const navigate = useNavigate();
const logOut = () => {
   sessionStorage.clear();

  window.localStorage.clear();


// https://stackoverflow.com/questions/71504920/how-do-i-implement-a-logout-functionality-from-a-react-router-link-to-imports-an

// https://stackoverflow.com/questions/71960194/update-navbar-after-success-login-or-logout-redirection


// https://www.bezkoder.com/react-hooks-redux-login-registration-example/

  // localStorage.removeItem('user');
  // location.href = 'localhost:3000';

  window.location.href = "/";
  // navigate('/');
}


  // useEffect(() => {
  //   setNotificationCount(cartItems.length);
  // }, [state]); 

/* End toggleDropdown*/


  const topBar = (
    <>  
      <div className="topbar-left">
        <ul className="st-list topbar-items">
          <li className="topbar-item link normal">
            <Link to="#" target="_self">
              <i className="fas fa-phone"></i>(000) 999 -656 -888
            </Link>
          </li>
          <li className="topbar-item link normal">
            <Link to="#" target="_self">
              <i className="fas fa-envelope"></i>travelerwp@gmail.com
            </Link>
          </li>
        </ul>
      </div>

      <div className="topbar-right">
        <ul className="st-list topbar-items">
          <li className="topbar-item link social">
            <Link to="#" target="_self">
              <i className="fab fa-facebook"></i>
            </Link>
          </li>
          <li className="topbar-item link social">
            <Link to="#" target="_self">
              <i className="fab fa-twitter"></i>
            </Link>
          </li>
          <li className="topbar-item link social">
            <Link to="#" target="_self">
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
          <li className="topbar-item link social">
            <Link to="#" target="_self">
              <i className="fab fa-youtube"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );

 const largeScreenNavbar = (

    <nav id="st-main-menu" className="p-0 navbar navbar-expand-lg navbar-light">
     
    <ul id="main-menu" className="navbar-nav me-auto mb-2 mb-lg-0 menu main-menu">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
           Home
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="#">
          Hotel <i className="fa fa-angle-down"></i>
        </NavLink>
        <ul className="dropdown_menu card" aria-labelledby="dropdown-currency">
          <li>
            <NavLink className="nav-link" to="/hotel">
              Hotel 01
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/hotel">
              Hotel 02
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/hotel">
              Hotel 03
            </NavLink>
          </li>
        </ul>

      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="#">
          Tour <i className="fa fa-angle-down"></i>
        </NavLink>
        <ul className="dropdown_menu card" aria-labelledby="dropdown-currency">
          <li>
            <NavLink className="nav-link" to="/tour">
              Tour 01
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/tour">
              Tour 02
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/tour">
              Tour 03
            </NavLink>
          </li>
        </ul>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="#">
          Activity <i className="fa fa-angle-down"></i>
        </NavLink>
        <ul className="dropdown_menu card" aria-labelledby="dropdown-currency">
          <li>
            <NavLink className="nav-link" to="/activity">
              Activity 01
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/activity">
              Activity 02
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/activity">
              Activity 03
            </NavLink>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="#">
          Rental <i className="fa fa-angle-down"></i>
        </NavLink>
        <ul className="dropdown_menu card" aria-labelledby="dropdown-currency">
          <li>
            <NavLink className="nav-link" to="/rental">
              Rental 01
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/rental">
              Rental 02
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/rental">
              Rental 03
            </NavLink>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="#">
          Car <i className="fa fa-angle-down"></i>
        </NavLink>
        <ul className="dropdown_menu card" aria-labelledby="dropdown-currency">
          <li>
            <NavLink className="nav-link" to="/car">
              Car 01
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/car">
              Car 02
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/car">
              Car 03
            </NavLink>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="#">
          Pages <i className="fa fa-angle-down"></i>
        </NavLink>
        <ul className="dropdown_menu card" aria-labelledby="dropdown-currency">
          <li>
            <NavLink className="nav-link" to="/pages">
              Pages 01
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/pages">
              Pages 02
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/pages">
              Pages 03
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
          
    </nav>
  );

  const smallScreenNavbar = (
    <div className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
      
      <button className="menu-toggle-button" onClick={toggleMenu}>
        ☰
      </button>
      
      <nav className={`off-canvas-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="closeButton">
          <button className="close-button" onClick={closeMenu}>
            &lsaquo;
          </button>
        </div>
        <ul>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>

          <li>

            <div className="submenu-toggle-button" onClick={(event) => {
              
              handleSubMenuToggle(0);
            }}>
              Hotel <i className={`fa fa-angle-up ${openSubMenu === 0 ? 'down':'up'}`} />
            </div>

            {openSubMenu === 0 && (
              <ul className="submenu">
                <li>
                  <NavLink to="/hotel" onClick={toggleMenu}>
                    Hotel 01
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hotel" onClick={toggleMenu}>
                    Hotel 02
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hotel" onClick={toggleMenu}>
                    Hotel 03
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hotel" onClick={toggleMenu}>
                    Hotel 04
                  </NavLink>
                </li>
              </ul>
            )}

          </li>

          <li>
            <div className="submenu-toggle-button" onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              handleSubMenuToggle(1);
            }}>
              {/* Tour <span className={`arrow ${openSubMenu === 1 ? 'open' : ''}`} /> */}
              Tour <i className={`fa ${openSubMenu === 1 ? 'fa-angle-up' : 'fa-angle-down'}`} />

            </div>
            {openSubMenu === 1 && (
              <ul className="submenu">
                <li>
                  <NavLink to="/tour" onClick={toggleMenu}>
                    Tour 01
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tour" onClick={toggleMenu}>
                    Tour 02
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tour" onClick={toggleMenu}>
                    Tour 03
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tour" onClick={toggleMenu}>
                    Tour 04
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
  
            <div className="submenu-toggle-button" onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              handleSubMenuToggle(2);
            }}>
              Activity <i className={`fa ${openSubMenu === 2 ? 'fa-angle-up' : 'fa-angle-down'}`} />
            </div>

            {openSubMenu === 2 && (
              <ul className="submenu">
                <li>
                  <NavLink to="/activity" onClick={toggleMenu}>
                    Activity 01
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/activity" onClick={toggleMenu}>
                    Activity 02
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/activity" onClick={toggleMenu}>
                    Activity 03
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/activity" onClick={toggleMenu}>
                    Activity 04
                  </NavLink>
                </li>
              </ul>
            )}

          </li>

          <li>
            
            <div className="submenu-toggle-button" onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              handleSubMenuToggle(3);
            }}>
              Rental <i className={`fa ${openSubMenu === 3 ? 'fa-angle-up' : 'fa-angle-down'}`} />
            </div>

            {openSubMenu === 3 && (
              <ul className="submenu">
                <li>
                  <NavLink to="/rental" onClick={toggleMenu}>
                    Rental 01
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/rental" onClick={toggleMenu}>
                    Rental 02
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/rental" onClick={toggleMenu}>
                    Rental 03
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/rental" onClick={toggleMenu}>
                    Rental 04
                  </NavLink>
                </li>
              </ul>
            )}

          </li>

          <li>
            
            <div className="submenu-toggle-button" onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              handleSubMenuToggle(4);
            }}>
              Car <i className={`fa ${openSubMenu === 4 ? 'fa-angle-up' : 'fa-angle-down'}`} />
            </div>

            {openSubMenu === 4 && (
              <ul className="submenu">
                <li>
                  <NavLink to="/car" onClick={toggleMenu}>
                    Car 01
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/car" onClick={toggleMenu}>
                    Car 02
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/car" onClick={toggleMenu}>
                    Car 03
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/car" onClick={toggleMenu}>
                    Car 04
                  </NavLink>
                </li>
              </ul>
            )}

          </li>
          <li>
          
            <div className="submenu-toggle-button" onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              event.preventDefault();
              handleSubMenuToggle(5);
            }}>
              Pages <i className={`fa ${openSubMenu === 5 ? 'fa-angle-up' : 'fa-angle-down'}`} />
            </div>

            {openSubMenu === 5 && (
              <ul className="submenu">
                <li>
                  <NavLink to="/pages" onClick={toggleMenu}>
                    Pages 01
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/pages" onClick={toggleMenu}>
                    Pages 02
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/pages" onClick={toggleMenu}>
                    Pages 03
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/pages" onClick={toggleMenu}>
                    Pages 04
                  </NavLink>
                </li>
              </ul>
            )}

          </li>
        </ul>
      </nav>
    </div>
  );


  const header_left = (
    <>
      <div className="menu-toggle"></div>
      <Link to="https://modmixmap.travelerwp.com/" className="logo d-none d-sm-none d-lg-block">
        <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Default-Color-1-NewDemo.svg" alt="TravelerWP" />
      </Link>
      <Link to="https://modmixmap.travelerwp.com/" className="logo d-block d-lg-none">
        <img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Default-Color-1-NewDemo.svg" alt="TravelerWP" />
      </Link>
      <h1 className="tag_h1 d-none d-lg-none">ModMixMap</h1>
    </>
  );

  const header_right = (
  
      <ul className="items d-flex align-items-center flex-wrap">

      <li className={`dropdown dropdown-currency no-arrow ${isCurrencyDropdownOpen ? 'open' : ''}`}>
        <Link to="#" onClick={toggleCurrencyDropdown}>
          EUR <i className="fa fa-angle-down"></i>
        </Link>
        {isCurrencyDropdownOpen && (
          <ul className="dropdown_menu_right" aria-labelledby="dropdown-currency">
            <li>
              <Link to="/?currency=USD" onClick={closeCurrencyDropdown}>
                USD
              </Link>
            </li>
            <li>
              <Link to="/?currency=AUD" onClick={closeCurrencyDropdown}>
                AUD
              </Link>
            </li>
            <li>
              <Link to="/?currency=GBP" onClick={closeCurrencyDropdown}>
                GBP
              </Link>
            </li>
          </ul>
        )}
      </li>


      <li className="dropdown dropdown-minicart no-arrow">
        <div className="cart_icon" style={{ cursor: 'pointer' }} onClick={toggleCartDropdown}>
          {notificationCount > 0 && (
            <div className="cart-caret" style={{ position: 'absolute', top: '-10px', left: '80%', marginLeft: '-10px', borderRadius: '50%', background: '#fa5636', color: '#fff', textAlign: 'center', minWidth: '20px', minHeight: '20px', fontWeight: '400', lineHeight: '20px', padding: '0 5px' }}>
              {notificationCount}
            </div>
          )}
          <i className="fa fa-shopping-bag"></i>
        </div>
        <ul className={`dropdown_menu_cart dropdown-menu-end ${isCartDropdownOpen ? 'open' : ''}`} aria-labelledby="dropdown-mini-cart">
          <li className="heading">
            <div className="st-heading-section">Your Cart</div>
          </li>
          {isEmptyCart ? (
            <li>
              <div className="col-lg-12 cart-text-empty text-warning">
                Your cart is empty
              </div>
            </li>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <li key={item.id} className="cart-item" key={index}>
                  <div className="media d-flex align-items-top">
                    <div className="media-left">
                      <img width="70" height="70" src={`/RoomImages/${item.room_image}`} className="media-object wp-post-image" alt="Checkout" sizes="(max-width: 70px) 100vw, 70px" />
                    </div>
                    <div className="media-body ms-3">
                      <div className="media-heading">
                        <Link className="st-link c-main" to="#" style={{ fontSize: '16px', lineHeight: '20px', color: 'var(--heading-color, initial)', textDecoration: 'none' }}>
                          {item.hotelName}
                        </Link>
                      </div>
                      <div className="price-wrapper">Price: <span className="price">€{item.room_price}</span></div>
                    </div>
                  </div>
                  <Link to="#" className="cart-delete-item" style={{ position: 'absolute', right: '25px', color: '#d9534f' }} onClick={() => handleRemoveItem(item)}>
                    <i className="fa fa-trash"></i>
                  </Link>
                </li>
              ))}
              <li className="cart-total" style={{ borderTop: '1px solid #dedede', paddingTop: '20px', marginTop: '20px', }}>
                <div className="sub-total" style={{ padding: '0 0 18px 0', fontSize: '18px', color: 'var(--grey-color, #5E6D77)', fontWeight: 500, }}>Subtotal <span className="price" style={{ color: 'black' }}>€{cartItems.reduce((total, item) => total + parseFloat(item.room_price), 0).toFixed(2)}</span></div>
                <Link to="#" className="btn btn-full upper" style={{ background: 'var(--main-color, #3B71FE)', borderRadius: '50px', fontWeight: 500, fontSize: '16px', lineHeight: '20px', color: '#fff', padding: '12px 22px', transition: 'all 0.3s', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', display: 'flex', }}>
                  Pay Now
                </Link>
              </li>
            </>
          )}
        </ul>
      </li>

      <li className="dropdown dropdown-user-dashboard no-arrow">
        <Link to="#" onClick={() => {
          setCartDropdownOpen(false);
          setCurrencyDropdownOpen(false);
          setIsModalOpen(true);
        }}>
          <i className="fa fa-user"></i>
        </Link>

        {/* Modal */}
          <Modal
            show={isModalOpen}
            handleClose={setIsModalOpen}
        />

      </li>

      <li className="d-none d-xl-block st-header-link">
        <Link to="#" onClick={logOut}>
          <i className="mr5"></i>Log Out
        </Link>
      </li>

    </ul>

    );


  const smallScreen_header_right = (
  
      <ul className="items d-flex align-items-center flex-wrap">

      <li className="dropdown dropdown-minicart no-arrow">
        <div className="cart_icon" style={{ cursor: 'pointer' }} onClick={toggleCartDropdown}>
            <i className="fa fa-shopping-bag"></i>
        </div>
        <ul className={`dropdown_menu_cart dropdown-menu-end ${isCartDropdownOpen ? 'open' : ''}`} aria-labelledby="dropdown-mini-cart" >

          <li className="heading">
            <div className="st-heading-section">Your Cart</div>
          </li>
          <li>
            <div className="col-lg-12 cart-text-empty text-warning">
              Your cart is empty
            </div>
          </li>
        </ul>
      </li>

      <li className="dropdown dropdown-user-dashboard no-arrow">
        <Link to="#" onClick={() => {
          setCartDropdownOpen(false);
          setCurrencyDropdownOpen(false);
          setIsModalShow(true);
        }}>
          <i className="fa fa-user"></i>
        </Link>

        {/* Modal */}
          <Modal
            show={isModalShow}
            handleClose={setIsModalShow}
        />

      </li>

      <li className="d-none d-xl-block st-header-link">
        <Link to="#">
          <i className="mr5"></i>Become a host
        </Link>
      </li>

    </ul>

  );

  return (
    <div className="mainHeader" style={{ zIndex: 1000 }}>
      {/* Render largeScreenNavbar after 668px */}
      <div id="topbar" className="d-none d-md-block px-5 py-1 d-md-flex align-items-center justify-content-between flex-wrap style-elementor mobile-hidden">{topBar}</div>

      {/* Render largeScreenNavbar after 992px */}
      <div className="d-none d-lg-block px-5 header1 d-lg-flex align-items-center justify-content-between">

          <div className="header__left">{header_left}</div>
          <div className="header__center">{largeScreenNavbar}</div>
          <div className="header__right">{header_right}</div>

      </div>

      {/* Render smallScreenNavbar before 992px */}
      <div className="px-5 d-lg-none d-flex align-items-center justify-content-between">
        <div className="">{smallScreenNavbar}</div>
        <div className="smallScreen_header__left" style={{ }}>{header_left}</div>
        <div className="header__right">{smallScreen_header_right}</div>
      </div>
    </div>
  );
};

export default Header;