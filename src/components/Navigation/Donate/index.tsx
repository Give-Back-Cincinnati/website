import { Suspense, useEffect, useTransition } from 'react'
import { Modal } from "@/components/Utils"
import { ErrorBoundary } from '@/components/Utils'

import { Spinner } from '@/components/DataDisplay'

import styles from './index.module.scss'

type Props = {
    isOpen: boolean
    onRequestClose: Function
}

export const DonateModal = ({ isOpen, onRequestClose }: Props) => {
    return <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} paperPadding={0}>
            {/* <Suspense> */}
                <ErrorBoundary>
                    <>
                        <script src="https://secure.givelively.org/widgets/branded_donation/give-back-cincinnati.js" async></script>
                        <div data-widget-src='https://secure.givelively.org/donate/give-back-cincinnati?ref=sd_widget' id="give-lively-widget" className="gl-branded-donation-widget"></div>
                    </>
                </ErrorBoundary>
            {/* </Suspense> */}
        {/* <>
            <script src="https://secure.givelively.org/widgets/branded_donation/give-back-cincinnati.js" async defer></script>
            <div data-widget-src='https://secure.givelively.org/donate/give-back-cincinnati?ref=sd_widget' id="give-lively-widget" className="gl-branded-donation-widget"></div>
        </> */}
    </Modal>
}

export default DonateModal