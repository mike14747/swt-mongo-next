import styles from '../styles/asideDropdowns.module.css';

const AboutBox = () => {
    return (
        <section className={styles.section}>
            <h4 className={styles.heading + ' ' + styles.aboutBoxHeading}>
                ABOUT SWT
            </h4>

            <div className={styles.dropdownContent + ' ' + styles.aboutBoxDropdownContent}>
                <p>
                    SkeeballWorldTour is a social sports league centered around the alley game of skeeball.
                </p>

                <p>
                    The league is hosted at several of north east Ohio&apos;s Winking Lizard Tavern locations.
                </p>

                <p>
                    Our league had been in existence for a few seasons before this website began tracking the results in the summer of 2010.
                </p>
            </div>
        </section>
    );
};

export default AboutBox;
