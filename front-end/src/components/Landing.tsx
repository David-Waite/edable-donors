import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'

import '../styling/Landing.css'

function Landing() {
  const [orgList, setOrgList] = useState<any>([])

  // gets all the orgs from dbs
  useEffect(() => {
    const q = query(collection(db, 'Organisations'))
    onSnapshot(q, (querySnapshot) => {
      // setOrgList dumps all the orgs in orgList
      setOrgList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      )
    })
  }, [])

  return (
    //   these lines set up the format of the page
    <>
      <div id="header">
        <div id="headingText">
          <h1>EdAble</h1>

          <h3>
            <i>Supporting the growth of social-enterprises</i>
          </h3>
          <br />
          <h4>
            By making a tax deductable doantion to EdAble, you will contribute
            to...
          </h4>

          <div id="carousel">
            <Carousel touch={true} interval={null} indicators={false} variant="dark">
              {orgList.map((org: any) => (
                <Carousel.Item
                  key={org.id.toString()}
                  style={{ textAlign: 'center' }}
                >
                  <img
                    style={{ height: '550px', width: '700px' }}
                    src={org.data.img}
                    alt="Org logo"
                  />

                  <h3>{org.data.description}</h3>
                  <Button variant="warning">
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={`organisation/${org.id}`}
                    >
                      <i>I WANT TO MAKE A CONTRIBUTION</i>
                    </Link>
                  </Button>

                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      {/* items */}
      <h5>item cards here</h5>
    </>
  )
}

export default Landing
