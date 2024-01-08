import React, { useState, useEffect, useContext } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';

import {addToCartContext} from '../contexts/AddToCartProvider';

import Header from '../HeaderComponent/Header';
import Footer from '../FooterComponent/Footer';
import './Checkout.css';

const Checkout = () => {

	const { state, dispatch } = useContext(addToCartContext);
	const cartItems = state.cartItems;
	console.log(cartItems);

	function getNumberOfNights(checkOut, checkIn) {
	  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

	  const checkOutDate = new Date(checkOut);
	  const checkInDate = new Date(checkIn);

	  // Check if the date conversion is successful
	  if (isNaN(checkOutDate) || isNaN(checkInDate)) {
	    return 'Invalid Date';
	  }

	  const nights = Math.round(Math.abs((checkOutDate - checkInDate) / oneDay));
	  return nights;
	}





  // const handleSubmit = () => {
  //   // Handle form submission with selected payment and captchaToken
  //   // ...

  //   // For demonstration purposes, log the selected payment and captcha token
  //   console.log('Selected Payment:', selectedPayment);
  //   console.log('Captcha Token:', captchaToken);
  // };


	const navigate = useNavigate(null);

	const validationSchema = Yup.object().shape({
	  st_first_name: Yup.string().required('First Name is required'),
	  st_last_name: Yup.string().required('Last Name is required'),
	  st_email: Yup.string().email('Invalid email').required('Email is required'),
	  st_phone: Yup.string().required('Phone is required'),
	  st_address: Yup.string(),
	  st_address2: Yup.string(),
	  st_city: Yup.string(),
	  st_province: Yup.string(),
	  st_zip_code: Yup.string(),
	  st_country: Yup.string(),
	  st_note: Yup.string(),
	});

	const formik = useFormik({
	    initialValues: {
	      st_first_name: '',
	      st_last_name: '',
	      st_email: '',
	      st_phone: '',
	      st_address: '',
	      st_address2: '',
	      st_city: '',
	      st_province: '',
	      st_zip_code: '',
	      st_country: '',
	      st_note: '',
	    },
    validationSchema: validationSchema,
    onSubmit: async (values) =>{
		// e.preventDefault();

		console.log(values);

	    try {
	      const response = await axios.post("http://localhost/traveler/stripe/stripepayment.php",state,
	    {
	        headers: {
	          "Content-Type": "application/json"
	        }
	      });

	      const data = await (response.data);
	      console.log(data);
	      const {sessionId} = data;
	      const stripe = await loadStripe('pk_test_51OVWEjSHsKHS7BRys8B2B3SP5p7nrqhoTmFm1OLOIoCAI8De8AJsiew0BR2b0upsVkZb6nOimWwDHYN2sSkVcqBs00I535HMWi');
	      const result = await stripe.redirectToCheckout({
	        sessionId: sessionId
	      });


	      if (result.error) {
	        console.log(result.error);
	      }else{
	        navigate('/billSummary');
	      }
	    } catch (error) {
	      console.error('Error during checkout:', error);
	    }
	},
  });

return(
	<><Header />
		<div id="st-content-wrapper" className="st-style-elementor">
			<div className="banner st-bg-feature st_1702278858">
		      <div className="container">
		        <div className="st-banner-search-form style_2">
		          <h1 className="st-banner-search-form__title">Checkout</h1>
		          <div className="st-breadcrumb hidden-xs d-none d-sm-block">
		            <div className="container">
		              <ul>
		                <li><Link to="https://modmixmap.travelerwp.com">Home</Link></li>
		                <li className="active">Checkout</li>
		              </ul>
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		    <div className="container">
				<div className="st-checkout-page style-2">
					<div className="row">
						<div className="col-lg-4 col-12 order-1 order-sm-2">
						  <h3 className="title">Your Booking</h3>
						  <div className="cart-info st-border-radius" id="cart-info">
						    {cartItems.map((item, index) => (
						    <React.Fragment key={index}>
						      <div key={index} className="service-section">
						        <div className="service-left">
						          <Link to="#">
						            <img
						              width="140"
						              height="110"
						              src={`/RoomImages/${item.room_image}`}
						              className="img-responsive wp-post-image"
						              alt="Checkout"
						              decoding="async"
						            />
						          </Link>
						        </div>
						        <div className="service-right">
						          <h3 className="title">
						            <Link to="#">{item.hotelName}</Link>
						          </h3>
						          <p className="address">
						            <i className="stt-icon-location1"></i>{item.hotelCity}
						          </p>
						        </div>
						      </div>
						      <div className="room-type" key={index}>
						        <span className="label">Room type:</span>
						        <span className="value">
						          <Link to="#">{item.room_name}</Link>
						        </span>
						      </div>
						      <div className="info-section" key={index}>
						        <h4 className="info-heading">Your trip</h4>
						        <ul>
						          <li key={index}>
						            <span className="label">Date </span>
						            <span className="value">
						              {`${item.check_in.toLocaleDateString()} - ${item.check_out.toLocaleDateString()}`}
						              <Link to="#">
						                Edit
						              </Link>
						            </span>
						            <div className="detail">
						              <button className="btn btn-primary">
						                Detail <i className="fa fa-caret-down"></i>
						              </button>
						              <ul className="detail-list">
						                <li className="head">
						                  <span className="label">From - To</span>
						                  <span className="value">Price</span>
						                </li>
						                <li>
						                  <span className="label">{`${item.check_in.toLocaleDateString()} - ${item.check_out.toLocaleDateString()}`}</span>
						                  <span className="value">{item.room_price}</span>
						                </li>
						              </ul>
						            </div>
						          </li>
						          <li className="ad-info" key={index}>
						            <ul>
						              	<li>
										  <span className="label">Number of Nights</span>
										  <span className="value">
										    {getNumberOfNights(item.check_out, item.check_in)}
										  </span>
										</li>
						              <li>
						                <span className="label">Adults</span>
						                <span className="value">{item.adults}</span>
						              </li>
						              <li>
						                <span className="label">Children</span>
						                <span className="value">{item.children}</span>
						              </li>
						              <li>
						                <span className="label">Room</span>
						                <span className="value">{item.rooms}</span>
						              </li>
						            </ul>
						          </li>
						        </ul>
						      </div>
						      <div className="coupon-section" key={index}>
						        <h5>Coupon Code</h5>
						        <form method="post" action="https://modmixmap.travelerwp.com/checkout/">
						          <div className="form-group">
						            <input id="field-coupon_code"  type="text" name="coupon_code" />
						            <input type="hidden" name="st_action" value="apply_coupon" />
						            <button type="submit" className="btn btn-primary wp-block-search__button">
						              APPLY
						            </button>
						          </div>
						        </form>
						      </div>
						      <div className="price-details" key={index}>
						        <h5>Price details</h5>
						        <div className="item">
						          <span className="label">{getNumberOfNights(item.check_out, item.check_in)} night </span>
						          <span className="value">{`€${item.room_price}`}</span>
						        </div>
						        {/* Add more items as needed */}
						      </div>
						      <div className="total-section" key={index}>
						        <ul>
						          <li>
						            <span className="label">Subtotal</span>
						            <span className="value">{`€${item.room_price}`}</span>
						          </li>
						          <li className="payment-amount">
						            <span className="label">Pay Amount</span>
						            <span className="value">{`€${item.room_price}`}</span>
						          </li>
						        </ul>
						      </div>
						    </React.Fragment>
						    ))}
						  </div>
						</div>

					    <div className="col-lg-8 col-12 order-2 order-sm-1">
						  <h3 className="title"> Booking Submission </h3>
						  <div className="check-out-form">
						    <div className="entry-content"></div>
						    <form id="cc-form" onSubmit={formik.handleSubmit}>
						      <div className="clearfix">
						        <div className="row">
						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_first_name">
						                First Name <span className="require">*</span>
						              </label>
						              <i className="fa fa-user input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_first_name && formik.touched.st_first_name ? 'is-invalid' : ''}`}
						                id="field-st_first_name"
						                name="st_first_name"
						                placeholder="First Name"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_first_name}
						              />
						              {formik.errors.st_first_name && formik.touched.st_first_name && (
						                <div className="invalid-feedback">{formik.errors.st_first_name}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_last_name">
						                Last Name <span className="require">*</span>
						              </label>
						              <i className="fa fa-user input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_last_name && formik.touched.st_last_name ? 'is-invalid' : ''}`}
						                id="field-st_last_name"
						                name="st_last_name"
						                placeholder="Last Name"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_last_name}
						              />
						              {formik.errors.st_last_name && formik.touched.st_last_name && (
						                <div className="invalid-feedback">{formik.errors.st_last_name}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_email">
						                Email <span className="require">*</span>
						              </label>
						              <i className="fa fa-envelope input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_email && formik.touched.st_email ? 'is-invalid' : ''}`}
						                id="field-st_email"
						                name="st_email"
						                placeholder="email@domain.com"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_email}
						              />
						              {formik.errors.st_email && formik.touched.st_email && (
						                <div className="invalid-feedback">{formik.errors.st_email}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_phone">
						                Phone <span className="require">*</span>
						              </label>
						              <i className="fa fa-phone input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_phone && formik.touched.st_phone ? 'is-invalid' : ''}`}
						                id="field-st_phone"
						                name="st_phone"
						                placeholder="Your Phone"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_phone}
						              />
						              {formik.errors.st_phone && formik.touched.st_phone && (
						                <div className="invalid-feedback">{formik.errors.st_phone}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_address">Address Line 1</label>
						              <i className="fa fa-map-marker fas fa-map-marker-alt input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_address && formik.touched.st_address ? 'is-invalid' : ''}`}
						                id="field-st_address"
						                name="st_address"
						                placeholder="Your Address Line 1"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_address}
						              />
						              {formik.errors.st_address && formik.touched.st_address && (
						                <div className="invalid-feedback">{formik.errors.st_address}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_address2">Address Line 2</label>
						              <i className="fa fa-map-marker fas fa-map-marker-alt input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_address2 && formik.touched.st_address2 ? 'is-invalid' : ''}`}
						                id="field-st_address2"
						                name="st_address2"
						                placeholder="Your Address Line 2"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_address2}
						              />
						              {formik.errors.st_address2 && formik.touched.st_address2 && (
						                <div className="invalid-feedback">{formik.errors.st_address2}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_city">City</label>
						              <i className="fa fa-map-marker fas fa-map-marker-alt input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_city && formik.touched.st_city ? 'is-invalid' : ''}`}
						                id="field-st_city"
						                name="st_city"
						                placeholder="Your City"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_city}
						              />
						              {formik.errors.st_city && formik.touched.st_city && (
						                <div className="invalid-feedback">{formik.errors.st_city}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_province">State/Province/Region</label>
						              <i className="fa fa-map-marker fas fa-map-marker-alt input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_province && formik.touched.st_province ? 'is-invalid' : ''}`}
						                id="field-st_province"
						                name="st_province"
						                placeholder="State/Province/Region"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_province}
						              />
						              {formik.errors.st_province && formik.touched.st_province && (
						                <div className="invalid-feedback">{formik.errors.st_province}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_zip_code">ZIP code/Postal code</label>
						              <i className="fa fa-map-marker fas fa-map-marker-alt input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_zip_code && formik.touched.st_zip_code ? 'is-invalid' : ''}`}
						                id="field-st_zip_code"
						                name="st_zip_code"
						                placeholder="ZIP code/Postal code"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_zip_code}
						              />
						              {formik.errors.st_zip_code && formik.touched.st_zip_code && (
						                <div className="invalid-feedback">{formik.errors.st_zip_code}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-6">
						            <div className="form-group form-group-icon-left">
						              <label htmlFor="field-st_country">Country</label>
						              <i className="fa fa-globe input-icon"></i>
						              <input
						                className={`form-control ${formik.errors.st_country && formik.touched.st_country ? 'is-invalid' : ''}`}
						                id="field-st_country"
						                name="st_country"
						                placeholder="Country"
						                type="text"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_country}
						              />
						              {formik.errors.st_country && formik.touched.st_country && (
						                <div className="invalid-feedback">{formik.errors.st_country}</div>
						              )}
						            </div>
						          </div>

						          <div className="col-sm-12">
						            <div className="form-group">
						              <label htmlFor="field-st_note">Special Requirements</label>
						              <textarea
						                rows="6"
						                className={`form-control ${formik.errors.st_note && formik.touched.st_note ? 'is-invalid' : ''}`}
						                id="field-st_note"
						                name="st_note"
						                placeholder="Special Requirements"
						                onChange={formik.handleChange}
						                onBlur={formik.handleBlur}
						                value={formik.values.st_note}
						              ></textarea>
						              {formik.errors.st_note && formik.touched.st_note && (
						                <div className="invalid-feedback">{formik.errors.st_note}</div>
						              )}
						            </div>
						          </div>
						        </div>
						      </div>
						      <div className="col-sm-12 mt-3 mb-5 text-center">
						      	<button type="submit" className="btn btn-primary">Submit</button>
						      </div>
						    </form>
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

export default Checkout;