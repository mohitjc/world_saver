import React from 'react';

const ReviewItem = () => {
  return (
    <div className="review-wrapper">
      <a href="#">
        <img src="/img/company-logo/logo3.jpg" alt="" />
      </a>
      <div className="project-review">
        <h5>Design project</h5>
        <ul className="client-rating">
          <li>05</li>
          <li>
            <i className="fas fa-star" />
          </li>
          <li>
            <i className="fas fa-star" />
          </li>
          <li>
            <i className="fas fa-star" />
          </li>
          <li>
            <i className="fas fa-star" />
          </li>
          <li>
            <i className="fas fa-star" />
          </li>
          <li>$1150.00 USD</li>
        </ul>
        <div className="review-detail">
          <p>“Thanks. Looking forward to more projects.”</p>
          <div className="client">
            <p>- Finmediaco</p>
            <img src="img/flag/flag5.png" alt="" />
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
  );
};

export default ReviewItem;
