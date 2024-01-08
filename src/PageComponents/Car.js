import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTimes, faHeart, faList, faTh, faUser, faBook, faSuitcase, faCar } from '@fortawesome/free-solid-svg-icons';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Header from '../HeaderComponent/Header';
import Footer from '../FooterComponent/Footer';
import './Car.css';


const Car = () =>{

	// LocationSearch Start Here

  const locations = [
    'California',
    'Los Angeles',
    'Nevada',
    'New Jersey',
    'Delaware',
    'Philadelphia',
    'New York City',
    'San Francisco',
    'Wilmington',
    'Virginia',
    'Virginia Beach'
  ];

  const [searchValue, setSearchValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isLocationSearchVisible, setLocationSearchVisible] = useState(false);

 const handleInputChange = (event) => {
  const { value } = event.target;
  setSearchValue(value);

  // Filter the locations based on the search value
  const filtered = locations.filter((location) =>
    location.toLowerCase().includes(value.toLowerCase())
  );

  setFilteredLocations(filtered);

  // Show LocationSearch when there is a search value, hide it otherwise
  setLocationSearchVisible(value !== '');
};

  const toggleLocationSearch = () => {
    setLocationSearchVisible(!isLocationSearchVisible);
    setGuestVisible(false);
    // Update filteredLocations when toggling visibility
    if (!isLocationSearchVisible) {
      setFilteredLocations(locations);
    } else {
      // If you want to clear the filteredLocations when hiding the search, you can set an empty array here
      setFilteredLocations([]);
    }
  };

  const handleLocationClick = (location) => {
    setSearchValue(location);
    // Hide LocationSearch when a location is selected
    setLocationSearchVisible(false);
  };

// LocationSearch End Here

// Date Start Here

const currentDate = new Date();
const nextDay = new Date();
nextDay.setDate(currentDate.getDate() + 1);

const [startDate, setStartDate] = useState(currentDate); // Default start date (current date)
const [endDate, setEndDate] = useState(nextDay); // Default end date (next day)

 
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

// Date End Here

// Guest start Here

const [isGuestVisible, setGuestVisible] = useState(false);

const toggleGuest = () => {
    setLocationSearchVisible(false);
    setGuestVisible(!isGuestVisible);
  };

const [roomNumber, setRoomNumber] = useState(1);
const [adults, setAdults] = useState(1);
const [children, setChildren] = useState(0);

  const handleDecreaseRoom = (event) => {
  	event.stopPropagation();
    if (roomNumber > 1) {
      setRoomNumber(roomNumber - 1);
    }
  };

  const handleIncreaseRoom = (event) => {
  	event.stopPropagation();
    if (roomNumber < 9) {
      setRoomNumber(roomNumber + 1);
    }
  };

  const handleDecreaseAdults = (event) => {
  	event.stopPropagation();
    if (adults > 1) {
      setAdults(adults - 1);
    }
  };

  const handleIncreaseAdults = (event) => {
  	event.stopPropagation();
    if (adults < 9) {
      setAdults(adults + 1);
    }
  };

  const handleDecreaseChildren = (event) => {
  	event.stopPropagation();
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  const handleIncreaseChildren = (event) => {
  	event.stopPropagation();
    if (children < 9) {
      setChildren(children + 1);
    }
  };


// Guest End Here


// range slider start

const [range, setRange] = useState([100, 254]);

console.log(range);
  const handleRangeChange = (value) => {
    setRange(value);
  };
// range slider end

// State for dropdown visibility start

  const [isPriceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  

const togglePriceDropdown = () => {
  setCategoriesDropdownOpen(false);
  setPriceDropdownOpen(!isPriceDropdownOpen);
};


const toggleCategoriesDropdown = () => {
  setPriceDropdownOpen(false);
  setCategoriesDropdownOpen(!isCategoriesDropdownOpen);
};


// State for dropdown visibility end


/* st-hotel-result sticky-halfmap start */

	const [isSortDropdownMenuOpen, setSortDropdownMenuOpen] = useState(false);

	const toggleSortDropdownMenu = () => {
		setSortDropdownMenuOpen(!isSortDropdownMenuOpen);
	};

/* st-hotel-result sticky-halfmap end */


// List Grid View Start

  const [isGrid, setGrid] = useState(true);

  const toggleView = () => {
    setGrid(!isGrid);
 };

// List Grid View End 


	return(
			<>	
			<Header />
				<div id="st-content-wrapper" className="st-style-elementor search-result-page car-layout4" data-layout="4" data-format="top">
					<div className="banner st_1700728355">
						<div className="container">

							{/* Form Section Start */}
							<div className="form-container" style={{
							  backgroundColor: '#fff',
							  borderRadius: '70px',
							  boxShadow: '0 1px 2px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.05)'
							}}>
							  <form className="inline-form">
							    <div className="" style={{
							      display: "flex",
							      flexWrap: 'wrap',
							      alignItems: "center",
							    }}>
							      <div className="destination_search border_right" style={{
							        position: "relative",
							        width: "25%",
							      }}>
							        <div className="field-detination"
							          onClick={toggleLocationSearch}
							          style={{
							            display: "flex",
							            alignItems: "center",
							            padding: '0 20px',
							            borderLeft: 'none',
							            minHeight: '82px',
							          }}>
							          <span><i className="fas fa-map-marker-alt" aria-hidden="true" style={{
							            fontSize: '20px',
							            marginRight: '16px',
							            color: 'var(--grey-color,#5E6D77)',
							            cursor: "pointer",
							          }}></i></span>
							          <div className="" style={{
							            textAlign: 'start',
							          }}>
							            <label htmlFor="name"><b>Location</b></label>
							            <div>
							              <input
							                type="text"
							                id="name"
							                name="name"
							                placeholder="Where are you going?"
							                autoComplete="off"
							                value={searchValue}
							                onChange={handleInputChange}
							                style={{
							                  padding: 0,
							                  border: 'none',
							                  outline: 'none',
							                }}
							              />
							            </div>
							            {/* Location Search */}
							            {isLocationSearchVisible && (
							              <div className="LocationSearch"
							                onClick={(e) => e.stopPropagation()}>
							                <div className="loader-wrapper">
							                  <div className="st-loader"></div>
							                </div>
							                <ul className="st-scrollbar">
							                  <li className="location-heading"><span>Popular destinations</span></li>
							                  <li style={{ paddingLeft: "20px" }} className="item parent_li">
							                    <span className="parent">United States</span>
							                  </li>
							                  {filteredLocations.map(location => (
							                    <li
							                      key={location}
							                      className="item"
							                      onClick={() => handleLocationClick(location)}>
							                      <span className="fas fa-map-marker-alt"></span>
							                      <span className="lv2">{location}</span>
							                    </li>
							                  ))}
							                </ul>
							              </div>
							            )}
							          </div>
							        </div>
							      </div>

							      <div className="form_group form_date_field form_date_search d-flex align-items-center" style={{
							        position: "relative",
							        padding: '0',
							        minWidth: "32%",
							        cursor: "pointer",
							        minHeight: "86px",
							      }}>
							        <div className="" style={{
							          display: "flex",
							          alignItems: "center",
							          padding: '0 20px',
							          borderLeft: 'none',
							          minHeight: '82px',
							        }}>
							          <span><i className="fa fa-sign-in-alt" aria-hidden="true" style={{
							            fontSize: '20px',
							            marginRight: '16px',
							            color: 'var(--grey-color,#5E6D77)',
							          }}></i></span>
							          <div className="" style={{
							            textAlign: 'start',
							          }}>
							            <label htmlFor="uname"><b>Check in</b></label>
							            <div className="startDate render check-in-render">
							              <div className="date-picker" onClick={() => { setGuestVisible(false); setLocationSearchVisible(false); }}>
							                <DatePicker
							                  selected={startDate}
							                  onChange={handleStartDateChange}
							                  className="form-control"
							                  placeholderText="Select start date"
							                />
							              </div>
							            </div>
							          </div>
							        </div>

							        <i className="fa fa-arrow-right" aria-hidden="true" style={{
							          fontSize: "13px",
							          color: "#83929d",
							        }}></i>

							        <div className="" style={{
							          display: "flex",
							          alignItems: "center",
							          padding: '0 20px',
							          borderLeft: 'none',
							          minHeight: '82px',
							        }}>
							          <span><i className="fa fa-sign-out-alt" aria-hidden="true" style={{
							            fontSize: '20px',
							            marginRight: '16px',
							            color: 'var(--grey-color,#5E6D77)',
							          }}></i></span>
							          <div className="" style={{
							            textAlign: 'start',
							          }}>
							            <label htmlFor="uname"><b>Check out</b></label>
							            <div className="render check-out-render">
							              <div className="date-picker" onClick={() => { setGuestVisible(false); setLocationSearchVisible(false); }}>
							                <DatePicker
							                  selected={endDate}
							                  onChange={handleEndDateChange}
							                  className="form-control"
							                  placeholderText="Select end date"
							                  minDate={startDate}
							                />
							              </div>
							            </div>
							          </div>
							        </div>
							      </div>

							      <div className="field_guest form_group" style={{
							        paddingLeft: '30px',
							        minWidth: "22%",
							      }}>
							        <div className="" onClick={() => toggleGuest()} style={{
							          display: "flex",
							          alignItems: "center",
							          padding: '0 20px',
							          borderLeft: 'none',
							          minHeight: '82px',
							        }}>
							          <span><i className="fa fa-user" aria-hidden="true" style={{
							            fontSize: '20px',
							            marginRight: '16px',
							            color: 'var(--grey-color,#5E6D77)',
							            cursor: "pointer",
							          }}></i></span>
							          <div className="" style={{
							            position: 'relative',
							            textAlign: 'start',
							          }}>
							            <label htmlFor=""><b>Guests</b></label>
							            <div className="render" style={{
							              cursor: "pointer",
							            }}>
							              <span>{adults + children} guest,{roomNumber} room</span>
							            </div>
							            {/* dropdown-menu Start */}
							            {isGuestVisible && (
							              <div className="guestsDropdown dropdown-menu st-modern-style"
							                onClick={(e) => e.stopPropagation()}>
							                <ul className="Guests" style={{
							                  padding: 0,
							                }}>
							                  <li className="item" style={{
							                    display: "flex",
							                    alignItems: "center",
							                    justifyContent: "space-between",
							                    listStyle: 'none',
							                  }}>
							                    <label htmlFor="">Rooms</label>
							                    <div className="select-wrapper">
							                      <div className="st-number-wrapper" style={{
							                        display: "flex",
							                        alignItems: "center",
							                        justifyContent: "space-between",
							                      }}>
							                        <span className="prev">
							                          <FontAwesomeIcon icon={faMinus} onClick={handleDecreaseRoom} />
							                        </span>
							                        <input
							                          type="text"
							                          name="room_num_search"
							                          value={roomNumber}
							                          className="form-control st-input-number"
							                          autoComplete="off"
							                          readOnly
							                          data-min="1"
							                          data-max="9"
							                        />
							                        <span className="next">
							                          <FontAwesomeIcon icon={faPlus} onClick={handleIncreaseRoom} />
							                        </span>
							                      </div>
							                    </div>
							                  </li>

							                  <li className="item" style={{
							                    display: "flex",
							                    alignItems: "center",
							                    justifyContent: "space-between",
							                    listStyle: 'none',
							                  }}>
							                    <label htmlFor="">Adults</label>
							                    <div className="select-wrapper">
							                      <div className="st-number-wrapper" style={{
							                        display: "flex",
							                        alignItems: "center",
							                        justifyContent: "space-between",
							                      }}>
							                        <span className="prev">
							                          <FontAwesomeIcon icon={faMinus} onClick={handleDecreaseAdults} />
							                        </span>
							                        <input
							                          type="text"
							                          name="room_num_search"
							                          value={adults}
							                          className="form-control st-input-number"
							                          autoComplete="off"
							                          readOnly
							                          data-min="1"
							                          data-max="9"
							                        />
							                        <span className="next">
							                          <FontAwesomeIcon icon={faPlus} onClick={handleIncreaseAdults} />
							                        </span>
							                      </div>
							                    </div>
							                  </li>

							                  <li className="item" style={{
							                    display: "flex",
							                    alignItems: "center",
							                    justifyContent: "space-between",
							                    listStyle: 'none',
							                  }}>
							                    <label htmlFor="">Children</label>
							                    <div className="select-wrapper">
							                      <div className="st-number-wrapper" style={{
							                        display: "flex",
							                        alignItems: "center",
							                        justifyContent: "space-between",
							                      }}>
							                        <span className="prev">
							                          <FontAwesomeIcon icon={faMinus} onClick={handleDecreaseChildren} />
							                        </span>
							                        <input
							                          type="text"
							                          name="room_num_search"
							                          value={children}
							                          className="form-control st-input-number"
							                          autoComplete="off"
							                          readOnly
							                          data-min="1"
							                          data-max="9"
							                        />
							                        <span className="next">
							                          <FontAwesomeIcon icon={faPlus} onClick={handleIncreaseChildren} />
							                        </span>
							                      </div>
							                    </div>
							                  </li>
							                </ul>
							              </div>
							            )}
							            {/* dropdown-menu End */}
							          </div>
							        </div>
							      </div>

							      <div className="button-search-wrapper" style={{
							        marginLeft: 'auto',
							        marginRight: "12px",
							      }}>
							        <button className="btn btn-primary btn-search" style={{
							          background: 'var(--main-color, #3B71FE)',
							          color: '#fff',
							          fontWeight: 500,
							          fontSize: '16px',
							          lineHeight: '20px',
							          borderRadius: '70px',
							          display: 'flex',
							          alignItems: 'center',
							          height: '60px',
							          transition: 'all .2s',
							          padding: '15px 35px',
							        }}>
							          <i className="fa fa-search" aria-hidden="true" style={{
							            marginRight: '8px',
							          }}></i> Search
							        </button>
							      </div>
							    </div>
							  </form>
							</div>
							{/* Form Section End */}

						</div>
					</div>

					{/* top-filter start */}

			        <div className="top-filter">

			        	<div className="btn-clear-filter">
							Clear filter <span className="stt-icon stt-icon-close"><FontAwesomeIcon icon={faTimes} /></span>
						</div>

						<ul>
						    <li className="filter-price">
						      <div className="form-extra-field">
						        <button className={`btn btn-link dropdown dropdown-toggle${isPriceDropdownOpen ? ' show' : ''}`} type="button" id="dropdownMenuFilterPrice" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="true" onClick={togglePriceDropdown}>
						          <span data-text="Filter Price">Filter Price</span> 
						          <span className="stt-icon stt-icon-arrow-down"></span>
						        </button>
						        <div className={`dropdown-menu range-slider${isPriceDropdownOpen ? ' show' : ''}`} style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(619px, 78px)' }} >
							          <div className="dropdown-title">Filter price</div>
							          <Slider
							            min={100}
							            max={254}
							            range
							            value={range}
							            onChange={handleRangeChange}
							          />

							          <div className="min-max-value">
							            <div className="item-value">
							              Min price <span>€{range[0]}</span>
							            </div>
							            <div className="item-value">
							              Max price <span>€{range[1]}</span>
							            </div>
							          </div>
							          <div className="price-action">
							            <Link to="#" className="clear-price">
							              Clear
							            </Link>
							            <button className="btn btn-link btn-apply-price-range">
							            	Apply
							            </button>
							          </div>
							        </div>
						      	</div>
						    </li>
						    <li className="filter-review-score taxonomy">
								<div className="form-extra-field">
									<button className={`btn btn-link dropdown dropdown-toggle${isCategoriesDropdownOpen ? ' show' : ''}`} type="button" id="dropdownMenuFacilities" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false" onClick={toggleCategoriesDropdown}>
									Categories <span className="count"></span> <span className="stt-icon stt-icon-arrow-down"></span>
									</button>
									<div className={`dropdown-menu st-icheck${isCategoriesDropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuFacilities" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(763px, 78px)' }} >
										<div className="st-scrollbar dropdown-menu-inner">
										<div className="dropdown-title">Categories</div>
										<ul> 
											<li className=" st-icheck-item" style={{}}>
												<label>Convertibles <input data-tax="taxonomy" data-type="st_category_cars" value="94" type="checkbox" name="taxonomy" className="filter-tax" />
													<span className="checkmark fcheckbox"></span>
												</label>
											</li>
											<li className=" st-icheck-item" style={{}}>
												<label>Coupes <input data-tax="taxonomy" data-type="st_category_cars" value="95" type="checkbox" name="taxonomy" className="filter-tax" />
													<span className="checkmark fcheckbox"></span>
												</label>
											</li>
											<li className=" st-icheck-item" style={{}}>
												<label>Hatchbacks <input data-tax="taxonomy" data-type="st_category_cars" value="96" type="checkbox" name="taxonomy" className="filter-tax" />
													<span className="checkmark fcheckbox"></span>
												</label>
											</li>
											<li className=" st-icheck-item" style={{}}>
												<label>Minivans <input data-tax="taxonomy" data-type="st_category_cars" value="97" type="checkbox" name="taxonomy" className="filter-tax" />
													<span className="checkmark fcheckbox"></span>
												</label>
											</li>
											<li className=" st-icheck-item" style={{}}>
												<label>Sedan <input data-tax="taxonomy" data-type="st_category_cars" value="98" type="checkbox" name="taxonomy" className="filter-tax" />
													<span className="checkmark fcheckbox"></span>
												</label>
											</li>
											<li className=" st-icheck-item" style={{}}>
												<label>SUVs <input data-tax="taxonomy" data-type="st_category_cars" value="99" type="checkbox" name="taxonomy" className="filter-tax" />
													<span className="checkmark fcheckbox"></span>
												</label>
											</li>
											<li className=" st-icheck-item" style={{}}>
												<label>Trucks <input data-tax="taxonomy" data-type="st_category_cars" value="100" type="checkbox" name="taxonomy" className="filter-tax" />
													<span className="checkmark fcheckbox"></span>
												</label>
											</li>
											<li className=" st-icheck-item" style={{}}>
												<label>Wagons <input data-tax="taxonomy" data-type="st_category_cars" value="101" type="checkbox" name="taxonomy" className="filter-tax" />
													<span className="checkmark fcheckbox"></span>
												</label>
											</li>
										</ul>
										</div>
									</div>
								</div>
							</li>
						</ul>

			        </div>

			    	{/* top-filter end */}

			    	<div className="container">
					  <div className="st-results st-hotel-result st-search-tour">
					    <div className="row">
					      <div className="col-sm-12">

					        <div className="toolbar d-flex align-items-center justify-content-between flex-row-reverse">
					          <ul className="toolbar-action d-none d-md-flex align-items-center justify-content-right">
					            <li>
					              <div className="form-extra-field dropdown ">
					                <button className="btn btn-link dropdown dropdown-toggle" type="button" id="dropdownMenuSort" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-haspopup="true" aria-expanded="false" onClick={toggleSortDropdownMenu}>
					                  Sort <span className="stt-icon stt-icon-arrow-down"></span>
					                </button>

					                {isSortDropdownMenuOpen && (
					                  <div className="dropdown-menu dropdown-menu-end sort-menu" aria-labelledby="dropdownMenuSort" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(-110px, 31px)', }}>
					                    <div className="sort-item st-icheck">
					                      <div className="st-icheck-item">
					                        <label>
					                          New car
					                          <input className="service_order" type="radio" name="service_order_" data-value="new" />
					                          <span className="checkmark"></span>
					                        </label>
					                      </div>
					                    </div>
					                    <div className="sort-item st-icheck">
					                      <span className="title">Price</span>
					                      <div className="st-icheck-item">
					                        <label>
					                          Low to High
					                          <input className="service_order" type="radio" name="service_order_" data-value="price_asc" />
					                          <span className="checkmark"></span>
					                        </label>
					                      </div>
					                      <div className="st-icheck-item">
					                        <label>
					                          High to Low
					                          <input className="service_order" type="radio" name="service_order_" data-value="price_desc" />
					                          <span className="checkmark"></span>
					                        </label>
					                      </div>
					                    </div>
					                    <div className="sort-item st-icheck">
					                      <span className="title">Name</span>
					                      <div className="st-icheck-item">
					                        <label>
					                          a - z
					                          <input className="service_order" type="radio" name="service_order_" data-value="name_asc" />
					                          <span className="checkmark"></span>
					                        </label>
					                      </div>
					                      <div className="st-icheck-item">
					                        <label>
					                          z - a
					                          <input className="service_order" type="radio" name="service_order_" data-value="name_desc" />
					                          <span className="checkmark"></span>
					                        </label>
					                      </div>
					                    </div>
					                  </div>
					                )}
					              </div>
					            </li>
					            <li className="layout">
					              <span className={`layout-item ${!isGrid ? 'active' : ''}`} data-value="list" onClick={toggleView}>
					                <span className="stt-icon stt-icon-list">
					                  <FontAwesomeIcon icon={faList} className="stt-icon stt-icon-list" />
					                </span>
					              </span>
					              <span className={`layout-item ${isGrid ? 'active' : ''}`} data-value="grid" onClick={toggleView}>
					                <span className="stt-icon stt-icon-category">
					                  <FontAwesomeIcon icon={faTh} className="stt-icon stt-icon-grid" />
					                </span>
					              </span>
					            </li>
					          </ul>
					          <h2 className="search-string modern-result-string" id="modern-result-string">
					            19 cars in California
					          </h2>
					        </div>

					        <div id="modern-search-result" className="modern-search-result" data-layout="4">
								<div className="map-content-loading">
									<div className="st-loader"></div>
								</div>
								<div className={`service-list-wrapper service-tour row ${isGrid ? 'grid-view' : 'list-view'}`}>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>										
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
										<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/RentalCarReservation">
											<div className="item service-border st-border-radius">
												<div className="featured-image">
													<div className="st-tag-feature-sale">
													    <div className="featured">Featured</div>
													    <span className="st_sale_class box_sale sale_small"><span>- </span>10% </span>
													</div>
													<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
													    <div className="service-add-wishlist" title="Add to wishlist">
													        <i className="st-border-radius field-icon">
													            <FontAwesomeIcon icon={faHeart} />
													        </i>
													        <div className="lds-dual-ring"></div>
													    </div>
													</Link>
													<Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/">
													    <img itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Group-3354-1-450x300.jpg" alt="Hyundai Accent Sedan" className="image-feature st-hover-grow loaded" />
													</Link>
													<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
													    <img alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round loaded" />
													</Link>
												</div>

												<div className="content-item">
													<div className="car-type plr15">Convertibles</div>
													<h3 className="title" itemProp="name">
													    <Link to="https://modmixmap.travelerwp.com/st_car/hyundai-accent-sedan/" className="c-main">Hyundai Accent Sedan</Link>
													</h3>
													<div className="car-equipments d-flex align-items-center justify-content-start clearfix">
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Passenger">
													        <span className="ico">
													        	<i className="stt-icon-user2">
													        		<FontAwesomeIcon icon={faUser} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Gear Shift">
													        <span className="ico">
													        	<i className="stt-icon-manual">
													        		<FontAwesomeIcon icon={faBook} />
													        	</i>
													        </span>
													        <span className="text text-center">manual</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Baggage">
													        <span className="ico">
													        	<i className="stt-icon-baggage">
													        		<FontAwesomeIcon icon={faSuitcase} />
													        	</i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													    <div className="item d-flex flex-column" data-bs-toggle="tooltip" title="Door">
													        <span className="ico">
													            <i className="stt-icon-car-door">
													            	<FontAwesomeIcon icon={faCar} />
													            </i>
													        </span>
													        <span className="text text-center">4</span>
													    </div>
													</div>
													<div className="section-footer">
													    <div className="price-wrapper d-flex align-items-center" itemProp="totalPrice">
													        <span className="price">€23.40</span>
													        <span className="unit"> / day</span>
													    </div>
													</div>
												</div>
											</div>
										</div>	
									</div>

								</div>
							</div>

					      </div>
					      <div>
					      </div>
					    </div>
					  </div>
					</div>

				</div>
				<Footer />
			</>
		);
}
export default Car;