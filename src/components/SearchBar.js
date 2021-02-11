import React, {useEffect, useState} from 'react'
import { Search } from 'semantic-ui-react'

const SearchExampleStandard = (props) => {
  
  const [searchBarState, setsearchBarState] = useState(props)

  useEffect(() => {
    setsearchBarState(props)
  }, [props])

  const handleSearchChange = (e, data) => {
    // props.deleteResults();
    props.onChange(data.value)
  }

  const handleResultSelect = (e, data) => {
    console.log('searchbarSelectfiring')

    props.setCity(data.result.title);
    props.onChange(data.result.titlet)
    
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
    </React.Fragment>
  )
}

export default SearchExampleStandard