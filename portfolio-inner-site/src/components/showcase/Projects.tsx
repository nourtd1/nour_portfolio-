import React, { useState } from 'react';
import projects, { Project, ProjectStatus } from '../../data/projects';

export interface ProjectsProps {}

type BadgeKind = 'live' | 'wip' | 'hackathon';
type FilterKind = 'all' | BadgeKind;

const STATUS_BADGE: Record<ProjectStatus, BadgeKind> = {
    Live: 'live',
    'Live on both stores': 'live',
    'In development': 'wip',
    'Hackathon submission': 'hackathon',
};

const BADGE_LABEL: Record<ProjectStatus, string> = {
    Live: 'Live',
    'Live on both stores': 'Live · Both Stores',
    'In development': 'In dev',
    'Hackathon submission': 'Hackathon',
};

const BADGE_COLORS: Record<BadgeKind, { bg: string; border: string; color: string }> = {
    live:      { bg: 'rgba(0,200,150,0.10)',   border: 'rgba(0,200,150,0.30)',   color: '#00C896' },
    wip:       { bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.30)', color: '#A78BFA' },
    hackathon: { bg: 'rgba(255,107,53,0.10)',  border: 'rgba(255,107,53,0.30)',  color: '#FF6B35' },
};

const ICON_COLORS: Record<BadgeKind, { bg: string; border: string; color: string }> = {
    live:      { bg: 'rgba(0,200,150,0.14)',   border: 'rgba(0,200,150,0.30)',   color: '#00C896' },
    wip:       { bg: 'rgba(167,139,250,0.14)', border: 'rgba(167,139,250,0.30)', color: '#A78BFA' },
    hackathon: { bg: 'rgba(255,107,53,0.14)',  border: 'rgba(255,107,53,0.30)',  color: '#FF6B35' },
};

const FILTER_LABELS: Record<FilterKind, string> = {
    all: 'All',
    live: '✅ Live',
    wip: '🚧 In Dev',
    hackathon: '🏆 Hackathon',
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const [expanded, setExpanded] = useState(false);
    const kind = STATUS_BADGE[project.status];
    const bc = BADGE_COLORS[kind];
    const ic = ICON_COLORS[kind];

    const initials = project.name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <div
            style={{
                ...styles.card,
                ...(expanded ? styles.cardExpanded : {}),
            }}
            onMouseDown={() => setExpanded((v) => !v)}
        >
            {/* Top row */}
            <div style={styles.cardTop}>
                <div style={{ ...styles.icon, background: ic.bg, border: `0.5px solid ${ic.border}`, color: ic.color }}>
                    {initials}
                </div>

                <div style={styles.cardMain}>
                    <div style={styles.titleRow}>
                        <span style={styles.name}>{project.name}</span>
                        <div style={styles.badges}>
                            {project.featured && (
                                <span style={styles.featuredPill}>★ Featured</span>
                            )}
                            <span style={{ ...styles.badge, background: bc.bg, border: `0.5px solid ${bc.border}`, color: bc.color }}>
                                {BADGE_LABEL[project.status]}
                            </span>
                        </div>
                    </div>
                    <p style={styles.role}>{project.role}</p>
                </div>

                <span style={{ ...styles.chevron, transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
            </div>

            {/* Stack pills */}
            <div style={styles.stackRow}>
                {project.stack.map((tech) => (
                    <span key={tech} style={styles.techPill}>{tech}</span>
                ))}
            </div>

            {/* Expanded: description + links */}
            {expanded && (
                <div style={styles.expandedBody} onMouseDown={(e) => e.stopPropagation()}>
                    <p style={styles.desc}>{project.description}</p>
                    {project.links.length > 0 && (
                        <div style={styles.linksRow}>
                            {project.links.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    rel="noreferrer"
                                    target="_blank"
                                    style={{ ...styles.linkBtn, background: bc.bg, border: `0.5px solid ${bc.border}`, color: bc.color }}
                                >
                                    ↗ {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                    {project.links.length === 0 && (
                        <p style={styles.noLink}>No public link yet</p>
                    )}
                </div>
            )}
        </div>
    );
};

const Projects: React.FC<ProjectsProps> = () => {
    const [filter, setFilter] = useState<FilterKind>('all');

    const filtered = filter === 'all'
        ? projects
        : projects.filter((p) => STATUS_BADGE[p.status] === filter);

    const counts: Record<FilterKind, number> = {
        all: projects.length,
        live: projects.filter((p) => STATUS_BADGE[p.status] === 'live').length,
        wip: projects.filter((p) => STATUS_BADGE[p.status] === 'wip').length,
        hackathon: projects.filter((p) => STATUS_BADGE[p.status] === 'hackathon').length,
    };

    return (
        <div className="site-page-content">
            {/* Header */}
            <div style={styles.pageHeader}>
                <p style={styles.eyebrow}>Mobile &amp; Web</p>
                <h1 style={styles.pageTitle}>Projects</h1>
                <p style={styles.pageSubtitle}>
                    {projects.length} shipped apps &amp; platforms — several live on the App Store and Google Play.
                    Click any card to expand.
                </p>
            </div>

            {/* Summary stats */}
            <div style={styles.summaryRow}>
                <div style={styles.summaryCard}>
                    <span style={{ ...styles.summaryNum, color: '#00C896' }}>{counts.live}</span>
                    <span style={styles.summaryLabel}>Live</span>
                </div>
                <div style={styles.summaryCard}>
                    <span style={{ ...styles.summaryNum, color: '#A78BFA' }}>{counts.wip}</span>
                    <span style={styles.summaryLabel}>In Dev</span>
                </div>
                <div style={styles.summaryCard}>
                    <span style={{ ...styles.summaryNum, color: '#FF6B35' }}>{counts.hackathon}</span>
                    <span style={styles.summaryLabel}>Hackathon</span>
                </div>
                <div style={styles.summaryCard}>
                    <span style={{ ...styles.summaryNum, color: 'rgba(255,255,255,0.85)' }}>{counts.all}</span>
                    <span style={styles.summaryLabel}>Total</span>
                </div>
            </div>

            {/* Filters */}
            <div style={styles.filters}>
                {(Object.keys(FILTER_LABELS) as FilterKind[]).map((f) => (
                    <button
                        key={f}
                        style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}
                        onMouseDown={() => setFilter(f)}
                    >
                        {FILTER_LABELS[f]}
                        <span style={{ ...styles.filterCount, ...(filter === f ? styles.filterCountActive : {}) }}>
                            {counts[f]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Project list */}
            <div style={styles.list}>
                {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    pageHeader: {
        flexDirection: 'column',
        gap: 6,
        marginBottom: 18,
        paddingBottom: 18,
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
    // Summary stats
    summaryRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10,
        marginBottom: 16,
    },
    summaryCard: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 8px',
        background: 'rgba(255,255,255,0.04)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        gap: 3,
    },
    summaryNum: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 1,
    },
    summaryLabel: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        color: 'rgba(255,255,255,0.32)',
        letterSpacing: '0.07em',
    },
    // Filters
    filters: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 16,
    },
    filterBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        borderRadius: 20,
        border: '0.5px solid rgba(255,255,255,0.10)',
        background: 'rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.50)',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        letterSpacing: '0.03em',
    },
    filterBtnActive: {
        background: 'rgba(0,200,150,0.12)',
        border: '0.5px solid rgba(0,200,150,0.35)',
        color: '#00C896',
    },
    filterCount: {
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '1px 6px',
        fontSize: 9,
        color: 'rgba(255,255,255,0.40)',
    },
    filterCountActive: {
        background: 'rgba(0,200,150,0.15)',
        color: '#00C896',
    },
    // Project list
    list: {
        flexDirection: 'column',
        gap: 8,
        width: '100%',
    },
    // Card
    card: {
        flexDirection: 'column',
        gap: 8,
        padding: '14px 16px',
        background: 'rgba(255,255,255,0.04)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'border-color 0.15s ease, background 0.15s ease',
    },
    cardExpanded: {
        background: 'rgba(255,255,255,0.06)',
        border: '0.5px solid rgba(255,255,255,0.14)',
    },
    cardTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    icon: {
        width: 36,
        height: 36,
        borderRadius: 9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        fontWeight: 700,
        flexShrink: 0,
    },
    cardMain: {
        flexDirection: 'column',
        gap: 3,
        flex: 1,
        minWidth: 0,
    },
    titleRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
    },
    name: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.88)',
    },
    badges: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    badge: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.05em',
        padding: '2px 7px',
        borderRadius: 4,
    },
    featuredPill: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.05em',
        padding: '2px 7px',
        borderRadius: 4,
        background: 'rgba(0,200,150,0.10)',
        border: '0.5px solid rgba(0,200,150,0.28)',
        color: '#00C896',
    },
    role: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        color: 'rgba(255,255,255,0.32)',
        letterSpacing: '0.03em',
    },
    chevron: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.25)',
        transition: 'transform 0.2s ease',
        flexShrink: 0,
        lineHeight: 1,
    },
    // Stack pills
    stackRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
    },
    techPill: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        padding: '2px 7px',
        borderRadius: 4,
        background: 'rgba(255,255,255,0.06)',
        border: '0.5px solid rgba(255,255,255,0.09)',
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '0.03em',
    },
    // Expanded
    expandedBody: {
        flexDirection: 'column',
        gap: 10,
        paddingTop: 10,
        borderTop: '0.5px solid rgba(255,255,255,0.07)',
    },
    desc: {
        fontSize: 13,
        lineHeight: 1.65,
        color: 'rgba(255,255,255,0.58)',
    },
    linksRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
    },
    linkBtn: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        padding: '5px 12px',
        borderRadius: 6,
        textDecoration: 'none',
        letterSpacing: '0.03em',
        transition: 'opacity 0.15s ease',
    },
    noLink: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        color: 'rgba(255,255,255,0.22)',
        letterSpacing: '0.03em',
    },
};

export default Projects;
