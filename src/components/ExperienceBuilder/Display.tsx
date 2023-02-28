import { HorizontalBreak, BulletList, LeftDashedBorder } from "../Backgrounds"
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EventHeader } from "../Events"
import { Descriptors, Highlights } from './PageComponents'

type ComponentProps<T> = T

export type ExperienceDisplayProps = {
  experience: { component: string, props: ComponentProps<any> }[]
}

export const ComponentMap: Record<string, {
  component: (props: ComponentProps<any> ) => JSX.Element,
  availableFields: Record<string, any>
}> = {
  BulletList: {
    component: (props) => <Box sx={{backgroundColor: 'secondary.main', paddingLeft: '32px' }}><BulletList {...props} style={{ paddingBottom: '40px'}} /></Box>,
    availableFields: {}
  },
  FAQ: {
    component: (props) => <>
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
    </>,
    availableFields: {}
  },
  Header: {
    component: (props) => <EventHeader {...props} />,
    availableFields: {}
  },
  HorizontalBreak: {
    component: (props) => <HorizontalBreak {...props} />,
    availableFields: {}
  },
  Highlights: {
    component: (props) => <Highlights {...props} />,
    availableFields: {}
  },
  Descriptors: {
    component: (props) => <Descriptors {...props} />,
    availableFields: {}
  }
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