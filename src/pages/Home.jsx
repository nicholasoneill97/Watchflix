import React, { useEffect } from 'react'

//import requests for movie rows' contents
import requests from '../Requests'

//import main movie for hero of home page
import Main from '../components/Main'

//import row for movie rows
import Row from '../components/Row'

//import footer
import Footer from '../components/Footer'

//import loader for animation on page load
import Loader from '../components/Loader'


//Returns rows corresponding to their specific requests and titles



const Home = () => {



  return (
    <>
    <Loader />
    <Main />
    <Row rowID='1' title="Upcoming" fetchURL={requests.requestUpcoming} />
    <Row rowID='2' title="Popular" fetchURL={requests.requestPopular} />
    <Row rowID='3' title="Trending" fetchURL={requests.requestTrending} />
    <Row rowID='4' title="Top Rated" fetchURL={requests.requestTopRated} />
    <Row rowID='5' title="Comedy" fetchURL={requests.requestComedy} />
    <Footer />
    
    </>
  )
}

export default Home