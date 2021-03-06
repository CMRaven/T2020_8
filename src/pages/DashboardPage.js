import Page from 'components/Page';
import { NumberWidget } from 'components/Widget';
import axios from 'axios';
import React from 'react';
import Bar from 'components/Bar'
import Pie from 'components/Pie'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);


class DashboardPage extends React.Component {
  state = {
     transactions: []
  };
  
  checkLogin() {
    var storage = localStorage.getItem("userID");
    if(storage == null) {
      window.location.href = '/login';
    }
  }

  componentDidMount() {
    this.checkLogin();
    let axiosConfig = {
      headers: {
        'Content-Type' : 'application/json',
        'token': 'e584d8d5-94d7-4443-be64-a99aae980651',
        'identity': 'T82' 
      }
    }

    axios.get('http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/transactions/10?from=01-30-2019&to=01-30-2020', axiosConfig)
    .then(res => {
        //res.forEach()
        this.setState({ transactions : res.data });
    })
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      > {/*<label>{this.state.transactions}</label>*/}
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Spending limit"
              subtitle="This month"
              number="$9,800"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Debit"
              subtitle="This month"
              number="$1,800.2"
              color="secondary"
              progress={{
                value: 90,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Credit"
              subtitle="This month"
              number="$2,000.3"
              color="secondary"
              progress={{
                value: 100,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Balance"
              subtitle="This month"
              number="$10,000"
              color="secondary"
              progress={{
                value: 20,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="6" md="8" sm="8" xs="8">
            <Card>
              <CardHeader>
                Spending History{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
              <Col>
                <Col> Past Year Expenditure</Col>
                <Bar /> 
              </Col>
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="8" sm="8" xs="8">
            <Card>
              <CardHeader>Expense Ranking</CardHeader>
              <CardBody>
              <Col>
                <Col> Month's Expenditure Breakdown</Col>
                <Pie />
              </Col>
              </CardBody>
             
            </Card>
          </Col>
        </Row>

      </Page>
    );
  }
}
export default DashboardPage;
