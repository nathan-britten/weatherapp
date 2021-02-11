import React, { Component } from "react";
import Slider from "react-slick";
import TempSymbol from './TempSymbol';
import shortid from "shortid";

class MultipleItems extends Component {


  constructor(props) {
    super(props);
    this.state = {
      type: '',
      hoursToShow: [],
      specificDay: [],
      clicked: false,
      codeArray: props.codeArray
    }
  }

  componentDidMount() {
    this.setState({type: this.props.type})
    if(this.props.type === 'hours') {
      let sliderData = [];
      if(this.props.data) {
      sliderData = Object.values(this.props.data)
      }
      this.setState({hoursToShow: sliderData})
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.data === this.props.data) {
      return;
    }
    if(prevProps.data !== this.props.data) {
      if(this.props.type === 'hours') {
        console.log('rendered now')

        let sliderData = [];
        if(this.props.data) {
        sliderData = Object.values(this.props.data)
        }
        this.setState({hoursToShow: sliderData})
        console.log('component did update')
      }

      if(this.props.type === 'days') {
        this.setActive()
      }
    }
  }

  setActive() {
    let daysSlides = document.querySelectorAll('.days-slider .slick-slide')
    
    daysSlides.forEach((el, index) => {
      el.removeAttribute('data-currentday')
      if(el.innerText ===  this.props.timeConverter(this.props.currentDay)) {
        el.setAttribute('data-currentday', 'currentday')
      }

    })
  }

  handleDayClick = (e, element) => {
        const unixTime = element[0];
    this.props.setDay(unixTime)
    this.setState({clicked: true})
  }

  renderDaysSlider() {

    return this.props.data.map(element => {

      return (
        
        <div key={element[0]} onClick={(e) => this.handleDayClick(e, element)} >
          {element[1]}
        </div>
      )
    })
  }

  renderHoursWeatherData() {
    return this.state.hoursToShow.map(( element, index ) => {
    
      let weatherCode = element.weather[0].icon.substring(0,2);

      const style = {
        animation: `comein 1s ease forwards`,
        animationDelay: `${index/8}s`,

        animationFillMode: 'forwards'
      }
      console.log(element)
      let randomkey = shortid.generate();
      return (
        <div className='slide-container' >
          <div className="hours-card" key={element.dt + element.wind.speed} style={style}>
          
          {this.props.timeConverter(element.dt, true)}
          <div className="weather">
            <img src={`/assets/SVG/${this.state.codeArray[weatherCode][0]}`} alt=""/>


            {this.props.toUpperCase(element.weather[0].description)}
          </div>
          <div className="temp">
            <TempSymbol temp={parseFloat(element.main.temp).toFixed(1)}/>
          </div>
          </div>

        </div>
      )
    })
  }

  renderLogic() {
    if(this.props.type === 'days') {
      console.log('rendering 2')
      return this.renderDaysSlider();
    } else {
      console.log('rendering 3')
      return this.renderHoursWeatherData();
    }
  }



  render() {
    let settings;
    if(this.props.type === 'days') {
      settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false
      };
    } else {
      settings = {
        dots: true,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2
      };
    }

    return (
      <div className="slider">
        <Slider {...settings}>
          {this.renderLogic()}
        </Slider>
      </div>
    );
  }
}




export default MultipleItems;