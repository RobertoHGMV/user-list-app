import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    state = {
        users: [],
        userInfo: {},
        page: 1
    };

    componentDidMount() {
        this.loadUsers();
    }

    /*Quando cria uma função, tem que usar arrow function para poder usar o escopo de this para referenciar a classe*/
    loadUsers = async (page = 1) => {
        const response = await api.get(`v1/users/${page}/${10}`);

        const { usersModel, ...userInfo } = response.data.docs;
        
        this.setState({ users: usersModel, userInfo, page });
    }

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadUsers(pageNumber);
    };

    nextPage = () => {
        const { page, userInfo } = this.state;

        if (page === userInfo.pages) return;

        const pageNumber = page + 1;

        this.loadUsers(pageNumber);
    };

    render() {
        const { users, userInfo, page } = this.state;

        return (
            <div className="user-list">
                {users.map(user => (
                    <article key={user.id}>
                        <strong>{user.id}</strong>
                        <p>{user.fullName}</p>

                        <Link to={`/v1/users/${user.id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === userInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        );
    }
}