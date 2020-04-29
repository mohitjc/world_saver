import React from 'react';
import ReviewItem from '../global/ReviewItem';

const Information = () => {
  return (
    <div className="col-sm-12 col-md-7 col-lg-8">
      <div className="freelancer-info">
        <div className="freelancer-detail">
          <h4 className="freelancer-name">
            Charli Brown
            <span className="online">
              <i className="fas fa-circle"></i> Online
            </span>
          </h4>
          <h4 className="profile-title">One Stop Solution for Web & Apps!</h4>
          <p>
            Hello we're Yes Design Company, a brilliant freelancer team from Bangladesh. With 5
            years of experience we've participated in a wide range of projects from full website
            designs to huge eCommerce stores. We've done websites for Restaurant, Portfolio, News
            Magazine, Photography, Wedding, Corporate identity and many more.
          </p>
          <h6 className="hire-for">You can get benefited by hiring us for:</h6>
          <ul>
            <li>
              <i className="far fa-dot-circle"></i> Website Design - (UX, UI)
            </li>
            <li>
              <i className="far fa-dot-circle"></i> Template design in Photoshop
            </li>
            <li>
              <i className="far fa-dot-circle"></i> PSD to HTML5 tamplates
            </li>
            <li>
              <i className="far fa-dot-circle"></i> HTML to Wordpress theme development
            </li>
            <li>
              <i className="far fa-dot-circle"></i> Wordpress Installation and development
            </li>
            <li>
              <i className="far fa-dot-circle"></i> Professional LOGO Design
            </li>
          </ul>
          <p>
            Feel free to contact us with project details and lets make something awesome together!
          </p>
        </div>
        <div className="recent-reviews">
          <h3>Recent Reviews</h3>
        </div>
        <div className="review-wrapper">
          <a href="#">
            <img src="img/company-logo/logo1.jpg" alt="" />
          </a>
          <div className="project-review">
            <h5>Design project</h5>
            <ul className="client-rating">
              <li>05</li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>$1150.00 USD</li>
            </ul>
            <div className="review-detail">
              <p>“Thanks. Looking forward to more projects.”</p>
              <div className="client">
                <p>- Finmediaco</p>
                <img src="/img/flag/flag3.png" alt="" />
                <span>1 hour ago.</span>
              </div>
              <ul className="category-ch">
                <li>
                  <a href="#">Graphic Design,</a>
                </li>
                <li>
                  <a href="#">Logo Design,</a>
                </li>
                <li>
                  <a href="#">Photoshop,</a>
                </li>
                <li>
                  <a href="#">Adobe Photoshop,</a>
                </li>
                <li>
                  <a href="#">Bochure Design,</a>
                </li>
                <li>
                  <a href="#">Logo</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="review-wrapper">
          <a href="#">
            <img src="/img/company-logo/logo2.jpg" alt="" />
          </a>
          <div className="project-review">
            <h5>Design project</h5>
            <ul className="client-rating">
              <li>05</li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>
                <i className="fas fa-star"></i>
              </li>
              <li>$1150.00 USD</li>
            </ul>
            <div className="review-detail">
              <p>“Thanks. Looking forward to more projects.”</p>
              <div className="client">
                <p>- Finmediaco</p>
                <img src="img/flag/flag4.png" alt="" />
                <span>1 hour ago.</span>
              </div>
              <ul className="category-ch">
                <li>
                  <a href="#">Graphic Design,</a>
                </li>
                <li>
                  <a href="#">Logo Design,</a>
                </li>
                <li>
                  <a href="#">Photoshop,</a>
                </li>
                <li>
                  <a href="#">Adobe Photoshop,</a>
                </li>
                <li>
                  <a href="#">Bochure Design,</a>
                </li>
                <li>
                  <a href="#">Logo</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </div>
    </div>
  );
};

export default Information;
