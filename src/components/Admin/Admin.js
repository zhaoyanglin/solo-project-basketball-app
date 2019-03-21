import React, { Component } from 'react';
import { connect } from 'react-redux';


class Admin extends Component {

    state = {
        position: {
            latitude: '',
            longitudes: '',
        },
        info_window: '',
        img_url:'',
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
            this.props.dispatch({ type: 'POST_PARK', payload: this.state});
        }
        this.setState({
            position: {
                latitude: '',
                longitudes: '',
            },
            info_window: '',
            img_url:'',
        })
    }

    deleteButton = (key) => {
        this.props.dispatch({ type: 'DELETE_PARK', payload: key});
    }

    render() {

        let parkData = null;
        parkData = this.props.reduxState.parkReducer.map((data, i) => {
            return (<tr key={i}>
                <td>{data.latitude}</td>
                <td>{data.longitudes}</td>
                <td>{data.info_window}</td>
                <td>{data.img_url}</td>
                <td><button onClick={ () => this.deleteButton(data.id)}>Delete</button></td>
            </tr >)
        });
        
        return (
            <div>
                <header>
                    <h1>This is the admin page</h1>
                </header>
                <form onSubmit={this.onSubmitButton}>

                    <input placeholder='latitude' type='number' onChange={this.handleChangeforPosition('latitude')} value={this.state.position.latitude} />

                    <input placeholder='longitudes' type='number' onChange={this.handleChangeforPosition('longitudes')} value={this.state.position.longitudes} />

                    <input placeholder='description' onChange={this.handleChangefor('info_window')} value={this.state.info_window} />

                    <input placeholder='image url' onChange={this.handleChangefor('img_url')} value={this.state.img_url} />

                    <button type='submit' >Submit</button>

                </form>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>latitude</th>
                                <th>longitudes</th>
                                <th>description</th>
                                <th>img_url</th>
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