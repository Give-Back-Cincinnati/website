import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {majorScale, Button, Pane, Text} from 'evergreen-ui'

const highlightTextStyles = {
    color: 'white',
    fontFamily: 'stylized',
    textTransform: 'uppercase',
    fontSize: majorScale(3)
}

const whoWeAreTexts = [
    <React.Fragment key={0}>A <span className='redUnderline'>Diverse</span> group of young professionals</React.Fragment>,
    <React.Fragment key={1}>COMMITTED TO <span className='redUnderline'>GIVING BACK</span> TO OUR COMMUNITY</React.Fragment>,
    <React.Fragment key={2}>CURRENT AND FUTURE <span className='redUnderline'>VISIONARY LEADERS</span></React.Fragment>,
    <React.Fragment key={3}>GLOBAL <span className='redUnderline'>ADVENTURERS</span> HELPING OUT ABROAD</React.Fragment>,
    <React.Fragment key={4}>DEDICATED TO <span className='redUnderline'>LOCAL</span> PHILANTHROPIC INITIATIVES</React.Fragment>,
]

const volunteerOpportunities = [
    { logo: '/logos/civic-engagement.svg', title: 'Civic Engagement', description: 'Sounding off on local issues and taking a closer look at our community' },
    { logo: '/logos/interactive.svg', title: 'Interactive', description: 'Sounding off on local issues and taking a closer look at our community' },
    { logo: '/logos/hands-on.svg', title: 'Hands-On', description: 'Sounding off on local issues and taking a closer look at our community' },
    { logo: '/logos/social.svg', title: 'Social', description: 'Sounding off on local issues and taking a closer look at our community' },
]

const upcomingEvents = [
    {
        date: 'January 1st',
        title: 'First Event',
        description: 'short description about the event... like a single sentence'
    },
    {
        date: 'January 1st',
        title: 'First Event',
        description: 'short description about the event... like a single sentence'
    },
    {
        date: 'January 1st',
        title: 'First Event',
        description: 'short description about the event... like a single sentence'
    },
    {
        date: 'January 1st',
        title: 'First Event',
        description: 'short description about the event... like a single sentence'
    },
    {
        date: 'January 1st',
        title: 'First Event',
        description: 'short description about the event... like a single sentence'
    },
    {
        date: 'January 1st',
        title: 'First Event',
        description: 'short description about the event... like a single sentence'
    },
]

const Home: NextPage = () => {
  return (
    <Pane>
      <Head>
        <meta name="description" content="Generated by create next app" />
      </Head>
        {/*  MISSION  */}
        <Pane
            className='xs'
            background='gbc-red'
            backgroundImage='url(/city-skyline-red.svg), url(/bank-note.svg)'
            backgroundRepeat='no-repeat, repeat'
            backgroundSize='contain, 50px 10px'
            backgroundPosition='bottom'
            minHeight='300px'
            textAlign='center'
            padding={majorScale(3)}
        >
            <Text
                color='white'
                fontSize={majorScale(3)}
                fontFamily='stylized'
            >
                Developing today’s communities and tomorrow’s leaders.
            </Text>
        </Pane>
        <Pane
            className='sm md lg xl xxl'
            background='gbc-red'
            backgroundImage='url(/city-skyline-red.svg), url(/bank-note.svg)'
            backgroundRepeat='no-repeat, repeat'
            backgroundSize='auto 250px, 50px 10px'
            backgroundPosition='bottom'
            minHeight='300px'
            textAlign='center'
            padding={majorScale(3)}
        >
            <Text
                color='white'
                fontSize={majorScale(3)}
                fontFamily='stylized'
            >
                Developing today’s communities and tomorrow’s leaders.
            </Text>
        </Pane>

        {/*  WHAT WE DO  */}
        <Pane
            background='gbc-black'
            paddingX={majorScale(5)}
        >
            <Pane
                borderLeft='1px dashed white'
                paddingTop={majorScale(4)}
            >
                <Pane
                    textAlign={'center'}
                >
                    <Text fontFamily='stylized' fontSize={majorScale(5)} color='white'>
                        WHAT WE DO
                    </Text>
                </Pane>

                <Pane
                    borderRadius='100px'
                    height='35px'
                    width='35px'
                    border='1px solid white'
                    display='inline-block'
                    position='relative'
                    left={-19}
                    top={30}
                    is='span'
                />
                <Pane className='what-we-do' textAlign='left' paddingLeft={majorScale(4)} display='flex' flexFlow='row-wrap' justifyContent='space-between'>
                    <Pane className='xs sm'>
                        <Text
                            color='white'
                            fontFamily='stylized'
                            textTransform='uppercase'
                            fontSize={majorScale(3)}
                            is='div'
                        >
                            WE AIM FOR COMMUNITY SERVICE WITH A SOCIAL
                            <Text
                                fontFamily='stylized'
                                textTransform='uppercase'
                                fontSize={majorScale(3)}
                                color='gbc-red'
                            > TWIST</Text>.
                        </Text>
                        <Pane marginTop={majorScale(2)}>
                            <Text
                                color='gray300'
                            >
                                What does that mean? It means members can participate in as many or as few volunteer opportunities as they’d like, and at the end of the day, they celebrate new friendships. In fact, our turnkey events only require one thing – for members to show up! Here’s a snapshot of Give Back Cincinnati’s impact:
                            </Text>
                        </Pane>
                    </Pane>
                    <Pane className='md lg xl xxl' width='45%' maxWidth={400}>
                        <Text
                            color='white'
                            fontFamily='stylized'
                            textTransform='uppercase'
                            fontSize={majorScale(3)}
                            is='div'
                        >
                            WE AIM FOR COMMUNITY SERVICE WITH A SOCIAL
                            <Text
                                fontFamily='stylized'
                                textTransform='uppercase'
                                fontSize={majorScale(3)}
                                color='gbc-red'
                            > TWIST</Text>.
                        </Text>
                        <Pane marginTop={majorScale(2)}>
                            <Text
                                color='gray300'
                            >
                                What does that mean? It means members can participate in as many or as few volunteer opportunities as they’d like, and at the end of the day, they celebrate new friendships. In fact, our turnkey events only require one thing – for members to show up! Here’s a snapshot of Give Back Cincinnati’s impact:
                            </Text>
                        </Pane>
                    </Pane>
                    <Pane marginTop={majorScale(3)} className='xs sm'>
                        {
                            [
                                'More than 15,000 hours of service donated to-date',
                                '500+ houses painted throughout the region',
                                'The region\'s largest Thanksgiving meal',
                                'International service in Ghana, Romania, Peru, and beyond'
                            ].map(bulletPoint => <Text key={bulletPoint} className='bulletPoint' color='white'>{bulletPoint}</Text>)
                        }
                    </Pane>
                    <Pane width='45%' maxWidth={400} height='300px' className='md lg xl xxl' borderLeft='1px dashed white'>
                        {
                            [
                                'More than 15,000 hours of service donated to-date',
                                '500+ houses painted throughout the region',
                                'The region\'s largest Thanksgiving meal',
                                'International service in Ghana, Romania, Peru, and beyond'
                            ].map(bulletPoint => <Pane key={bulletPoint} className='bulletPoint bulletPoint-left-minimal' paddingLeft={10}>
                                <Text color='white'>{bulletPoint}</Text>
                            </Pane>)
                        }
                    </Pane>
                </Pane>
            </Pane>
        </Pane>

        {/*  WHO WE ARE  */}
        <Pane
            minHeight='300px'
            display='flex'
            flexFlow='row wrap'
            justifyContent='space-around'
        >
            {
                whoWeAreTexts.map((text, i) => (
                    <React.Fragment key={i}>
                        {
                            i === 3
                                ? <Pane width='100%' textAlign='center' marginY={majorScale(5)}>
                                    <Text
                                        color='gbc-red'
                                        fontSize={majorScale(9)}
                                        fontFamily='stylized'
                                    >
                                        WHO WE ARE
                                    </Text>
                                </Pane>
                                : ''
                        }
                        <Pane width='100%' margin={majorScale(2)} lineHeight={2} className='xs sm' textAlign='center'>
                            <Text
                                textTransform='uppercase'
                                color='gbc-black'
                                fontFamily='stylized'
                                fontSize={majorScale(3)}
                            >
                                {text}
                            </Text>
                        </Pane>
                        <Pane width='33%' maxWidth={250} padding={majorScale(2)} lineHeight={2} className='md lg xl xxl'>
                            <Text
                                textTransform='uppercase'
                                color='gbc-black'
                                fontFamily='stylized'
                                fontSize={majorScale(3)}
                            >
                                {text}
                            </Text>
                        </Pane>
                    </React.Fragment>
                ))
            }
        </Pane>


    {/*    Upcoming Events   */}
        <Pane
            background={'gray300'}
            display='flex'
            flexFlow='row wrap'
            justifyContent='space-around'
            padding={majorScale(5)}
        >
            <Pane width='100%' textAlign='center' paddingBottom={majorScale(3)}>
                <Text fontFamily='stylized' fontSize={majorScale(5)} color='gbc-black'>
                    Upcoming Events
                </Text>
            </Pane>

            {
                upcomingEvents.map(({ date, title, description}, i) => (
                    <React.Fragment key={title + i.toString()}>
                        <Pane
                            width='33%'
                            padding={majorScale(2)}
                            className='md lg xl xxl'
                        >
                            <Text
                                is={'div'}
                                color='gbc-red'
                            >
                                {date}
                            </Text>
                            <Pane marginY={majorScale(1)}>
                                <Text
                                    textTransform='uppercase'
                                    color='gbc-black'
                                    fontFamily='stylized'
                                    fontSize={majorScale(3)}
                                    is='div'
                                >
                                    {title}
                                </Text>
                            </Pane>
                            <Text>
                                {description}
                            </Text>
                        </Pane>
                        <Pane
                            width='50%'
                            padding={majorScale(2)}
                            className='sm'
                        >
                            <Text
                                is={'div'}
                                color='gbc-red'
                            >
                                {date}
                            </Text>
                            <Pane marginY={majorScale(1)}>
                                <Text
                                    textTransform='uppercase'
                                    color='gbc-black'
                                    fontFamily='stylized'
                                    fontSize={majorScale(3)}
                                    is='div'
                                >
                                    {title}
                                </Text>
                            </Pane>
                            <Text>
                                {description}
                            </Text>
                        </Pane>
                        <Pane
                            key={i}
                            width='100%'
                            padding={majorScale(2)}
                            className='xs'
                        >
                            <Text
                                is={'div'}
                                color='gbc-red'
                            >
                                {date}
                            </Text>
                            <Pane marginY={majorScale(1)}>
                                <Text
                                    textTransform='uppercase'
                                    color='gbc-black'
                                    fontFamily='stylized'
                                    fontSize={majorScale(3)}
                                    is='div'
                                >
                                    {title}
                                </Text>
                            </Pane>
                            <Text>
                                {description}
                            </Text>
                        </Pane>
                    </React.Fragment>
                ))
            }

            <Pane width='100%' margin='auto' textAlign='center' paddingTop={majorScale(2)}>
                <Button appearance='gbc-red'>
                    See all Upcoming Events
                </Button>
            </Pane>
        </Pane>

    {/*    VOLUNTEER OPPORTUNITIES */}
        <Pane
            minHeight='300px'
            backgroundColor='white'
        >
            <Pane
                textAlign={'center'}
                paddingTop={majorScale(4)}
            >
                <Text fontFamily='stylized' fontSize={majorScale(4)} color='gbc-black'>
                    Volunteer Opportunities
                </Text>
            </Pane>
            <Pane display='flex' flexFlow='row wrap' justifyContent='space-around'>
                {
                    volunteerOpportunities.map(({ logo, title, description }) => (
                        <Pane key={title} textAlign='center' paddingBottom={majorScale(5)} maxWidth={250}>
                            <Pane
                                display='block'
                                minHeight={180}
                                maxWidth={120}
                                marginTop={majorScale(4)}
                                marginX='auto'
                                backgroundImage={`url(${logo})`}
                                backgroundRepeat='no-repeat'
                                backgroundSize='contain'
                                backgroundPosition='bottom'
                            />
                            <Text
                                color='gbc-red'
                                fontFamily='stylized'
                                fontSize={majorScale(3)}
                                display='block'
                            >{title}</Text>
                            <Pane paddingTop={majorScale(3)}>
                                <Text display='block'>
                                    {description}
                                </Text>
                            </Pane>
                        </Pane>
                    ))
                }
            </Pane>
        </Pane>

    </Pane>
  )
}

export default Home