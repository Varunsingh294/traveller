import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faPlane, faTv, faFire, faUtensils, faHotTub, faWind, faMinus, faPlus, faUser, faChild, faBed, faSquare } from '@fortawesome/free-solid-svg-icons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



import Header from '../HeaderComponent/Header';
import Footer from '../FooterComponent/Footer';
import './HotelRooms.css';
const HotelRooms = () =>{

	const { hotelId } = useParams();
	console.log(hotelId);

	const [activeTab, setActiveTab] = useState('book');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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


	useEffect(() => {
	    const akJsElement = document.getElementById("ak_js_1");
	    if (akJsElement) {
	      akJsElement.setAttribute("value", new Date().getTime());
	    }
	}, []);

	useEffect(() => {
    // Run this code after the component is mounted and the DOM is ready
    const akJsElement = document.getElementById("ak_js_2");
    if (akJsElement) {
      akJsElement.setAttribute("value", new Date().getTime());
    }
  }, []);

	return(
			<>
				<Header />
				<div id="st-content-wrapper" className="st-style-elementor st-style-4 singe-hotel-layout-4">
					<div className="banner st-bg-feature st_1702031660">
						<div className="container">
							<div className="st-banner-search-form style_2">
								<h1 className="st-banner-search-form__title">
									Castello Casole Hotel 
								</h1>
								<div className="st-breadcrumb hidden-xs  d-none d-sm-block">
									<div className="container">
										<ul>
											<li>
												<Link to="https://modmixmap.travelerwp.com">Home</Link>
											</li>
											<li>
												<Link to="https://modmixmap.travelerwp.com/hotel-search-halfmap/?location_id=54&amp;location_name=United%20States">United States</Link>
											</li>
											<li className="active">Castello Casole Hotel</li> 
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container-fluid">
						<div className="st-gallery st-border-radius style-masonry">
							<div className="st-list-item-gallery">
								<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Aerial-view.png" data-elementor-open-lightbox="no" className="item-gallery">
									<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Aerial-view.png" alt="Castello Casole Hotel"/>
								</Link>
								<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/3-restaurants-breakfast-lunch-and-dinner-served-Chinese-cuisine-1.png" data-elementor-open-lightbox="no" className="item-gallery">
									<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/3-restaurants-breakfast-lunch-and-dinner-served-Chinese-cuisine-1.png" alt="Castello Casole Hotel"/>
								</Link>
								<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/3-restaurants-breakfast-lunch-and-dinner-served-Chinese-cuisine.png" data-elementor-open-lightbox="no" className="item-gallery">
									<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/3-restaurants-breakfast-lunch-and-dinner-served-Chinese-cuisine.png" alt="Castello Casole Hotel"/>
								</Link>
								<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Sundeck.png" data-elementor-open-lightbox="no" className="item-gallery">
									<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Sundeck.png" alt="Castello Casole Hotel"/>
								</Link>
								<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Terracepatio-1.png" data-elementor-open-lightbox="no" className="item-gallery">
									<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Terracepatio-1.png" alt="Castello Casole Hotel"/>
								</Link>
							</div>
							<div className="shares dropdown">
								<div className="btn-group">
									<Link to="https://www.youtube.com/watch?v=8ad09ERqMK0" className="btn btn-transparent has-icon radius st-video-popup">
										<span className="stt-icon stt-icon-play"></span>
									</Link>
									<Link to="#st-gallery-popup" className="btn btn-transparent has-icon radius st-gallery-popup">
										<span className="stt-icon stt-icon-category"></span>All photos
									</Link>
									<div id="st-gallery-popup" className="hidden">
										<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Aerial-view.png">
											Gallery
										</Link>
										<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/3-restaurants-breakfast-lunch-and-dinner-served-Chinese-cuisine-1.png">
											Gallery
										</Link>
										<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/3-restaurants-breakfast-lunch-and-dinner-served-Chinese-cuisine.png">
											Gallery
										</Link>
										<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Sundeck.png">
											Gallery
										</Link>
										<Link to="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Terracepatio-1.png">
											Gallery
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container st-single-service-content" style={{
						maxWidth: '1290px',
					}}>
							<div className="row">
								<div className="col-12 col-sm-12 col-md-12 col-lg-8">
									<div className="st-hotel-content" style={{display: 'none'}}>
										<div className="hotel-target-book-mobile d-flex justify-content-between align-items-center">
											<div className="price-wrapper">
												<div id="mobile-price">
													From:<span className="price">€150.00</span>
													<span className="unit"> /night</span> 
												</div>
												<div className="st-review-booking-form">
													<div className="st-review-box-top d-flex align-items-center">
														<i className="stt-icon-star1"></i>
														<div className="review-score">
															5 
														</div>
														<div className="review-score-base text-center">
															<span>(3 reviews)</span>
														</div>
													</div>
												</div>
											</div>
											<Link to="" className="btn-v2 btn-primary btn-mpopup btn-green">Check
											</Link>
										</div>
									</div>
									<div className="st-service-header2 d-flex align-self-start justify-content-between">
									  	<div className="left">
										    <div className="st-stars ">
										      <i className="stt-icon-star1"></i>
										      <i className="stt-icon-star1"></i>
										      <i className="stt-icon-star1"></i>
										      <i className="stt-icon-star1"></i>
										    </div>
										    <div className="sub-heading">
										      <div className="d-flex align-items-center">
										        <div className="st-review-score">
										          <div className="head d-flex justify-content-between align-items-center clearfix">
										            <div className="score">
										              5<span>/5</span>
										            </div>
										            <div className="left">
										              <span className="head-rating">Excellent</span>
										              <span className="text-rating">
										                <Link className="button_reserve" id="st-reviews_link">
										                  (3 reviews)
										                </Link>
										              </span>
										            </div>
										          </div>
										        </div>
										        <span className="st-dot"></span>
										        <div className="st-address">New York City</div>
										      </div>
										    </div>
									  	</div>
									    <div className="right d-flex align-items-center">
									        <div className="shares dropdown">
									          <Link to="#" className="share-item social-share">
									            <i className="stt-icon stt-icon-share"></i>
									          </Link>
									          <ul className="share-wrapper">
									            <li>
									              <Link
									                className="facebook"
									                to="https://www.facebook.com/sharer/sharer.php?u=https://modmixmap.travelerwp.com/st_hotel/castello-casole-hotel/&amp;title=Castello Casole Hotel"
									                target="_blank"
									                rel="noopener"
									                original-title="Facebook"
									              >
									                <i className="fab fa-facebook-f"></i>
									              </Link>
									            </li>
									            <li>
									              <Link
									                className="twitter"
									                to="https://twitter.com/share?url=https://modmixmap.travelerwp.com/st_hotel/castello-casole-hotel/&amp;title=Castello Casole Hotel"
									                target="_blank"
									                rel="noopener"
									                original-title="Twitter"
									              >
									                <i className="fab fa-twitter"></i>
									              </Link>
									            </li>
									            <li>
									              <Link
									                className="no-open pinterest"
									                to="https://pinterest.com/pin/create/bookmarklet/?url=https://modmixmap.travelerwp.com/st_hotel/castello-casole-hotel/&amp;is_video=false&amp;description=Castello Casole Hotel&amp;media=https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/feature-12.png"
									                target="_blank"
									                rel="noopener"
									                original-title="Pinterest"
									              >
									                <i className="fab fa-pinterest-p"></i>
									              </Link>
									            </li>
									            <li>
									              <Link
									                className="linkedin"
									                to="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://modmixmap.travelerwp.com/st_hotel/castello-casole-hotel/&amp;title=Castello Casole Hotel"
									                target="_blank"
									                rel="noopener"
									                original-title="LinkedIn"
									              >
									                <i className="fab fa-linkedin-in"></i>
									              </Link>
									            </li>
									          </ul>
									        </div>
									        <div className="wistlist-single">
									          <Link to="#" className="login" data-bs-toggle="modal" data-bs-target="#st-login-form">
									            <div className="service-add-wishlist" title="Add to wishlist">
									              <span className="stt-icon stt-icon-heart1"></span>
									              <div className="lds-dual-ring"></div>
									            </div>
									          </Link>
									        </div>
									    </div>
									</div>
									<div className="st-hr"></div>
									<div className="st-description" id="st-description">
										<h2 className="st-heading-section">
											About this hotel 
										</h2>
										<p>
											Whether you’re a tourist or traveling on business, Hotel WBF Kitasemba WEST is a great choice for accommodation when visiting Osaka. The excitement of the city center is only away. With its convenient location, the property offers easy access to the city’s must-see destinations.
										</p>
										<p>
											Hotel WBF is renowned for its quality services and friendly staff, and Hotel WBF Kitasemba WEST lives up to expectations. Facilities like free Wi-Fi in all rooms, 24-hour security, daily housekeeping, laundromat, taxi service are readily available for the convenience of each guest.
										</p>
										<p>
											Experience high quality room facilities during your stay here. Some rooms include humidifier, complimentary tea, towels, clothes rack, slippers to help guests recharge after a long day. The property’s host of recreational offerings ensures you have plenty to do during your stay. Hotel WBF Kitasemba WEST is a smart choice for travelers to Osaka, offering a relaxed and hassle-free stay every time.
										</p>
									</div>
									<div id="st-attributes">
										<div className="st-hr"></div>
										<div className="st-attributes st-section-single  stt-attr-hotel-facilities">
											<h2 className="st-heading-section">
												Hotel Facilities 
											</h2>
											<div className="item-attribute">
												<div className="row">
													<div className="col-12 col-sm-6 col-md-4">
														<div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
															<i className="input-icon st-border-radius field-icon fa">
																	<FontAwesomeIcon icon={faSnowflake} />
																</i>Air Conditioning 
														</div>
													</div>
													<div className="col-12 col-sm-6 col-md-4">
														<div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
															<i className="input-icon st-border-radius field-icon fa">
																	<FontAwesomeIcon icon={faPlane} />
																</i>Airport Transport 
														</div>
													</div>
													<div className="col-12 col-sm-6 col-md-4">
														<div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
															<i className="input-icon st-border-radius field-icon fa">
																	<FontAwesomeIcon icon={faTv} />
																</i>Flat Tv 
														</div>
													</div>
													<div className="col-12 col-sm-6 col-md-4">
														<div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
															<i className="input-icon st-border-radius field-icon fa">
																	<FontAwesomeIcon icon={faFire} />
																</i>Heater 
														</div>
													</div>
													<div className="col-12 col-sm-6 col-md-4">
														<div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
															<i className="input-icon st-border-radius field-icon fa">
																	<FontAwesomeIcon icon={faUtensils} />
																	</i>Restaurant 
														</div>
													</div>
													<div className="col-12 col-sm-6 col-md-4">
														<div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
															<i className="input-icon st-border-radius field-icon fa">
																	<FontAwesomeIcon icon={faHotTub} />
																	</i>Spa &amp; Sauna 
														</div>
													</div>
													<div className="col-12 col-sm-6 col-md-4">
														<div className="item d-flex align-items-center has-matchHeight" style={{}}>
															<i className="input-icon st-border-radius field-icon fa">
																	<FontAwesomeIcon icon={faWind} />
																</i>Washer &amp; Dryer 
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="st-hr"></div>
									<div className="st-section-single" id="rules">
										<h2 className="st-heading-section">
											Rules 
										</h2>
										<table className="table st-properties" data-toggle-section="st-properties">
											<tbody>
												<tr>
													<th>Check In</th>
													<td>12:00 pm</td>
												</tr>
												<tr>
													<th>Check Out</th>
													<td>12:00 pm</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className="st-hr"></div>
									<div className="st-section-single" id="st-list-room">
	<h2 className="st-heading-section">
		Availability 
	</h2>
	<div className="st-list-rooms relative">
		<div className="loader-wrapper">
			<div className="st-loader"></div>
		</div> 
		<div className="fetch">
			<div className="item st-border-radius">
				<form className="form-booking-inpage" method="get">
					<input type="hidden" name="check_in" value=""/>
					<input type="hidden" name="check_out" value=""/>
					<input type="hidden" name="room_num_search" value=""/>
					<input type="hidden" name="adult_number" value=""/>
					<input type="hidden" name="child_number" value=""/>
					<input name="action" value="hotel_add_to_cart" type="hidden"/>
					<input name="item_id" value="216" type="hidden"/>
					<input name="room_id" value="540" type="hidden"/>
					<input type="hidden" name="start" value=""/>
					<input type="hidden" name="end" value=""/>
					<input type="hidden" name="is_search_room" value=""/>
					<div className="row align-items-center align-items-stretch1">
						<div className="col-12 col-sm-12 col-md-12 col-lg-4">
							<div className="image">
								<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/The-First-Collection-at-Jumeirah-Village-Circle-2-800x600.jpg" alt="Queen Room" className="img-fluid img-full st-hover-grow"/>
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-8">
							<div className="row align-items-center">
								<div className="col-12 col-md-12 col-lg-7">
									<div className="item-infor">
										<div className="st-border-right">
											<h2 className="heading">
												<Link to="https://modmixmap.travelerwp.com/hotel_room/queen-room-4/" className="heading-title">
													Queen Room 
												</Link>
											</h2>
											<div className="facilities">
												<div className="st-list-facilities">
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Room Footage">
														<span className="item-box">
															<i className="stt-icon-area">
															<FontAwesomeIcon icon={faSquare} />
															</i>
														</span>
														<br />
														<span className="infor">260m<sup>2</sup></span>
													</p>
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="No. Beds">
														<span className="item-box">
															<i className="stt-icon-bed">
															<FontAwesomeIcon icon={faBed} />
															</i>
														</span>
														<br />
														<span className="infor">x3</span>
													</p>
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="No. Adults">
														<span className="item-box">
															<i className="stt-icon-adult">
															<FontAwesomeIcon icon={faUser} />
															</i>
														</span>
														<br />
														<span className="infor">x5</span>
													</p>
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="No. Children">
														<span className="item-box">
															<i className="stt-icon-baby">
															<FontAwesomeIcon icon={faChild} />
															</i>
														</span>
														<br />
														<span className="infor">x3</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-12 col-md-12 col-lg-5">
									<Link to="#" className="btn-show-price">Show price</Link>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div className="item st-border-radius">
				<form className="form-booking-inpage" method="get">
					<input type="hidden" name="check_in" value=""/>
					<input type="hidden" name="check_out" value=""/>
					<input type="hidden" name="room_num_search" value=""/>
					<input type="hidden" name="adult_number" value=""/>
					<input type="hidden" name="child_number" value=""/>
					<input name="action" value="hotel_add_to_cart" type="hidden"/>
					<input name="item_id" value="216" type="hidden"/>
					<input name="room_id" value="539" type="hidden"/>
					<input type="hidden" name="start" value=""/>
					<input type="hidden" name="end" value=""/>
					<input type="hidden" name="is_search_room" value=""/>
					<div className="row align-items-center align-items-stretch1">
						<div className="col-12 col-sm-12 col-md-12 col-lg-4">
							<div className="image">
								<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Travel-Vacations-Cheap-Flights-Airline-Tickets-Airfares-3-800x600.jpg" alt="Family Suite" className="img-fluid img-full st-hover-grow"/>
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-8">
							<div className="row align-items-center">
								<div className="col-12 col-md-12 col-lg-7">
									<div className="item-infor">
										<div className="st-border-right">
											<h2 className="heading">
												<Link to="https://modmixmap.travelerwp.com/hotel_room/family-suite-3/" className="heading-title">
													Family Suite 
												</Link>
											</h2>
											<div className="facilities">
												<div className="st-list-facilities">
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Room Footage">
														<span className="item-box">
														<i className="stt-icon-area">
														<FontAwesomeIcon icon={faSquare} />
														</i>
														</span>
														<br />
														<span className="infor">210m<sup>2</sup></span>
													</p>
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="No. Beds">
														<span className="item-box">
															<i className="stt-icon-bed">
															<FontAwesomeIcon icon={faBed} />
															</i>
														</span>
														<br />
														<span className="infor">x2</span>
													</p>
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="No. Adults">
														<span className="item-box">
															<i className="stt-icon-adult">
															<FontAwesomeIcon icon={faUser} />
															</i>
														</span>
														<br />
														<span className="infor">x3</span>
													</p>
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="No. Children">
														<span className="item-box">
															<i className="stt-icon-baby">
															<FontAwesomeIcon icon={faChild} />
															</i>
														</span>
														<br />
														<span className="infor">x2</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-12 col-md-12 col-lg-5">
									<Link to="#" className="btn-show-price">Show price</Link>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div className="item st-border-radius">
				<form className="form-booking-inpage" method="get">
					<input type="hidden" name="check_in" value=""/>
					<input type="hidden" name="check_out" value=""/>
					<input type="hidden" name="room_num_search" value=""/>
					<input type="hidden" name="adult_number" value=""/>
					<input type="hidden" name="child_number" value=""/>
					<input name="action" value="hotel_add_to_cart" type="hidden"/>
					<input name="item_id" value="216" type="hidden"/>
					<input name="room_id" value="538" type="hidden"/>
					<input type="hidden" name="start" value=""/>
					<input type="hidden" name="end" value=""/>
					<input type="hidden" name="is_search_room" value=""/>
					<div className="row align-items-center align-items-stretch1">
						<div className="col-12 col-sm-12 col-md-12 col-lg-4">
							<div className="image">
								<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Radisson-Dubai-Damac-Hills-4-800x600.jpg" alt="Standard Double" className="img-fluid img-full st-hover-grow"/>
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-8">
							<div className="row align-items-center">
								<div className="col-12 col-md-12 col-lg-7">
									<div className="item-infor">
										<div className="st-border-right">
											<h2 className="heading">
												<Link to="https://modmixmap.travelerwp.com/hotel_room/standard-double/" className="heading-title">
												Standard Double </Link>
											</h2>
											<div className="facilities">
												<div className="st-list-facilities">
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Room Footage">
														<span className="item-box">
															<i className="stt-icon-area">
															<FontAwesomeIcon icon={faSquare} />
															</i>
														</span>
														<br />
														<span className="infor">200m<sup>2</sup></span>
													</p>
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="No. Beds">
														<span className="item-box">
															<i className="stt-icon-bed">
															<FontAwesomeIcon icon={faBed} />
															</i>
														</span>
														<br />
														<span className="infor">x3</span>
													</p>
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="No. Adults">
														<span className="item-box">
														<i className="stt-icon-adult">
														<FontAwesomeIcon icon={faUser} />
														</i>
														</span>
														<br />
														<span className="infor">x4</span>
													</p>
													<p className="item text-center" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="No. Children">
														<span className="item-box">
															<i className="stt-icon-baby">
															<FontAwesomeIcon icon={faChild} />
															</i>
														</span>
														<br />
														<span className="infor">x2</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-12 col-md-12 col-lg-5">
									<Link to="#" className="btn-show-price">Show price</Link>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

							
							<div className="st-section-single" id="st-reviews">
			<h2 className="st-heading-section">
				Reviews 
			</h2>
			<div id="reviews" className="st-reviews">
				<div className="row">
					<div className="col-12">
						<div className="review-box">
							<div className="st-review-box-top d-flex align-items-center">
								<i className="stt-icon-star1"></i>
								<div className="review-score">
									5<span className="per-total">/5</span>
								</div>
								<div className="review-score-text">Excellent</div>
								<div className="review-score-base text-center">
									<span>(3 reviews)</span>
								</div>
							</div>
							<div className="st-summany d-flex flex-wrap justify-content-between">
								<div className="item d-flex align-items-center">
									<div className="label" style={{width: '40%'}}>
										Cleanliness 
									</div>
									<div className="progress" style={{width: '40%'}}>
										<div className="percent" style={{width: '100%'}}></div>
									</div>
									<div className="label">
										<div className="number">5/5</div>
									</div>
								</div>
								<div className="item d-flex align-items-center justify-content-end">
									<div className="label" style={{width: '40%'}}>
										Accuracy 
									</div>
									<div className="progress" style={{width: '40%'}}>
										<div className="percent" style={{width: '100%'}}></div>
									</div>
									<div className="label">
										<div className="number">5/5</div>
									</div>
								</div>
								<div className="item d-flex align-items-center">
									<div className="label" style={{width: '40%'}}>
										Communication 
									</div>
									<div className="progress" style={{width: '40%'}}>
										<div className="percent" style={{width: '100%'}}></div>
									</div>
									<div className="label">
										<div className="number">5/5</div>
									</div>
								</div>
								<div className="item d-flex align-items-center justify-content-end">
									<div className="label" style={{width: '40%'}}>
										Location 
									</div>
									<div className="progress" style={{width: '40%'}}>
										<div className="percent" style={{width: '100%'}}></div>
									</div>
									<div className="label">
										<div className="number">5/5</div>
									</div>
								</div>
								<div className="item d-flex align-items-center">
									<div className="label" style={{width: '40%'}}>
										Check-in 
									</div>
									<div className="progress" style={{width: '40%'}}>
										<div className="percent" style={{width: '100%'}}></div>
									</div>
									<div className="label">
										<div className="number">5/5</div>
									</div>
								</div>
								<div className="item d-flex align-items-center justify-content-end">
									<div className="label" style={{width: '40%'}}>
										Value 
									</div>
									<div className="progress" style={{width: '40%'}}>
										<div className="percent" style={{width: '100%'}}></div>
									</div>
									<div className="label">
										<div className="number">5/5</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="review-pagination">
					<div className="summary text-center">
						3 reviews on this Hotel - Showing 1 to 3 
					</div>
					<div id="reviews" className="review-list">
						<div className="comment-item">
							<div className="comment-item-head d-flex justify-content-between align-items-center">
								<div className="media d-flex align-items-center">
									<div className="media-left">
										<img alt="avatar" width="50" height="50" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round"/> 
									</div>
									<div className="media-body">
										<div className="media-heading">modmix</div>
										<div className="date">06/10/2022</div>
									</div>
								</div>
								<div className="like">
									<Link data-id="274" to="#" className="btn-like st-like-review ">
										<i className="stt-icon-like"></i>
									</Link>
									<span>0</span> 
								</div>
							</div>
							<div className="comment-item-body">
								<ul className="review-star">
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
								</ul> 
								<div className="detail">
									<div className="st-description" data-show-all="st-description-274">
										My favorite stay in !! The room is big, clean and so tidy. The cooking area and lotion provided was the favorite parts! Will come again if I visit. 
									</div>
								</div>
							</div>
						</div>
						<div className="comment-item">
							<div className="comment-item-head d-flex justify-content-between align-items-center">
								<div className="media d-flex align-items-center">
									<div className="media-left">
										<img alt="avatar" width="50" height="50" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round"/> 
									</div>
									<div className="media-body">
										<div className="media-heading">modmix</div>
										<div className="date">06/10/2022</div>
									</div>
								</div>
								<div className="like">
									<Link data-id="271" to="#" className="btn-like st-like-review ">
										<i className="stt-icon-like"></i>
									</Link>
									<span>1</span> 
								</div>
							</div>
							<div className="comment-item-body">
								<ul className="review-star">
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
								</ul> 
								<div className="detail">
									<div className="st-description" data-show-all="st-description-271">
										If you want to get away from city life, rent a car and book Joyuam. It is a no-frills accommodation where you can enjoy fresh air and serene surrounding. A pity we only stayed 2 nights. I’ll book this place again next time 
									</div>
								</div>
							</div>
						</div>
						<div className="comment-item">
							<div className="comment-item-head d-flex justify-content-between align-items-center">
								<div className="media d-flex align-items-center">
									<div className="media-left">
										<img alt="avatar" width="50" height="50" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round" /> 
									</div>
									<div className="media-body">
										<div className="media-heading">modmix</div>
										<div className="date">06/10/2022</div>
									</div>
								</div>
								<div className="like">
									<Link data-id="267" to="#" className="btn-like st-like-review">
										<i className="stt-icon-like"></i>
									</Link>
									<span>0</span> 
								</div>
							</div>
							<div className="comment-item-body">
								<ul className="review-star">
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
									<li className="list-unstyled">
										<i className="fa fa-star"></i>
									</li>
								</ul> 
								<div className="detail">
									<div className="st-description" data-show-all="st-description-267">
										Clean rooms, great staff” The room had a great ocean view, room was very clean and big. the staff super friendly and nice. 
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="write-review">
					<h4 className="heading">
						<Link to="#" className="toggle-section c-main f16" data-target="st-review-form">
							Write a review <i className="stt-icon-arrow-down"></i>
						</Link>
					</h4>
					<div id="respond" className="comment-respond st-border-radius comment-respond" data-toggle-section="st-review-form" style={{display: 'none'}}>
						<h3 id="reply-title" className="comment-reply-title">
							Leave a review 
							<small>
								<Link rel="nofollow" id="cancel-comment-reply-link" to="/st_hotel/castello-casole-hotel/#respond" style={{display: 'none'}}>
									Cancel reply
								</Link>
							</small>
						</h3>
						<form action="https://modmixmap.travelerwp.com/wp-comments-post.php?wpe-comment-post=modmixmap" method="post" id="commentform" className="comment-form review-form" noValidate="">
							<p className="comment-notes">
								<span id="email-notes">
								Your email address will not be published.
								</span> 
								Required fields are marked 
								<span className="required">*</span>
							</p>
							<div className="form-wrapper">
								<div className="row">
									<div className="col-12 col-sm-6">
										<div className="form-group">
											<input type="text" className="form-control st-border-radius" name="author" placeholder="Name *"/>
										</div>
									</div>
									<div className="col-12 col-sm-6">
										<div className="form-group">
											<input type="email" className="form-control st-border-radius" name="email" placeholder="Email *"/>
										</div>
									</div>
									<div className="col-12 col-sm-12">
										<div className="form-group">
											<input type="text" className="form-control st-border-radius" name="comment_title" placeholder="Title *"/>
										</div>
									</div>
								</div>
								<div className="row align-self-stretch">
									<div className="col-12 col-sm-12">
										<div className="form-group review-items d-flex align-content-start flex-wrap">
											<div className="item">
												<label>Cleanliness</label>
												<input className="st_review_stats" type="hidden" name="st_review_stats[Cleanliness]"/>
												<div className="rates">
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i> 
												</div>
											</div>
											<div className="item">
												<label>Accuracy</label>
												<input className="st_review_stats" type="hidden" name="st_review_stats[Accuracy]"/>
												<div className="rates">
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i> 
												</div>
											</div>
											<div className="item">
												<label>Communication</label>
												<input className="st_review_stats" type="hidden" name="st_review_stats[Communication]" />
												<div className="rates">
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i> 
												</div>
											</div>
											<div className="item">
												<label>Location</label>
												<input className="st_review_stats" type="hidden" name="st_review_stats[Location]"/>
												<div className="rates">
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i> 
												</div>
											</div>
											<div className="item">
												<label>Check-in</label>
												<input className="st_review_stats" type="hidden" name="st_review_stats[Check-in]"/>
												<div className="rates">
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
												</div>
											</div>
											<div className="item">
												<label>Value</label>
												<input className="st_review_stats" type="hidden" name="st_review_stats[Value]"/>
												<div className="rates">
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i>
													<i className="stt-icon-star1 grey"></i> 
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<textarea name="comment" className="form-control st-border-radius" placeholder="Content *">
											</textarea>
										</div>
									</div>
								</div>
							</div>
							<p className="form-submit">
								<input name="submit" type="submit" id="submit" className="submit" value="Post Review"/> 
								<input type="hidden" name="comment_post_ID" value="216" id="comment_post_ID"/>
								<input type="hidden" name="comment_parent" id="comment_parent" value="0"/>
							</p>
							<p style={{display: 'none'}}>
								<input type="hidden" id="akismet_comment_nonce" name="akismet_comment_nonce" value="daf424c24b" />
							</p>
							 <p style={{ display: 'none' }}>
						      <label>
						        Δ
						        <textarea name="ak_hp_textarea" cols="45" rows="8" maxLength="100">
						        </textarea>
						      </label>
						      <input type="hidden" id="ak_js_1" name="ak_js" value="1702031944918" />
						    </p>
						</form> 
					</div>
				</div>
			</div>
		</div>
		<div className="stoped-scroll-section"></div>
	</div>

	<div className="col-12 col-sm-12 col-md-12 col-lg-4">
	<div className="widgets sticky-top">
		<div className="fixed-on-mobile st-fixed-form-booking" data-screen="992px">
			<div className="st-form-book-wrapper relative">
				<div className="close-icon hide">
					<i className="stt-icon-close"></i>
				</div>
				<div className="st-wrapper-form-booking form-date-search">
					<nav>
						<ul className="nav nav-tabs d-flex align-items-center justify-content-between nav-fill-st" id="nav-tab" role="tablist">
							<li>
								<Link 
									className={`text-center ${activeTab === 'book' ? 'active' : ''}`}
              						onClick={() => handleTabClick('book')}
               						id="nav-book-tab" data-bs-toggle="tab" data-bs-target="#nav-book" role="tab" aria-controls="nav-home" aria-selected="true">
									Book
								</Link>
							</li>
							<li>
								<Link className={`text-center ${activeTab === 'inquire' ? 'active' : ''}`}
              						onClick={() => handleTabClick('inquire')} 
									id="nav-inquirement-tab" data-bs-toggle="tab" data-bs-target="#nav-inquirement" role="tab" aria-controls="nav-profile" aria-selected="false">
									Inquiry
								</Link>
							</li>
						</ul>
					</nav>
					<div className="tab-content" id="nav-tabContent">
						<div className={`tab-pane fade ${activeTab === 'book' ? 'show active' : ''}`} id="nav-book" role="tabpanel" aria-labelledby="nav-book-tab">
							<div className="st-form-head-book d-flex justify-content-between align-items-center">
								<div className="st-price-origin">
									from
									<span className="price">€150.00</span> 
									<span className="unit"> /night</span> 
								</div>
								<div className="st-review-booking-form">
									<div className="st-review-box-top d-flex align-items-center">
										<i className="stt-icon-star1"></i>
										<div className="review-score"> 5 </div>
										<div className="review-score-base text-center">
											<span>(3 reviews)</span>
										</div>
									</div>
								</div>
							</div>
							<div className="loader-wrapper">
								<div className="st-loader"></div>
							</div> 
							<div className="st-form-booking-action search-form-v2">
								<form className="form form-check-availability-hotel" method="post">
									<div className="st-group-form">
										<input type="hidden" name="action" value="ajax_search_room"/>
										<input type="hidden" name="room_search" value="1"/>
										<input type="hidden" name="is_search_room" value="1"/>
										<input type="hidden" name="room_parent" value="216"/>
										<input type="hidden" name="item_id" value="216"/>
										<div className="form-group form-date-field date-enquire form-date-search  " data-format="MM/DD/YYYY">
											<div className="date-wrapper clearfix">
												<div className="check-in-wrapper">
													<ul className="st_grid_date">
														<li>
															<div className="st-item-date">
																<label>Check In</label>
																<div className="render check-in-render">		
																	<div className="date-picker">
															        <DatePicker
															              selected={startDate}
															              onChange={handleStartDateChange}
															              className="form-control"
															              placeholderText="Select start date"
															            />
															    	</div>
																</div>
															</div>
														</li>
														<li>
															<div className="st-item-date">
																<label>Check Out</label>
																<div className="render check-out-render">			
																	<div className="date-picker">
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
														</li>
													</ul>
												</div>
											</div>
											<input type="hidden" className="check-in-input" value="12/08/2023" name="start"/>
											<input type="hidden" className="check-out-input" value="12/09/2023" name="end"/>
											<input type="text" className="check-in-out" value="08/12/2023 10:34 am-09/12/2023 10:34 am" name="date"/>
										</div> 
										<div className="search-form">
											<div className="field-guest form-group">
												<div className="form-extra-field dropdown dropdown-toggle " data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
													<div className="st-form-dropdown-icon" onClick={toggleGuest}>
														<label>Guests</label>
														<div className="render">
															<span style={{
																fontWeight: 'unset',
															}}>
															{adults + children} guest,{roomNumber} room
															</span>
														</div>
													</div>
												</div>
												{isGuestVisible && (
												<ul className="dropdown-menu st-modern-style" 
													style={{
															position: 'absolute',
														    inset: '18px auto auto 0px',
														    margin: '0px',
														    transform: 'translate(0px, 94px)',
														    width: '100%',
    														height: 'auto',
															}}
												>
													<li className="item d-flex align-items-center justify-content-between">
														<label>Rooms</label>
														<div className="select-wrapper">
															<div className="st-number-wrapper d-flex align-items-center justify-content-between">
																<span className="prev">
																<FontAwesomeIcon 
																icon={faMinus} 
																onClick={handleDecreaseRoom} 
																/>
																</span>
																<input type="text" name="room_num_search" value={roomNumber} className="form-control st-input-number" autoComplete="off" readOnly="" data-min="1" data-max="9"/>
																<span className="next">
																<FontAwesomeIcon 
																icon={faPlus} 
																onClick={handleIncreaseRoom} 
																/>
																</span>
															</div>
														</div>
													</li>
													<li className="item d-flex align-items-center justify-content-between">
														<label>Adults</label>
														<div className="select-wrapper">
															<div className="st-number-wrapper d-flex align-items-center justify-content-between">
																<span className="prev">
																<FontAwesomeIcon 
																icon={faMinus} 
																onClick={handleDecreaseAdults} />
																</span>
																<input type="text" name="adult_number" value={adults} className="form-control st-input-number" autoComplete="off" readOnly="" data-min="1" data-max="9"/>
																<span className="next">
																<FontAwesomeIcon 
																icon={faPlus} 
																onClick={handleIncreaseAdults} 
																	/>
																</span>
															</div>
														</div>
													</li>
													<li className="item d-flex align-items-center justify-content-between">
														<label>Children</label>
														<div className="select-wrapper">
															<div className="st-number-wrapper d-flex align-items-center justify-content-between">
																<span className="prev">
																<FontAwesomeIcon 
																icon={faMinus} 
																onClick={handleDecreaseChildren} />
																</span>
																<input type="text" name="child_number" value={children} className="form-control st-input-number" autoComplete="off" readOnly="" data-min="0" data-max="9"/>
																<span className="next">
																<FontAwesomeIcon 
																icon={faPlus} 
																onClick={handleIncreaseChildren} 	/>
																</span>
															</div>
														</div>
													</li>
												</ul>
												)}
											</div>
										</div>
									</div>
									<div className="submit-group">
										<button className="text-center btn-v2 btn-primary" type="submit" name="submit">
											Check availability
										</button>
										<input style={{display: 'none'}} type="submit" className="btn btn-default btn-send-message" data-id="216" name="st_send_message" value="Send message"/>
									</div>
									<div className="message-wrapper mt30"></div>
								</form>
							</div>
						</div> 
						<div className={`tab-pane fade ${activeTab === 'inquire' ? 'show active' : ''}`} id="nav-inquirement" role="tabpanel" aria-labelledby="nav-inquirement-tab">
							<div className="inquiry-v2">
								<div className="owner-info st-sent-mail-customer">
									<div className="loader-wrapper">
										<div className="st-loader"></div>
									</div> 
									<div className="media form-st-send-mail">
										<div className="st_send-mail-form">
											<div className="form-wrapper">
												<div className="row">
													<div className="col-md-12 col-xs-12">
														<div className="form-group">
															<div className="wpcf7 js" id="wpcf7-f43-p216-o1" lang="en-US" dir="ltr">
																<div className="screen-reader-response">
																	<p role="status" aria-live="polite" aria-atomic="true"></p> 
																	<ul></ul>
																</div>
																<form action="/st_hotel/castello-casole-hotel/#wpcf7-f43-p216-o1" method="post" className="wpcf7-form init" aria-label="Contact form" noValidate="novalidate" data-status="init">
																	<div style={{display: 'none'}}>
																		<input type="hidden" name="_wpcf7" value="43"/>
																		<input type="hidden" name="_wpcf7_version" value="5.8.4"/>
																		<input type="hidden" name="_wpcf7_locale" value="en_US"/>
																		<input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f43-p216-o1"/>
																		<input type="hidden" name="_wpcf7_container_post" value="216"/>
																		<input type="hidden" name="_wpcf7_posted_data_hash" value=""/>
																	</div>
																	<div className="row">
																		<div className="col-md-12">
																			<div className="form-group">
																				<p>
																					<label>
																						Name (*) 
																					</label>
																					<span className="wpcf7-form-control-wrap" data-name="st_name"><input size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control" id="name" aria-required="true" aria-invalid="false" value="" type="text" name="st_name"/>
																					</span>
																				</p>
																			</div>
																		</div>
																		<div className="col-md-12">
																			<div className="form-group">
																				<p>
																					<label>
																						E-mail (*) 
																					</label>
																					<span className="wpcf7-form-control-wrap" data-name="st_email">
																						<input size="40" className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email form-control" id="email" aria-required="true" aria-invalid="false" value="" type="email" name="st_email"/>
																					</span>
																				</p>
																			</div>
																		</div>
																		<div className="col-md-12">
																			<div className="form-group">
																			<p>
																				<label>
																					Phone
																				</label>
																				<span className="wpcf7-form-control-wrap" data-name="st_tel">
																					<input size="40" className="wpcf7-form-control wpcf7-tel wpcf7-text wpcf7-validates-as-tel form-control" aria-invalid="false" value="" type="tel" name="st_tel"/>
																				</span>
																			</p>
																			</div>
																		</div>
																	</div>
																	<div className="form-group">
																		<p>
																			<label>Note </label>
																			<span className="wpcf7-form-control-wrap" data-name="st_note">
																				<textarea cols="40" rows="3" className="wpcf7-form-control wpcf7-textarea form-control" id="message" aria-invalid="false" name="st_note">
																				</textarea>
																			</span>
																		</p>
																	</div>
																	<div className="form-group">
																		<p>
																			<input type="hidden" name="type_services" value="Hotel"/>
																			<input type="hidden" name="title_service" value="Castello Casole Hotel"/>
																			<input type="hidden" name="mail_partner" value="phuonghv@shinecommerce.co"/>
																		</p>
																	</div>
																	<p>
																		<input className="wpcf7-form-control wpcf7-submit has-spinner btn btn-primary" type="submit" value="Send Message"/>
																		<span className="wpcf7-spinner">
																		</span>
																	</p>
																	<p style={{ display: 'none !important' }}>
																      <label>
																        Δ
																        <textarea name="_wpcf7_ak_hp_textarea" cols="45" rows="8" maxLength="100"></textarea>
																      </label>
																      <input type="hidden" id="ak_js_2" name="_wpcf7_ak_js" value="1702031944921" />
																      <script>
																        {`document.getElementById("ak_js_2").setAttribute("value", new Date().getTime())`}
																      </script>
																    </p>
																	<div className="wpcf7-response-output" aria-hidden="true">
																	</div>
																</form>
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
			<div className="d-none d-sm-block widget-box st-logo-box st-border-radius">
				<div className="st-border-radius-sidebar">
					<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Aerial-view.png" className="img-responsivve" alt="Castello Casole Hotel"/>
				</div>
			</div> 
			<div className="sidebar-item map-view-wrapper widget-box st-logo-box d-none d-sm-block style-2">
				<div className="map-view">
					<span className="stt-icon stt-icon-location1 icon-marker"></span>
					<div className="map-view-button">
						View in a map <span className="stt-icon stt-icon-arrow2-right"></span>
					</div>
				</div>
			</div>
			<div className="owner-info d-none d-sm-block widget-box st-border-radius">
				<h4 className="heading">Owner</h4>
				<div className="media d-flex align-items-center">
					<div className="media-left">
						<Link to="https://modmixmap.travelerwp.com/author/modmix/">
							<img alt="avatar" width="90" height="90" src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/32.jpg" className="avatar avatar-96 photo origin round"/> 
						</Link>
					</div>
					<div className="media-body">
						<h4 className="media-heading">
							<Link to="https://modmixmap.travelerwp.com/author/modmix/" className="author-link">
								modmix
							</Link>
						</h4>
						<p>Member Since 2022</p>
					</div>
				</div>
				<div className="question-author">
					<div className="st_ask_question text-center">
						<Link to="" className="login btn btn-primary" data-bs-toggle="modal" data-bs-target="#st-login-form">
							Ask a Question
						</Link>	
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


								
							
						</div>
					</div>
				<Footer />
				</div>
			</>
		);	
}
export default HotelRooms;



/////other



import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const YourComponent = () => {
  const [isPriceVisible, setPriceVisibility] = useState(false);
  const [buttonText, setButtonText] = useState('Show price');

  const handleShowPriceClick = () => {
    setPriceVisibility(!isPriceVisible);
    setButtonText(isPriceVisible ? 'Show price' : 'Room Detail');
  };

  return (
    <div className="col-12 col-md-12 col-lg-5">
      <div className="price-wrapper" style={{ display: isPriceVisible ? 'block' : 'none' }}>
        <span className="price">€{roomData.price}</span>
        <span className="unit">/night</span>
      </div>
      <Link
        to={isPriceVisible ? '#' : `/hotelRoomDepartments/${room.room_id}`}
        className="btn-show-price"
        onClick={handleShowPriceClick}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default YourComponent;






import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const YourComponent = () => {
  // Set up state unconditionally
  const [isPriceVisible, setPriceVisibility] = useState(false);
  const [buttonText, setButtonText] = useState('Show price');

  // Conditional update based on visibility
  const handleShowPriceClick = () => {
    setPriceVisibility((prevVisibility) => !prevVisibility);
    setButtonText((prevText) => (prevVisibility ? 'Show price' : 'Room Detail'));
  };

  return (
    <div className="col-12 col-md-12 col-lg-5">
      <div className="price-wrapper" style={{ display: isPriceVisible ? 'block' : 'none' }}>
        <span className="price">€{roomData.price}</span>
        <span className="unit">/night</span>
      </div>
      <Link
        to={isPriceVisible ? '#' : `/hotelRoomDepartments/${room.room_id}`}
        className="btn-show-price"
        onClick={handleShowPriceClick}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default YourComponent;
