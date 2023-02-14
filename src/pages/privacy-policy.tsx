import React from "react";

import styles from "./privacy-and-terms.module.scss";

export const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      <p>
        At Give Back Cincinnati, your right to privacy is important, and we are
        committed to maintaining your trust.
      </p>
      <p>
        We are committed to full transparency. Information about our funding
        sources, including foundations and individual donors, can be provided
        upon request and may also be included in our annual report. No addresses
        or specific information about donations will be provided. To request a
        copy of Give Back Cincinnati&apos;s financials, please contact
        president@givebackcincinnati.org.
      </p>
      <p>
        Give Back Cincinnati will never share the names and mailing addresses of
        our supporters. We also never rent, share or sell your contact
        information with any third party.
      </p>
      <h3>What information do we collect?</h3>
      <p>
        We collect information from you when you sign up as a member, make a
        donation, register for an event or fill out a form. When you do one of
        these activities on our website, you may be asked to enter your name,
        email address, phone number, mailing address, phone number or credit
        card information.
      </p>
      <h3>How do we use your information?</h3>
      <p>
        Any of the information we collect from you may be used in one of the
        following ways:
      </p>
      <ul>
        <li>
          To improve our website (we continually strive to improve our website
          offerings based on the information and feedback we receive from you)
        </li>
        <li>To process transactions</li>
        <li>To send bi-monthly e-newsletters</li>
        <li>To recruit for events</li>
        <li>
          If at any time you wish to leave our bi-monthly e-newsletter list,
          click on the link to remove yourself from all mailings at the bottom
          of any message and you will be immediately unsubscribed. You may also
          contact us at membership@givebackcincinnati.org.
        </li>
      </ul>
      <h3>How do we protect your information?</h3>
      <p>
        All supplied sensitive/credit information is transmitted via Secure
        Socket Layer (SSL) technology and then encrypted into our payment
        gateway provider&apos;s database only to be accessible by those
        authorized with special access rights to such systems, and are required
        to keep the information confidential.
      </p>
      <h3>Third party links</h3>
      <p>
        At our discretion, we may occasionally link to third party websites,
        social media channels or offer products or services on our website.
        These third party sites have separate and independent privacy policies.
        We therefore have no responsibility or liability for the content and
        activities of these linked sites.
      </p>
      <h3>Your Consent</h3>
      <p>By using our site, you consent to our privacy policy.</p>
      <h3>Contacting Us</h3>
      <p>
        If there are any questions regarding this privacy policy, you may
        contact us at{" "}
        <a href="mailto:membership@givebackcincinnati.org">
          membership@givebackcincinnati.org
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
