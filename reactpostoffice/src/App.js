import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import {Navbar, Row, Nav, Grid, Col} from "react-bootstrap";

const MENU_ITEMS = [
    {nameItem: "User", index: 1},
    {nameItem: "City", index: 2},
    {nameItem: "Stuff", index: 3},
    {nameItem: "Dispatch", index: 4},
    {nameItem: "Order", index: 5}
];

class App extends Component {

    state = {
        activeItem: 0,
    };

    render() {

        let borderInNavBar = {
            "background-color": "gray",
            "color": "white"
        };

        const activeItem = this.state.activeItem;
        return (
            <div>
                <Navbar style={borderInNavBar}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Post Office
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <Grid>
                    <Row>
                        <Col md={1} sm={5}>
                            <Nav
                                bsStyle="pills"
                                stacked
                                activeKey={activeItem}
                                onSelect={index => {
                                    this.setState({activeItem: index});
                                }}
                            >
                                {MENU_ITEMS.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            this.setState({activeItem: index});
                                        }}
                                    >{item.nameItem}
                                    </button>
                                ))}

                            </Nav>
                        </Col>
                        <Col md={8} sm={8}>
                            <Menu
                                key={activeItem}
                                index={MENU_ITEMS[activeItem].index}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

class Menu extends Component {

    state = {
        cities: [],
        users: [],
        stuffs: [],
        dispatches: [],
        orders: []
    };

    componentDidMount() {
        fetch('/city')
            .then(res => res.json())
            .then(cities => this.setState({
                cities
            }));
        fetch('/user')
            .then(res => res.json())
            .then(users => this.setState({
                users
            }));
        fetch('/stuff')
            .then(res => res.json())
            .then(stuffs => this.setState({
                stuffs
            }));
        fetch('/dispatch')
            .then(res => res.json())
            .then(dispatches => this.setState({
                dispatches
            }));
        fetch('/order')
            .then(res => res.json())
            .then(orders => this.setState({
                orders
            }));
    }


    render() {
        if (this.props.index === 1) {
            return (

                <div className="User">
                    <h1>Users</h1>

                    <form method={"post"} action={"/user"}>
                        <input id="username" type="text" name="username" placeholder={"username"} required/>
                        <br/>
                        <input id="password" type="password" name="password" placeholder={"password"} required/>
                        <br/>
                        <input id="name" type="text" name="name" placeholder={"name"} required/>
                        <br/>
                        <input id="surname" type="text" name="surname" placeholder={"surname"} required/>
                        <br/>
                        <input id="address" type="text" name="address" placeholder={"address"} required/>
                        <br/>
                        <input id="email" type="email" name="email" placeholder={"email"} required/>
                        <br/>
                        <input id="telephone" type="text" name="telephone" placeholder={"telephone"} required/>
                        <br/>
                        <button className="btn btn-primary" type="submit">Save user</button>
                    </form>

                    <div>
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Name, Surname</th>
                                <th>Address</th>
                                <th>E-mail</th>
                                <th>Telephone</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.users.map(user =>
                                <tr className="table-success">

                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        {user.password}
                                    </td>
                                    <td>
                                        {user.name} {user.surname}
                                    </td>
                                    <td>
                                        {user.address}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.telephone}
                                    </td>
                                    <td>
                                        <form method={"post"} action={"/delete-user/" + user.id}>
                                            <button type="submit">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        if (this.props.index === 2) {
            return (
                <div className="City">
                    <h1>Cities</h1>

                    <form method={"post"} action={"/city"}>
                        <input id="cityTitle" type="text" name="title" placeholder={"title"} required/>
                        <button type="submit">Save city</button>
                    </form>

                    <div>
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.cities.map(city =>
                                <tr className="table-success">
                                    <td>{city.id}</td>
                                    <td>
                                        {city.title}
                                        <form method={"post"} action={"/update-city/" + city.id}>
                                            <input id="stuffTitle" type="text" name="title" placeholder={"title"}
                                                   required/>
                                            <br/>
                                            <button className="btn btn-primary" type="submit">Update title</button>
                                        </form>
                                    </td>
                                    <td>
                                        <form method={"post"} action={"/delete-city/" + city.id}>
                                            <button type="submit">Delete city</button>
                                        </form>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else if (this.props.index === 3) {
            return (
                <div className="Stuff">
                    <h1>Stuffs</h1>

                    <form method={"post"} action={"/stuff"}>
                        <input id="stuffTitle" type="text" name="title" placeholder={"title"} required/>
                        <br/>
                        <input id="stuffWeight" type="number" name="weight" placeholder={"weight"} required/>
                        <br/>
                        <button className="btn btn-primary" type="submit">Save stuff</button>
                    </form>

                    <div>
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title, Weight</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.stuffs.map(stuff =>
                                <tr className="table-success">
                                    <td>{stuff.id}</td>
                                    <td>
                                        {stuff.title}, {stuff.weight} kg
                                        <form method={"post"} action={"/update-stuff/" + stuff.id}>
                                            <input id="stuffTitle" type="text" name="title" placeholder={"title"}
                                                   required/>
                                            <br/>
                                            <input id="stuffWeight" type="number" name="weight" placeholder={"weight"}
                                                   required/>
                                            <br/>
                                            <button className="btn btn-primary" type="submit">Update title and weight
                                            </button>
                                        </form>
                                    </td>
                                    <td>
                                        <form method={"post"} action={"/delete-stuff/" + stuff.id}>
                                            <button type="submit">Delete stuff</button>
                                        </form>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else if (this.props.index === 4) {
            return (

                <div className="Dispatch">
                    <h1>Dispatches</h1>

                    <form method={"post"} action={"/dispatch"}>
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selectUserForDispatch">Customer</label>
                        </div>
                        <select id={"selectUserForDispatch"} size="1" name="userId" class="custom-select" required>
                            {this.state.users.map(user =>
                                <option value={user.id}>{user.name} {user.surname}</option>
                            )}
                        </select>

                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selectStuffForDispatch">Stuff</label>
                        </div>
                        <select id={"selectStuffForDispatch"} size="1" name="stuffId" class="custom-select" required>
                            {this.state.stuffs.map(stuff =>
                                <option value={stuff.id}>{stuff.title}, {stuff.weight} kg</option>
                            )}
                        </select>

                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selectFromCityForDispatch">From City</label>
                        </div>
                        <select id={"selectFromCityForDispatch"} size="1" name="fromCityId" className="custom-select"
                                required>
                            {this.state.cities.map(city =>
                                <option value={city.id}>{city.title}</option>
                            )}
                        </select>

                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selectToCityForDispatch">To City</label>
                        </div>
                        <select id={"selectToCityForDispatch"} size="1" name="toCityId" className="custom-select"
                                required>
                            {this.state.cities.map(city =>
                                <option value={city.id}>{city.title}</option>
                            )}
                        </select>

                        <button className="btn btn-primary" type="submit">Save dispatch</button>
                    </form>

                    <div>
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Title of stuff, weight</th>
                                <th>From, to</th>
                                <th>Date, time of dispatch</th>
                                <th>Delete</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.dispatches.map(dispatch =>
                                <tr className="table-success">
                                    <td>{dispatch.id}</td>
                                    <td>{dispatch.name} {dispatch.surname}</td>
                                    <td>{dispatch.title}, {dispatch.weight} kg</td>
                                    <td>
                                        {dispatch.from_city}, {dispatch.to_city}
                                        <form method={"post"} action={"/update-dispatch/" + dispatch.id}>
                                            <select id={"selectFromCityForDispatch"} size="1" name="fromCityId"
                                                    className="custom-select">
                                                {this.state.cities.map(city =>
                                                    <option value={city.id}>{city.title}</option>
                                                )}
                                            </select>
                                            <select id={"selectToCityForDispatch"} size="1" name="toCityId"
                                                    className="custom-select">
                                                {this.state.cities.map(city =>
                                                    <option value={city.id}>{city.title}</option>
                                                )}
                                            </select>

                                            <button className="btn btn-primary" type="submit">Update destination
                                            </button>
                                        </form>
                                    </td>
                                    <td>{dispatch.date}, {dispatch.time}</td>
                                    <td>
                                        <form method={"post"} action={"/delete-dispatch/" + dispatch.id}>
                                            <button type="submit">Delete dispatch</button>
                                        </form>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else if (this.props.index === 5) {
            return (
                <div className="Order">
                    <h1>Order</h1>

                    <form method={"post"} action={"/order"}>
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selectDispatchForOrder">Dispatch</label>
                        </div>
                        <select id={"selectDispatchForOrder"} size="1" name="dispatchId" className="custom-select"
                                required>
                            {this.state.dispatches.map(dispatch =>
                                <option
                                    value={dispatch.id}>{dispatch.name} {dispatch.surname} - {dispatch.title}</option>
                            )}
                        </select>
                        <input type="number" name="price" placeholder={"price"} required/>
                        <button className="btn btn-primary" type="submit">Save order</button>
                    </form>

                    {this.state.orders.map(order =>
                        <div>

                            <table className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Stuff</th>
                                    <th>Price (UAH)</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.orders.map(orders =>
                                    <tr className="table-success">
                                        <td>{orders.id}</td>
                                        <td>{orders.name} {orders.surname}</td>
                                        <td>{orders.title}, {orders.weight} kg</td>
                                        <td>
                                            {orders.price}
                                            <form method={"post"} action={"/update-order/" + orders.id}>
                                                <input type="number" name="title" placeholder={"price"}
                                                       required/>
                                                <button className="btn btn-primary" type="submit">Update price</button>
                                            </form>
                                        </td>
                                        <td>
                                            <form method={"post"} action={"/delete-order/" + orders.id}>
                                                <button type="submit">Delete order</button>
                                            </form>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            );
        }
    }
}

export default App;