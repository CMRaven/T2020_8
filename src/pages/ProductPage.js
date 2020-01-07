import axios from 'axios';
import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
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
} from 'reactstrap';
import { getColor } from 'utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referenceNumber: '',
      currentSaving: '0',
      riskLevel: 'None',
      productText: '',
      productLink: '',
      productImg: ''
    }
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);

    var customerId = 1
    var accountId = 10

    switch(customerId) {
      case 1:
        this.setState({productText: "All DBS PayLah! users, including non-DBS/POSB customers, can now pay using QR code. In another industry first, DBS PayLah! users will also be able to make QR code payments on 10,000 NETS terminals by year end. Singapore, 13 Apr 2017 - DBS today announced another ground-breaking mobile payment solution in support of Singapore’s Smart Nation drive to adopt cashless payments. In a Singapore first, all DBS PayLah! users – including non-DBS/POSB customers – can pay using QR codes and also receive funds by generating their own QR code. DBS PayLah! is Singapore’s top mobile wallet with some 500,000 users and counting."});
        this.setState({productLink: "https://www.dbs.com/newsroom/Pay_using_QR_code_from_your_DBS_PayLah_mobile_app"});
        this.setState({productImg: "dbspaylah.png"});
        break;
      case 2: // mary tan
        this.setState({productText: "We all know that we need to have a financial plan. In fact, research shows that 60% of young adults want to manage their money better to help them achieve their future goals but may not know how to go about it. That’s where NAV comes in. NAV provides you with a holistic financial tool (Financial GPS), a helpful team to answer your money-related questions, a community of like-minded individuals (NAV community), and a whole lot of articles, videos, podcasts to guide our decision making and get us to where we’re headed in life, our way. Powered by DBS & POSB, NAV is your financial navigator. A tool, a guide, a self-help aggregator. Your Financial GPS."});
        this.setState({productLink: "https://www.dbs.com.sg/personal/nav/about-nav.page?pid=sg-dbs-pweb-home-heroblock-nav-whats-nav-btnlearnmore"});
        this.setState({productImg: "nav.png"});
        break;
      case 3: 
        this.setState({productText: "The DBS Singapore Dollar (S$) Fixed Deposit Account gives you the opportunity to maximise your savings with attractive interest, while keeping your funds secure."});
        this.setState({productLink: "https://www.dbs.com.sg/personal/deposits/fixed-deposits/s-dollar-fixed-deposit"});
        this.setState({productImg: "fd.jpg"});
        break;
      default:
        // code block
    }

    var client_transaction_url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/transactions/"+ accountId +"?from=01-01-2020&to=01-7-2020"
    axios({
      url: client_transaction_url,
      method: 'GET',
      headers: {
        "identity": "T82",
        "token": "e584d8d5-94d7-4443-be64-a99aae980651",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
        console.log(response)
        response.forEach((item) => {
          console.log('ID: ' + item.referenceNumber);
        });
        
        // NEED TO COMPUTE THE SPENDING, INCOME AND MAYBE TAG

        this.setState({referenceNumber: "1000"});
        // this.setState({referenceNumber: ""response.data.accountId""});
    }) 
    .catch(err => {
        console.log(err);
    });

    // Get Balance NOTE: Need to get accountId
    var client_balance_url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/"+ accountId +"/balance?month=0&year=2020"
    axios({
      url: client_balance_url,
      method: 'GET',
      headers: {
        "identity": "T82",
        "token": "e584d8d5-94d7-4443-be64-a99aae980651",
      }
    })
    .then(response => {
        console.log("Saving: " + response.data.availableBalance)

        this.setState({currentSaving: response.data.availableBalance});
        // this.setState({referenceNumber: ""response.data.accountId""});
    }) 
    .catch(err => {
        console.log(err);
    });

    // Get Risk Level NOTE: Remember to get accountId
    var client_risk_url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/"+ customerId +"/details"
    axios({
      url: client_risk_url,
      method: 'GET',
      headers: {
        "identity": "T82",
        "token": "e584d8d5-94d7-4443-be64-a99aae980651",
      }
    })
    .then(response => {
        console.log("Risk Level: " + response.data.riskLevel)

        this.setState({riskLevel: response.data.riskLevel});
        // this.setState({referenceNumber: ""response.data.accountId""});
    }) 
    .catch(err => {
        console.log(err);
    });
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="ProductPage"
        title="Product"
        breadcrumbs={[{ name: 'Product', active: true }]}
      >
        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Product that we recommend you to give it a try!{' '}
              </CardHeader>
                <CardBody>
                <div class="row">
                  <img src={this.state.productImg} alt="productimage"></img>
                </div>
                <p>{this.state.productText}</p>
                <a href={this.state.productLink}>Read more</a>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Your statistics{' '}
                <small className="text-muted text-capitalize">Criteria that helps us suggest the best product for you</small>
              </CardHeader>
              <CardBody>
                <div class="row">
                  <div class="form-group col-md-6">
                    <p>Total Spending: </p>
                  </div>
                  <div class="form-group col-md-6">
                    <p>$1800.2 </p>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <p>Total Amount Credited to account: </p>
                  </div>
                  <div class="form-group col-md-6">
                    <p>$2000.3</p>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <p>Current Saving: </p>
                  </div>
                  <div class="form-group col-md-6">
                    <p>${this.state.currentSaving}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <p>Risk Assessment</p>
                  </div>
                  <div class="form-group col-md-6">
                    <p>{this.state.riskLevel}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
      );
  }
}
export default ProductPage;
