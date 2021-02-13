import { toPlainObject } from 'lodash';
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Search } from 'semantic-ui-react'

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: 'London' };
  }

  componentDidMount() {
  
    geocodeByAddress(this.state.address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      console.log('Success', latLng)
      console.log(latLng.lat)
      console.log(latLng.lng)

      this.props.setLat(latLng.lat)
      this.props.setLon(latLng.lng)
    })
  }

 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });

    this.props.setCity(address);
    this.props.onChange(address)

    geocodeByAddress(address)
    .then(results => {
      console.log(results)
      return getLatLng(results[0])
    })
    .then(latLng => {
      console.log('Success', latLng)
      console.log(latLng.lat)
      console.log(latLng.lng)

      this.props.setLat(latLng.lat)
      this.props.setLon(latLng.lng)
      console.log()
    }
      )
    .catch(error => console.error('Error', error));
  };

  renderFunc = ({getInputProps, getSuggestionItemProps, suggestions, onSearchChange }) => (

      <div className="ui one column grid">
        <div className="searchholder column">
          <div className="mysearch">
            <i className="map marker alternate icon"></i>
            <div className="ui search">
              <div className="ui icon input">
                <input {...getInputProps()}/>
                <i aria-hidden="true" className="search icon"></i>
              </div>
            </div>
          </div>
         <i className="list icon"></i>
         <div className={suggestions.length > 0 ? 'show results' : 'hide'}>
           <div className=""></div>
          {suggestions.map(suggestion => (
            <div {...getSuggestionItemProps(suggestion)} class="result">
              <div className="">{suggestion.description}</div>
            </div>
          ))}
        </div>
        </div>

      </div>
  )

  render() {
    const searchOptions = {
      types: ['geocode']
    };
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onSelect={this.handleSelect}
        onChange={this.handleChange}
        searchOptions={searchOptions}
      >
        {this.renderFunc}

      </PlacesAutocomplete>
    );
  }
}
export default LocationSearchInput;