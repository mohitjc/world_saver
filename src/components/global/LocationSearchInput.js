import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    console.log('LocationSearchInput', props);
    this.state = { address: props.value, lat: null, lng: null };
  }

  handleChange = address => {
    this.setState({ address });
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return {
  //     address: nextProps.value
  //   };
  // }

  componentDidUpdate(nextProps) {
    const { value } = this.props;
    if (nextProps.value !== value) {
      if (value) {
        this.setState({ address: value });
      }
    }
  }

  handleSelect = address => {
    const { getAddressDetails } = this.props;
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        getAddressDetails({
          address,
          latLng
        });
        // this.setState({ lat: latLng.lat, lng: latLng.lng });
        console.log('Success', latLng);
      })
      .catch(error => console.error('Error', error));
    this.setState({ address });
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              className="form-control location-search-input"
              name="address"
              {...getInputProps({
                placeholder: 'Search Places ...'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active dropdown-item'
                  : 'suggestion-item dropdown-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
