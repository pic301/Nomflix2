import React, { Component } from "react";
import CollectionsPresenter from "./CollectionsPresenter";
import { moviesApi } from "../../api";

class CollectionsContainer extends Component {
  state = {
    result: null,
    loading: false,
    error: null
    
  };

  

  async componentDidMount() {
    const {match: {params: { id }},history: { push }} = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result, error;

    try {
      ({ data: result } = await moviesApi.collections(parsedId));
      ({ data: result } = await moviesApi.movieDetail(parsedId));
    } catch {
      error = "Can't find Collections";
    } finally {
      this.setState({
        result,
        loading: false,
        error
      });
    }
  }
  render() {
    const { result, loading, error } = this.state;
    console.log(result);
    return (
      <CollectionsPresenter
        collectionName={result && result.name}
        result={result && result.parts}
        loading={loading}
        error={error}
      />
    );
  }
}

export default CollectionsContainer;
