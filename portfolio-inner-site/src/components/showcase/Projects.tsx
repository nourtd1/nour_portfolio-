import React from 'react';
import projects, { Project, ProjectStatus } from '../../data/projects';

export interface ProjectsProps {}

type BadgeKind = 'live' | 'wip' | 'hackathon';
type IconColor = 'green' | 'purple' | 'orange' | 'gray';

const STATUS_BADGE: Record<ProjectStatus, BadgeKind> = {
    Live: 'live',
    'Live on both stores': 'live',
    'In development': 'wip',
    'Hackathon submission': 'hackathon',
};

const BADGE_LABEL: Record<ProjectStatus, string> = {
    Live: 'Live',
    'Live on both stores': 'Live',
    'In development': 'In dev',
    'Hackathon submission': 'Hackathon',
};

const ICON_BY_BADGE: Record<BadgeKind, IconColor> = {
    live: 'green',
    wip: 'purple',
    hackathon: 'orange',
};

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
    const kind = STATUS_BADGE[project.status];
    const iconColor = ICON_BY_BADGE[kind];
    const initials = project.name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <div className="project-item">
            <div className={`project-item__icon project-item__icon--${iconColor}`}>
                {initials}
            </div>
            <div style={styles.itemMain}>
                <div style={styles.itemTop}>
                    <span className="project-item__name">
                        {project.name}
                        {project.featured && (
                            <span style={styles.featuredPill}>Featured</span>
                        )}
                    </span>
                    <span className={`badge badge--${kind}`}>
                        {BADGE_LABEL[project.status]}
                    </span>
                </div>
                <div className="project-item__stack">
                    {project.role} · {project.stack.join(' · ')}
                </div>
                <p style={styles.itemDesc}>{project.description}</p>
                {project.links.length > 0 && (
                    <div style={styles.links}>
                        {project.links.map((link) => (
                            <a
                                key={link.url}
                                rel="noreferrer"
                                target="_blank"
                                href={link.url}
                                className="text-mono"
                                style={styles.link}
                            >
                                ↗ {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Projects: React.FC<ProjectsProps> = () => {
    return (
        <div className="site-page-content">
            <div style={styles.pageHeader}>
                <p style={styles.eyebrow}>Mobile &amp; Web</p>
                <h1 style={styles.pageTitle}>Projects</h1>
                <p style={styles.pageSubtitle}>
                    Apps and platforms I've shipped. Several are live on the App
                    Store and Google Play.
                </p>
            </div>

            <div style={styles.list}>
                {projects.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    pageHeader: {
        flexDirection: 'column',
        gap: 6,
        marginBottom: 28,
        paddingBottom: 24,
        borderBottom: '0.5px solid rgba(255,255,255,0.07)',
    },
    eyebrow: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.09em',
        color: '#00C896',
    },
    pageTitle: {
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'rgba(255,255,255,0.92)',
        lineHeight: 1.1,
    },
    pageSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.44)',
        lineHeight: 1.5,
    },
    list: {
        flexDirection: 'column',
        width: '100%',
    },
    itemMain: {
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        gap: 4,
    },
    itemTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        flexWrap: 'wrap',
    },
    featuredPill: {
        display: 'inline-block',
        marginLeft: 6,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.06em',
        color: '#00C896',
        background: 'rgba(0,200,150,0.10)',
        border: '0.5px solid rgba(0,200,150,0.28)',
        borderRadius: 4,
        padding: '1px 5px',
        verticalAlign: 'middle',
    },
    itemDesc: {
        marginTop: 4,
        fontSize: 13,
        lineHeight: 1.6,
        color: 'rgba(255,255,255,0.52)',
    },
    links: {
        flexWrap: 'wrap',
        marginTop: 6,
        gap: 10,
    },
    link: {
        fontSize: 11,
        letterSpacing: '0.02em',
        color: '#00C896',
    },
};

export default Projects;
