import React from 'react';
import { useNavigate } from 'react-router';
import { identity, stats } from '../../data/info';

export interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const navigate = useNavigate();

    const goTo = (path: string) => {
        navigate(path);
    };

    return (
        <div className="hub-home">
            <div className="hub-home__main">
                <p className="hub-home__eyebrow">PORTFOLIO HUB</p>
                <h1 className="hub-home__name">{identity.fullName}</h1>
                <p className="hub-home__title">{identity.title}</p>
                <p className="hub-home__summary">
                    I build mobile apps and web platforms that are shipped,
                    usable, and ready for real users.
                </p>

                <div className="hub-home__actions">
                    <button
                        className="hub-home__button hub-home__button--primary"
                        onMouseDown={() => goTo('/projects')}
                    >
                        View Projects
                    </button>
                    <button
                        className="hub-home__button"
                        onMouseDown={() => goTo('/experience')}
                    >
                        Experience
                    </button>
                    <button
                        className="hub-home__button"
                        onMouseDown={() => goTo('/contact')}
                    >
                        Contact
                    </button>
                </div>
            </div>

            <div className="hub-home__panel">
                <div className="hub-home__status">
                    <span>Available</span>
                    <small>{identity.location}</small>
                </div>
                <div className="hub-home__stats">
                    {stats.slice(0, 4).map((stat) => (
                        <div className="hub-home__stat" key={stat.label}>
                            <span>{stat.value}</span>
                            <small>{stat.label}</small>
                        </div>
                    ))}
                </div>
                <div className="hub-home__focus">
                    <span>Focus</span>
                    <p>React Native, Expo, Next.js, Supabase, product UI.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
