import { useRef, useEffect } from "react"
import { Modal } from "@/components/Utils"
import { ErrorBoundary } from '@/components/Utils'

import styles from './index.module.scss'

type Props = {
    isOpen: boolean
    onRequestClose: Function
    campaign?: string
}

export const DonateModal = ({ campaign = '', isOpen, onRequestClose }: Props) => {

    return <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} paperPadding={0}>
        <ErrorBoundary>
            <>
                <iframe width='100%' style={{ minHeight: '90vh', border: 'none' }} src="/donation_iframe.html?campaign=fall-feast-2022"></iframe>
                {/* <script
                    src={`https://secure.givelively.org/widgets/branded_donation/give-back-cincinnati${campaign}.js`}
                    async
                ></script>
                <div
                    data-widget-src={`https://secure.givelively.org/donate/give-back-cincinnati${campaign}?ref=sd_widget`}
                    id="give-lively-widget"
                    className="gl-branded-donation-widget"
                ></div> */}
            </>
        </ErrorBoundary>
    </Modal>
}

export default DonateModal