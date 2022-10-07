import { ComponentPropsWithoutRef, ReactElement } from "react"
import { Paper, Overlay } from "@/components/Utils"
import styles from './index.module.scss'

export interface ModalProps extends ComponentPropsWithoutRef<'div'> {
    isOpen: boolean
    onRequestClose: Function
    children: ReactElement
    paperPadding?: string | number
}

export const Modal = ({ children, className, paperPadding, ...props }: ModalProps) => {

    return <Overlay {...props}>
        <div className={styles.modalContainer}>
            <Paper className={className} padding={paperPadding}>
                { children }
            </Paper>
        </div>
    </Overlay>
}