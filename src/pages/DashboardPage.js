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
              title="Total Profit"
              subtitle="This month"
              number="9.8k"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Visitors"
              subtitle="This month"
              number="5,400"
              color="secondary"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="New Users"
              subtitle="This month"
              number="3,400"
              color="secondary"
              progress={{
                value: 90,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Bounce Rate"
              subtitle="This month"
              number="38%"
              color="secondary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
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

          <Col lg="4" md="12" sm="12" xs="12">
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
