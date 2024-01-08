import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTimes, faHeart, faStar, faList, faTh, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


import Header from '../HeaderComponent/Header';
import Footer from '../FooterComponent/Footer';
import './Activity.css';

const Activity = () =>{

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
const [isReviewScoreDropdownOpen, setReviewScoreDropdownOpen] = useState(false);
const [isAttractionsDropdownOpen, setAttractionsDropdownOpen] = useState(false);
const [isDurationDropdownOpen, setDurationDropdownOpen] = useState(false);
const [isLanguagesDropdownOpen, setLanguagesDropdownOpen] = useState(false);


const togglePriceDropdown = () => {
  setReviewScoreDropdownOpen(false);
  setAttractionsDropdownOpen(false);
  setDurationDropdownOpen(false);
  setLanguagesDropdownOpen(false);
  setPriceDropdownOpen(!isPriceDropdownOpen);
};

const toggleReviewScoreDropdown = () => {
  setPriceDropdownOpen(false);
  setAttractionsDropdownOpen(false);
  setDurationDropdownOpen(false);
  setLanguagesDropdownOpen(false);
  setReviewScoreDropdownOpen(!isReviewScoreDropdownOpen);
};

const toggleAttractionsDropdown = () => {
  setPriceDropdownOpen(false);
  setDurationDropdownOpen(false);
  setLanguagesDropdownOpen(false);
  setReviewScoreDropdownOpen(false);
  setAttractionsDropdownOpen(!isAttractionsDropdownOpen);
};

const toggleDurationDropdown = () => {
  setPriceDropdownOpen(false);
  setLanguagesDropdownOpen(false);
  setReviewScoreDropdownOpen(false);
  setAttractionsDropdownOpen(false);
  setDurationDropdownOpen(!isDurationDropdownOpen);
};

const toggleLanguagesDropdown = () => {
  setPriceDropdownOpen(false);
  setReviewScoreDropdownOpen(false);
  setAttractionsDropdownOpen(false);
  setDurationDropdownOpen(false);
  setLanguagesDropdownOpen(!isLanguagesDropdownOpen);
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
					<div id="st-content-wrapper" className="st-style-elementor search-result-page activity-layout5" data-layout="5" data-format="top">
						<div className="banner st_1700731748">
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
							        width: "36px",
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
							        <div className={`dropdown-menu range-slider${isPriceDropdownOpen ? ' show' : ''}`} style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(393px, 78px)' }} >
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
							    <li className="filter-review-score">
			  						<div className="form-extra-field">
			  							<button className={`btn btn-link dropdown dropdown-toggle${isReviewScoreDropdownOpen ? ' show' : ''}`} type="button" id="dropdownMenuReviewScore" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="true" onClick={toggleReviewScoreDropdown}>
			  								Review Score <span className="count"></span> <span className="stt-icon stt-icon-arrow-down"></span>
			  							</button>
			  							<div className={`dropdown-menu st-icheck${isReviewScoreDropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuReviewScore" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(537px, 78px)' }} data-popper-placement="bottom-start">
			  								<div className="dropdown-title">Review score</div>
			  								<ul>
			  									<li className="st-icheck-item">
			  										<label>
			  											Excellent<input type="checkbox" name="review_score" value="4" className="filter-item" data-type="star_rate" />
			  											<span className="checkmark fcheckbox"></span>
			  										</label>
			  									</li>
			  									<li className="st-icheck-item">
			  										<label>
			  											Very Good<input type="checkbox" name="review_score" value="3" className="filter-item" data-type="star_rate" />
			  											<span className="checkmark fcheckbox"></span>
			  										</label>
			  									</li>
			  									<li className="st-icheck-item">
			  										<label>
			  											Average<input type="checkbox" name="review_score" value="2" className="filter-item" data-type="star_rate" />
			  											<span className="checkmark fcheckbox"></span>
			  										</label>
			  									</li>
			  									<li className="st-icheck-item">
			  										<label>
			  											Poor<input type="checkbox" name="review_score" value="1" className="filter-item" data-type="star_rate" />
			  											<span className="checkmark fcheckbox"></span>
			  										</label>
			  									</li>
			  									<li className="st-icheck-item">
			  										<label>
			  											Terrible<input type="checkbox" name="review_score" value="zero" className="filter-item" data-type="star_rate" />
			  											<span className="checkmark fcheckbox"></span>
			  										</label>
			  									</li>
			  								</ul>
			  							</div>
			  						</div>
			  					</li>
			  					<li className="filter-review-score taxonomy">
									<div className="form-extra-field">
										<button className={`btn btn-link dropdown dropdown-toggle${isAttractionsDropdownOpen ? ' show' : ''}`} type="button" id="dropdownMenuFacilities" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false" onClick={toggleAttractionsDropdown}>
											Attractions <span className="count"></span> 
											<span className="stt-icon stt-icon-arrow-down"></span>
										</button>
										<div className={`dropdown-menu st-icheck${isAttractionsDropdownOpen ? ' show' : ''}`}
										aria-labelledby="dropdownMenuFacilities" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(703px, 78px)' }} >
											<div className="st-scrollbar dropdown-menu-inner">
												<div className="dropdown-title">Attractions</div>
												<ul>
													<li className=" st-icheck-item" style={{}}>
														<label>Food &amp; Nightlife <input data-tax="taxonomy" data-type="activity-types" value="138" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>Ourdoors <input data-tax="taxonomy" data-type="activity-types" value="139" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>Sightseeing Tours <input data-tax="taxonomy" data-type="activity-types" value="140" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>Workshops <input data-tax="taxonomy" data-type="activity-types" value="141" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</li>
								<li className="filter-review-score taxonomy">
									<div className="form-extra-field">
										<button className={`btn btn-link dropdown dropdown-toggle${isDurationDropdownOpen ? ' show' : ''}`} type="button" id="dropdownMenuFacilities" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false" onClick={toggleDurationDropdown}>
											Duration <span className="count"></span> 
											<span className="stt-icon stt-icon-arrow-down"></span>
										</button>
										<div className={`dropdown-menu st-icheck${isDurationDropdownOpen ? ' show' : ''}`}
										aria-labelledby="dropdownMenuFacilities" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(856px, 78px)' }} >
											<div className="st-scrollbar dropdown-menu-inner">
												<div className="dropdown-title">Duration</div>
												<ul>
													<li className=" st-icheck-item" style={{}}>
														<label>0 – 3 hours <input data-tax="taxonomy" data-type="durations" value="89" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>3 – 5 hours <input data-tax="taxonomy" data-type="durations" value="90" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>5 – 7 hours <input data-tax="taxonomy" data-type="durations" value="91" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>Fullday (+7hours) <input data-tax="taxonomy" data-type="durations" value="92" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>Multi day <input data-tax="taxonomy" data-type="durations" value="93" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</li>
								<li className="filter-review-score taxonomy">
									<div className="form-extra-field">
										<button className={`btn btn-link dropdown dropdown-toggle${isLanguagesDropdownOpen ? ' show' : ''}`} type="button" id="dropdownMenuFacilities" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false" onClick={toggleLanguagesDropdown}>
											Languages <span className="count"></span> 
											<span className="stt-icon stt-icon-arrow-down"></span>
										</button>
										<div className={`dropdown-menu st-icheck${isLanguagesDropdownOpen ? ' show' : ''}`}
										aria-labelledby="dropdownMenuFacilities" style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(991px, 78px)' }} >
											<div className="st-scrollbar dropdown-menu-inner">
												<div className="dropdown-title">Languages</div>
												<ul>
													<li className=" st-icheck-item" style={{}}>
														<label>English <input data-tax="taxonomy" data-type="languages" value="133" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>Espanol <input data-tax="taxonomy" data-type="languages" value="134" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>Francais <input data-tax="taxonomy" data-type="languages" value="135" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>Japanese <input data-tax="taxonomy" data-type="languages" value="136" type="checkbox" name="taxonomy" className="filter-tax" />
															<span className="checkmark fcheckbox"></span>
														</label>
													</li>
													<li className=" st-icheck-item" style={{}}>
														<label>Vietnamese <input data-tax="taxonomy" data-type="languages" value="137" type="checkbox" name="taxonomy" className="filter-tax" />
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
								            California: 18 activities found
								          </h2>
								        </div>
								        <div id="modern-search-result" className="modern-search-result" data-layout="4">
											<div className="map-content-loading">
												<div className="st-loader"></div>
											</div>
											<div className={`service-list-wrapper service-tour row ${isGrid ? 'grid-view' : 'list-view'}`}>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className={`col-12 ${isGrid ? 'col-sm-6 col-md-6 col-lg-3' : ''} item-service ${isGrid ? 'grid-item' : ''}`}>
													<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Event">
														<div className="item service-border st-border-radius">
															<div className="featured-image">
																<div className="st-tag-feature-sale">
																	<div className="featured">
																		Featured
																	</div>
																</div>
																<Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
																	<div className="service-add-wishlist" title="Add to wishlist">
																		<i className="st-border-radius field-icon">
																			<FontAwesomeIcon icon={faHeart} />
																		</i>
																		<div className="lds-dual-ring">
																		</div>
																	</div>
																</Link>
																<Link to="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/">
																	<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/salto-paracaidas-newcastle-australia-450x300.jpg" alt="Historical Hollywood Walking Tour" className="image-feature st-hover-grow" />
																</Link>
																<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
																	<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
																</Link>
															</div>

															<div className="content-item">
																<div className="sub-title st-address d-flex align-items-center" itemProp="location" itemScope="" itemType="https://schema.org/Place">
																	<span itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList"> 
																		<span itemProp="streetAddress"> 
																			<i className="stt-icon-location1">
																				<FontAwesomeIcon icon={faMapMarkerAlt} />
																			</i> 
																			Los Angeles
																		</span>
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<h3 className="title" itemProp="name">
																	<Link href="https://modmixmap.travelerwp.com/st_activity/historical-hollywood-walking-tour/" className="c-main">
																		Historical Hollywood Walking Tour
																	</Link>
																</h3>
																<div className="reviews">
																	<i className="stt-icon-star1">
																		<FontAwesomeIcon icon={faStar} />
																	</i>
																	<span className="rate" itemProp="ratingValue">5</span>
																	<span className="summary">
																		(4 Reviews)
																	</span>
																</div>
																<div className="event-date d-none" itemProp="startDate" content="2023-11-05 06:18:22">
																	2023-11-05 06:18:22
																</div>
																<div className="section-footer">
																	<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																		<span className="price-tour">
																			<span className="price d-flex justify-content-around flex-column">
																				<span className="sale-top">From<span className="text-lg lh1em item "> €200.00</span>
																				</span>
																			</span>
																		</span>
																		<span className="unit">
																			<i className="input-icon st-border-radius field-icon fa">
																				<FontAwesomeIcon icon={faClock} />
																			</i>5 hours
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				<Footer />
			</>
		);
}
export default Activity;