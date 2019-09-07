import React, { Component } from "react";
import Results from "./Results";

const list = require("./city.list.json");

class Landing extends Component {
    constructor() {
        super();
        this.getWeather = this.getWeather.bind(this);
        this.suggest = this.suggest.bind(this);
        this.getFavs = this.getFavs.bind(this);
        this.takeSuggestion = this.takeSuggestion.bind(this);
        this.state = {
            search: [],
            city: undefined,
            country: undefined,
            favs: []
        };
    }
    componentDidMount() {
        this.getFavs();
    }

    getFavs() {
        // const favCount = localStorage.length;
        let favUpdate = [];
        for (let i = 0; i < 15; i++) {
            let e = JSON.parse(localStorage.getItem(`fav${i}`));
            if(e != null) favUpdate.push(e);           
        }

        favUpdate.push(this.state.favs);
        this.setState({ favs: favUpdate });
    }

    suggest() {
        if (document.getElementById("city").value.length < 1) {
            this.setState({ search: [] });
        }
        const caps = search => {
            return search
                .toLowerCase()
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        };
        let query = caps(document.getElementById("city").value);
        let match = [];
        list.forEach(function(e) {
            if (e.name.startsWith(query)) {
                match.push(e.name);
            }
        });
        if (match.length < 500) {
            this.setState({ search: match });
        }
        this.getFavs();
    }

    takeSuggestion(e) {
        e.preventDefault();
        let suggestedCity = e.target.name;
        document.getElementById("city").value = suggestedCity;
        this.setState({ search: [] });
        this.getFavs();
    }

    getWeather(e) {
        e.preventDefault();
        const city = document.getElementById("city").value;
        document.getElementById("city").value = "";
        this.setState({ city: city });
        document.getElementById("results").scrollIntoView(true);
        this.getFavs();
    }

    favClick(f) {
        document.getElementById("city").value = "";
        this.setState({ city: f });
        document.getElementById("results").scrollIntoView(true);
        this.setState({ search: [] });
        this.getFavs();
    }

    render() {
        return (
            <div>
                <h1 className="title">Weather Finder</h1>
                <div className="landing">
                    <form className="form">
                        <input
                            type="text"
                            name="city"
                            id="city"
                            size="10"
                            placeholder="Enter a City"
                            autoComplete="off"
                            className="searchInput"
                            autoFocus
                            onChange={this.suggest}
                        />
                        <button
                            className="getWeatherBtn"
                            onClick={this.getWeather}
                        >
                            Go
                        </button>
                    </form>
                    {this.state.search.slice(0, 10).map(suggestion => (
                        <button
                            name={suggestion}
                            className="suggestionBtn"
                            onClick={this.takeSuggestion}
                        >
                            {suggestion}
                        </button>
                    ))}
                    <div className="favContainer">
                        {this.state.favs.splice(0, 15).map(fav =>
                           fav.length != 0 ? (
                                <button
                                    className="favItem"
                                    onClick={() => {
                                        this.favClick(fav.city);
                                    }}
                                >
                                    {fav.city}, {fav.country} 
                                </button>
                            ) : (
                                false
                            )
                        )}
                    </div>
                </div>
                <div className="results" id="results">
                    <Results city={this.state.city} getFavs={this.getFavs} />
                </div>
            </div>
        );
    }
}

export default Landing;