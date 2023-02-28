import { Box, Typography } from "@mui/material"

import styles from './Descriptors.module.scss'

export type DescriptorsProps = {
  title: string,
  description?: string,
  highlights: { title: string, description: string }[]
}

export const Descriptors = ({ title, description, highlights }: DescriptorsProps) => {
  return <Box sx={{
      backgroundColor: 'secondary.main'
    }}
  >
    <Typography padding='1.5rem 0 0 0' color='white' align='center' variant="h4" textTransform='capitalize'>
      { title }
    </Typography>
    {
      description && <Typography color='white' align="center" variant="body1" margin='2rem'>
        { description }
      </Typography>
    }

    <div className={styles.descriptorsContainer}>
      {
        highlights.map(({ title, description}) => (
          <Box key={title} maxWidth={375}>
            <Typography color="primary" variant="h5" align="center"> { title }</Typography>
            
            <Typography color="white" variant="body1" align="center">{ description }</Typography>
          </Box>
        ))
      }
    </div>

  </Box>
}

export default Descriptors
