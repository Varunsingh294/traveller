import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChild, faBed, faSquare, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Header from '../HeaderComponent/Header';
import Footer from '../FooterComponent/Footer';
import './HotelRoomDepartments.css';

const HotelRoomDepartments = () =>{
const [galleryImages] = useState([
    'https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/The-First-Collection-at-Jumeirah-Village-Circle.jpg',
    'https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/The-First-Collection-at-Jumeirah-Village-Circle-4.jpg',
    'https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/The-First-Collection-at-Jumeirah-Village-Circle-3.jpg',
    'https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/The-First-Collection-at-Jumeirah-Village-Circle-2.jpg',
    'https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/bd568819.jpg',
  ]);

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

const [startDateCheck, setStartDateCheck] = useState(currentDate);
const [endDateCheck, setEndDateCheck] = useState(nextDay);

const handleStartDateCheckChange = (date) => {
    setStartDateCheck(date);
  };

  const handleEndDateCheckChange = (date) => {
    setEndDateCheck(date);
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

return(
	<>	<Header />
		<div id="st-content-wrapper" className="st-style-elementor st-style-4 singe-room-layout-3">
			<div className="banner st-bg-feature st_1702204766">
				<div className="container">
					<div className="st-banner-search-form style_2">
						<h1 className="st-banner-search-form__title"> Queen Room </h1>
						<div className="st-breadcrumb hidden-xs  d-none d-sm-block">
							<div className="container">
								<ul>
									<li>
										<Link to="https://modmixmap.travelerwp.com">Home</Link>
									</li>
									<li>
										<Link to="https://modmixmap.travelerwp.com/hotel-search-halfmap/?location_id=54&amp;location_name=United%20States">United States</Link>
									</li>
									<li>
										<Link to="https://modmixmap.travelerwp.com/st_hotel/castello-casole-hotel/" title="Castello Casole Hotel">Castello Casole Hotel</Link>
									</li>
									<li className="active">Queen Room</li> 
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="st-hotel-room-content pt-5">
					<div className="hotel-target-book-mobile d-flex justify-content-between align-items-center d-none">
						<div className="price-wrapper">
							<div id="mobile-price">
								From:<span className="price">€261.00</span>
								<span className="unit">/night</span> 
							</div>
						</div>
						<Link to="" className="btn-v2 btn-primary btn-mpopup btn-green">
							Check 
						</Link>
					</div>
					<div className="st-service-header2">
						<div className="left">
							<div className="sub-heading">
								<div className="d-flex align-items-center">
									<div className="st-address d-flex align-items-center">
										<i className="stt-icon-location1"></i>Los Angeles 
									</div>
								</div>
							</div>
						</div>
						<div className="right">
							<div className="shares dropdown">
								<Link to="#" className="share-item social-share">
									<span className="stt-icon stt-icon-share"></span>
								</Link>
								<ul className="share-wrapper">
									<li>
										<Link className="facebook" to="https://www.facebook.com/sharer/sharer.php?u=https://modmixmap.travelerwp.com/hotel_room/queen-room-4/&amp;title=Queen Room" target="_blank" rel="noopener" original-title="Facebook">
											<i className="fab fa-facebook-f"></i>
										</Link>
									</li>
									<li>
										<Link className="twitter" to="https://twitter.com/share?url=https://modmixmap.travelerwp.com/hotel_room/queen-room-4/&amp;title=Queen Room" target="_blank" rel="noopener" original-title="Twitter">
											<i className="fab fa-twitter"></i>
										</Link>
									</li>
									<li>
										<Link className="no-open pinterest" to="https://pinterest.com/pin/create/bookmarklet/?url=https://modmixmap.travelerwp.com/hotel_room/queen-room-4/&amp;is_video=false&amp;description=Queen Room&amp;media=https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/The-First-Collection-at-Jumeirah-Village-Circle-2.jpg" target="_blank" rel="noopener" original-title="Pinterest">
											<i className="fab fa-pinterest-p"></i>
										</Link>
									</li>
									<li>
										<Link className="linkedin" to="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://modmixmap.travelerwp.com/hotel_room/queen-room-4/&amp;title=Queen Room" target="_blank" rel="noopener" original-title="LinkedIn">
											<i className="fab fa-linkedin-in"></i>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="st-gallery st-border-radius style-masonry">
			          <div className="st-list-item-gallery">
			            {galleryImages.map((image, index) => (
			              <Link key={index} to={`/image/${index + 1}`} className="item-gallery">
			                <img src={image} alt={`Gallery ${index + 1}`} />
			              </Link>
			            ))}
			          </div>
			          <div className="shares dropdown">
			            <div className="btn-group">
			              <Link to="#st-gallery-popup" className="btn btn-transparent has-icon radius st-gallery-popup">
			                <span className="stt-icon stt-icon-category"></span>All photos
			              </Link>
			              <div id="st-gallery-popup" className="hidden">
			                {galleryImages.map((image, index) => (
			                  <Link key={index} to={`/image/${index + 1}`}>
			                    Gallery
			                  </Link>
			                ))}
			              </div>
			            </div>
			          </div>
			        </div>
					<div className="row">
						<div className="col-12 col-lg-8">
							<div className="room-featured-items">
								<div className="item">
									<span className="stt-icon stt-icon-area">
									<FontAwesomeIcon icon={faSquare} />
									</span>
									S: 260m <sup>2</sup>
								</div>
								<div className="item">
									<span className="stt-icon stt-icon-bed">
									<FontAwesomeIcon icon={faBed} />
									</span>
									Beds: 3 
								</div>
								<div className="item">
									<span className="stt-icon stt-icon-adult">
									<FontAwesomeIcon icon={faUser} />
									</span>
									Adults: 5 
								</div>
								<div className="item">
									<span className="stt-icon stt-icon-baby">
									<FontAwesomeIcon icon={faChild} />
									</span>
									Children: 3 
								</div>
							</div>
						
							<div className="st-description" id="st-description">
						      <h2 className="st-heading-section">About this room</h2>
						      <p>
						        Standard Double Room comprises of 1 Double Bed or 2 Twin Beds, 2 Bedside Tables, a Desk &amp; Chair.
						        The room is furnished with wall to wall carpeting, trendy furnishings, and a balcony.
						      </p>
						      <p>
						        Our ultramodern glass bathroom is equipped with a hairdryer, magnifying shaving and makeup mirror,
						        as well as all the amenities you could possibly need during your stay.
						      </p>
						      <p>
						        A Complimentary Bottle of Wine, Fresh Fruit, and a Mineral Water are provided on arrival.
						        Electric current: 220 Volts. Smoking rooms &amp; interconnecting rooms are also available.
						      </p>
						    </div>
						    <div className="st-hr"></div>
						    <div className="st-attributes st-section-single stt-attr-room-facilities">
						      <h2 className="st-heading-section">Room Facilities</h2>
						      <div className="item-attribute">
						        <div className="row">
						          <div className="col-12 col-sm-6 col-md-4">
						            <div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
						              <i className="input-icon st-border-radius field-icon fa"></i>Air Conditioning
						            </div>
						          </div>
						          <div className="col-12 col-sm-6 col-md-4">
						            <div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
						              <i className="input-icon st-border-radius field-icon fa"></i>Bathroom robe
						            </div>
						          </div>
						          <div className="col-12 col-sm-6 col-md-4">
						            <div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
						              <i className="input-icon st-border-radius field-icon fa"></i>Cart food
						            </div>
						          </div>
						          <div className="col-12 col-sm-6 col-md-4">
						            <div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
						              <i className="input-icon st-border-radius field-icon fa"></i>Flat Screen TV
						            </div>
						          </div>
						          <div className="col-12 col-sm-6 col-md-4">
						            <div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
						              <i className="input-icon st-border-radius field-icon fa"></i>Hair dryer
						            </div>
						          </div>
						          <div className="col-12 col-sm-6 col-md-4">
						            <div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
						              <i className="input-icon st-border-radius field-icon fa"></i>Shampoo
						            </div>
						          </div>
						          <div className="col-12 col-sm-6 col-md-4">
						            <div className="item d-flex align-items-center has-matchHeight" style={{ height: '46px' }}>
						              <i className="input-icon st-border-radius field-icon fa"></i>Towels
						            </div>
						          </div>
						        </div>
						      </div>
						    </div>
						
						    <div className="room-rates">
								<h2 className="st-heading-section">
								Rates &amp; availability </h2>
								<div className="rate-calendar style-1 d-flex" style={{ gap: '30px' }}>
							        <div className="startDate render check-in-render">
							          <div className="date-picker">
							            <DatePicker
							              selected={startDate}
							              onChange={handleStartDateChange}
							              inline
							              open={true}
							            />
							          </div>
							        </div>

							        <div className="render check-out-render">
							          <div className="date-picker">
							            <DatePicker
							              selected={endDate}
							              onChange={handleEndDateChange}
							              minDate={startDate}
							              inline
							              open={true}
							            />
							          </div>
							        </div>
								</div>
							</div>
							<div className="stoped-scroll-section"></div>
						</div>
						<div className="col-12 col-lg-4">
							<div className="widgets">
								<div className="fixed-on-mobile st-fixed-form-booking" data-screen="992px">
									<div className="close-icon hide">
										<i className="input-icon st-border-radius field-icon fa"></i> 
									</div>
									<div className="st-form-book-wrapper relative">
										<div className="form-booking-price">
											from <span className="price">€261.00</span><span className="unit">/night</span> 
										</div>
										<div className="book-v2">
											<div className="form-book-wrapper st-border-radius">
												<div className="loader-wrapper">
													<div className="st-loader"></div>
												</div> 
												<form id="form-booking-inpage" className="form single-room-form hotel-room-booking-form" method="post">
													<input name="action" value="hotel_add_to_cart" type="hidden"/>
													<input name="item_id" value="216" type="hidden"/>
													<input name="room_id" value="540" type="hidden"/>
													<input type="hidden" id="room_search" name="room_search" value="d33cb0f54b"/>
													<input type="hidden" name="_wp_http_referer" value="/hotel_room/queen-room-4/?start=12%2F10%2F2023&amp;end=12%2F11%2F2023&amp;date=10%2F12%2F2023+12%3A00+am-11%2F12%2F2023+11%3A59+pm&amp;room_num_search=1&amp;adult_number=1"/> 
													<div className="form-group form-date-field date-enquire form-date-hotel-room clearfix " data-format="MM/DD/YYYY" data-availability-date="12/10/2023">
														<div className="date-wrapper clearfix">
															<div className="check-in-wrapper">
																<ul className="st_grid_date">
																	<li>
																		<div className="st-item-date">
																			<label>Check In</label>
																			<div className="render check-in-render"><DatePicker
																	            selected={startDateCheck}
																	            onChange={handleStartDateCheckChange}
																	            className="form-control"
																	            placeholderText="Select start date"
																	          />
																	        </div>
																		</div>
																	</li>
																	<li>
																		<div className="st-item-date">
																			<label>Check Out</label>
																			<div className="render check-out-render">
																			<DatePicker
																	            selected={endDateCheck}
																	            onChange={handleEndDateCheckChange}
																	            className="form-control"
																	            placeholderText="Select end date"
																	            minDate={startDateCheck}
																	          />
																	        </div>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
														<input type="hidden" className="check-in-input" value="12/10/2023" name="check_in"/>
														<input type="hidden" className="check-out-input" value="12/11/2023" name="check_out"/>
														<input type="text" className="check-in-out" data-minimum-day="0" data-room-id="540" data-action="st_get_availability_hotel_room" value="10/12/2023 12:00 am-11/12/2023 11:59 pm" name="date"/>
													</div> 
													<div className="field-guest form-group">
														<div className="form-extra-field dropdown dropdown-toggle
																" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" onClick={toggleGuest}>
															<div className="st-form-dropdown-icon">
																<label>Guests</label>
																<div className="render">
																	<span className="adult" data-text="Adult" data-text-multi="Adults">
																	{adults} Adult</span>
																	-
																	<span className="children" data-text="Child" data-text-multi="Children">
																	{children} Children</span>
																</div>
															</div>
														</div>
														{isGuestVisible && (
														<ul className="dropdown-menu st-modern-style">
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
																		<input type="text" name="room_num_search" value={roomNumber}
																		 className="form-control st-input-number" autoComplete="off" readOnly="" data-min="1" data-max="5"/>
																		<span className="next">
																			<FontAwesomeIcon 
																			icon={faPlus} 
																			onClick={handleIncreaseRoom} 
																			/>
																		</span>
																	</div>
																</div>
															</li>
															<div className="form-guest-search" style={{border: 'none'}}>
																<li className="item d-flex align-items-center justify-content-between">
																	<label>Adults</label>
																	<div className="select-wrapper">
																		<div className="st-number-wrapper d-flex align-items-center justify-content-between">
																			<span className="prev">
																				<FontAwesomeIcon 
																				icon={faMinus} 
																				onClick={handleDecreaseAdults} />
																			</span>
																			<input type="text" name="adult_number" value={adults}
																			 className="form-control st-input-number" autoComplete="off" readOnly="" data-min="1" data-max="5"/>
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
																			<input type="text" name="child_number" value={children}
																			 className="form-control st-input-number" autoComplete="off" readOnly="" data-min="0" data-max="3"/>
																			<span className="next">
																			<FontAwesomeIcon 
																			icon={faPlus} 
																			onClick={handleIncreaseChildren} 	/>
																			</span>
																		</div>
																	</div>
																</li>
															</div>
														</ul>
														)}
														<div className="guest_name_input d-none" data-placeholder="Guest %d name" data-hide-adult="on" data-hide-children="on">
															<label>
																<span>Guest Name</span> 
																<span className="required">*</span>
															</label>
															<div className="guest_name_control"></div>
															<script type="text/html" id="guest_name_control_item">
																<div className="control-item mb10">
																	<select name="guest_title[]" className="form-control">
																		<option value="mr">Mr</option>
																		<option value="miss">Miss</option>
																		<option value="mrs">Mrs</option>
																	</select>
																	<input className="form-control " placeholder="Guest  name" name="guest_name[]" value=""/>			
																</div>
															</script>
														</div>
													</div>
													<div id="st-price-render" className="st-price-render">
														<div className="item">
															<span className="number-night"></span>
															<span className="sale-price"></span>
														</div>
														<div className="item total">
															<span className="total-label">Total</span>
															<span className="total-price"></span>
														</div>
													</div>
													<div className="submit-group">
														<button className="btn btn-green btn-large btn-full upper font-medium btn_hotel_booking btn-book-ajax" type="submit" name="submit">
															Reserve <i className="fa fa-spinner fa-spin d-none"></i>
														</button>
														<input style={{border: 'none'}} type="submit" className="btn btn-default btn-send-message" data-id="540" name="st_send_message" value="Send message"/>
													</div>
													<div className="mt30 message-wrapper"></div>
													<div className="message-wrapper-2"></div>
												</form>
											</div>
										</div>
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
				<div className="relate-rooms">
					<div className="st-hr"></div>
					<h2 className="st-heading-section">Explore other options</h2>
					<div className="inner">
						<div className="owl-carousel st-owl-slider owl-loaded owl-drag" data-items="3" data-margin="24" data-responsive="{&quot;992&quot;:{&quot;items&quot;:3},&quot;768&quot;:{&quot;items&quot;:2},&quot;0&quot;:{&quot;items&quot;:1}}">
							<div className="owl-stage-outer">
								<div classNameName="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '850px', }}>
									<div className="owl-item active" style={{ width: '400.667px', marginRight: '24px', }}>
										<div className="item-slide">
											<div className="room-item">
												<div className="thumbnail">
													<Link to="https://modmixmap.travelerwp.com/hotel_room/family-suite-3/">
														<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Travel-Vacations-Cheap-Flights-Airline-Tickets-Airfares-3-800x600.jpg" alt="Family Suite" className="img-fluid img-full st-hover-grow"/>
													</Link>
												</div>
												<div className="content">
													<h3 className="name">
														<Link to="https://modmixmap.travelerwp.com/hotel_room/family-suite-3/" className="">
															Family Suite 
														</Link>
													</h3>
													<div className="facilities">
														<p className="item">
															<span className="stt-icon stt-icon-area">
															<FontAwesomeIcon icon={faSquare} />
															</span>
															<span className="text">S: 210m<sup>2</sup></span>
														</p>
														<p className="item">
															<span className="stt-icon stt-icon-bed">
															<FontAwesomeIcon icon={faBed} />
															</span>
															<span className="text">Beds: 2</span>
														</p>
														<p className="item">
															<span className="stt-icon stt-icon-adult">
															<FontAwesomeIcon icon={faUser} />
															</span>
															<span className="text">Adults: 3</span>
														</p>
														<p className="item">
															<span className="stt-icon stt-icon-baby">
															<FontAwesomeIcon icon={faChild} />
															</span>
															<span className="text">Child: 2</span>
														</p>
													</div>
													<div className="price-wrapper">
														<div className="price">
															€150.00<span className="unit">/night</span>
														</div>
													</div> 
													<Link to="https://modmixmap.travelerwp.com/hotel_room/family-suite-3/" className="btn-show-price">
														Room Detail 
													</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="owl-item active" style={{ width: '400.667px', marginRight: '24px', }}>
										<div className="item-slide">
											<div className="room-item">
												<div className="thumbnail">
													<Link to="https://modmixmap.travelerwp.com/hotel_room/standard-double/">
														<img src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Radisson-Dubai-Damac-Hills-4-800x600.jpg" alt="Standard Double" className="img-fluid img-full st-hover-grow"/>
													</Link>
												</div>
												<div className="content">
													<h3 className="name">
														<Link to="https://modmixmap.travelerwp.com/hotel_room/standard-double/" className="">
															Standard Double 
														</Link>
													</h3>
													<div className="facilities">
														<p className="item">
															<span className="stt-icon stt-icon-area">
															<FontAwesomeIcon icon={faSquare} />
															</span>
															<span className="text">S: 200m<sup>2</sup></span>
														</p>
														<p className="item">
															<span className="stt-icon stt-icon-bed">
															<FontAwesomeIcon icon={faBed} />
															</span>
															<span className="text">Beds: 3</span>
														</p>
														<p className="item">
															<span className="stt-icon stt-icon-adult">
															<FontAwesomeIcon icon={faUser} />
															</span>
															<span className="text">Adults: 4</span>
														</p>
														<p className="item">
															<span className="stt-icon stt-icon-baby">
															<FontAwesomeIcon icon={faChild} />
															</span>
															<span className="text">Child: 2</span>
														</p>
													</div>
													<div className="price-wrapper">
														<div className="price">
															€200.00<span className="unit">/night</span>
														</div>
													</div> 
													<Link to="https://modmixmap.travelerwp.com/hotel_room/standard-double/" className="btn-show-price">
														Room Detail 
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="owl-nav disabled">
							
								<button type="button" className="owl-prev disabled">
								    <span aria-label="Previous">‹</span>
								</button>
								<button type="button" className="owl-next disabled">
								    <span aria-label="Next">›</span>
								</button>

							</div>
							<div className="owl-dots disabled">
								<button type="button" className="owl-dot active">
									<span></span>
								</button>
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

export default HotelRoomDepartments;