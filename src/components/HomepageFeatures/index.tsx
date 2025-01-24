import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  image: string; // Image path
  link: string; // URL to navigate to when the image or title is clicked
  description: string; // Plain text for description
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Interests in Bioinformatics',
    image: require('@site/static/img/bioinformatics.jpeg').default,
    link: '/docs/bioinformatics', // Link to navigate to
    description: 'Dive into my bioinformatics explorations and discoveries.',
  },
  {
    title: 'Math and Machine Learning',
    image: require('@site/static/img/ml_dl.jpeg').default,
    link: '/docs/math-machine-learning',
    description: 'Discover my interests in math, statistics, and machine learning.',
  },
  {
    title: 'Philosophy',
    image: require('@site/static/img/buddha.jpeg').default,
    link: '/docs/philosophy',
    description: 'Explore my thoughts on philosophy and its impact on problem-solving.',
  },
];

function Feature({title, image, link, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={clsx('card', styles.featureCard)}>
        <Link to={link} className={styles.featureLink}>
          <div className="card__image">
            <img
              className={styles.featureImage}
              src={image}
              alt={title}
            />
          </div>
          <div className="card__body">
            <Heading as="h3" className={styles.featureTitle}>
              {title}
            </Heading>
            <p className={styles.featureDescription}>{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}