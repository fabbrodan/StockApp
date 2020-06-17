import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Toast, Button} from 'react-bootstrap';
import '../Styles/HomePage.css';
import  { Pie, Cell, PieChart, Label, ResponsiveContainer } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import defaultProfile from '../Images/profileDefault.png'

let HomePage = (props) => {

    const colors = scaleOrdinal(schemeCategory10).range();
    const user = JSON.parse(localStorage.getItem('current_user'));
    const [showToast, setShowToast] = useState(true);
    const toggleToast = () => setShowToast(!showToast);
    const [data, setData] = useState(null);

    useEffect(() => {
        GetUserShareData(user.userId);
    }, [])

    const GetUserShareData = (userId) => {
        fetch("https://localhost:5001/Data/User/"+userId)
        .then(response => response.json())
        .then(data => {
            var pieData = data.map(e => ({ name: e.companyName, value: e.shareCount}));
            setData(pieData);
        });
    }

    const loadSettings = () => {
        window.location = "/settings";
    }

    const renderLabelContent = (props) => {
        const { value, name, x, y, midAngle } = props;
      
        return (
          
          <g transform={`translate(${x}, ${y})`} textAnchor={ (midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
            <text fill="#ffebcd" x={0} y={0}>{`${name}: ${value}`}</text> 
          </g>
        );
    }

    return (
        <Container fluid className="allPageContent">
        <Row id="MainRow">
            <Col id="mainContentColumn">
                    <Row>
                        <Col lg={3} md={5} sm={12}>
                            <Toast show={showToast} onClose={toggleToast} delay={3000} autohide>
                                <Toast.Header>
                                    <h5>Hello {user.fullName}</h5>
                                </Toast.Header>
                            </Toast>
                        </Col>
                    </Row>
                <Row id="mainContentRow">
                    <Col lg={6} md={8}>
                        <Container id="MyInfoContainer">
                            <Row id="headerRow">
                                <Col lg={4}>
                                    <h4>My Profile</h4>
                                </Col>
                                <Col lg={{offset: 4, span: 4}}>
                                    <Button variant="secondary" onClick={loadSettings}>Edit</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <img src={user.imgUrl == null ? defaultProfile : user.imgUrl} id="profileImg" alt=""></img>
                                </Col>
                                <Col lg={8}>
                                    <Row>
                                        <Col>
                                            <h3>{user.fullName}</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Person Nr/Organisationas Nr:</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>{user.personNr}/{user.orgNr}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col lg={6} md={8}>
                            <Container id="portfolioOverviewSection">
                                <Row>
                                    <Col lg={5}>
                                        <h4>My Portfolio</h4>
                                    </Col>
                                    <Col lg={{offset: 3, span: 4}}>
                                        <Button variant="secondary">Details</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} className="pieChart">
                                    <ResponsiveContainer>
                                    <PieChart width={600} height={400}>
                                        <Pie
                                        data={data}
                                        dataKey="value"
                                        cx={200}
                                        cy={150}
                                        startAngle={180}
                                        endAngle={-180}
                                        innerRadius={60}
                                        outerRadius={80}
                                        label={renderLabelContent}
                                        isAnimationActive={true}
                                        >
                                        {
                                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((entry, index) => (
                                            <Cell key={index} fill={colors[index % 10]}/>
                                            ))
                                        }
                                        </Pie>
                                        <Label width={50} position="center">
                                            PieChart!
                                        </Label>
                                    </PieChart>
                                    </ResponsiveContainer>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                </Row>
            </Col>
        </Row>
        </Container>
    )
};

export default HomePage;