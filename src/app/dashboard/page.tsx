'use client'
import React, { useEffect, useState } from 'react'
import { DashboardContainer } from './style'
import moment from 'moment';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

function Dashboard() {
  const router = useRouter();
    const getFormatDateTime = () =>
    moment(new Date()).format('llll');
  const [calendar, setCalendar] = useState(getFormatDateTime());
  useEffect(() => {
    const intervalID = setInterval(() => {
      setCalendar(getFormatDateTime());
    }, 1000);
    return () => clearInterval(intervalID);
  })

  //!Go to noteapp
  const gotoNoteapp = () => {
    router.push('/dashboard/noteapp');
  }

  //!Go to linkcard
  const gotoLinkcard = () => {
    router.push('/dashboard/linkcard');
  }

  //!Go to uranai 
  const gotoUranai = () => {
    router.push('/dashboard/uranai');
  }
  return (
    <DashboardContainer>
      <div className="header">
        <h1 className="title">Welcome, what do you want to do today</h1>
        <p>{calendar}</p>
      </div>
      <div className="navigation">
        <div className="noteApp">
          <Image
            src='/img3.gif'
            alt=""
            width={250}
            height={300}
          ></Image>
          <Button
            className="btn"
            variant="outlined"
            color="secondary"
            onClick={gotoNoteapp}
          >Take a new note</Button>
        </div>
        <div className="linkcard">
          <Image
            src='/img4.gif'
            alt="pic"
            width={250}
            height={300}
          ></Image>
          <Button
            className="btn"
            variant="outlined"
            color="secondary"
            onClick={gotoLinkcard}
          >Take a new linkcard</Button>
        </div>
        <div className="uranai">
          <Image
            src='/img5.gif'
            alt="pic"
            width={250}
            height={300}
          ></Image>
          <Button
            className="btn"
            variant="outlined"
            color="secondary"
            onClick={gotoUranai}
          >占い</Button>
        </div>
      </div>
    </DashboardContainer>
  )
}

export default Dashboard