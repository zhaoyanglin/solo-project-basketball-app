import React, { Component } from 'react';
import { connect } from 'react-redux';


class Admin extends Component {

    state = {
        position: {
            latitude: '',
            longitudes: '',
        },
        info_window: '',
        img_url: '',
        park_name: ''
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.props.dispatch({ type: 'FETCH_PARK' });
    }

    handleChangeforPosition = (key) => (event) => {
        this.setState({
            position: {
                ...this.state.position,
                [key]: event.target.value
            }
        })
    }

    handleChangefor = (key) => (event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    onSubmitButton = (event) => {
        event.preventDefault();

        if (this.state.position.latitude === '' && this.state.position.longitudes === '') {
            alert(`latitude and longitudes and can't be empty`)
        } else {
            this.props.dispatch({ type: 'POST_PARK', payload: this.state });
        }
        this.setState({
            position: {
                latitude: '',
                longitudes: '',
            },
            info_window: '',
            img_url: '',
            park_name: ''
        })
    }

    deleteButton = (key) => {
        this.props.dispatch({ type: 'DELETE_PARK', payload: key });
    }

    render() {

        let parkData = null;
        parkData = this.props.reduxState.parkReducer.map((data, i) => {
            return (<tr key={i}>
                <td>{data.latitude}</td>
                <td>{data.longitudes}</td>
                <td>{data.park_name}</td>
                <td>{data.info_window}</td>
                <td><img src={data.img_url} alt={data.park_name}/></td>
                <td><button id='deleteButton' onClick={() => this.deleteButton(data.id)}>Delete</button></td>
            </tr >)
        });

        return (
            <div id='adminMainDiv'>
                <div id='formDiv'>
                    <form onSubmit={this.onSubmitButton}>
                        <h3>Insert New Park</h3>

                        <label>Latitude</label>
                        <input placeholder='latitude' type='number' onChange={this.handleChangeforPosition('latitude')} value={this.state.position.latitude} />

                        <label>Longitude</label>
                        <input placeholder='longitude' type='number' onChange={this.handleChangeforPosition('longitudes')} value={this.state.position.longitudes} />

                        <label>Park Name</label>
                        <input placeholder='park name' onChange={this.handleChangefor('park_name')} value={this.state.park_name} />

                        <label>Description</label>
                        <input placeholder='description' onChange={this.handleChangefor('info_window')} value={this.state.info_window} />

                        <label>Image Url</label>
                        <input placeholder='image url' onChange={this.handleChangefor('img_url')} value={this.state.img_url} />

                        <button type='submit' id='adminSubmitButton'>Submit</button>

                    </form>
                </div>

                <div id='tableDiv'>
                    <table class="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Park Name</th>
                                <th>Description</th>
                                <th>Img Url</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkData}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(Admin);