import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Tabs from 'Components/Tabs';

import { Link } from "react-router-dom";


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
  opacity: 0.3;

  
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

const ProductionCollection = styled.div`
  display: inline-block;
  text-align: center;
  margin-left: 10px;
`;

const ProductionCollectionImg = styled.div`
  width: 80px;
  height: 100px;
  background-image: url(${props => props.CollectionImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border-radius: 5px;
`;
const ProductionCollectionText = styled.div`
  margin-top: 10px;
  color: white;
  opacity: 0.7;
`;

const CollectionContainer = styled.div`
  display: inline-block;
  text-align: center;
`;

const CollectionLogo = styled.div`
  width: 80px;
  height: 100px;
  background-image: url(${props => props.CollectionImg});
  background-position: center center;
  background-size: cover;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    opacity: 0.5;
  }
`;

const CollectionTitle = styled.div``;

const Crator= styled.div`

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
                  ? result.release_date
                  : result.first_air_date}
              </Item>
              <Divider>•</Divider>
              <Item>
              {result.release_date
                ? result.runtime
                : result.episode_run_time[0]}
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

            <Overview>{result.overview}</Overview>

            {result.belongs_to_collection && (
            <Link to={`/collections/${result.belongs_to_collection.id}`}>
              <CollectionContainer>
                <CollectionLogo
                  CollectionImg={
                    result.belongs_to_collection.poster_path
                      ? `https://image.tmdb.org/t/p/w300${
                          result.belongs_to_collection.poster_path
                        }`
                      : require("../../assets/noPosterSmall.png")
                  }
                />
                <CollectionTitle>
                  {result.belongs_to_collection.name}
                </CollectionTitle>
              </CollectionContainer>
            </Link>
          )}

       {result.seasons && result.seasons.length > 0 
         
           ? result.seasons.map(season => (
               <CollectionContainer>
                 <CollectionLogo
                   CollectionImg={
                     season.poster_path
                       ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                       : require("../../assets/noPosterSmall.png")
                   }
                 />
                 <CollectionTitle>{season.name}</CollectionTitle>
               </CollectionContainer>
             ))
            
           : ""}
           
           <Crator>
           <br/>
     {result.created_by&& result.created_by.length > 0
              ? `Creators:${result.created_by[0].name}`
              : ""}
          </Crator>
              </YoutubeContainer>
                
              <div label="Production Company ">
                
          {result.production_companies && result.production_companies.length > 0
            ? result.production_companies.map(production => (
                <ProductionCollection key={production.id}>
                  <ProductionCollectionImg
                    CollectionImg={
                      production.logo_path
                        ? `https://image.tmdb.org/t/p/w300/${
                            production.logo_path
                          }`
                        : require("../../assets/noPosterSmall.png")
                    }
                  />
                  <ProductionCollectionText>
                    {production.name}
                  </ProductionCollectionText>
                </ProductionCollection>
              ))
            : ""}
      </div>
      <div label=" Production Countries">
      {result.production_countries && result.production_companies.length > 0
                ? result.production_countries[0].name
                : result.origin_country}
      </div>
      
                
            </Tabs>

            
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