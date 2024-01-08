import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faHeart, faMapMarkerAlt, faStar, faClock, faUser, faBed, faBathtub, faSquare, faBook, faSuitcase, faCar } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'react-bootstrap';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import { Formik, Form, Field } from 'formik';


import Header from '../HeaderComponent/Header';
import Footer from '../FooterComponent/Footer';

import './Home.css';


const Home = () => {

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost/traveler/hotels_all_data.php');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

 // pagination start here

  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 8;

  // Calculate the index range for the current page
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Calculate total number of pages
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 // pagination end here

  // const validate = (values) => {
  //   const errors = {};

  //   if (!values.EMAIL) {
  //     errors.EMAIL = 'Email address is required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.EMAIL)) {
  //     errors.EMAIL = 'Invalid email address';
  //   }

  //   return errors;
  // };

  // const handleSubmit = (values, { setSubmitting, setFieldError, setFieldTouched }) => {
  //   console.log(values);

  //   setFieldTouched('EMAIL', true, false);

  //   setSubmitting(false);
  // };



// Slider start

const CustomPrevButton = ({ onClick }) => (
    <button className="custom-prev-button" onClick={onClick}>
      &#x276E;
    </button>
  );

  const CustomNextButton = ({ onClick }) => (
    <button className="custom-next-button" onClick={onClick}>
      &#x276F;
    </button>
  );

  const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 4,
  prevArrow: <CustomPrevButton />,
  nextArrow: <CustomNextButton />,

  responsive: [
    {
      // Desktop
      breakpoint: 10000,
      settings: {
        slidesToShow: 4,
        swipeToSlide: true,
      },
    },
    {
      // Mini Desktop
      breakpoint: 1366,
      settings: {
        slidesToShow: 4,
        swipeToSlide: true,
      },
    },
    {
      // Tablet Pro +
      breakpoint: 1240,
      settings: {
        slidesToShow: 4,
        swipeToSlide: true,
      },
    },
    {
      // Tablet Pro
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        swipeToSlide: true,
      },
    },
    {
      // Tablet
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        swipeToSlide: true,
      },
    },
    {
      // Mobile
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        swipeToSlide: true,
      },
    },
  ],
};





  // Slider end


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

// Guest End Here

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

// Recommended for you start 
const [activeTab, setActiveTab] = useState('hotel');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
// Recommended for you end 

  return (
    <>
      <Header />
      <div className="container-fluid banner p-0" style={{
    		backgroundColor: 'rgb(255, 255, 255)',
    		marginBottom: '9%',
      }}>
        <div
          className="text-center bg-image rounded-0"
          style={{
            backgroundImage: "url('https://modmixmap.travelerwp.com/wp-content/uploads/2022/06/bannermix-min.png')",
            backgroundRepeat: 'no-repeat',
            height: '540px',
    		backgroundSize: 'cover',
    		position: 'relative',
          }}
        >
    	{/* Top Section Start */}
         <div className="mask" style={{
         	position: 'absolute',
		    width: '100%',
		    bottom: '-45px',
         }}>
            <div className="">
            	<div className="" style={{color:'#fff', fontFamily: 'dm sans, sans-serif',fontSize: '64px', fontWeight: '700',lineHeight: '74px', margin: '0 0 14px'}}>
            		Let the journey begin
            	</div>
            	<div>
            		<p style={{color: '#fff', fontFamily: 'dm sans, sans-serif', fontSize: '18px', fontWeight: '400', lineHeight: '30px'}}>
            			Get the best prices on 2,000,000+ properties, worldwide
            		</p>
            	</div>
            	{/* Tab Section Start */}
            	<div className="container">
		    		<ul style={{ color: '#fff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyleType: 'none', padding: 0 }}>
		    			<li style={{margin: '0 17px 24px'}}>
			    			<Link to="#" target="_self" style={{ textDecoration: 'none', color: '#fff' }}>
	              				Hotel
	            			</Link>
		    			</li>
		    			<li style={{margin: '0 17px 24px'}}>
			    			<Link to="#" target="_self" style={{ textDecoration: 'none', color: '#fff' }}>
								Tours
	            			</Link>
		    			</li>
		    			<li style={{margin: '0 17px 24px'}}>
			    			<Link to="#" target="_self" style={{ textDecoration: 'none', color: '#fff' }}>
	              				Activity
	            			</Link>
		    			</li>
		    			<li style={{margin: '0 17px 24px'}}>
			    			<Link to="#" target="_self" style={{ textDecoration: 'none', color: '#fff' }}>
	              				Rental
	            			</Link>
		    			</li>
		    			<li style={{margin: '0 17px 24px'}}>
			    			<Link to="#" target="_self" style={{ textDecoration: 'none', color: '#fff' }}>
	              				Cars Rental
	            			</Link>
		    			</li>
		    			<li style={{margin: '0 17px 24px'}}>
			    			<Link to="#" target="_self" style={{ textDecoration: 'none', color: '#fff' }}>
	              				Car Transfer
	            			</Link>
		    			</li>
		    		</ul>
		    	</div>
		    	{/* Tab Section End */}

		    	{/* Form Section Start */}

	    		<div className="container form-container" style={{
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
				    		}}>
				    		</i></span>
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
				        				onClick={(e) => e.stopPropagation()}
				        			>

				        			<div className="loader-wrapper">
									    <div className="st-loader"></div>
									</div>

									<ul className="st-scrollbar">
										<li className="location-heading"><span>Popular destinations</span></li>

										<li style={{paddingLeft: "20px"}} className="item parent_li">
											<span className="parent">United States</span>
										</li>


										{filteredLocations.map(location => (
								          <li
								            key={location}
								            className="item"
								            onClick={() => handleLocationClick(location)}
								          >
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
				    		// padding: '0 30px 0 12px',
				    		padding: '0 20px',
						    borderLeft: 'none',
						    minHeight: '82px',
				    	}}>
				    		<span><i className="fa fa-sign-in-alt" aria-hidden="true" style={{
				    			fontSize: '20px',
							    marginRight: '16px',
							    color: 'var(--grey-color,#5E6D77)',
				    		}}>
				    		</i></span>
				        	<div className="" style={{
				        		textAlign: 'start',
				        	}}>
					        	<label htmlFor="uname"><b>Check in</b></label>
					        	<div className="startDate render check-in-render">
					        		<div className="date-picker" onClick={
					        			()=>{
					        				setGuestVisible(false);
					        				setLocationSearchVisible(false);
					        			}
					        		}>
							          <DatePicker
							            selected={startDate}
							            onChange={handleStartDateChange}
							            className="form-control form-control1"
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
				    		}}>
				    		</i></span>
				        	<div className="" style={{
				        		textAlign: 'start',
				        	}}>
					        	<label htmlFor="uname"><b>Check out</b></label>
					        	<div className="render check-out-render">
					        		<div className="date-picker" onClick={
					        			()=>{
					        				setGuestVisible(false);
					        				setLocationSearchVisible(false);
					        			}
					        		}>
							          <DatePicker
							            selected={endDate}
							            onChange={handleEndDateChange}
							            className="form-control form-control1"
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
				        <div className="" onClick={()=>toggleGuest()} style={{
				    		display: "flex",
				    		alignItems: "center",
				    		padding: '0 20px',
						    borderLeft: 'none',
						    minHeight: '82px',
				    	}}>
				    		{/* <i className="fa fa-user-alt" aria-hidden="true"></i> */}
				    		<span><i className="fa fa-user" aria-hidden="true" style={{
				    			fontSize: '20px',
							    marginRight: '16px',
							    color: 'var(--grey-color,#5E6D77)',
							    cursor: "pointer",
				    		}}>
				    		</i></span>
				        	<div className="" style={{
				        		position: 'relative',
				        		textAlign: 'start',
				        	}}>
					        	<label htmlFor=""><b>Guests</b></label>
					        	<div className="render"
					        		style={{
					        			cursor: "pointer",
					        		}}>
					        		<span>{adults + children} guest,{roomNumber} room</span>
					        	</div>
					        	{/* dropdown-menu Start */}
					        	{isGuestVisible && (
					        	<div className="guestsDropdown dropdown-menu st-modern-style"
					        		onClick={(e) => e.stopPropagation()}
					        	>
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
							        				justifyContent: "space-between"
							        			}}>
							        				<span className="prev">
							        					<FontAwesomeIcon icon={faMinus} onClick={handleDecreaseRoom} />
							        				</span>
							        				<input
													  type="text"
													  name="room_num_search"
													  value={roomNumber}
													  className="form-control form-control1 st-input-number"
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
							        				justifyContent: "space-between"
							        			}}>
							        				<span className="prev">
							        					<FontAwesomeIcon icon={faMinus} onClick={handleDecreaseAdults} />
							        				</span>
							        				<input
													  type="text"
													  name="room_num_search"
													  value={adults}
													  className="form-control form-control1 st-input-number"
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
							        				justifyContent: "space-between"
							        			}}>
							        				<span className="prev">
							        					<FontAwesomeIcon icon={faMinus} onClick={handleDecreaseChildren} />
							        				</span>
							        				<input
													  type="text"
													  name="room_num_search"
													  value={children}
													  className="form-control form-control1 st-input-number"
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
				        <button className="btn btn-primary btn-search"style={{
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
        </div>
      </div>

      	<div className="container-fluid" style={{
    		backgroundColor: 'rgb(255, 255, 255)',
    		width: '88%',
    		padding: 0,
      	}}>
      	
        	<div className="zoom-in-main">
        		<div className=" zoom-in-out">
        			<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Frame-3151-min.png" width='100%' alt="TravelerWP" className="img-fluid" />
        		</div>
        		<div className="zoom-in-out">
        			<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Frame-3150-min.png" width='100%' alt="TravelerWP" className="img-fluid" />
        		</div>
        	</div>
	        
        </div>



        <div className="container-fluid" style={{
        		width: '88%',
				marginTop: '80px',
			    marginBottom: '0',
			    padding: '0 0 80px',
			}}>

	        <div className="elementor-widget-container" style={{
	        	margin: '0 0 30px',
	        }}>
				<h2 className="elementor-heading-title elementor-size-default" style={{
					fontFamily: 'dm sans,Sans-serif',
				    fontSize: '36px',
				    fontWeight: '700',
				    lineHeight: '46px',
				    textAlign: 'center',
				}}>
					Top destinations
				</h2>
			</div>

			<div className="row st-list-destination normal middle normal">
				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 normal-item">
					<div className="destination-item" style={{
						marginBottom: '24px',
					}}>
						<div className="image st-border-radius" style={{
							position: 'relative',
    						overflow: 'hidden',
    						borderRadius: '8px',
						}}>

							<Link className="st-link" to="https://modmixmap.travelerwp.com/st_location/united-states/california/" style={{
								boxShadow: 'none',
    							textDecoration: 'none',
    							color: '#fff',
							    display: 'block',
							}}>
                            <img decoding="async" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/California.jpg" alt="California" className="img-responsive"
                            	style={{
                            		width: '100%',
								    height: 'auto',
								    borderRadius: '5px',
								    transition: 'all 1.5s cubic-bezier(0,0,.2,1)',
								    objectFit: 'cover',
                            	}}
                            />
                            </Link>
                            <div className="content" style={{
                            	position: 'absolute',
							    top: '50%',
							    left: '50%',
							    transform: 'translate(-50%,-50%)',
							    zIndex: 1,
							    textAlign: 'center',
							    width: '100%',
							    padding: '10px',

                            }}>
	                            <h3 className="title">
	                                <Link to="https://modmixmap.travelerwp.com/st_location/united-states/california/">California</Link>
	                            </h3>


								<div className="desc d-flex align-items-center justify-content-center flex-wrap multi">
	                                <Link to="https://modmixmap.travelerwp.com/hotel-search-halfmap/?location_name=California&amp;location_id=55">14 Hotels</Link>
	                                <Link to="https://modmixmap.travelerwp.com/tour-search-sidebar/?location_name=California&amp;location_id=55">22 Tours</Link>
	                                <Link to="https://modmixmap.travelerwp.com/rental-search-halfmap/?location_name=California&amp;location_id=55">22 Rentals</Link>
	                                <Link to="https://modmixmap.travelerwp.com/car-search-topbar/?location_name=California&amp;location_id=55">25 Cars</Link>
	                                <Link to="https://modmixmap.travelerwp.com/activity-search-topbar/?location_name=California&amp;location_id=55">18 Activities</Link>
	                            </div>
							</div>
						</div>
					</div>
				</div>


				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 normal-item">
					<div className="destination-item" style={{
						marginBottom: '24px',
					}}>
						<div className="image st-border-radius" style={{
							position: 'relative',
    						overflow: 'hidden',
    						borderRadius: '8px',
						}}>

							<Link className="st-link" to="https://modmixmap.travelerwp.com/st_location/united-states/california/" style={{
								boxShadow: 'none',
    							textDecoration: 'none',
    							color: '#fff',
							    display: 'block',
							}}>
                            <img decoding="async" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/California.jpg" alt="California" className="img-responsive"
                            	style={{
                            		width: '100%',
								    height: 'auto',
								    borderRadius: '5px',
								    transition: 'all 1.5s cubic-bezier(0,0,.2,1)',
								    objectFit: 'cover',
                            	}}
                            />
                            </Link>
                            <div className="content" style={{
                            	position: 'absolute',
							    top: '50%',
							    left: '50%',
							    transform: 'translate(-50%,-50%)',
							    zIndex: 1,
							    textAlign: 'center',
							    width: '100%',
							    padding: '10px',

                            }}>
	                            <h3 className="title">
	                                <Link to="https://modmixmap.travelerwp.com/st_location/united-states/california/">California</Link>
	                            </h3>


								<div className="desc d-flex align-items-center justify-content-center flex-wrap multi">
	                                <Link to="https://modmixmap.travelerwp.com/hotel-search-halfmap/?location_name=California&amp;location_id=55">14 Hotels</Link>
	                                <Link to="https://modmixmap.travelerwp.com/tour-search-sidebar/?location_name=California&amp;location_id=55">22 Tours</Link>
	                                <Link to="https://modmixmap.travelerwp.com/rental-search-halfmap/?location_name=California&amp;location_id=55">22 Rentals</Link>
	                                <Link to="https://modmixmap.travelerwp.com/car-search-topbar/?location_name=California&amp;location_id=55">25 Cars</Link>
	                                <Link to="https://modmixmap.travelerwp.com/activity-search-topbar/?location_name=California&amp;location_id=55">18 Activities</Link>
	                            </div>



							</div>
						</div>
					</div>
				</div>



				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 normal-item">
					<div className="destination-item" style={{
						marginBottom: '24px',
					}}>
						<div className="image st-border-radius" style={{
							position: 'relative',
    						overflow: 'hidden',
    						borderRadius: '8px',
						}}>

							<Link className="st-link" to="https://modmixmap.travelerwp.com/st_location/united-states/california/" style={{
								boxShadow: 'none',
    							textDecoration: 'none',
    							color: '#fff',
							    display: 'block',
							}}>
                            <img decoding="async" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/California.jpg" alt="California" className="img-responsive"
                            	style={{
                            		width: '100%',
								    height: 'auto',
								    borderRadius: '5px',
								    transition: 'all 1.5s cubic-bezier(0,0,.2,1)',
								    objectFit: 'cover',
                            	}}
                            />
                            </Link>
                            <div className="content" style={{
                            	position: 'absolute',
							    top: '50%',
							    left: '50%',
							    transform: 'translate(-50%,-50%)',
							    zIndex: 1,
							    textAlign: 'center',
							    width: '100%',
							    padding: '10px',

                            }}>
	                            <h3 className="title">
	                                <Link to="https://modmixmap.travelerwp.com/st_location/united-states/california/">California</Link>
	                            </h3>


								<div className="desc d-flex align-items-center justify-content-center flex-wrap multi">
	                                <Link to="https://modmixmap.travelerwp.com/hotel-search-halfmap/?location_name=California&amp;location_id=55">14 Hotels</Link>
	                                <Link to="https://modmixmap.travelerwp.com/tour-search-sidebar/?location_name=California&amp;location_id=55">22 Tours</Link>
	                                <Link to="https://modmixmap.travelerwp.com/rental-search-halfmap/?location_name=California&amp;location_id=55">22 Rentals</Link>
	                                <Link to="https://modmixmap.travelerwp.com/car-search-topbar/?location_name=California&amp;location_id=55">25 Cars</Link>
	                                <Link to="https://modmixmap.travelerwp.com/activity-search-topbar/?location_name=California&amp;location_id=55">18 Activities</Link>
	                            </div>



							</div>
						</div>
					</div>
				</div>


				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 normal-item">
					<div className="destination-item" style={{
						marginBottom: '24px',
					}}>
						<div className="image st-border-radius" style={{
							position: 'relative',
    						overflow: 'hidden',
    						borderRadius: '8px',
						}}>

							<Link className="st-link" to="https://modmixmap.travelerwp.com/st_location/united-states/california/" style={{
								boxShadow: 'none',
    							textDecoration: 'none',
    							color: '#fff',
							    display: 'block',
							}}>
                            <img decoding="async" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/California.jpg" alt="California" className="img-responsive"
                            	style={{
                            		width: '100%',
								    height: 'auto',
								    borderRadius: '5px',
								    transition: 'all 1.5s cubic-bezier(0,0,.2,1)',
								    objectFit: 'cover',
                            	}}
                            />
                            </Link>
                            <div className="content" style={{
                            	position: 'absolute',
							    top: '50%',
							    left: '50%',
							    transform: 'translate(-50%,-50%)',
							    zIndex: 1,
							    textAlign: 'center',
							    width: '100%',
							    padding: '10px',

                            }}>
	                            <h3 className="title">
	                                <Link to="https://modmixmap.travelerwp.com/st_location/united-states/california/">California</Link>
	                            </h3>


								<div className="desc d-flex align-items-center justify-content-center flex-wrap multi">
	                                <Link to="https://modmixmap.travelerwp.com/hotel-search-halfmap/?location_name=California&amp;location_id=55">14 Hotels</Link>
	                                <Link to="https://modmixmap.travelerwp.com/tour-search-sidebar/?location_name=California&amp;location_id=55">22 Tours</Link>
	                                <Link to="https://modmixmap.travelerwp.com/rental-search-halfmap/?location_name=California&amp;location_id=55">22 Rentals</Link>
	                                <Link to="https://modmixmap.travelerwp.com/car-search-topbar/?location_name=California&amp;location_id=55">25 Cars</Link>
	                                <Link to="https://modmixmap.travelerwp.com/activity-search-topbar/?location_name=California&amp;location_id=55">18 Activities</Link>
	                            </div>



							</div>
						</div>
					</div>
				</div>


				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 normal-item">
					<div className="destination-item" style={{
						marginBottom: '24px',
					}}>
						<div className="image st-border-radius" style={{
							position: 'relative',
    						overflow: 'hidden',
    						borderRadius: '8px',
						}}>

							<Link className="st-link" to="https://modmixmap.travelerwp.com/st_location/united-states/california/" style={{
								boxShadow: 'none',
    							textDecoration: 'none',
    							color: '#fff',
							    display: 'block',
							}}>
                            <img decoding="async" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/California.jpg" alt="California" className="img-responsive"
                            	style={{
                            		width: '100%',
								    height: 'auto',
								    borderRadius: '5px',
								    transition: 'all 1.5s cubic-bezier(0,0,.2,1)',
								    objectFit: 'cover',
                            	}}
                            />
                            </Link>
                            <div className="content" style={{
                            	position: 'absolute',
							    top: '50%',
							    left: '50%',
							    transform: 'translate(-50%,-50%)',
							    zIndex: 1,
							    textAlign: 'center',
							    width: '100%',
							    padding: '10px',

                            }}>
	                            <h3 className="title">
	                                <Link to="https://modmixmap.travelerwp.com/st_location/united-states/california/">California</Link>
	                            </h3>


								<div className="desc d-flex align-items-center justify-content-center flex-wrap multi">
	                                <Link to="https://modmixmap.travelerwp.com/hotel-search-halfmap/?location_name=California&amp;location_id=55">14 Hotels</Link>
	                                <Link to="https://modmixmap.travelerwp.com/tour-search-sidebar/?location_name=California&amp;location_id=55">22 Tours</Link>
	                                <Link to="https://modmixmap.travelerwp.com/rental-search-halfmap/?location_name=California&amp;location_id=55">22 Rentals</Link>
	                                <Link to="https://modmixmap.travelerwp.com/car-search-topbar/?location_name=California&amp;location_id=55">25 Cars</Link>
	                                <Link to="https://modmixmap.travelerwp.com/activity-search-topbar/?location_name=California&amp;location_id=55">18 Activities</Link>
	                            </div>



							</div>
						</div>
					</div>
				</div>


				<div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 normal-item">
					<div className="destination-item" style={{
						marginBottom: '24px',
					}}>
						<div className="image st-border-radius" style={{
							position: 'relative',
    						overflow: 'hidden',
    						borderRadius: '8px',
						}}>

							<Link className="st-link" to="https://modmixmap.travelerwp.com/st_location/united-states/california/" style={{
								boxShadow: 'none',
    							textDecoration: 'none',
    							color: '#fff',
							    display: 'block',
							}}>
                            <img decoding="async" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/California.jpg" alt="California" className="img-responsive"
                            	style={{
                            		width: '100%',
								    height: 'auto',
								    borderRadius: '5px',
								    transition: 'all 1.5s cubic-bezier(0,0,.2,1)',
								    objectFit: 'cover',
                            	}}
                            />
                            </Link>
                            <div className="content" style={{
                            	position: 'absolute',
							    top: '50%',
							    left: '50%',
							    transform: 'translate(-50%,-50%)',
							    zIndex: 1,
							    textAlign: 'center',
							    width: '100%',
							    padding: '10px',

                            }}>
	                            <h3 className="title">
	                                <Link to="https://modmixmap.travelerwp.com/st_location/united-states/california/">California</Link>
	                            </h3>


								<div className="desc d-flex align-items-center justify-content-center flex-wrap multi">
	                                <Link to="https://modmixmap.travelerwp.com/hotel-search-halfmap/?location_name=California&amp;location_id=55">14 Hotels</Link>
	                                <Link to="https://modmixmap.travelerwp.com/tour-search-sidebar/?location_name=California&amp;location_id=55">22 Tours</Link>
	                                <Link to="https://modmixmap.travelerwp.com/rental-search-halfmap/?location_name=California&amp;location_id=55">22 Rentals</Link>
	                                <Link to="https://modmixmap.travelerwp.com/car-search-topbar/?location_name=California&amp;location_id=55">25 Cars</Link>
	                                <Link to="https://modmixmap.travelerwp.com/activity-search-topbar/?location_name=California&amp;location_id=55">18 Activities</Link>
	                            </div>



							</div>
						</div>
					</div>
				</div>





			</div>

        </div>

		{/*Recommended for you start*/}

		<div style={{ backgroundColor: '#f7f8fa', }}>
			<div className="container-fluid" style={{
				width:'88%',
				padding: '70px 0 40px',
			}}>
				<div className="elementor-widget-container" style={{
					margin: '0 0 30px',
					textAlign: 'center',
				}}>
					<h2 className="elementor-heading-title elementor-size-default" style={{
						color: '#1a2b48',
					    fontFamily: 'dm sans,Sans-serif',
					    fontSize: '36px',
					    fontWeight: '700',
					    lineHeight: '46px',
					}}>
						Recommended for you
					</h2>
				</div>
				<div className="list-tab-wrapper mix-multi style_2">

					<nav>
				        <ul className="nav nav-tabs d-flex align-items-center justify-content-center nav-fill-st" id="nav-tab" role="tablist" 
						  style={{
						  	borderBottom: 'transparent',
		    				marginBottom: '50px',
						  }}>
				          <li className="nav-item">
				            <Link to="#" className={`nav-link text-center ${activeTab === 'hotel' ? 'active' : ''}`} aria-selected={activeTab === 'hotel'} onClick={() => handleTabClick('hotel')}>Hotel</Link>
				          </li>
				          <li className="nav-item">
				            <Link to="#" className={`nav-link text-center ${activeTab === 'tour' ? 'active' : ''}`} aria-selected={activeTab === 'tour'} onClick={() => handleTabClick('tour')}>Tour</Link>
				          </li>
				          <li className="nav-item">
				            <Link to="#" className={`nav-link text-center ${activeTab === 'activity' ? 'active' : ''}`} aria-selected={activeTab === 'activity'} onClick={() => handleTabClick('activity')}>Activity</Link>
				          </li>
				          <li className="nav-item">
				            <Link to="#" className={`nav-link text-center ${activeTab === 'rental' ? 'active' : ''}`} aria-selected={activeTab === 'rental'} onClick={() => handleTabClick('rental')}>Rental</Link>
				          </li>
				          <li className="nav-item">
				            <Link to="#" className={`nav-link text-center ${activeTab === 'car' ? 'active' : ''}`} aria-selected={activeTab === 'car'} onClick={() => handleTabClick('car')}>Car</Link>
				          </li>
				        </ul>
				    </nav>

					<div className="tab-content">
						<div className="tab-content" id="nav-content-wishlist">

							<div className={`tab-pane stt-tab-list-ofservice ${activeTab === 'hotel' ? 'active' : ''}`} id="nav-list-of_servicest_hotel" role="tabpanel" aria-labelledby="nav-list-of_servicest_hotel">
								<div className="modern-search-result service-list-wrapper" 
								style={{
									paddingBottom: '30px',
								}}>
									<div className="row">

                    {currentHotels.map((hotel) => (
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4" key={hotel.hotel_id}>
                        <div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Hotel" data-id="216" style={{
                            marginBottom: '30px',
                          }}>
                          <div className="item service-border st-border-radius">
                            <div className="featured-image">
                              <Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
                                <div className="service-add-wishlist" title="Add to wishlist">
                                  <span role="img" aria-label="heart">❤</span>
                                  <div className="lds-dual-ring">
                                  </div>
                                </div>
                              </Link>
                              <Link to={`/hotelRooms/${hotel.hotel_id}`}>
                                <img loading="lazy" width="450" height="300" src={`/HotelImages/${hotel.hotel_image}`} className="image-feature st-hover-grow wp-post-image" alt="Castello Casole Hotel" sizes="(max-width: 450px) 100vw, 450px" />
                                <img loading="lazy" width="450" height="300" src={`/HotelImages/${hotel.hotel_image}`} className="d-none wp-post-image" alt="Castello Casole Hotel" sizes="(max-width: 450px) 100vw, 450px" />
                            </Link>
                            <span className="d-none d_none" itemProp="telephone">+6580009999</span>
                            <Link to="#" target="_blank" title="modmix" className="service-avatar">
                              <img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
                            </Link>
                            </div>
                            <div className="content-item">
                              <div className="content-inner has-matchHeight" style={{ height: '75.2px' }}>
                                <div className="st-stars">
                                  <span className="stt-icon stt-icon-star1">⭐️</span>
                                  <span className="stt-icon stt-icon-star1">⭐️</span>
                                  <span className="stt-icon stt-icon-star1">⭐️</span>
                                  <span className="stt-icon stt-icon-star1">⭐️</span>
                                </div>
                                <h3 className="title" itemProp="name">
                                  <Link href="#" className="c-main">{hotel.name}</Link>
                                </h3>
                                <div className="sub-title d-flex align-items-center" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                  <span itemProp="streetAddress">{hotel.city}</span>
                                </div>
                              </div>
                              <div className="section-footer">
                                <div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
                                  <span className="rate" itemProp="ratingValue">
                                    5 <span>/</span> 5
                                  </span>
                                  <span className="rate-text">Excellent</span>
                                  <span className="summary">(3 Reviews)</span>
                                </div>
                                <div className="price-wrapper d-flex align-items-center" itemProp="priceRange">
                                  From:<span className="price">€{hotel.price}</span>
                                  <span className="unit">/night</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

									</div>
								</div>

								<div className="map-content-loading" style={{display: 'none'}}>
								    <div className="st-loader"></div>
								</div>

								<div className="panigation-list-new-style pagination moderm-pagination justify-content-center" data-stt_service="st_hotel" data-action_service="st_filter_hotel_ajax" data-order="ASC" data-orderby="post__in" data-st_item_row="3" data-st_item_row_tablet="2" data-st_item_row_tablet_extra="2" data-posts_per_page="8">
									{/* Pagination component */}
                  <Pagination>
                    <Pagination.Prev
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
								</div>

							</div>

							<div className={`tab-pane stt-tab-list-ofservice ${activeTab === 'tour' ? 'active' : ''}`} id="nav-list-of_servicest_tours" role="tabpanel" aria-labelledby="nav-list-of_servicest_tours">
								<div className="modern-search-result service-list-wrapper  service-tour" 
									style={{
										paddingBottom: '30px',
									}}>
									<div className="row">
										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Trip">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/">
															<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/51480_bdc6c80b-450x300.jpg" alt="Two Hour Walking Tour of Manhattan" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList">
															<span itemProp="streetAddress">
															<i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Los Anglese</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/" className="c-main">Two Hour Walking Tour of Manhattan
															</Link>
														</h3>
														<div className="reviews">
															<i className="stt-icon-star1"><FontAwesomeIcon icon={faStar} /></i>
															<span className="rate" itemProp="ratingValue">5</span>
															<span className="summary">
																(3 Reviews)
															</span>
														</div>
														<div className="section-footer">
															<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																<span className="price-tour">
																	<span className="price d-flex justify-content-around flex-column">
																		<span className="text-small lh1em item onsale ">€200.00</span>
																		<span className="sale-top">
																			From<span className="text-lg lh1em item "> €180.00</span>
																		</span>
																	</span>
																</span>
																<span className="unit"><i className="input-icon st-border-radius field-icon fa"><FontAwesomeIcon icon={faClock} /></i>10 hours
																</span>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Trip">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/">
															<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/51480_bdc6c80b-450x300.jpg" alt="Two Hour Walking Tour of Manhattan" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList">
															<span itemProp="streetAddress">
															<i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Los Anglese</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/" className="c-main">Two Hour Walking Tour of Manhattan
															</Link>
														</h3>
														<div className="reviews">
															<i className="stt-icon-star1"><FontAwesomeIcon icon={faStar} /></i>
															<span className="rate" itemProp="ratingValue">5</span>
															<span className="summary">
																(3 Reviews)
															</span>
														</div>
														<div className="section-footer">
															<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																<span className="price-tour">
																	<span className="price d-flex justify-content-around flex-column">
																		<span className="text-small lh1em item onsale ">€200.00</span>
																		<span className="sale-top">
																			From<span className="text-lg lh1em item "> €180.00</span>
																		</span>
																	</span>
																</span>
																<span className="unit"><i className="input-icon st-border-radius field-icon fa"><FontAwesomeIcon icon={faClock} /></i>10 hours
																</span>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Trip">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/">
															<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/51480_bdc6c80b-450x300.jpg" alt="Two Hour Walking Tour of Manhattan" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList">
															<span itemProp="streetAddress">
															<i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Los Anglese</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/" className="c-main">Two Hour Walking Tour of Manhattan
															</Link>
														</h3>
														<div className="reviews">
															<i className="stt-icon-star1"><FontAwesomeIcon icon={faStar} /></i>
															<span className="rate" itemProp="ratingValue">5</span>
															<span className="summary">
																(3 Reviews)
															</span>
														</div>
														<div className="section-footer">
															<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																<span className="price-tour">
																	<span className="price d-flex justify-content-around flex-column">
																		<span className="text-small lh1em item onsale ">€200.00</span>
																		<span className="sale-top">
																			From<span className="text-lg lh1em item "> €180.00</span>
																		</span>
																	</span>
																</span>
																<span className="unit"><i className="input-icon st-border-radius field-icon fa"><FontAwesomeIcon icon={faClock} /></i>10 hours
																</span>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Trip">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/">
															<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/51480_bdc6c80b-450x300.jpg" alt="Two Hour Walking Tour of Manhattan" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList">
															<span itemProp="streetAddress">
															<i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Los Anglese</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/" className="c-main">Two Hour Walking Tour of Manhattan
															</Link>
														</h3>
														<div className="reviews">
															<i className="stt-icon-star1"><FontAwesomeIcon icon={faStar} /></i>
															<span className="rate" itemProp="ratingValue">5</span>
															<span className="summary">
																(3 Reviews)
															</span>
														</div>
														<div className="section-footer">
															<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																<span className="price-tour">
																	<span className="price d-flex justify-content-around flex-column">
																		<span className="text-small lh1em item onsale ">€200.00</span>
																		<span className="sale-top">
																			From<span className="text-lg lh1em item "> €180.00</span>
																		</span>
																	</span>
																</span>
																<span className="unit"><i className="input-icon st-border-radius field-icon fa"><FontAwesomeIcon icon={faClock} /></i>10 hours
																</span>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Trip">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/">
															<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/51480_bdc6c80b-450x300.jpg" alt="Two Hour Walking Tour of Manhattan" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList">
															<span itemProp="streetAddress">
															<i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Los Anglese</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/" className="c-main">Two Hour Walking Tour of Manhattan
															</Link>
														</h3>
														<div className="reviews">
															<i className="stt-icon-star1"><FontAwesomeIcon icon={faStar} /></i>
															<span className="rate" itemProp="ratingValue">5</span>
															<span className="summary">
																(3 Reviews)
															</span>
														</div>
														<div className="section-footer">
															<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																<span className="price-tour">
																	<span className="price d-flex justify-content-around flex-column">
																		<span className="text-small lh1em item onsale ">€200.00</span>
																		<span className="sale-top">
																			From<span className="text-lg lh1em item "> €180.00</span>
																		</span>
																	</span>
																</span>
																<span className="unit"><i className="input-icon st-border-radius field-icon fa"><FontAwesomeIcon icon={faClock} /></i>10 hours
																</span>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Trip">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/">
															<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/51480_bdc6c80b-450x300.jpg" alt="Two Hour Walking Tour of Manhattan" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList">
															<span itemProp="streetAddress">
															<i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Los Anglese</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/" className="c-main">Two Hour Walking Tour of Manhattan
															</Link>
														</h3>
														<div className="reviews">
															<i className="stt-icon-star1"><FontAwesomeIcon icon={faStar} /></i>
															<span className="rate" itemProp="ratingValue">5</span>
															<span className="summary">
																(3 Reviews)
															</span>
														</div>
														<div className="section-footer">
															<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																<span className="price-tour">
																	<span className="price d-flex justify-content-around flex-column">
																		<span className="text-small lh1em item onsale ">€200.00</span>
																		<span className="sale-top">
																			From<span className="text-lg lh1em item "> €180.00</span>
																		</span>
																	</span>
																</span>
																<span className="unit"><i className="input-icon st-border-radius field-icon fa"><FontAwesomeIcon icon={faClock} /></i>10 hours
																</span>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Trip">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/">
															<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/51480_bdc6c80b-450x300.jpg" alt="Two Hour Walking Tour of Manhattan" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList">
															<span itemProp="streetAddress">
															<i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Los Anglese</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/" className="c-main">Two Hour Walking Tour of Manhattan
															</Link>
														</h3>
														<div className="reviews">
															<i className="stt-icon-star1"><FontAwesomeIcon icon={faStar} /></i>
															<span className="rate" itemProp="ratingValue">5</span>
															<span className="summary">
																(3 Reviews)
															</span>
														</div>
														<div className="section-footer">
															<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																<span className="price-tour">
																	<span className="price d-flex justify-content-around flex-column">
																		<span className="text-small lh1em item onsale ">€200.00</span>
																		<span className="sale-top">
																			From<span className="text-lg lh1em item "> €180.00</span>
																		</span>
																	</span>
																</span>
																<span className="unit"><i className="input-icon st-border-radius field-icon fa"><FontAwesomeIcon icon={faClock} /></i>10 hours
																</span>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor" itemScope="" itemType="https://schema.org/Trip">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/">
															<img decoding="async" itemProp="image" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/51480_bdc6c80b-450x300.jpg" alt="Two Hour Walking Tour of Manhattan" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="itinerary" itemScope="" itemType="https://schema.org/ItemList">
															<span itemProp="streetAddress">
															<i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Los Anglese</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_tour/two-hour-walking-tour-of-manhattan/" className="c-main">Two Hour Walking Tour of Manhattan
															</Link>
														</h3>
														<div className="reviews">
															<i className="stt-icon-star1"><FontAwesomeIcon icon={faStar} /></i>
															<span className="rate" itemProp="ratingValue">5</span>
															<span className="summary">
																(3 Reviews)
															</span>
														</div>
														<div className="section-footer">
															<div className="price-wrapper price-wrapper-tour d-flex align-items-end justify-content-between">
																<span className="price-tour">
																	<span className="price d-flex justify-content-around flex-column">
																		<span className="text-small lh1em item onsale ">€200.00</span>
																		<span className="sale-top">
																			From<span className="text-lg lh1em item "> €180.00</span>
																		</span>
																	</span>
																</span>
																<span className="unit"><i className="input-icon st-border-radius field-icon fa"><FontAwesomeIcon icon={faClock} /></i>10 hours
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

							<div className={`tab-pane stt-tab-list-ofservice ${activeTab === 'activity' ? 'active' : ''}`} id="nav-list-of_servicest_activity" role="tabpanel" aria-labelledby="nav-list-of_servicest_activity">
								<div className="modern-search-result service-list-wrapper  service-tour" 
									style={{
										paddingBottom: '30px',
									}}>
								    <div className="row">

								    	<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
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
															<span className="rate" itemProp="ratingValue"> 5 </span>
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

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
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

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
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

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
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

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
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

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
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

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
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

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
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

							<div className={`tab-pane stt-tab-list-ofservice ${activeTab === 'rental' ? 'active' : ''}`} id="nav-list-of_servicest_rental" role="tabpanel" aria-labelledby="nav-list-of_servicest_rental">
								<div className="modern-search-result service-list-wrapper " 
								style={{
									paddingBottom: '30px',
								}}>
									<div className="row service-list-wrapper rental-grid service-tour">

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
											<div className="services-item grid item-elementor stt-item-rental-loop" itemScope="" itemType="https://schema.org/RentAction" data-id="1006">
												<div className="item service-border st-border-radius">
													<div className="featured-image">
														<div className="st-tag-feature-sale">
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
														<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/">
															<img decoding="async" itemProp="photo" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Desk-ironironing-board-cribsinfant-beds-free-WiFi-1-450x300.jpg" alt="Manhattan Oversized" className="image-feature st-hover-grow" />
														</Link>
														<Link to="https://modmixmap.travelerwp.com/author/modmix/" target="_blank" title="modmix" className="service-avatar">
															<img decoding="async" alt="avatar" width="70" height="70" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" />
														</Link>
													</div>

													<div className="content-item">
														<div className="sub-title st-address d-flex align-items-center" itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
															<span itemProp="streetAddress"> <i className="stt-icon-location1">
																<FontAwesomeIcon icon={faMapMarkerAlt} />
															</i> Delaware</span>
														</div>
														<h3 className="title" itemProp="name">
															<Link to="https://modmixmap.travelerwp.com/st_rental/manhattan-oversized/" className="c-main">Manhattan Oversized</Link>
														</h3>
														<div className="amenities d-flex align-items-center clearfix">
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. People">
																<span className="stt-icon-user2">
																	<FontAwesomeIcon icon={faUser} />
																</span>13
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bed">
																<span className="stt-icon-bed">
																	<FontAwesomeIcon icon={faBed} />
																</span>3
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="No. Bathroom">
																<span className="stt-icon-bathtub">
																	<FontAwesomeIcon icon={faBathtub} />
																</span>2
															</span>
															<span className="amenity d-flex align-items-center" data-bs-toggle="tooltip" title="" data-bs-original-title="Square">
																<span className="stt-icon-area">
																	<FontAwesomeIcon icon={faSquare} />
																</span>250m<sup>2</sup>
															</span>
														</div>
														<div className="reviews" itemProp="starRating" itemScope="" itemType="https://schema.org/Rating">
															<i className="stt-icon-star1">
																<FontAwesomeIcon icon={faStar} />
															</i>
															<span className="rate" itemProp="ratingValue"> 5 </span>
															<span className="summary"> (1 Review) </span>
														</div>
														<div className="section-footer">
															<div className="price-regular">
																<span>€600.00</span>
															</div>
															<div className="price-wrapper d-flex align-items-end justify-content-between" itemProp="priceRange">
																<span className="price-tour">
																	<span className="price d-flex align-items-center justify-content-around">
																		<span className="sale-top">From</span>
																		<span className="price item"> €540.00</span>
																		<span className="unit">/ 1 night(s)</span>
																	</span>
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

							<div className={`tab-pane stt-tab-list-ofservice ${activeTab === 'car' ? 'active' : ''}`} id="nav-list-of_servicest_rental" role="tabpanel" aria-labelledby="nav-list-of_servicest_rental">
								<div className="modern-search-result service-list-wrapper" 
								style={{
									paddingBottom: '30px',
								}}>
									<div className="map-content-loading">
										<div className="st-loader"></div>
									</div>
									<div className="row car-layout4 service-list-wrapper service-tour">

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

										<div className=" item-service col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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

						</div>
					</div>
				</div>
			</div>
		</div>

		{/*Recommended for you start*/}

		{/* Stories, tips, and guides */}
      <div className="container-fluid" style={{
        transition: 'background .3s, border .3s, borderRadius .3s, box-shadow .3s',
        padding: '70px 0 60px',
      }}>
	        <div className="container1 elementor-container elementor-column-gap-default" style={{
	      		width:'88%',
	    		margin: 'auto',
	        }}>
	          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-202abbf5" data-id="202abbf5" data-element_type="column" style={{
	          	width:'100%',
	          }}>
	            <div className="elementor-widget-wrap elementor-element-populated e-swiper-container" style={{
	            	padding:'10px',
	            }}>
	              <div className="elementor-element elementor-element-1216d763 elementor-widget elementor-widget-heading" data-id="1216d763" data-element_type="widget" data-widget_type="heading.default">
	                <div className="elementor-widget-container" style={{
	                	margin: '0 0 60px',
	                }}>
	                  <h2 className="elementor-heading-title elementor-size-default">Stories, tips, and guides</h2>
	                </div>
	              </div>

	              <div className="elementor-element elementor-element-e4e80a0 elementor-widget elementor-widget-st_blog_list e-widget-swiper" data-id="e4e80a0" data-element_type="widget" data-settings="{&quot;orderby&quot;:&quot;ID&quot;,&quot;item_row&quot;:&quot;4&quot;,&quot;order&quot;:&quot;ASC&quot;}" data-widget_type="st_blog_list.default">
	                <div className="elementor-widget-container">
	                  <div className="st-list-service st-sliders slider style_2" data-slides-per-view="4" data-pagination="on" data-navigation="on" data-auto-play="off" data-loop="" data-delay="" style={{
	                  		position: 'relative',
	                  }}>
	                    
	                    <Slider {...settings}>
					        <div className="item service-border st-border-radius">
				                <div className="featured-image">
				                	<Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/">
				                  <img
				                    loading="lazy"
				                    width="450"
				                    height="300"
				                    src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg"
				                    className="img-fluid st-hover-grow wp-post-image"
				                    alt="Meet the Steve Jobs of the Travel Industry"
				                    decoding="async"
				                    itemProp="photo"
				                    srcSet="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg 450w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-600x400.jpg 600w"
				                    sizes="(max-width: 450px) 100vw, 450px"
				                  />
				                	</Link>
				                </div>
				                <div className="content-item">
							      <div className="cate category-color">
							        <ul>
							          <li style={{ background: 'rgba(1,115,44,0.06)' }}>
							            <Link to="https://modmixmap.travelerwp.com/category/travel/" style={{ color: 'rgba(1,115,44,1)' }}>
							              <span style={{ color: 'rgba(1,115,44,1)' }}></span>
							              TRAVEL
							            </Link>
							          </li>
							        </ul>
							      </div>
							      <h3 className="title" itemProp="name">
							        <Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/" className="c-main">
							          Meet the Steve Jobs of the Travel Industry
							        </Link>
							      </h3>

							      <div className="excerpt-wrapper d-flex align-items-end justify-content-between">
							        Vulputate amet magna bibendum et nibh at. Pretium tincidunt non…
							      </div>
							    </div>
				            </div>

				            <div className="item service-border st-border-radius">
				                <div className="featured-image">
				                	<Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/">
				                  <img
				                    loading="lazy"
				                    width="450"
				                    height="300"
				                    src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg"
				                    className="img-fluid st-hover-grow wp-post-image"
				                    alt="Meet the Steve Jobs of the Travel Industry"
				                    decoding="async"
				                    itemProp="photo"
				                    srcSet="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg 450w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-600x400.jpg 600w"
				                    sizes="(max-width: 450px) 100vw, 450px"
				                  />
				                	</Link>
				                </div>
				                <div className="content-item">
							      <div className="cate category-color">
							        <ul>
							          <li style={{ background: 'rgba(1,115,44,0.06)' }}>
							            <Link to="https://modmixmap.travelerwp.com/category/travel/" style={{ color: 'rgba(1,115,44,1)' }}>
							              <span style={{ color: 'rgba(1,115,44,1)' }}></span>
							              TRAVEL
							            </Link>
							          </li>
							        </ul>
							      </div>
							      <h3 className="title" itemProp="name">
							        <Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/" className="c-main">
							          Meet the Steve Jobs of the Travel Industry
							        </Link>
							      </h3>

							      <div className="excerpt-wrapper d-flex align-items-end justify-content-between">
							        Vulputate amet magna bibendum et nibh at. Pretium tincidunt non…
							      </div>
							    </div>
				            </div>

				            <div className="item service-border st-border-radius">
				                <div className="featured-image">
				                	<Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/">
				                  <img
				                    loading="lazy"
				                    width="450"
				                    height="300"
				                    src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg"
				                    className="img-fluid st-hover-grow wp-post-image"
				                    alt="Meet the Steve Jobs of the Travel Industry"
				                    decoding="async"
				                    itemProp="photo"
				                    srcSet="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg 450w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-600x400.jpg 600w"
				                    sizes="(max-width: 450px) 100vw, 450px"
				                  />
				                	</Link>
				                </div>
				                <div className="content-item">
							      <div className="cate category-color">
							        <ul>
							          <li style={{ background: 'rgba(1,115,44,0.06)' }}>
							            <Link to="https://modmixmap.travelerwp.com/category/travel/" style={{ color: 'rgba(1,115,44,1)' }}>
							              <span style={{ color: 'rgba(1,115,44,1)' }}></span>
							              TRAVEL
							            </Link>
							          </li>
							        </ul>
							      </div>
							      <h3 className="title" itemProp="name">
							        <Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/" className="c-main">
							          Meet the Steve Jobs of the Travel Industry
							        </Link>
							      </h3>

							      <div className="excerpt-wrapper d-flex align-items-end justify-content-between">
							        Vulputate amet magna bibendum et nibh at. Pretium tincidunt non…
							      </div>
							    </div>
				            </div>

				            <div className="item service-border st-border-radius">
				                <div className="featured-image">
				                	<Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/">
				                  <img
				                    loading="lazy"
				                    width="450"
				                    height="300"
				                    src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg"
				                    className="img-fluid st-hover-grow wp-post-image"
				                    alt="Meet the Steve Jobs of the Travel Industry"
				                    decoding="async"
				                    itemProp="photo"
				                    srcSet="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg 450w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-600x400.jpg 600w"
				                    sizes="(max-width: 450px) 100vw, 450px"
				                  />
				                	</Link>
				                </div>
				                <div className="content-item">
							      <div className="cate category-color">
							        <ul>
							          <li style={{ background: 'rgba(1,115,44,0.06)' }}>
							            <Link to="https://modmixmap.travelerwp.com/category/travel/" style={{ color: 'rgba(1,115,44,1)' }}>
							              <span style={{ color: 'rgba(1,115,44,1)' }}></span>
							              TRAVEL
							            </Link>
							          </li>
							        </ul>
							      </div>
							      <h3 className="title" itemProp="name">
							        <Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/" className="c-main">
							          Meet the Steve Jobs of the Travel Industry
							        </Link>
							      </h3>

							      <div className="excerpt-wrapper d-flex align-items-end justify-content-between">
							        Vulputate amet magna bibendum et nibh at. Pretium tincidunt non…
							      </div>
							    </div>
				            </div>

				            <div className="item service-border st-border-radius">
				                <div className="featured-image">
				                	<Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/">
				                  <img
				                    loading="lazy"
				                    width="450"
				                    height="300"
				                    src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg"
				                    className="img-fluid st-hover-grow wp-post-image"
				                    alt="Meet the Steve Jobs of the Travel Industry"
				                    decoding="async"
				                    itemProp="photo"
				                    srcSet="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg 450w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-600x400.jpg 600w"
				                    sizes="(max-width: 450px) 100vw, 450px"
				                  />
				                	</Link>
				                </div>
				                <div className="content-item">
							      <div className="cate category-color">
							        <ul>
							          <li style={{ background: 'rgba(1,115,44,0.06)' }}>
							            <Link to="https://modmixmap.travelerwp.com/category/travel/" style={{ color: 'rgba(1,115,44,1)' }}>
							              <span style={{ color: 'rgba(1,115,44,1)' }}></span>
							              TRAVEL
							            </Link>
							          </li>
							        </ul>
							      </div>
							      <h3 className="title" itemProp="name">
							        <Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/" className="c-main">
							          Meet the Steve Jobs of the Travel Industry
							        </Link>
							      </h3>

							      <div className="excerpt-wrapper d-flex align-items-end justify-content-between">
							        Vulputate amet magna bibendum et nibh at. Pretium tincidunt non…
							      </div>
							    </div>
				            </div>

				            <div className="item service-border st-border-radius">
				                <div className="featured-image">
				                	<Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/">
				                  <img
				                    loading="lazy"
				                    width="450"
				                    height="300"
				                    src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg"
				                    className="img-fluid st-hover-grow wp-post-image"
				                    alt="Meet the Steve Jobs of the Travel Industry"
				                    decoding="async"
				                    itemProp="photo"
				                    srcSet="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg 450w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-600x400.jpg 600w"
				                    sizes="(max-width: 450px) 100vw, 450px"
				                  />
				                	</Link>
				                </div>
				                <div className="content-item">
							      <div className="cate category-color">
							        <ul>
							          <li style={{ background: 'rgba(1,115,44,0.06)' }}>
							            <Link to="https://modmixmap.travelerwp.com/category/travel/" style={{ color: 'rgba(1,115,44,1)' }}>
							              <span style={{ color: 'rgba(1,115,44,1)' }}></span>
							              TRAVEL
							            </Link>
							          </li>
							        </ul>
							      </div>
							      <h3 className="title" itemProp="name">
							        <Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/" className="c-main">
							          Meet the Steve Jobs of the Travel Industry
							        </Link>
							      </h3>

							      <div className="excerpt-wrapper d-flex align-items-end justify-content-between">
							        Vulputate amet magna bibendum et nibh at. Pretium tincidunt non…
							      </div>
							    </div>
				            </div>

				            <div className="item service-border st-border-radius">
				                <div className="featured-image">
				                	<Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/">
				                  <img
				                    loading="lazy"
				                    width="450"
				                    height="300"
				                    src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg"
				                    className="img-fluid st-hover-grow wp-post-image"
				                    alt="Meet the Steve Jobs of the Travel Industry"
				                    decoding="async"
				                    itemProp="photo"
				                    srcSet="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg 450w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-600x400.jpg 600w"
				                    sizes="(max-width: 450px) 100vw, 450px"
				                  />
				                	</Link>
				                </div>
				                <div className="content-item">
							      <div className="cate category-color">
							        <ul>
							          <li style={{ background: 'rgba(1,115,44,0.06)' }}>
							            <Link to="https://modmixmap.travelerwp.com/category/travel/" style={{ color: 'rgba(1,115,44,1)' }}>
							              <span style={{ color: 'rgba(1,115,44,1)' }}></span>
							              TRAVEL
							            </Link>
							          </li>
							        </ul>
							      </div>
							      <h3 className="title" itemProp="name">
							        <Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/" className="c-main">
							          Meet the Steve Jobs of the Travel Industry
							        </Link>
							      </h3>

							      <div className="excerpt-wrapper d-flex align-items-end justify-content-between">
							        Vulputate amet magna bibendum et nibh at. Pretium tincidunt non…
							      </div>
							    </div>
				            </div>

				            <div className="item service-border st-border-radius">
				                <div className="featured-image">
				                	<Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/">
				                  <img
				                    loading="lazy"
				                    width="450"
				                    height="300"
				                    src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg"
				                    className="img-fluid st-hover-grow wp-post-image"
				                    alt="Meet the Steve Jobs of the Travel Industry"
				                    decoding="async"
				                    itemProp="photo"
				                    srcSet="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-450x300.jpg 450w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Rectangle-3-600x400.jpg 600w"
				                    sizes="(max-width: 450px) 100vw, 450px"
				                  />
				                	</Link>
				                </div>
				                <div className="content-item">
							      <div className="cate category-color">
							        <ul>
							          <li style={{ background: 'rgba(1,115,44,0.06)' }}>
							            <Link to="https://modmixmap.travelerwp.com/category/travel/" style={{ color: 'rgba(1,115,44,1)' }}>
							              <span style={{ color: 'rgba(1,115,44,1)' }}></span>
							              TRAVEL
							            </Link>
							          </li>
							        </ul>
							      </div>
							      <h3 className="title" itemProp="name">
							        <Link to="https://modmixmap.travelerwp.com/meet-the-steve-jobs-of-the-travel-industry/" className="c-main">
							          Meet the Steve Jobs of the Travel Industry
							        </Link>
							      </h3>

							      <div className="excerpt-wrapper d-flex align-items-end justify-content-between">
							        Vulputate amet magna bibendum et nibh at. Pretium tincidunt non…
							      </div>
							    </div>
				            </div>

					    </Slider>

	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
      </div>
    {/* Stories, tips, and guides */}


    {/*Get special offers start*/}

    <div className="container-fluid elementor-section elementor-top-section elementor-element" style={{
      width:'88%',
      marginTop: 0,
      marginBottom: '100px',
      position: 'relative',
    }}>
      <div className="container1 elementor-container elementor-column-gap-default">
        <div className="d-flex flex-wrap" style={{ width:'100%' }}>
          <div className="elementor-widget-container get_special_offers">
            <img decoding="async" loading="lazy" 
            style={{width:'100%', height:'100%', borderRadius: '20px 0 0 20px'}} 
            src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/06/Rectangle-7-min.png" className="attachment-full size-full wp-image-1553" alt="" srcSet="https://modmixmap.travelerwp.com/wp-content/uploads/2022/06/Rectangle-7-min.png 1290w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/06/Rectangle-7-min-600x404.png 600w, https://modmixmap.travelerwp.com/wp-content/uploads/2022/06/Rectangle-7-min-768x517.png 768w" />       
          </div>
          <div className="d-flex flex-wrap flex-column justify-content-center align-items-center get_special_offers" style={{
              backgroundColor: '#fcfcfc', 
              borderRadius: '0 20px 20px 0', 
              borderStyle: 'solid',
              borderWidth: '1px 1px 1px 0',
              borderColor: '#dedede',
              transition: 'background .3s, border .3s, border-radius .3s, box-shadow .3s',
          }}>

            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default" style={{
                fontFamily: 'dm sans, Sans-serif',
                fontSize: '36px',
                fontWeight: 700,
                lineHeight: '46px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}><span>Get special offers, and</span> <span>more from Traveler</span></h2>
            </div>
            <div className="elementor-widget-container">
              <p className="elementor-heading-title elementor-size-default" style={{
                  color: '#727272',
                  fontFamily: 'dm sans, Sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '26px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
              }}>
                <span>Subscribe to see secret deals prices</span> <span>drop the moment you sign up!</span>
              </p>
            </div>
            <div className="elementor-shortcode" style={{
              width: '100%',
            }}>
              <form id="email-form" className="mc4wp-form mc4wp-form-92 mc4wp-form-submitted mc4wp-form-error" method="post">
                <div className="mc4wp-form-fields">
                  <div className="stt-mailchimp-form" style={{
                    position:'relative',
                  }}>
                    <input type="email" name="EMAIL" className="form-control form-control1" placeholder="Email Address" style={{
                        border: '1px solid #dedede',
                        borderRadius: '80px',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '26px',
                        color: '#83929d',
                        padding: '17px 30px',
                        cursor: 'auto',
                    }} />
                    <input type="submit" name="submit" value="Subscribe" style={{
                      background: 'var(--main-color, #3B71FE)',
                      borderRadius: '50px',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '20px',
                      color: '#fff',
                      padding: '15px 20px',
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      boxShadow: 'none',
                      border: '1px solid #dae1e7',
                    }} />
                  </div>
                  <div className="mc4wp-alert mc4wp-error" role="alert">
                    <p style={{
                      fontSize: '16px',
                      lineHeight: '26px',
                      color: 'var(--body-color)',
                    }}>Please select at least one list.</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/*Get special offers end*/}


      <Footer />
    </>
  );
};

export default Home;
