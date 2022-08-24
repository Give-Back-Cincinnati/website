import { useState } from "react"
import { Modal, Button } from "@/components/Utils"

import styles from './index.module.scss'

export type ConfirmProps = {
    action: string
    entityName: string
    onConfirm: Function
}

export const Confirm = ({ action, entityName, onConfirm }: ConfirmProps) => {
    const [isOpen, setOpen] = useState(false)

    function close () { setOpen(false) }
    function open () { setOpen(true) }

    function handleConfirm () {
        onConfirm()
        close()
    }

    return <>
        <Button onClick={open}>
            { action }
        </Button>
        <Modal isOpen={isOpen} onRequestClose={close}>
            <div>
                <h2>{action}: {entityName}</h2>
                <div className={styles.actionsContainer}>
                    <Button variant="outlined" onClick={close}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>
                        Confirm
                    </Button>
                </div>
            </div>
        </Modal>
    </>
}