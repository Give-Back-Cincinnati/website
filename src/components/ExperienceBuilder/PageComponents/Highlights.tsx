import { Box, Typography } from '@mui/material'

import styles from './Descriptors.module.scss'

export type HighlightProps = {
  title: string,
  description?: string,
  highlights: { title: string, tag: string, description: string }[]
}

export const Highlights = ({ title, description, highlights }: HighlightProps) => {
  return <Box>
    <Typography padding='1.5rem 0 0 0' align='center' variant="h4" textTransform='capitalize'>
      { title }
    </Typography>
    {
      description && <Typography align="center" variant="body1" margin='2rem'>
        { description }
      </Typography>
    }

    <div className={styles.descriptorsContainer}>
      {
        highlights.map(({ title, tag, description }) => (
          <Box
            key={title}
            maxWidth={375}
          >
            <Typography variant='h3' textAlign='center'>{ title }</Typography>
            <Typography variant='h5' color="secondary.main" textTransform='capitalize' textAlign='center'>{ tag }</Typography>
            <Typography variant='body1' textAlign='center'>{ description }</Typography>
          </Box>
        ))
      }
    </div>
  </Box>
}

export default Highlights