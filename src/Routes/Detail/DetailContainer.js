import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
    constructor(props)
    {super(props);
      const {location:{pathname}
    } = this.props;


  this.state = {
    result: null,
    error: null,
    loading: true,
    isMovie: pathname.includes('/movie/')
  }}
  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push },
      
    } = this.props;
    const{isMovie}= this.state;    
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/"); 
    }
    let result=null;
    
       try{
           if(isMovie){//=pathname.include('/movie/')
           
            ({data:result} =await moviesApi.movieDetail(parsedId));
                
        }else{
            ({data:result} =await tvApi.showDetail(parsedId));
           
        }
       
    } catch{
           this.setState({error:"Can't find anything"})

       } finally{
           this.setState({loading:false,result})//뭐가되든 펄스되고 리절트 선언하고
       }
  }
  


  render() {// 홈프레젠터로 가는 모든 스테이트 값을 렌더링할꺼야

    const { result, error, loading } = this.state;
    console.log(result)
    
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
