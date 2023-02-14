import React, { useState } from 'react'
import styles from './index.module.scss'

import { Modal, Button } from '@/components/Utils'
import { TermsOfUse } from '../../../pages/terms-of-use'
import { PrivacyPolicy } from '../../../pages/privacy-policy'

type ContentEnum = 'waiver' | 'terms' | 'privacy'

export const Waiver = () => {
    const [isOpen, setOpen] = useState<ContentEnum | undefined>(undefined)

    function close () {
        setOpen(undefined)
    }

    function open (content: ContentEnum) {
        setOpen(content)
    }

    const content: Record<ContentEnum, JSX.Element> = {
        waiver: <div className={styles.waiver}>
                    <h2>
                        RELEASE AND WAIVER OF LIABILITY PLEASE READ CAREFULLY! THIS IS A LEGAL DOCUMENT THAT AFFECTS YOUR LEGAL RIGHTS!
                    </h2>
                    <p>
                        I, being at least 18 years of age today, hereby execute this Release and Waiver of Liability (this “Release”) in favor of Give Back Cincinnati, an Ohio nonprofit corporation, and its directors, officers, employees, and agents (collectively “GIVE BACK”). I desire to work as a volunteer for GIVE BACK and engage in the activities related to being a volunteer. I understand that the activities may include rehabilitating and improving residential or commercial buildings internally or externally as so designated by GIVE BACK. I understand that these activities may include the use of equipment and place me in situations that may pose a risk of harm to me. I acknowledge I have the right and responsibility to cease participating in these activities or tasks, at any time, based on my personal comfort level.
                    </p>
                    
                    <p>
                        I hereby freely, voluntarily, and without duress execute this Release under the following terms:
                    </p>
                    
                    <ol>
                        <li>
                            <h4>
                                Waiver and Release.
                            </h4>
                            <p>
                                I hereby release and forever discharge and hold harmless GIVE BACK and its successors and assigns from any and all liability, claims and demands of whatever kind or nature, either in law or in equity, which arise or may hereafter arise from acts of volunteerism for GIVE BACK. I understand and acknowledge that this Release discharges GIVE BACK from any liability or claim that I may have against GIVE BACK with respect to any bodily injury, personal injury, illness, death, or property damage that may result from my work for, or involvement with, GIVE BACK whether caused by the negligence of GIVE BACK or its officers, directors, employees, or agents or otherwise. I also understand that GIVE BACK does not assume any responsibility for or obligation to provide financial assistance or other assistance, including but not limited to medical, health, or disability insurance, in the event of injury or illness.
                            </p>
                        </li>
                        <li>
                            <h4>
                                Medical Treatment.
                            </h4>
                            <p>
                                I hereby release and forever discharge GIVE BACK from any claim whatsoever that arises or may hereafter arise on account of first aid, treatment, or service rendered, or lack thereof, in connection with my work for GIVE BACK.
                            </p>
                        </li>
                        <li>
                            <h4>
                                Assumption of Risk.
                            </h4>
                            <p>
                                I understand that the work for GIVE BACK may include activities that may be hazardous to me, including, but not limited to, rehabilitating and improving, loading and unloading and transportation to and from work sites. In connection thereto, I recognize and understand that activities at GIVE BACK may, in some situations, involve inherently dangerous activities. I hereby expressly and specifically assume the risk of injury or harm in these activities and release GIVE BACK from all liability for injury, illness, death, or property damage resulting from the activities of the my work for or other involvement with GIVE BACK
                            </p>
                        </li>
                        <li>
                            <h4>
                                Insurance.
                            </h4>
                            <p>
                                I understand that GIVE BACK does not carry or maintain primary health, medical, life or disability insurance coverage for any volunteer. Each 11392785.1 volunteer is expected and encouraged to obtain his or her own medical or health insurance coverage.
                            </p>
                        </li>
                        <li>
                            <h4>
                                Photographic Release.
                            </h4>
                            <p>
                                I hereby grant and convey unto GIVE BACK all right, title, and interest in any and all photographic images and video or audio recordings made by GIVE BACK during the my work for GIVE BACK, including, but not limited to, any royalties, proceeds, or other benefits derived from such photographs or recordings.
                            </p>
                        </li>
                        <li>
                            <h4>
                                Other.
                            </h4>
                            <p>
                                I expressly agree that this Release is intended to be as broad and inclusive as permitted by the laws of the State of Ohio and that this Release shall be governed by and interpreted in accordance with the laws of the State of Ohio. I agree that in the event that any clause or provision of this Release shall be held to be invalid by any court of competent jurisdiction, the invalidity of such clause or provision shall not otherwise affect the remaining provisions of this Release which shall continue to be enforceable.
                            </p>
                        </li>
                    </ol>

                    <h3>
                        My electronic submission of this Release is intended to be and shall be deemed my legal signature and my acceptance of this Release.
                    </h3>
                </div>,
        terms: <TermsOfUse />,
        privacy: <PrivacyPolicy />
    }

    return <>
        I have read and agree to the 
        <span onClick={() => open('terms')} className={styles.link}> terms of use</span>
        ,
        <span onClick={() => open('privacy')} className={styles.link}> privacy policy</span>
        , and
        <span onClick={() => open('waiver')} className={styles.link}> waiver</span>

        <Modal
            isOpen={isOpen !== undefined}
            onRequestClose={close}
        >
            <div className={styles.content}>
                {
                    isOpen !== undefined && content[isOpen]
                }
                <Button onClick={close}>Close</Button>
            </div>
        </Modal>
    </>
}

export default Waiver