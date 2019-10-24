import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying }
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming }
      } = await moviesApi.upcoming();
      const {
        data: { results: popular }
      } = await moviesApi.popular();
      this.setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      this.setState({
        error: "Can't find movie information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }
//옵션 두가지 1.전체 Api요청 
//2. 각각의 요청을 분리된 함수로 만들어서 따로 요청할 수 있어
//ex getNowPlaying()getUpcoming()getPopular()함수를 만들수있다
//별로 큰게 없어서 컴디마 안에서도 할수있어서 원하면 다른함수들로 분리해서 바깥에서 만들고
//안에다 this 사용해서 호출해서 쓰면됨 
// 홈프레젠터로 가는 모든 스테이트 값을 렌더링할꺼야
  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
//홈컨테이너는 상태값을 가질거야
//이곳에다가 스테이트를 결정할할거야
//이게 첫번째 컨테이너 컴포넌트다!!
//컴포넌트가 마운트 되었을때nowPlaying,upcoming,popular 를 찾을꺼야 
//그게 끝나면 스테이트 값을 설정해줄거야