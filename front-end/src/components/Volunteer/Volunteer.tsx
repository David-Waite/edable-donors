import { useEffect, useState } from "react";
import "../Landing/Landing.css";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { Button, Container, Carousel, Row, Col } from "react-bootstrap";
import { ReactComponent as InclusionHero } from "../Landing/InclusionHero.svg";
import Sidebar from "../Landing/Sidebar";

function Volunteer() {
  const [orgList, setOrgList] = useState<any>([]);

  // gets all the orgs from dbs
  useEffect(() => {
    const q = query(
      collection(db, "Organisations"),
      where("activeStatus", "==", true)
    );
    onSnapshot(q, (querySnapshot) => {
      // setOrgList dumps all the orgs in orgList
      setOrgList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    //   these lines set up the format of the page
    <>
      <div className="landing">
        {/* Burger menu */}
        <div className="navBarContainer">
          <Sidebar orgList={orgList} />
        </div>

        <div className="header">
          <Container fluid>
            <Row>
              <Col>
              </Col>
              <Col xs={0} md="auto">
                <InclusionHero className="star" />
              </Col>
            </Row>
          </Container>
          <br />
          <p style={{ color: "orange", paddingBottom:"10px" }}>Volunteer now.</p>
          </div>
          <div className="App" id="outer-container">
            {/* Carousel */}
            <Container>
              <Row>
                <Col>
                  <div className="carouselContainer"
                          style={{
                            paddingBottom: "20px",
                          }}>
                    <Carousel
                      touch={true}
                      interval={3000}
                      indicators={true}
                      variant="light"
                    >
                      {orgList.map((org: any) => (
                        <Carousel.Item
                          key={org.id.toString()}
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <Link
                            to={`/volunteer/organisation/${org.id}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            {/* this div contains the carousel item's contents and makes the whole carousel item a link (based on link tag above) */}
                            <div className="carousel-contents">
                              <h2 style={{ textAlign: "center" }}>
                                {org.data.name}
                              </h2>
                              <img
                                className="imgCarousel"
                                src={org.data.img}
                                alt={`${org.data.name}` + "'s logo"}
                              />
                              <p className="orgSummary">{org.data.summary}</p>
                              <Button
                                className="btnContribute"
                                variant="warning"
                              >
                                <i className="btnText">
                                I want to contribute to <br></br>
                                <b>{org.data.name}!</b>
                                </i>
                              </Button>
                            </div>
                          </Link>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

      </div>
    </>
  );
}

export default Volunteer;
