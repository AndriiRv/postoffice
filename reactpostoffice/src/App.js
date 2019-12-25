import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import {Navbar, NavItem, Row, Nav, Grid, Col} from "react-bootstrap";

const MENU_ITEMS = [
    {nameItem: "User", index: 1},
    {nameItem: "City", index: 2},
    {nameItem: "Stuff", index: 3},
    {nameItem: "Dispatch", index: 4},
    {nameItem: "Order", index: 5}
];

class App extends Component {

    constructor() {
        super();
        this.state = {
            activeItem: 0,
        };
    }

    render() {

        let borderInNavbar = {
            "background-color": "gray",
            "color": "white"
        };

        const activeItem = this.state.activeItem;
        return (
            <div>
                <Navbar style={borderInNavbar}>
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

    constructor() {
        super();
        this.state = {

            cities: [],
            users: [],
            stuffs: [],
            dispatches: [],
            orders: []
        };
    }

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

                    {this.state.users.map(user =>
                        <div>
                            {user.name} {user.surname}
                        </div>
                    )}
                </div>
            );
        }
        if (this.props.index === 2) {
            return (
                <div className="City">
                    <h1>Cities</h1>

                    <form method={"post"} action={"/city"}>
                        Input new city:
                        <input type="text" name="title" required/>
                        <button type="submit">Save city</button>
                    </form>

                    {this.state.cities.map(city =>
                        <div>{city.title}</div>
                    )}
                </div>
            );
        } else if (this.props.index === 3) {
            return (
                <div className="Stuff">
                    <h1>Stuffs</h1>

                    <form method={"post"} action={"/stuff"}>
                        <label for="stuffTitle">Title:</label>
                        <input id="stuffTitle" type="text" name="title" required/>
                        <br/>
                        <label for="stuffWeight">Weight:</label>
                        <input id="stuffWeight" type="text" name="weight" required/>
                        <br/>
                        <button type="submit">Save stuff</button>
                    </form>

                    {this.state.stuffs.map(stuff =>
                        <div>Title: {stuff.title}, weight (kg): {stuff.weight}</div>
                    )}
                </div>
            );
        } else if (this.props.index === 4) {
            return (
                <div className="Dispatch">
                    <h1>Dispatches</h1>

                    {this.state.dispatches.map(dispatch =>
                        <div>
                            Customer: {dispatch.name} {dispatch.surname}
                            <br/>
                            Title of stuff: {dispatch.title}, weight (kg): {dispatch.weight}
                            <br/>
                            From: {dispatch.from_city}, To: {dispatch.to_city}
                            <br/>
                            Date: {dispatch.date}, Time: {dispatch.time}
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div className="Order">
                    <h1>Order</h1>
                    {this.state.orders.map(order =>
                        <div>
                            Customer: {order.name} {order.surname}
                            <br/>
                            Title of stuff: {order.title}
                            <br/>
                            Price (UAH): {order.price}
                        </div>
                    )}
                </div>
            );
        }
    }
}

export default App;