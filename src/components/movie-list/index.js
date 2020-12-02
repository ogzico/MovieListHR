import React, { Component } from 'react'
import "./index.css";

export class MovieList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      year: null,
      data: null
    }
  }


  handleChange = e => {
    e.preventDefault()
    const value = e.target.value
    this.setState({
      [e.target.name]: value
    })
  }

  handleRequest = e => {
    e.preventDefault()
    fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${this.state.year}`)
      .then(res =>
        res.json()).then(data => this.setState({
          data: data.data
        }))
      .catch(err =>
        console.log(err))
  }

  render() {
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input"
            name="year"
            onChange={this.handleChange} />
          <button className="" data-testid="submit-button"
            onClick={this.handleRequest}>Search</button>
        </section>

        <ul className="mt-50 styled" data-testid="movieList">
          {(this.state.data && this.state.data.length > 0) && this.state.data.map(movie =>
            <li className="slide-up-fade-in py-10" key={movie.Title}>{movie.Title}</li>
          )}
        </ul>

        <div className="mt-50 slide-up-fade-in" data-testid="no-result">
          {(this.state.data !== null && this.state.data.length === 0) && "No Results Found"}
        </div>
      </div>
    );
  }
}

export default MovieList
