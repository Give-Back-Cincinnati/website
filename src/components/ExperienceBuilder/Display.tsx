import React from 'react'
import { HorizontalBreak, BulletList, BulletListFields, HorizontalBreakFields } from "../Backgrounds"
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EventHeader, EventHeaderFields } from "../Events"
import { Descriptors, Highlights, HighlightFields, DescriptorsFields } from './PageComponents'

type ComponentProps<T> = T

export type AvailableFields<T> = {
  [K in keyof T]: {
    type: 'string' | 'number' | 'boolean' | 'array',
    required?: boolean,
    shape?: T[K]
  }
}

export const ComponentMap: Record<string, {
  component: (props: ComponentProps<any> ) => JSX.Element,
  availableFields: AvailableFields<any>
}> = {
  BulletList: {
    component: (props) => {
      return <Box sx={{backgroundColor: 'secondary.main', paddingLeft: '32px' }} key={props.key}>
        <BulletList bullets={props.bullets.map(({ bullets }: { bullets: string}) => bullets)} style={{ paddingBottom: '40px'}} />
      </Box>
    },
    availableFields: BulletListFields
  },
  FAQ: {
    component: (props) => <React.Fragment key={props.key}>
      {
        props.items.map(({ question, answer }: { question: string, answer: string}) => (
          <Accordion
            key={question}
          >
            <AccordionSummary aria-controls={question + ' content'} expandIcon={<ExpandMoreIcon />}><Typography>{ question }</Typography></AccordionSummary>
            <AccordionDetails><Typography>{ answer }</Typography></AccordionDetails>
          </Accordion>
        ))
      }
    </React.Fragment>,
    availableFields: { items: { type: 'array', shape: { question: { type: 'string' }, answer: { type: 'string' } } } }
  },
  Header: {
    component: (props) => <EventHeader {...props} />,
    availableFields: EventHeaderFields
  },
  HorizontalBreak: {
    component: (props) => <Box sx={{ paddingTop: '.5rem', paddingBottom: '.5rem' }} key={props.key}>
      <HorizontalBreak {...props} />
    </Box>,
    availableFields: HorizontalBreakFields
  },
  Highlights: {
    component: (props) => <Highlights {...props} />,
    availableFields: HighlightFields
  },
  Descriptors: {
    component: (props) => <Descriptors {...props} />,
    availableFields: DescriptorsFields
  }
}

export type Experience = {
  component: 'BulletList' | 'FAQ' | 'Header' | 'HorizontalBreak' | 'Highlights' | 'Descriptors',
  props: ComponentProps<any>
}

export type ExperienceDisplayProps = {
  experience: Experience[]
}

export const ExperienceDisplay = ({ experience }: ExperienceDisplayProps) => {
  return <>
    {
      experience.map(({ component, props }, idx) => (
        ComponentMap[component].component({...props, key: idx})
      ))
    }
  </>
}

export default ExperienceDisplay