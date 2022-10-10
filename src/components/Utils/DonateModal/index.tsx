import { Modal } from "@/components/Utils"
import { ErrorBoundary } from '@/components/Utils'

import styles from './index.module.scss'

type Props = {
    isOpen: boolean
    onRequestClose: Function
}

export const DonateModal = ({isOpen, onRequestClose }: Props) => {
    const campaign = '' // campaign is NOT actively supported, do NOT use it.
    // if you want to send a user to a campaign-focused donate button, send them to the campaign page on give lively
    return <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} paperPadding={0}>
        <ErrorBoundary>
            <>
                <script
                    src={`https://secure.givelively.org/widgets/branded_donation/give-back-cincinnati${campaign}.js`}
                    async
                ></script>
                <div
                    data-widget-src={`https://secure.givelively.org/donate/give-back-cincinnati${campaign}?ref=sd_widget`}
                    id="give-lively-widget"
                    className="gl-branded-donation-widget"
                ></div>
            </>
        </ErrorBoundary>
    </Modal>
}

export default DonateModal