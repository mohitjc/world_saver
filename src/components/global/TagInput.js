/* eslint-disable */

import React, { useState, useEffect } from 'react';

import { isEmpty } from 'lodash';

// import theme, { boxShadow } from '../utils/theme'

const TagInput = ({
  style,
  isHalf,
  hasShadow,
  isInverse,
  placeholder,
  getInput,
  tags
}) => {
  const [array, setArray] = useState([]);
  const [value, setValue] = useState('');
  useEffect(() => {
    getInput(array);
  }, [array, value]);

  useEffect(() => {
    if (!isEmpty(tags)) {
      setArray(tags);
    }
  }, [tags]);

  const onSubmit = e => {
    e.preventDefault();
    if (!isEmpty(value)) {
      setArray(array.concat(value));
      setValue('');
    }
  };

  const removeTag = tagName => {
    const filteredItems = array.filter(item => item !== tagName);
    // console.log('filteredItems', filteredItems);
    setArray(filteredItems);
  };

  // console.log('array', array);

  return (
    <>
      <div className="form-group col-md-4 col-12 mt-3">
        <label>Add keyword</label>
        <form className="d-flex align-items-center">
          <input
            type="text"
            name="title"
            className="form-control"
            // value="john"

            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
          />
          <button
            type="button"
            class="btn btn-primary ml-3"
            onClick={onSubmit}
            
          >
            Add
          </button>
        </form>
      </div>
      <div className="form-group col-md-12 col-12 mt-3">
        {array.map((item, index) => (
          <button
            className="btn btn-secondary mr-2"
            onClick={() => removeTag(item)}
            key={index}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default TagInput;
