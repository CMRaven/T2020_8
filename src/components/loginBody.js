import React, { Component } from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardDeck,
    CardGroup,
    CardHeader,
    CardTitle,
    Col,
    ListGroup,
    ListGroupItem,
    Row,
    Container,
    FormGroup,
    FormControl,
} from 'reactstrap';

const axios = require('axios');

const identity = 'T82';
const token = 'e584d8d5-94d7-4443-be64-a99aae980651';
const headers = {
    identity,
    token,
}
const apiBaseURL = 'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/'

class loginBody extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            passWord: '',
            errorMessage: ''
        }
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
    }

    onChangeUserName(event) {
        this.setState({
            userName: event.target.value
        });
    }
    onChangePassword(event) {
        this.setState({
            passWord: event.target.value
        });
    }

    async authenticateUserName(inputUserName) {
        let customerId = null;

        try {
            const response = await axios.get(apiBaseURL + 'customers/' + inputUserName, {
                headers,
            })

            if (response.status === 200) {
                customerId = response.data.customerId;
            } else if (response.status === 400) {
                this.setState({
                    errorMessage: 'Invalid username/password. Please try again.'
                });
            } else {
                this.setState({
                    errorMessage: response.status + ': ' + response.statusText
                });
            }

        } catch (error) {
            console.error(error);

        } finally {
            return customerId;
        }
    }

    async authenticatePassword(inputPassword, customerId) {
        let password = null;
        const returnValue = {
            userID: customerId,
            correct: false
        }
        try {
            const response = await axios.get(apiBaseURL + 'customers/' + customerId + '/details', {
                headers,
            })

            if (response.status === 200) {
                const lastName = response.data.lastName.toLowerCase();
                const dateOfBirth = new Date(response.data.dateOfBirth);

                // reference: https://stackoverflow.com/a/12409344/9171260
                let dd = dateOfBirth.getDate();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                console.log(dateOfBirth.getMonth());
                let mm = dateOfBirth.getMonth() + 1; // January is 0!
                if (mm < 10) {
                    mm = '0' + mm;
                }
                console.log(mm);
                const yyyy = dateOfBirth.getFullYear();

                password = dd + mm + yyyy + lastName;
            } else if (response.status === 400) {
                this.setState({
                    errorMessage: 'Invalid username/password. Please try again.'
                });
            } else {
                console.log(response.status + ': ' + response.statusText);
            }

        } catch (error) {
            console.error(error);

        } finally {
           returnValue.correct = (inputPassword === password) ;
            return returnValue;
        }
    }

    validateForm() {
        return this.userName.length > 0 && this.state.passWord.length > 0;
    }

    login = () => {
        this.authenticateUserName(this.state.userName)
            .then(customerId => 
                this.authenticatePassword(this.state.passWord, customerId))
            .then(returnValue => {
                if (returnValue.correct == true) {
                    localStorage.setItem("userID", returnValue.userID);
                    window.location.href = '/';
                } else {
                    this.setState({
                        errorMessage: 'Invalid username/password. Please try again.'
                    });
                }
            });
    };

    render() {
        // reference: https://serverless-stack.com/chapters/create-a-login-page.html
        return (
            <Container className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                <Card style={{textAlign: "center"}}>
                    <CardHeader>Login</CardHeader>
                    <CardBody>
                    <label>{this.state.errorMessage}</label><br />
                    <label>Username : </label>
                    <input type="text" onChange={this.onChangeUserName.bind(this)}></input><br />
                    <label>Password : </label>
                    <input type="password" onChange={this.onChangePassword.bind(this)}></input><br /><br />
                    <Button onClick={this.login}>Login</Button>
                    </CardBody>
                </Card>
                </div>
            </Container>
        );
    }
}

export default loginBody;
