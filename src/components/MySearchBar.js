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
      return getLatLng(results[0])
    })
    .then(latLng => {
      this.props.setLat(latLng.lat)
      this.props.setLon(latLng.lng)
    }
      )
    .catch(error => console.error('Error', error));
  };

  handleClick = (data) => {
    this.props.setUnits(data)
    console.log(data)
  }
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
              <div className="units-wrapper">
                  <img src="/assets/SVG/Celcius.svg" className={this.props.units === 'metric' ? 'active' : ''} alt="" onClick={() => this.handleClick('metric')}/>
                  <img src="/assets/SVG/Farenheit.svg" className={this.props.units === 'imperial' ? 'active' : ''} alt="" onClick={() => this.handleClick('imperial')}/>
                </div>
            </div>
          </div>
         <i className="list icon"></i>
         <div className={suggestions.length > 0 ? 'show results' : 'hide'}>
           <div className=""></div>
          {suggestions.map(suggestion => (
            <div {...getSuggestionItemProps(suggestion)} className="result" key={suggestion.description}>
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