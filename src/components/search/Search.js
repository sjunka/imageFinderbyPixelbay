import React, { Component } from 'react'

import TexField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField'
import { MenuItem } from 'material-ui/Menu';

import ImageResults from '../imageResult/ImageResults'

import axios from 'axios'

class Search extends Component {

    state = {
        searchText: '',
        amount: 10,
        apiURL: 'https://pixabay.com/api',
        apiKey: '9159195-04cd42aaafdf8980fd204cb96',
        images: []
    };

    onTextChange = (e) => {

        const val = e.target.value
        this.setState({
            [e.target.name]: val
        }, () =>{
            if ( val === '' ) {
                this.setState ({
                    images: []
                })
            } else {
                axios
                .get(
                  `${this.state.apiURL}/?key=${this.state.apiKey}&q=${
                    this.state.searchText
                  }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
                )
                .then(res => this.setState({ images: res.data.hits }))
                .catch(err => console.log(err));



            }    





        });
    }

    onAmountChange = (e, index, value) => {
        this.setState({
            amount: value
        }, () =>{
            console.log(this.state)
        });
    }

  render() {
      console.log(this.state.images)
    return (


      <div>
          
        <TexField
            name= "searchText"
            value= {this.state.searchText}
            onChange= {this.onTextChange}
            floatingLabelText= "Buscar imagenes en internet"
            fullWidth={true}

        />

        <br/>
        <SelectField
            name = "amount"
            floatingLabelText = "Cantidad"
            value = {this.state.amount}
            onChange = {this.onAmountChange}
        >
                 <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
        </SelectField>
        <br/>

        {this.state.images.length > 0 ? (<ImageResults images={this.state.images}/>) : null }
      </div>
    )
  }
}

export default Search;
