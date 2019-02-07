import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class User extends Component {
    state = {
        user: {}
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/v1/users/${id}`);
        
        this.setState({ user: response.data.docs });
    }

    render() {
        const { user } = this.state;

        return (
          <div className="user-info">
            <h1>{user.id}</h1>
            <p>{user.firstName} {user.lastName}</p>

            <p><a href="javascript:history.back()">Voltar</a></p>
          </div>  
        );
    }
}