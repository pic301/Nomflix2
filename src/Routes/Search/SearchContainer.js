import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";
export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    loading: false,
    error: null
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm=(event)=>{
   const{target:{value}}=event;
   console.log(value)
    this.setState({searchTerm:value})
  }
  

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults }
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults }
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResults,
        tvResults
      });
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        loading={loading}
        error={error}
        searchTerm={searchTerm} //state에서 서치프레젠트로 전달한거지 그래서 프레젠트에서쓸수있는거야
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
//handleSubmit 은 서치텀이 빈칸아닌걸 체크하고 그담에 서치함수실행
//서치프레젠터에 props로 전달해야지  ={}