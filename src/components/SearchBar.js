import React, {useEffect, useState} from 'react'
import { Search } from 'semantic-ui-react'

const SearchExampleStandard = (props) => {
  
  const [searchBarState, setsearchBarState] = useState(props)

  useEffect(() => {
    setsearchBarState(props)
  }, [props])

  const handleSearchChange = (e, data) => {
    props.onChange(data.value)
  }

  const handleResultSelect = (e, data) => {
    console.log(props)
    props.setCity(data.result.title);
    props.onChange(data.result.title)
  }
  const list = () => {
    if(!props.results) {
      return;
    }
    return props.results.map((el, index) => {
      return (
        <li className='test' key={index}>{el.title}</li>
      ) 
    })
  }
  return (
    <React.Fragment>
      <div className="ui one column grid">
        <div className="searchholder column">
        <i className="map marker alternate icon"></i>

        <Search
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          results={props.results}
          value={props.value}
        />
        
        <i className="list icon"></i>
        </div>
      </div>
      {list()}
    </React.Fragment>
  )
}

export default SearchExampleStandard