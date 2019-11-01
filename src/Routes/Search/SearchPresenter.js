import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from 'react-helmet'
import Loader from 'Components/Loader'
import Section from 'Components/Section'
import Message from "../../Components/Message"
import Poster from "../../Components/Poster"


const Container = styled.div`
padding: 0px 20px;
`;

const Form = styled.form`
margin-bottom:50px;
width:100%;
`;

const Input = styled.input`
all:unset;
font-size: 28px;
width:100%;
`;

//props로 추가하면 여기서써야겠지
const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  searchTerm,
  handleSubmit,
  error,
  updateTerm,
}) => <Container>
  <Helmet>
    <title>Search|Nomflix</title>
  </Helmet>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder='Search Movies or TV Show..'
        value={searchTerm}
        onChange={updateTerm} />
    </Form>
    {loading ?
      (<Loader />)
      :
      <>
        {movieResults && movieResults.length > 0 &&
          <Section title='Movie Results'>
            {movieResults.map(movie => (
             <Poster
             key={movie.id} 
             id={movie.id} 
             imageUrl={movie.poster_path} 
             title={movie.original_title} 
             rating={movie.vote_average}
             year={movie.release_date.substring(0,4)}
             isMovie={true}
             />
            ))}
          </Section>}
          
        {tvResults && tvResults.length > 0 &&
          <Section title='Movie Results'>
            {tvResults.map(show => (
              <span key={show.id}>{show.name} </span>
            ))}
          </Section>}
        {error && <Message color="#e74c3c" text={error} />}
        {tvResults && 
        movieResults && 
        tvResults.length === 0 && 
        movieResults.length === 0 &&( 
        <Message text='Nothing found' color='#95a5a6'/>
        )}
      </>}
  </Container>
//로더는 로딩이 멈췄을때 무비리절트로 갈꺼고 렝스의 길이가 0이상이면 섹션타이틀로가고





SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;

