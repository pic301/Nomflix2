import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const CollectionBackLink = styled(Link)`
  position: fixed;
  top: 80px;
  right: 80px;
  font-size: 30px; 
`;

const CollectionBack= ({pathName}) => (
  <CollectionBackLink to ={`/${pathName}`}> 
  {"Back "}  
  </CollectionBackLink>
);

export default CollectionBack; 