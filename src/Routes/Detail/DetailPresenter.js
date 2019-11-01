import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Tabs from 'Components/Tabs';

const Container = styled.div`
  height:calc(100vh - 50px);
  width:100%;
  position:relative;
  padding: 50px;
`;
const Backdrop = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size : cover ;
  filter: blur(3px);
  opacity: 0.5;

  
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  
  `;


const Cover = styled.div`
  width: 30%; 
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;

`;
const Data = styled.div`
  width:70%;
  margin-left:10px;

`;
const Title = styled.h3`
 font-size:32px;
 margin-bottom:20px;
`;
const ItemContainer = styled.div`
margin : 20px 0;
`;
const Item = styled.span`

`;
const Divider = styled.span`
margin:0 10px;

`;
const Overview = styled.p`
font-size:12px;
opacity:0.7;
line-height:1.5;
width:50%;
`;
const Imdb = styled.a`
  display: inline-block;
  position: relative;
  top:15px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: cover cover;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  &:hover {
    opacity: 0.7;
  }
`;

const Youtube = styled.iframe`

width:500px;
height:300px;


`;

const YoutubeContainer = styled.div`


`;





const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Search|Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
      <Container>
        <Helmet>
          <title>{result.original_title
            ? result.original_title
            : result.original_name}Nomflix</title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
              {result.release_date
                ? result.runtime
                : result.episode_run_time[0]}min
            </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>

              <br />
              <Item>
                {result.imdb_id ? (
                  <>

                    <Imdb
                      src={result.imdb_id ? require("../../assets/imob.png") : ""}
                      href={`https://www.imdb.com/title/${result.imdb_id}`}
                      target={"_blank"}
                    />
                  </>
                ) : (
                    ""
                  )}
              </Item>
         
            
            </ItemContainer>


            <Tabs>
            <YoutubeContainer label="Youtube">
           
              
                {result.videos.results && result.videos.results.length > 0 ? (
                  <Youtube
 
                    src={`https://www.youtube.com/embed/${
                      result.videos.results[0].key
                      }`}


                    allow=" fullscreen "
                  />
                ) : (
                    ""
                  )}
              </YoutubeContainer>
                
              <div label="2">
                After 'while
      </div>
      <div label="3">
              xcvxvfdv
      </div>
                
            </Tabs>

            <Overview>{result.overview}</Overview>
            
          </Data>
        </Content>
      </Container>
    );
DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};
export default DetailPresenter;