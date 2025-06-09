import React, { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
// import { history } from '../../main/history';
import { useNavigate } from 'react-router-dom';

const WorldSaver = (props) => {
  const history = useNavigate();
  const { categories, countries } = props;
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    state: '',
    city: '',
    gender: '',
    dob: '',
  });

  const submitHandler = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const iam = data.get('iam');
    const gender = data.get('lookingfor');
    const city = data.get('city');
    const country = data.get('country');
    const name = data.get('name');
    const categoryID = data.get('category');

    let url = '/worldsavers';

    let urldata = {
      gender,
      city,
      country,
      name,
      categoryID,
    };

    let prms = '';
    let objArr = Object.keys(urldata);
    objArr.map((itm, i) => {
      if (i == 0) {
        prms = `?${itm}=${urldata[itm] ? urldata[itm] : ''}`;
      } else if (urldata[itm]) {
        prms += `&${itm}=${urldata[itm]}`;
      }
    });

    url = url + prms;

    //console.log('url', url);

    history(url);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-row">
        <div className="col-lg-6 col-md-12 mb-3">
          <label>I Am</label>

          <select
            name="iam"
            className="form-control form-sm"
            data-trigger="selectmenu"
          >
            <option value="">any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-lg-6 col-md-12 mb-3">
          <label>Looking For</label>

          <select
            name="lookingfor"
            className="form-control form-sm"
            data-trigger="selectmenu"
          >
            <option value="">any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-md-12 mb-3">
          <label>User Name</label>
          <input type="text" name="name" className="form-control form-sm" />
        </div>

        {/* <div className="col-md-12 mb-3">
          <label>Country</label>
          <select
            name="country"
            className="form-control form-sm"
            data-trigger="selectmenu"
          >
            {countries &&
              countries.map((country) => {
                return (
                  <option
                    key={country.id}
                    value={country.name}
                  >{`${country.name}`}</option>
                );
              })}
          </select>
        </div> */}

        <div className="col-md-12 mb-3">
          <label>Country</label>
          <CountryDropdown
            defaultOptionLabel="Country"
            name="country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e })}
            className="form-control"
            priorityOptions={['US', 'CA', 'IN', 'GB']}
          />
        </div>

        <div className="col-md-12 mb-3">
          <label>City</label>
          <input
            name="city"
            type="text"
            placeholder="Please enter city"
            className="form-control m-0"
          />
        </div>

        <div className="col-md-12 mb-3">
          <label>Project Category</label>
          <select
            name="category"
            className="form-control form-sm"
            data-trigger="selectmenu"
            defaultValue="sdas"
          >
            <option value="">Select Category</option>
            {categories &&
              categories.map((category) => {
                if (category.category == 'project') {
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                    >{`${category.name}`}</option>
                  );
                }
              })}
          </select>
        </div>

        <div className="col-md-12 text-right">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorldSaver;
