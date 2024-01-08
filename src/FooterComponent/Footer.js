import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css';
const Footer = () => {
	return(
			<>
				<footer className="footer">
				    <div className="mainContaint pt-5">
			    		<div className="container-fluid">
					      	<div className="elementor px-5 pt-5">
					      		<div className="row px-5">
								    <div className="col-sm-3 px-3">
								    	<h5>Support</h5>
								    	<ul>
								    		<li><Link to="#">Help Center</Link></li>
								    		<li><Link to="#">Our COVID-19 Response</Link></li>
								    		<li><Link to="#">Cancellation options</Link></li>
								    		<li><Link to="#">Safety information</Link></li>
								    	</ul>
								    </div>
								    <div className="col-sm-3 px-3">
								    	<h5>Company</h5>
								    	<ul>
								    		<li><Link to="#">About us</Link></li>
								    		<li><Link to="#">Community Blog</Link></li>
								    		<li><Link to="#">Careers</Link></li>
								    		<li><Link to="#">Privacy policy</Link></li>
								    		<li><Link to="#">Terms of service</Link></li>
								    	</ul>
								    </div>
								    <div className="col-sm-3 px-3">
								    	<h5>Contact</h5>
								    	<ul>
								    		<li><Link to="#">Partnerships</Link></li>
								    		<li><Link to="#">FAQ</Link></li>
								    		<li><Link to="#">Get in touch</Link></li>
								    	</ul>
								    </div>
								    <div className="col-sm-3 px-3">
								    	<h5 style={{ textAlign: 'start' }} >Social</h5>

								    	<div className="social-icons">
										  <span>
										    <Link to="#" target="_self" className="facebook-icon">
										      <i className="fab fa-facebook"></i>
										    </Link>
										  </span>
										  <span>
										    <Link to="#" target="_self" className="twitter-icon">
										      <i className="fab fa-twitter"></i>
										    </Link>
										  </span>
										  <span>
										    <Link to="#" target="_self" className="instagram-icon">
										      <i className="fab fa-instagram"></i>
										    </Link>
										  </span>
										  <span>
										    <Link to="#" target="_self" className="youtube-icon">
										      <i className="fab fa-youtube"></i>
										    </Link>
										  </span>
										</div>

								    </div>
							    </div>


							    <div className="row pt-5 px-5">
							    	<hr className="mx-3 my-3" />
							    	<div className="bottomElementor">
								    	<div className="">
								    		<p>&copy; Copyright Traveler.</p>
								    	</div>
								    	<div className="">
								    		<Link to="#" className="footerlogo" style={{ width: '100%' }}>
										        <img style={{ width: '100%' }} src="https://modmixmap.travelerwp.com/wp-content/uploads/2022/04/Frame-3182.svg" alt="TravelerWP" />
										    </Link>
								    	</div>
							    	</div>
							    </div>

					      	</div>
				      	</div>
			     	</div>
			    </footer>
			</>
		);
}

export default Footer;