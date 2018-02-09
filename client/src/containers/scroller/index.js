import React from 'react';
import { connect } from 'react-redux';

import SingleComponent from './item';
import InfiniteScroll from 'components/InfiniteScroll';

const colors = ["#687676", "#6C746F", "#717369", "#767263", "#7B715D", "#806F56", "#856E50", "#896D4A", "#8E6C44", "#936B3E", "#986937", "#9D6831", "#A2672B", "#A66625", "#AB651F", "#B06318", "#B56212", "#BA610C", "#BF6006", "#C45F00"]
class Home extends React.Component {
  state = {
    components: []
  }

  randomKey = () => {
    let rand = ''
    for (let i = 0; i < 9; i++) {
      rand += Math.floor((Math.random() * 10) + 1)
    }
    return parseInt(rand, 10)
  }

  componentWillMount() {
    const { dispatch } = this.props

    let components = []
    for (let i = 0; i < 5; i++) {
      let singleComponent = <SingleComponent dispatch={dispatch} color={colors[i]} key={this.randomKey()} />
      components.push(singleComponent)
    }

    this.setState({
      components
    })
  }


  delay = (time) => new Promise(resolve => (setTimeout(resolve, time)))

  loadMore = async () => {
    const { dispatch } = this.props
    let result = []
    for (let i = 0; i < 5; i++) {
      let singleComponent = <SingleComponent dispatch={dispatch} color={colors[i]} key={this.randomKey()} />
      result.push(singleComponent)
    }
    await this.delay(2000)
    this.setState({
      components: this.state.components.concat(result)
    })
  }

  render() {
    const loader = <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60}} className="loader" key={0}><i className="p-1 fa fa-spinner fa-spin fa-2x"></i> </div>
    
    return (
      <div>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={true}
            loader={loader}
          >
            {this.state.components}
          </InfiniteScroll>
      </div>
    )
  }
}

export default connect(null)(Home);
