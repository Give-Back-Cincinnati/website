import { useRef, useEffect } from "react"
import { Modal } from "@/components/Utils"
import { ErrorBoundary } from '@/components/Utils'

import styles from './index.module.scss'

type Props = {
    isOpen: boolean
    onRequestClose: Function
    campaign?: string
}

let x = true

export const DonateModal = ({ campaign = '', isOpen, onRequestClose }: Props) => {
    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    useEffect(() => {
        if(x && iframeRef !== null && iframeRef.current && iframeRef.current.contentDocument) {
            const el = document.createElement('div')
            el.innerHTML = `<!-- Begin Give Lively Fundraising Widget -->
            <script>gl=document.createElement('script');gl.src='https://secure.givelively.org/widgets/branded_donation/give-back-cincinnati.js';document.getElementsByTagName('head')[0].appendChild(gl);</script><div data-widget-src='https://secure.givelively.org/donate/give-back-cincinnati?ref=sd_widget' id="give-lively-widget" class="gl-branded-donation-widget"></div>
            <!-- End Give Lively Fundraising Widget -->`
            iframeRef.current.contentDocument.body.appendChild(el)
            x = false
        }
    }, [ campaign ])

    return <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} paperPadding={0}>
        <ErrorBoundary>
            <>
            <iframe src="about:blank" width="100%" style={{ minHeight: "90vh", border: 'none' }} ref={iframeRef}></iframe>
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