import React, { useState, useEffect } from 'react'

import { useGetSchema, useServices } from 'hooks'

import { DynamicForm } from '@/components/DynamicForm'
import { Button, Modal } from '@/components/Utils'

export const NewsletterSignup = () => {
    const [ isModalOpen, setModalOpen ] = useState(false)
    const [ isLoading, setLoading ] = useState(true)
    const [ didSubmitError, setSubmitError ] = useState<string | false>(false)
    const Axios = useServices('Axios')

    useEffect(() => {
        setLoading(false)
    }, [])

    const EmailSignupSchema = useGetSchema('EmailSignup')

    if (isLoading || !EmailSignupSchema) {
        return null
    }

    function toggleModal () {
        setModalOpen(!isModalOpen)
    }

    async function handleSubscription (state: Record<string, unknown>): Promise<void> {
        const form = new FormData()
        Object.entries(state).forEach(([key, value]) => {
            if (typeof value === 'string') form.append(key, value)
        })
        try {
            await Axios.post('https://givebackcincinnati.us12.list-manage.com/subscribe/post?u=160bf2c9daa8af34307358b18&amp;id=0992f3a90c&amp;f_id=00d941e0f0', form)
        } catch (e) {
            if (e && typeof e === 'object' && 'message' in e) {
                setSubmitError(e.message as string)
            } else {
                setSubmitError('Something went wrong, please try again later')
            }
        } finally {
            toggleModal()
        }
    }

    if (didSubmitError) {
        return <h2>Newsletter Signup Error: { didSubmitError }</h2>
    }

    return (
        <>
            <Button
                size='lg'
                onClick={toggleModal}
                style={{ margin: 'auto' }}
            >
                Newsletter Signup
            </Button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={toggleModal}
            >
                <>
                    <h2 style={{ textAlign: 'center' }}>Sign up for our Newsletter!</h2>
                    <DynamicForm
                        entity={EmailSignupSchema}
                        onSubmit={handleSubscription}
                        isProtected
                    />
                </>
            </Modal>
        </>
    )

// https://givebackcincinnati.us12.list-manage.com/subscribe/post?u=160bf2c9daa8af34307358b18&amp;id=0992f3a90c&amp;f_id=00d941e0f0

    return (
        <div dangerouslySetInnerHTML={{
            __html: `
            <div id="mc_embed_signup">
                <form action="https://givebackcincinnati.us12.list-manage.com/subscribe/post?u=160bf2c9daa8af34307358b18&amp;id=0992f3a90c&amp;f_id=00d941e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                    <div id="mc_embed_signup_scroll">
                    <h2>Subscribe</h2>
                    <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
            <div className="mc-field-group">
                <label htmlFor="mce-FNAME">First Name  <span className="asterisk">*</span>
            </label>
                <input type="text" value="" name="FNAME" className="required" id="mce-FNAME" required />
                <span id="mce-FNAME-HELPERTEXT" className="helper_text"></span>
            </div>
            <div className="mc-field-group">
                <label htmlFor="mce-LNAME">Last Name  <span className="asterisk">*</span>
            </label>
                <input type="text" value="" name="LNAME" className="required" id="mce-LNAME" required />
                <span id="mce-LNAME-HELPERTEXT" className="helper_text"></span>
            </div>
            <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span>
            </label>
                <input type="email" value="" name="EMAIL" className="required email" id="mce-EMAIL" required />
                <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
            </div>
            <div className="mc-field-group">
                <label htmlFor="mce-MMERGE5">Company </label>
                <input type="text" value="" name="MMERGE5" className="" id="mce-MMERGE5" />
                <span id="mce-MMERGE5-HELPERTEXT" className="helper_text"></span>
            </div>
                <div id="mce-responses" className="clear">
                    <div className="response" id="mce-error-response" style="display:none"></div>
                    <div className="response" id="mce-success-response" style="display:none"></div>
                </div>
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_160bf2c9daa8af34307358b18_0992f3a90c" tabindex="-1" value="" /></div>
                <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
                </div>
            </form>
            </div>
            <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
            <script type='text/javascript'>
            (function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='NHOOD';ftypes[3]='text';fnames[4]='MMERGE4';ftypes[4]='phone';fnames[5]='MMERGE5';ftypes[5]='text';fnames[6]='MMERGE6';ftypes[6]='text';}(jQuery));var $mcj = jQuery.noConflict(true);
        </script>`
        }}>
            
    </div>
    )
}

export default NewsletterSignup
