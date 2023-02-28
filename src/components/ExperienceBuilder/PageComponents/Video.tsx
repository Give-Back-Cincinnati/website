import { Typography } from "@mui/material"

import styles from './Video.module.scss'

export type VideoProps = {
  url: string,
  title: string,
  description: string
}

export const Video = ({ title, description, url }: VideoProps) => {
  return <div className={styles.container}>
    <video controls className={styles.video}>
      <source src={url} />
    </video>
    <div className={styles.titleContainer}>
      <Typography variant="h5" color="white" align="center" textTransform='capitalize'>{ title }</Typography>
      <Typography variant="h6" color="white" align="center">{ description }</Typography>
    </div>
  </div>
}

export default Video