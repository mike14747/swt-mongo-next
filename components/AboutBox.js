import styles from '../styles/asideDropdowns.module.css';

const AboutBox = () => {
    return (
        <section className={styles.section}>
            <h4 className={styles.heading + ' ' + styles.aboutBoxHeading}>
                ABOUT SWT
            </h4>

            <div className={styles.dropdownContent + ' ' + styles.aboutBoxDropdownContent}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore laboriosam pariatur facere voluptate libero nemo praesentium illum delectus, voluptates esse.
                </p>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, voluptas numquam laborum in deleniti quis asperiores iusto iste, dicta nobis aperiam non beatae laboriosam, officia debitis consequatur earum consectetur esse. Ad commodi vel recusandae accusantium!
                </p>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iste ducimus at corporis laudantium quisquam eaque, omnis cupiditate corrupti aliquid nihil labore eius voluptate eligendi magnam exercitationem. Optio, molestiae excepturi!
                </p>
            </div>
        </section>
    );
};

export default AboutBox;
